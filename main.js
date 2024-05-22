const form = document.getElementById("form-atividade");
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji aprovado" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji Reprovado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a Nota Minima"));

// Inicializa uma variável para armazenar as linhas da tabela
let linhas = '';

// Adiciona um evento de submissão ao formulário
form.addEventListener('submit', function(e) {
    // Previne o comportamento padrão de submissão do formulário
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    // Captura os valores dos inputs de nome e nota da atividade
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Cria uma nova linha de tabela com os valores capturados
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        // Acumula a nova linha na variável 'linhas'
        linhas += linha;

        // Reseta os campos de entrada do formulário
        inputNomeAtividade.value = '';
        inputNotaAtividade.value = '';

        // Reseta o formulário após adicionar a atividade
        form.reset();
    }
}

function atualizaTabela() {
    // Seleciona o corpo da tabela (tbody) e atualiza seu conteúdo com as linhas acumuladas
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2); // Ajusta para duas casas decimais
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Calcula a soma das notas
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Calcula a média das notas
    return somaDasNotas / notas.length;
}