package com.cspassos.cadastrocliente;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder; 

import com.cspassos.cadastrocliente.entity.ProfileEnum;
import com.cspassos.cadastrocliente.entity.Usuario;
import com.cspassos.cadastrocliente.repository.UsuarioRepository;

//@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
@SpringBootApplication
public class CadastroClienteApplication {

	public static void main(String[] args) {
		SpringApplication.run(CadastroClienteApplication.class, args);
	}
	
//	@Bean
//    CommandLineRunner init(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            initUsers(usuarioRepository, passwordEncoder);
//        };
//
//    }
    
	//Usuario no banco pra autenticação
//	private void initUsers(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
//        Usuario admin = new Usuario();
//        admin.setEmail("cspassos@cadastocliente.com");
//        admin.setSenha(passwordEncoder.encode("123456"));
//        admin.setProfileEnum(ProfileEnum.ROLE_ADM);
//
//        Usuario find = usuarioRepository.findByEmail("cspassos@cadasto_cliente.com");
//        if (find == null) {
//        	usuarioRepository.save(admin);
//        }
//    }

}
