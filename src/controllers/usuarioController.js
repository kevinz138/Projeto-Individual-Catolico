var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined || senha == undefined) {
        res.status(400).send("Email ou senha undefined!");
        return;
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length == 1) {
                res.json({
                    id: resultado[0].idUsuario,
                    email: resultado[0].email,
                    nome: resultado[0].nome
                });
            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || String(erro));
        });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined || email == undefined || senha == undefined) {
        res.status(400).send("Algum campo está undefined!");
        return;
    }

    usuarioModel.cadastrar(nome, email, senha)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || String(erro));
        });
}

module.exports = { autenticar, cadastrar };