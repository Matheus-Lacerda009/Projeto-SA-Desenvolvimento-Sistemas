window.addEventListener("load", async function(){
    const videosContainer = document.getElementById("videos");

    try{
        // Faz requisição:
        const API = await fetch(`http://localhost:8085/filme`, {
            method: `GET`
        });
        const resposta = await API.json();

        if(resposta.length == 0){
            videosContainer.innerHTML = "<span>Nenhum vídeo encontrado!</span>";
        }else{
            const code = listar(resposta);
            videosContainer.innerHTML = code;
        }
    } catch(error){
        videosContainer.innerHTML = `<span>Erro: ${error}</span>`;
    }
});

function listar(lista){
    let code = "";

    lista.forEach(conteudo => {
        code += `
            <div class="div">
                <iframe class="rectangle" src="${conteudo.url}"></iframe>
                <div class="div-wrapper">
                <div class="text-wrapper-2">${conteudo.nome_filme}</div>
                </div>
            </div>
        `;
    });

    return code;
}