window.addEventListener("load", async function(){
    // Pega o ID salvo na página:
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    // Define dados do HTML:
    const conteudoElement = document.getElementById("conteudo-detalhes");

    // Faz requisição:
    try{
        const API = await fetch(`http://localhost:8085/filme/${id}`, {
            method: "GET"
        });
        const resposta = await API.json();

        // Verifica se encontrou algum dado:
        if(resposta.length != 0){
            // Define dados no Front:
            conteudoElement.innerHTML = `
                <div class="centralizado">
                    <div class="id"=>ID: ${resposta[0].id_filme}</div>
                    <iframe class="video" src="${resposta[0].url}"></iframe>
                </div>
                <div class="detalhes">
                    <div class="text-wrapper">Título do Conteúdo: ${resposta[0].nome_filme}</div>
                    <div class="text-wrapper">Link de acesso: ${resposta[0].url}</div>
                </div>
            `;
        } else{
            conteudoElement.innerHTML = "ERRO: conteúdo com esse ID não encontrado!!";
        }
    } catch(error){
        conteudoElement.innerHTML = error;
    }
});


document.getElementById("logout").addEventListener("click", () => {
    window.location.replace("../tela_login.html");
});