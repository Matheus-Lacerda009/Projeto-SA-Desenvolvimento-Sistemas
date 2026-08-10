const loginButton = document.getElementById("login-button");

loginButton.addEventListener('click', async function(){
    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = "";

    // Verifica dados:
    if(email == "" || senha == ""){
        feedback.innerHTML = "Preencha todos os dados para poder fazer login!";
    }

    // Permite liberação offline para usuario administrador:
    if(email == "adm@dev.com" || senha == "aaa"){
        feedback.innerHTML = "Login realizado com sucesso!";
    }

    try{
        // Manda requisição:
        const API = await fetch(`http://localhost:8085/usuario?identificador=${email}&senha=${senha}`, {
            method: "GET"
        });
        const resposta = await API.json();

        // Verifica a resposta:
        if(resposta.validacao){
            feedback.innerHTML = "Login realizado com sucesso!";
        } else{
            feedback.innerHTML = "Falha no login!";
        }
    } catch(erro){
        feedback.innerHTML = erro;
    }
});