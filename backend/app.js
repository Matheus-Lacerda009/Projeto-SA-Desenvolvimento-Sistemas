const express = require('express');
const connection = require('./db');
const cors = require('cors');
const server = express();

server.use(express.json());

server.use(cors());

//Filmes
server.get('/filme', (req, res) => {
    const sql = "select * from Filmes";
    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message})
        }
        return res.json(resultado);
    });
});

server.get('/filme', (req, res) => {
    const sql = "select * from Filmes where nome_filme like '%?%'";
    const nome = req.query.nome;
    connection.query(sql, nome, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.post('/filme', (req, res) => {
    const sql = "insert into Filmes(nome_filme, url) values (?, ?)";
    const filme = {
        nome_filme : req.body.nome_filme,
        url : req.body.url
    }
    connection.query(sql, [filme.nome_filme, filme.url], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/filme/estado/:id', (req, res) => {
    const sql = "update Filmes set ativo = ?, data_desativacao = ? where id_filme = ?";
    const ativo = req.body.ativo;
    const id_filme = req.params.id;
    let data_desativacao = null;
    if(ativo){
        data_desativacao = "curdate()"
    }
    connection.query(sql, [ativo, data_desativacao, id_filme], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/filme/:id', (req, res) => {
    const sql = "update Filmes set nome_filme = ?, url = ? where id_filme = ?";
    const filme = {
        id_filme : req.params.id,
        nome_filme : req.body.nome_filme,
        url : req.body.url
    }
    connection.query(sql, [filme.nome_filme, filme.url, filme.id_filme], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.delete('/filme/:id', (req, res) => {
    const sql = "delete from Filmes where id_filme = ?";
    const id_filme = req.params.id;
    connection.query(sql, id_filme, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});
//-----------------------------------------------------------------------------------------------------------------------------------------
