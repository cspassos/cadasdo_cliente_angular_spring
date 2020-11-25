package com.cspassos.cadastrocliente.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.cspassos.cadastrocliente.entity.Cliente;
import com.cspassos.cadastrocliente.response.Response;
import com.cspassos.cadastrocliente.service.ClienteService;

@RestController
@RequestMapping("api/cliente")
@CrossOrigin(origins = "*")
public class ClienteController {

	@Autowired
	private ClienteService clienteService;

	@PostMapping()
	@PreAuthorize("hasAnyRole('ADM','COMUM')")
	public ResponseEntity<Response<Cliente>> criarOuAtualizar(HttpServletRequest request, @RequestBody Cliente cliente,
			BindingResult result) {

		Response<Cliente> response = new Response<Cliente>();
		try {
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			Cliente clientePersisted = (Cliente) clienteService.criarOuAtualizar(cliente);
			response.setData(clientePersisted);
		} catch (DuplicateKeyException dE) {
			return ResponseEntity.badRequest().body(response);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	@PutMapping()
	@PreAuthorize("hasAnyRole('ADM','COMUM')")
	public ResponseEntity<Response<Cliente>> update(HttpServletRequest request, @RequestBody Cliente cliente,
			BindingResult result) {
		Response<Cliente> response = new Response<Cliente>();
		try {
			validarUpdate(cliente, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			Cliente userPersisted = (Cliente) clienteService.criarOuAtualizar(cliente);
			response.setData(userPersisted);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	private void validarUpdate(Cliente cliente, BindingResult result) {
		if (cliente.getId() == null) {
			result.addError(new ObjectError("Cliente", "Id não informado!"));
			return;
		}
	}
	
	@GetMapping(value = "{id}")
	@PreAuthorize("hasAnyRole('ADM','COMUM')")
	public ResponseEntity<Response<Cliente>> findById(@PathVariable("id") Long id) {
		Response<Cliente> response = new Response<Cliente>();
		Cliente cliente = clienteService.findById(id);
		if (cliente == null) {
			response.getErrors().add("Cliente não encontrado,  id:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(cliente);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping(value = "/{id}")
	@PreAuthorize("hasAnyRole('ADM','COMUM')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") Long id) {
		Response<String> response = new Response<String>();
		Cliente cliente = clienteService.findById(id);
		if (cliente == null) {
			response.getErrors().add("Cliente não encontrado,  id:" + id);
			return ResponseEntity.badRequest().body(response);
		}
		clienteService.delete(id);
		return ResponseEntity.ok(new Response<String>());
	}
	
	
	@GetMapping(value = "{page}/{count}")
	@PreAuthorize("hasAnyRole('ADM','COMUM')")
    public  ResponseEntity<Response<Page<Cliente>>> findAll(@PathVariable int page, @PathVariable int count) {
		Response<Page<Cliente>> response = new Response<Page<Cliente>>();
		Page<Cliente> cliente = clienteService.findAll(page, count);
		response.setData(cliente);
		return ResponseEntity.ok(response);
    }
	
}
