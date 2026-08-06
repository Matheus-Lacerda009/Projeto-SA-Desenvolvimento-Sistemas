const express = require('express');
const connection = require('./db');
const cors = require('cors');
const server = express();
const bcrypt = require('bcryptjs');

server.use(express.json());

server.use(cors());

//Filmes
server.get('/filme', (req, res) => {
    const sql = "select * from Filmes where ativo = true";
    connection.query(sql, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message})
        }
        return res.json(resultado);
    });
});

server.get('/filme/busca', (req, res) => {
    const sql = "select * from Filmes where nome_filme like ? and ativo = true";
    const nome = `%${req.query.nome}%`;
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

server.delete('/filme/:id', (req, res) => {
    const sql = "update Filmes set ativo = false where id_filme = ?";
    const id_filme = req.params.id;
    connection.query(sql, id_filme, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/filme/reativar/:id', (req, res) => {
    const sql = "update Filmes set ativo = true where id_filme = ?";
    const id_filme = req.params.id;
    connection.query(sql, id_filme, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/filme/:id', (req, res) => {
    const sql = "update Filmes set nome_filme = ?, url = ? where id_filme = ? and ativo = true";
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

//-----------------------------------------------------------------------------------------------------------------------------------------
//Usuários

server.post('/usuario', (req, res) => {
    const sql = "insert into Usuarios(nome, senha, assinatura) values (?, ?, ?)";
    const nome = req.body.nome;
    const senha = req.body.senha;
    const assinatura = req.body.assinatura;
    connection.query(sql, [nome, senha, assinatura], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.delete('/usuario/:id', (req, res) => {
    const sql = "update from Usuarios set ativo = false where id_usuario = ?";
    const id = req.params.id;
    connection.query(sql, id, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/usuario/reativar/:id', (req, res) => {
    const sql = "update from Usuarios set ativo = true where id_usuario = ?";
    const id = req.params.id;
    connection.query(sql, id, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/usuario/:id', (req, res) => {
    const sql = "update from Usuarios set nome = ?, senha = ?, assinatura = ? where id_usuario = ? and ativo = true";
    const id = req.params.id;
    const nome = req.body.nome;
    const senha = req.body.senha;
    const assinatura = req.body.assinatura;
    connection.query(sql, [nome, senha, assinatura, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.listen(8085);