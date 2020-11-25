package com.cspassos.cadastrocliente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cspassos.cadastrocliente.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{

	Usuario findByEmail(String email);

}
