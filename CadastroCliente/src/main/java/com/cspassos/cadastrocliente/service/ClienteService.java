package com.cspassos.cadastrocliente.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.cspassos.cadastrocliente.entity.Cliente;
import com.cspassos.cadastrocliente.entity.Usuario;
import com.cspassos.cadastrocliente.repository.ClienteRepository;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository clienteRepository;

	public Cliente criarOuAtualizar(Cliente cliente) {
		return this.clienteRepository.save(cliente);
	}

	public Cliente findById(Long id) {
		return clienteRepository.findOne(id);
	}
	
	public void delete(Long id) {
		this.clienteRepository.delete(id);
	}
	
	public Page<Cliente> findAll(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return this.clienteRepository.findAll(pages);
	}

}
