const express = require('express');
const connection = require('./db');
const cors = require('cors');
const server = express();
const bcrypt = require('bcryptjs');

server.use(express.json());

server.use(cors());

server.use(function (req, res, next){
    console.log("Requisição feita!");
    return next();
});

function emailInvalido(req, res, next){
    if(!req.body.email_usuario.includes("@")){
        res.status(500).json({erro : "O email não possui @"});
    }
    return next();
}

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

// Busca filme pelo ID:
server.get('/filme/:id', (req, res) => {
    const sql = "select * from Filmes where id_filme = ?";
    const id = req.params.id;
    connection.query(sql, id, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message})
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

server.post('/usuario', emailInvalido, (req, res) => {
    const sql = "insert into Usuarios(nome, nome_usuario, email_usuario, senha, assinatura) values (?, ?, ?, ?, ?)";
    const nome = req.body.nome;
    const nome_usuario = req.body.nome_usuario;
    const senha = bcrypt.hashSync(req.body.senha, 10);
    const assinatura = req.body.assinatura;
    const email = req.body.email_usuario;
    connection.query(sql, [nome, nome_usuario, email, senha, assinatura], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.delete('/usuario/:id', (req, res) => {
    const sql = "update Usuarios set ativo = false where id_usuario = ?";
    const id = req.params.id;
    connection.query(sql, id, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/usuario/reativar/:id', (req, res) => {
    const sql = "update Usuarios set ativo = true where id_usuario = ?";
    const id = req.params.id;
    connection.query(sql, id, (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.put('/usuario/:id', emailInvalido, (req, res) => {
    const sql = "update Usuarios set nome = ?, nome_usuario = ?, email_usuario = ?, senha = ?, assinatura = ? where id_usuario = ? and ativo = true";
    const id = req.params.id;
    const nome = req.body.nome;
    const nome_usuario = req.body.nome_usuario;
    const email = req.body.email_usuario;
    const senha = bcrypt.hashSync(req.body.senha, 10);
    const assinatura = req.body.assinatura;
    connection.query(sql, [nome, nome_usuario, email, senha, assinatura, id], (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        return res.json(resultado);
    });
});

server.post('/usuario/login', emailInvalido, (req, res) => {
    const usuario = "select senha from Usuarios where ativo = true and nome_usuario = ?";
    const identificador = req.body.identificador;
    const senha = req.body.senha;
    let logado;
    connection.query(usuario, identificador, async (erro, resultado) => {
        if(erro){
            return res.status(500).json({erro : erro.message});
        }
        if(resultado.length != 0){
            logado = await bcrypt.compare(senha, resultado[0].senha);
            return res.json({validacao : logado});
        }
        const email = "select senha from Usuarios where ativo = true and email_usuario = ?";
        connection.query(email, identificador, async (erro, resultado) => {
            if(erro){
                return res.status(500).json({erro : erro.message});
            }
            if(resultado.length == 0){
                return res.json({validacao : false});
            }
            logado = await bcrypt.compare(senha, resultado[0].senha);
            return res.json({validacao : logado})
        });
    });
});

server.listen(8085);