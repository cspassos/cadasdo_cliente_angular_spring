package com.cspassos.cadastrocliente.security.jwt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.cspassos.cadastrocliente.entity.ProfileEnum;
import com.cspassos.cadastrocliente.entity.Usuario;

//Classe usada para converter o usuario no usuario reconhecido pelo spring security
public class JwtUserFactory {

	private JwtUserFactory() {
    }

    public static JwtUser create(Usuario user) {
        return new JwtUser(
                user.getId(),
                user.getEmail(),
                user.getSenha(),
                mapToGrantedAuthorities(user.getProfileEnum())
        );
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(ProfileEnum profileEnum) {
    		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(); 
    		authorities.add(new SimpleGrantedAuthority(profileEnum.toString())); 
    		return   authorities ;
    }

}
