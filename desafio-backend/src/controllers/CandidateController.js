const Candidate = require('../models/Candidate');

module.exports = {
    async register(req, res) {

        const { nome, cargo, dataNascimento, estadoCivil, sexo, cep, logradouro, numero, bairro,cidade, uf, telefone1, telefone2, celular, contato, email, identidade,cpf_digitado, veiculo, habilitacao } = req.body;

        const newCandidate = new Candidate();
        
        newCandidate.nome = nome;
        newCandidate.cargo = cargo;
        newCandidate.dataNascimento = dataNascimento;
        newCandidate.estadoCivil = estadoCivil;
        newCandidate.sexo = sexo;
        newCandidate.cep = cep;
        newCandidate.logradouro = logradouro;
        newCandidate.numero = numero;
        newCandidate.bairro = bairro;
        newCandidate.cidade = cidade;
        newCandidate.uf = uf;
        newCandidate.telefone1 = telefone1;
        newCandidate.telefone2 = telefone2;
        newCandidate.celular = celular;
        newCandidate.contato = contato;
        newCandidate.email = email;
        newCandidate.identidade = identidade;
        newCandidate.cpf_digitado = cpf_digitado;
        newCandidate.veiculo = veiculo;
        newCandidate.habilitacao = habilitacao;

        newCandidate.save((err, savedCandidate) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Problemas no servidor');
            }

            return res.status(200).send(savedCandidate);
        });
    },
};