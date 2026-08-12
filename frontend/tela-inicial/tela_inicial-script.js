const videosContainer = document.getElementById("videos");

window.addEventListener("load", carregar());

async function carregar(){
    try{
        // Faz requisição:
        const API = await fetch(`http://localhost:8085/filme`, {
            method: `GET`
        });
        const resposta = await API.json();

        if(resposta.length == 0){
            videosContainer.innerHTML = "<span>Nenhum vídeo encontrado!</span>";
        }else{
            // Adiciona elementos na tela:
            const code = listar(resposta);
            videosContainer.innerHTML = code;
            // Configura sistemas para detalhes:
            const conteudos = document.querySelectorAll(".div");
            conteudos.forEach(c => {
                c.addEventListener("click", (e) => {
                    const id = e.currentTarget.dataset.id;
                    window.location.href = `../pagina-detalhes/detalhes.html?id=${id}`;
                })
            });
        }
    } catch(error){
        videosContainer.innerHTML = `<span>Erro: ${error}</span>`;
    }
}

function listar(lista){
    let code = "";
    
    lista.forEach(conteudo => {
        code += `
            <div class="div" data-id=${conteudo.id_filme}>
                <iframe class="rectangle" src="${conteudo.url}"></iframe>
                <div class="div-wrapper">
                <div class="text-wrapper-2">${conteudo.nome_filme}</div>
                </div>
            </div>
        `;
    });

    return code;
}


// Realiza pesquisa pelo nome:
const input = document.getElementById("pesquisa-nome");
input.addEventListener("input", async function(){
    const busca = input.value;
    console.log(busca)

    if(busca == ""){
        carregar();
        return;
    }

    try{
        const API = await fetch(`http://localhost:8085/filme/busca?nome=${busca}`, {
            method : "GET"
        });
        const resposta = await API.json();

        if(resposta.length == 0){
            videosContainer.innerHTML = "<span>Nenhum vídeo com esse nome encontrado!</span>";
        }else{
            console.log(resposta)
            // Adiciona elementos na tela:
            const code = listar(resposta);
            videosContainer.innerHTML = code;
            // Configura sistemas para detalhes:
            const conteudos = document.querySelectorAll(".div");
            conteudos.forEach(c => {
                c.addEventListener("click", (e) => {
                    const id = e.currentTarget.dataset.id;
                    window.location.href = `../pagina-detalhes/detalhes.html?id=${id}`;
                })
            });
        }
    } catch(error){
        videosContainer.innerHTML = `<span>Erro: ${error}</span>`;
    }
});

document.getElementById("logout").addEventListener("click", () => {
    window.location.replace("../tela_login.html");
});