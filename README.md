# cadastroCliente
  * O sistema é um cadastro de cliente na qual tem autenticação de usuário, sendo assim o usuário com perfil ADM pode cadastrar novos usuários e cliente, já o perfil COMUM só pode cadastrar clientes.

O PROJETO USA ANGULAR + SPRING BOOT, SECURITY E MYSQL;

### Instalação Front:
  * BAIXAR O SISTEMA E COLOCAR NA IDE;
  * RODAR UM "npm install";
  * RODAR UM "npm serve";
  
### Instalação Back:  
  * BASTA COLOCAR O SISTEMA NA IDE E MUDAR O "application.properties"  DE ACORDO AO SEU MYSQL;
  * FAZER UM UPDATE DO MAVEN PRA ASSIM BAIXAR AS DEPENDÊNCIAS; 
  
   OBS: PARA CRIAÇÃO DO PRIMEIRO USUÁRIO "ADM", NA CLASSE PRINCIPAL "CadastroClienteApplication" TEM UM CÓDIGO COMENTADO DA LINHA 21 ATE A 40, DESCOMENTAR E COLOCAR O EMAIL E SENHA DE SEU INTERESSE, EM SEGUIDA O USUÁRIO SERÁ CRIADO NA TABELA DE "usuario";

