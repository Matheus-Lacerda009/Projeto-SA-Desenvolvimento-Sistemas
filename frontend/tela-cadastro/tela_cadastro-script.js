document.getElementById("cadastro-button").addEventListener("click", async function(){
    // Pega os dados da página:
    const nome = document.getElementById("nome").value;
    const nomeUsuario = document.getElementById("nome-usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const assinatura = document.getElementById("assinatura").value;

    const feedback = document.getElementById("feedback");

    // Cria corpo para requisição:
    const corpo = {
        "nome" : nome,
        "nome_usuario" : nomeUsuario,
        "senha" : senha,
        "assinatura" : assinatura,
        "email_usuario" : email
    };

    try{
        const API = await fetch("http://localhost8085/usuario", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : corpo
        });
        const resposta = await API.json();

        if(resposta.erro != null){
            feedback.innerHTML = resposta.erro;
        } else{
            feedback.innerHTML = "Usuário criado com sucesso!!";
        }
    } catch(error){
        feedback.innerHTML = error;
    }
});