const mysql = require('mysql2');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'LensenFlix'
});


connection.connect((erro) => {
    if(erro){
        console.log("Erro ao conectar: ", erro);
        return;
    }
    console.log("Banco conectado com sucesso!");
});

//Serve para exportar o objeto connection
module.exports = connection;