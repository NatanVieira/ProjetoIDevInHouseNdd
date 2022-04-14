const ID_LOCALSTORAGE = 'minhaListaDeCompras';
const ID_DIVRESULTADO = 'divResultado';
const ID_VALORTOTAL   = 'valorTotal';
const ID_PRODUTO      = 'produto';
const ID_PRECO        = 'divPreco';
const ID_INPUTPRECO   = 'inputValorPreco';
const ID_BOTAOPRECO   = 'botaoAtualizaValor';
const ID_TITULOPRECO  = 'tituloModalPreco';
const ID_DIVIMAGENS   = 'divImagens';
const SRC_SACOLAS     = '../img/sacola.png';

let id_geral = 0;
let minhaLista = [];
let valorTotal = 0;

// funcoes gerais
function incrementaIDGeral (){
    id_geral++;
}

//funcoes LocalStorage
function retornaListaLocalStorage() {
    if (localStorage.getItem(ID_LOCALSTORAGE) != '')
        return JSON.parse(localStorage.getItem(ID_LOCALSTORAGE));
}

function atualizaLocalStorage() {
    localStorage.setItem(ID_LOCALSTORAGE,JSON.stringify(minhaLista));
}

// funcoes para elementos html
function iniciaPagina() {
    minhaLista = retornaListaLocalStorage();
    valorTotal = 0;
    id_geral = 0;
    if(minhaLista && minhaLista.length > 0){
        id_geral = minhaLista.length;
        constroiTabelaDaLista();
    }
    else{
        minhaLista = [];
        constroiSpanListaVazia();
    }
    constroiDivImagens();
    alteraValorTotal(valorTotal);
}

function constroiDivImagens() {
    const divImagens = document.getElementById(ID_DIVIMAGENS);
    divImagens.innerHTML = '';
    let totalItens = 0;
    minhaLista.forEach((item) => {
        totalItens += Number(item.valor) > 0 ? 1 : 0;
    })
    if(totalItens > 0){
    const spanQuantidade = document.createElement('span');
        divImagens.appendChild(spanQuantidade);
        spanQuantidade.className = 'aviso';
        spanQuantidade.innerText = 'Total de itens: ' + String(totalItens.toFixed(2));
        const breakLine = document.createElement('br');
        divImagens.appendChild(breakLine);
        criaSacolas(divImagens,totalItens);
    }
}

function criaSacolas(divImagens,totalItens) {
    let i = 1;
    while(i <= totalItens){
        const imagemSacola = document.createElement('img');
        imagemSacola.src = SRC_SACOLAS;
        imagemSacola.classList.add('img-thumbnail')
        imagemSacola.style.width = '15em';
        divImagens.appendChild(imagemSacola);
        i++;
    }
}

function alteraValorTotal(valor) {
    const spanValorTotal = document.getElementById(ID_VALORTOTAL);
    spanValorTotal.innerText = String(valor.toFixed(2)).replace('.',',');
}

function constroiSpanListaVazia() {
    const divResultado = document.getElementById(ID_DIVRESULTADO);
    divResultado.innerHTML = '';
    const spanListaVazia = document.createElement("span");
    spanListaVazia.innerText = 'Não existe nenhum item adicionado na lista.';
    spanListaVazia.className = 'aviso';
    divResultado.appendChild(spanListaVazia);
}

function constroiTabelaDaLista() {
    const divResultado    = document.getElementById(ID_DIVRESULTADO);
    const tabelaLista     = constroiTabela(divResultado);
    const cabecalhoTabela = constroiCabecalho(tabelaLista, ["","Descrição","Valor (R$)",""]);
    const corpoTabela     = constroiCorpo(tabelaLista);
    minhaLista.forEach((item) => {
        constroiLinhaCorpo(corpoTabela,item);
        valorTotal += Number(item.valor);
    })
}

function constroiTabela(divTabela){
    divTabela.innerHTML = '';
    const tabela = document.createElement('table');
    tabela.classList.add('table');
    tabela.classList.add('table-dark')
    divTabela.appendChild(tabela);
    return tabela
}

