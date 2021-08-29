function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    else {
        var numeros = cpf.substring(0,9);
        var digitos = cpf.substring(9);

        var soma = 0
        for (var i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
        }
        
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        /* Validação do primeiro dígito verificador do CPF */
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0,10);
       
        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
         
         /* Validação do segundo dígito verificador do CPF*/
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        return true;
    };
}

function validacaoCPF() {
    /* Oculta a mensagem de CPF válido/inválido após o teste de validação*/
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    var cpf = document.getElementById('cpf_digitado').value;

    var resultadoValidacao = validaCPF(cpf); 
    
    if (resultadoValidacao) {
        document.getElementById('success').style.display='block';
    } 
    else {
        document.getElementById('error').style.display='block';
        /* 24/08/2021 O formulário validará o campo como obrigatório quando o campo CPF for inválido e clicar no botao enviar */
        document.getElementById('cpf_digitado').value = '';
    }
}

document.getElementById('cpf_digitado')
        .addEventListener('focusout', validacaoCPF);

/* Função para limpar os campos do endereço do formulário */
const limparFormulario = (endereco) => {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    document.getElementById('numero').value = '';
}

/* Função para preencher campos do endereço do formulário após o retorno da busca do CEP via API*/
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}

/* Função para verificar se o valor é número */
const eNumero = (numero) => /^[0-9]+$/.test(numero);

/* Função para verificar o tamanho do CEP digitado = 8 e se é um número*/
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

/* Função para pesquisar o CEP acessando via API */ 
const pesquisarCep = async() => {
    
    limparFormulario();
    /* Variável (cep) que recebe o valor digitado no formulário */
    const cep = document.getElementById('cep').value;
    
    /* variável com o endereço da API para pesquisar o CEP*/
    const url = `https://viacep.com.br/ws/${cep}/json/`
    
        /* variável (dados) recebe o resultado da URL no fetch */
    /* Variável (endereco) pega os dados e retonado da URL e aplica a função json com os dados consultados */

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            //document.getElementById('logradouro').value = "CEP não encontrado." 
            alert('CEP não cadastrado')
        } else {
            preencherFormulario(endereco);
        }
    } else {
        alert('CEP incorreto')
    }
}

document.getElementById('cep')
        .addEventListener('focusout', pesquisarCep);
    
// Funcao com fetch para integrar o front-end com o back-end e enviar os dados pro Banco de Dados
const Formulario = () => {
    let form = {
        nome: document.getElementById('nome').value,
        cargo: document.getElementById('cargo').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        sexo: document.getElementById('sexo').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        uf: document.getElementById('uf').value,
        telefone1: document.getElementById('telefone1').value,
        telefone2: document.getElementById('telefone2').value,
        celular: document.getElementById('celular').value,
        contato: document.getElementById('contato').value,
        email: document.getElementById('email').value,
        identidade: document.getElementById('identidade').value,
        cpf_digitado: document.getElementById('cpf_digitado').value,
        veiculo: document.getElementById('veiculo').value,
        habilitacao: document.getElementById('habilitacao').value
    };    
    console.log(form);
    return form;
};

const criarCandidato = async (candidato) => {
    //A url no fetch deve ser substituida pela url de hospedagem onde está o backend
     const requisicao = await fetch('http://localhost:5000/registro', {
         method: "POST", 
         headers: {
             'Accept':'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(Formulario())
     });
    
    if (requisicao.status === 200) {
         alert('Cadastro efetuado com sucesso!');
     } 
     else if (requisicao.status === 500) {
        alert('Problemas no servidor ou informações já existentes.');
     }
     else {
        alert('Seu cadastro não pode ser realizado.');
     }; 
 }; 

//Validação de preenchimento dos campos do formulário
function check_form() {
    let nome= document.getElementById('nome').value;
    let cargo= document.getElementById('cargo').value;
    let dataNascimento= document.getElementById('dataNascimento').value;
    let logradouro= document.getElementById('logradouro').value;
    let numero= document.getElementById('numero').value;
    let bairro= document.getElementById('bairro').value;
    let cidade= document.getElementById('cidade').value;
    let uf= document.getElementById('uf').value;
    let celular= document.getElementById('celular').value;
    let email= document.getElementById('email').value;
    let identidade= document.getElementById('identidade').value;

    if (nome == "" || cargo == "" || dataNascimento == "" || logradouro == "" ||
        numero == "" || bairro == "" || cidade == "" || uf == "" || celular == "" ||
        email == false || identidade == "" || validacaoCPF() == false) {
        alert('ATENÇÃO - Campos de preenchimento obrigatório não informados.');
    } else {
        criarCandidato();
    }
}
