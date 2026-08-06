const loginButton = document.getElementById("login-button");

loginButton.addEventListener('click', async function(){
    const email = document.getElementById("email-input").value;
    const senha = document.getElementById("password-input").value;
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = "";

    if(email == "" || senha == ""){
        feedback.innerHTML = "Preencha todos os dados para poder fazer login!";
    }
});