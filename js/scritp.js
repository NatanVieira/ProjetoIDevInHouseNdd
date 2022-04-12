const ID_LOCALSTORAGE = 'minhaListaDeCompras';
const ID_DIVRESULTADO = 'divResultado';
const ID_VALORTOTAL   = 'valorTotal';

function iniciaPagina() {
    let minhaLista = retornaListaLocalStorage();
    if(minhaLista)
        constroiTabelaDaLista(minhaLista);
    else
        constroiSpanListaVazia();
}

function retornaListaLocalStorage() {
    return JSON.parse(localStorage.getItem(ID_LOCALSTORAGE));
}

function constroiTabelaDaLista(minhaLista) {
    const divResultado    = document.getElementById(ID_DIVRESULTADO);
    const tabelaLista     = constroiTabela(divResultado);
    const cabecalhoTabela = constroiCabecalho(tabelaLista, ["","Descrição","Valor (R$)",""]);
    const corpoTabela     = constroiCorpo(tabelaLista);
    let valorTotal = 0;
    minhaLista.forEach((item) => {
        constroiLinhaCorpo(corpoTabela,item);
        valorTotal += item.valor;
    })
    alteraValorTotal(valorTotal);
}

function constroiSpanListaVazia() {
    const divResultado = document.getElementById(ID_DIVRESULTADO);
    divResultado.innerHTML = '';
    const spanListaVazia = document.createElement("span");
    spanListaVazia.innerText = 'Não existe nenhum item adicionado na lista.';
    spanListaVazia.className = 'listaVazia';
    divResultado.appendChild(spanListaVazia);
}

function selecionaItem() {
    const valorCheckBox = document.getElementById(id);
    //alert(valorCheckBox.value);
}

function excluiItem() {
    alert("Excluindo item ");
}

function constroiTabela(divTabela){
    const tabela = document.createElement('table');
    tabela.classList.add('table');
    tabela.classList.add('table-dark');
    divTabela.appendChild(tabela);
    return tabela
}

function constroiCabecalho(tabela, arrayCabecalho) {
    const cabecalho = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');
    arrayCabecalho.forEach((elemento) => {
        const itemCabecalho = document.createElement('th');
        linhaCabecalho.appendChild(itemCabecalho);
    })
    cabecalho.appendChild(linhaCabecalho);
    tabela.appendChild(cabecalho);
    return cabecalho;
}

function constroiCorpo(tabela){
    const corpo = document.createElement('tbody');
    tabela.appendChild(corpo)
    return corpo;
}

function constroiLinhaCorpo(corpoTabela,item) {
    const linhaCorpo = document.createElement('tr');
    linhaCorpo.id = String(item.id);
    const selecaoItemLista    = constroiSelecaoItem(item.id, item.valor);
    const itemListaDescricao  = constroiItemLista(item.descricao);
    const itemListaValor      = constroiItemLista(item.valor);
    const eliminacaoItemLista = constroiEliminacaoItem(item.id);
    linhaCorpo.appendChild(selecaoItemLista);
    linhaCorpo.appendChild(itemListaDescricao);
    linhaCorpo.appendChild(itemListaValor);
    linhaCorpo.appendChild(eliminacaoItemLista);
    corpoTabela.appendChild(linhaCorpo);
}

function constroiSelecaoItem(id, valor) {
    const tdItemSelecao = document.createElement('td');
    const checkItemSelecao = document.createElement('input');
    checkItemSelecao.type = 'checkbox';
    checkItemSelecao.value = 'on' ? valor != 0 : 'off';
    tdItemSelecao.appendChild(checkItemSelecao);
    tdItemSelecao.id = 'tg-' + String(id);
    return tdItemSelecao;
}

function constroiItemLista(textoValor) {
    const tdItem = document.createElement('td');
    tdItem.innerText = textoValor;
    return tdItem;
}

function constroiEliminacaoItem(id) {
    const tdEliminacao = document.createElement('td');
    const buttonItemEliminacao = document.createElement('button');
    buttonItemEliminacao.classList.add('btn');
    buttonItemEliminacao.classList.add('btn-danger');
    buttonItemEliminacao.innerText = 'Eliminar';
    tdEliminacao.appendChild(buttonItemEliminacao);
    tdEliminacao.id = 'bt-' + String(id);
    return tdEliminacao;
}

function alteraValorTotal(valor) {
    const spanValorTotal = document.getElementById(ID_VALORTOTAL);
    spanValorTotal.innerText = String(valor).replace('.',',');
}