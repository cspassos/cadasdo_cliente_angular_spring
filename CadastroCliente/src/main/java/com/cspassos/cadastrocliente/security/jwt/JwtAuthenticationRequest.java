package com.cspassos.cadastrocliente.security.jwt;

import java.io.Serializable;

//Ação de login da aplicação -> 1
public class JwtAuthenticationRequest implements Serializable {

	private static final long serialVersionUID = 1L;
	private String email;
    private String password;

    public JwtAuthenticationRequest() {
        super();
    }

    public JwtAuthenticationRequest(String email, String password) {
        this.setEmail(email);
        this.setPassword(password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
