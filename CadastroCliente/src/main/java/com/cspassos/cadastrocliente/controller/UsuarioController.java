package com.cspassos.cadastrocliente.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;

import com.cspassos.cadastrocliente.entity.Usuario;
import com.cspassos.cadastrocliente.response.Response;
import com.cspassos.cadastrocliente.service.UsuarioService;

@RestController
@RequestMapping("api/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping()
	@PreAuthorize("hasAnyRole('ADM')")
	public ResponseEntity<Response<Usuario>> criarOuAtualizar(HttpServletRequest request, @RequestBody Usuario usuario,
			BindingResult result) {

		Response<Usuario> response = new Response<Usuario>();
		try {
			validarCreateUsuario(usuario, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
			Usuario userPersisted = (Usuario) usuarioService.createOrUpdate(usuario);
			response.setData(userPersisted);
		} catch (DuplicateKeyException dE) {
			response.getErrors().add("E-mail não registrado!");
			return ResponseEntity.badRequest().body(response);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	private void validarCreateUsuario(Usuario usuario, BindingResult result) {
		if (usuario.getEmail() == null) {
			result.addError(new ObjectError("Usuario", "Email Não informado!"));
			return;
		}
	}
	
	@PutMapping()
	@PreAuthorize("hasAnyRole('ADM')")
	public ResponseEntity<Response<Usuario>> update(HttpServletRequest request, @RequestBody Usuario usuario,
			BindingResult result) {
		Response<Usuario> response = new Response<Usuario>();
		try {
			validarUpdate(usuario, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
			Usuario userPersisted = (Usuario) usuarioService.createOrUpdate(usuario);
			response.setData(userPersisted);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	private void validarUpdate(Usuario usuario, BindingResult result) {
		if (usuario.getId() == null) {
			result.addError(new ObjectError("Usuario", "Id não informado!"));
			return;
		}
		if (usuario.getEmail() == null) {
			result.addError(new ObjectError("Usuario", "Email não informado!"));
			return;
		}
	}
	
	@GetMapping(value = "{id}")
	@PreAuthorize("hasAnyRole('ADM')")
	public ResponseEntity<Response<Usuario>> findById(@PathVariable("id") String id) {
		Response<Usuario> response = new Response<Usuario>();
		Usuario usuario = usuarioService.findById(id);
		if (usuario == null) {
			response.getErrors().add("Registro não encontrado, id:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(usuario);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping(value = "/{id}")
	@PreAuthorize("hasAnyRole('ADM')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") String id) {
		Response<String> response = new Response<String>();
		Usuario usuario = usuarioService.findById(id);
		if (usuario == null) {
			response.getErrors().add("Register not found id:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		usuarioService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}
	
	
	@GetMapping(value = "{page}/{count}")
	@PreAuthorize("hasAnyRole('ADM')")
    public  ResponseEntity<Response<Page<Usuario>>> findAll(@PathVariable int page, @PathVariable int count) {
		Response<Page<Usuario>> response = new Response<Page<Usuario>>();
		Page<Usuario> usuario = usuarioService.findAll(page, count);
		response.setData(usuario);
		return ResponseEntity.ok(response);
    }
	
}
