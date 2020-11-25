package com.cspassos.cadastrocliente.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cspassos.cadastrocliente.entity.Usuario;
import com.cspassos.cadastrocliente.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	public Usuario findByEmail(String email) {
		return this.usuarioRepository.findByEmail(email);
	}
	
	public Usuario createOrUpdate(Usuario usuario) {
		return this.usuarioRepository.save(usuario);
	}

	public Usuario findById(String id) {
		return usuarioRepository.findOne(id);
	}
	
	public void delete(String id) {
		this.usuarioRepository.delete(id);
	}

	public Page<Usuario> findAll(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return this.usuarioRepository.findAll(pages);
	}

}