function constroiCabecalho(tabela, arrayCabecalho) {
    const cabecalho = document.createElement('thead');
    const linhaCabecalho = document.createElement('tr');
    arrayCabecalho.forEach((elemento) => {
        const itemCabecalho = document.createElement('th');
        itemCabecalho.innerText = elemento;
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
    if (item.valor > 0)
        linhaCorpo.style.backgroundColor = '#395697';
    corpoTabela.appendChild(linhaCorpo);
}

function constroiSelecaoItem(id, valor) {
    const tdItemSelecao = document.createElement('td');
    const checkItemSelecao = document.createElement('input');
    checkItemSelecao.type = 'checkbox';
    checkItemSelecao.checked = valor > 0 ? true : false ;
    checkItemSelecao.id = 'cb-' + String(id);
    checkItemSelecao.setAttribute("onclick","abreModalPrecoItem(" + String(id) + ", this.checked, this.id)")
    checkItemSelecao.setAttribute('data-bs-toggle', valor > 0 ? '' : 'modal');
    checkItemSelecao.setAttribute('data-bs-target', valor > 0 ? '' : '#modalPreco');
    tdItemSelecao.appendChild(checkItemSelecao);
    tdItemSelecao.id = 'tg-' + String(id);
    return tdItemSelecao;
}

function constroiItemLista(textoValor) {
    const tdItem = document.createElement('td');
    tdItem.innerText = typeof(textoValor) == "number" ? textoValor.toFixed(2) : textoValor;
    return tdItem;
}

function constroiEliminacaoItem(id) {
    const tdEliminacao = document.createElement('td');
    const buttonItemEliminacao = document.createElement('button');
    buttonItemEliminacao.classList.add('btn');
    buttonItemEliminacao.classList.add('btn-outline-danger');
    buttonItemEliminacao.setAttribute("onclick","removeItemLista(" + String(id) + ")");
    buttonItemEliminacao.innerText = 'Eliminar';
    tdEliminacao.appendChild(buttonItemEliminacao);
    tdEliminacao.id = 'bt-' + String(id);
    return tdEliminacao;
}

function atualizaAtributosCheckBox(idCheckBox, itemSelecionado) {
    const checkbox = document.getElementById(idCheckBox);
    checkbox.setAttribute('data-bs-toggle', itemSelecionado ? '' : 'modal');
    checkbox.setAttribute('data-bs-target', itemSelecionado ? '' : '#modalPreco');
}

function abreModalPrecoItem(id, itemSelecionado, idCheckBox){
    const botaoAtualizaValor = document.getElementById(ID_BOTAOPRECO);
    const itemLista = minhaLista.find(x => x.id == id);
    const inputValorPreco = document.getElementById(ID_INPUTPRECO);
    inputValorPreco.value = '';
    if(itemLista){
        const tituloModal = document.getElementById(ID_TITULOPRECO);
        tituloModal.innerText = itemLista.descricao;
    }
    atualizaAtributosCheckBox(idCheckBox,itemSelecionado);
    if (itemSelecionado)
        botaoAtualizaValor.setAttribute('onclick','adicionaValorItem(' + String(id) +')');
    else
        retiraValorItem(id);
}

//funcoes para itens da lista
function removeItemLista(id) {
    let posicaoObjeto;
    posicaoObjeto = minhaLista.findIndex(x => x.id == id);
    minhaLista.splice(posicaoObjeto,1);
    atualizaLocalStorage();
    iniciaPagina();
}

function adicionaItemLista() {
    const produto = document.getElementById(ID_PRODUTO);
    const textoProduto = produto.value.trim();
    if(textoProduto != '' && textoProduto != null)
        criaNovoItemLista(textoProduto);
    else
        alert('Para adicionar um produto deve-se adicionar uma descrição no campo ao lado...');
    
    produto.value = '';
    iniciaPagina();
}

function criaNovoItemLista(textoProduto) {
    incrementaIDGeral();
    let novoObjeto = {
        id: id_geral,
        descricao: textoProduto,
        valor: 0
    }
    minhaLista.push(novoObjeto);
    atualizaLocalStorage();
}

function adicionaValorItem(id){
    const inputValorPreco = document.getElementById(ID_INPUTPRECO);
    const valor = Number(inputValorPreco.value);
    
    atualizaValorItem(id, valor);
    if(valor == 0)
        alert("Para atualizar o valor deve-se digitar um valor válido! (maior que zero e apenas númerico)");
}

function retiraValorItem(id) {
    const valor = 0;
    atualizaValorItem(id,valor);
}

function atualizaValorItem(id, valor){
    const item = minhaLista.find(x => x.id == id);
    item.valor = valor;
    atualizaLocalStorage();
    iniciaPagina();
}
