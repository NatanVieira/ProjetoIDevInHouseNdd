const ID_LOCALSTORAGE = 'minhaListaDeCompras';
const ID_DIVRESULTADO = 'divResultado';
const ID_VALORTOTAL   = 'valorTotal';
const ID_PRODUTO      = 'produto';
const ID_PRECO        = 'divPreco';

let id_geral = 0;
let minhaLista = [];
let valorTotal = 0;

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
    alteraValorTotal(valorTotal);
}

function retornaListaLocalStorage() {
    if (localStorage.getItem(ID_LOCALSTORAGE) != '')
        return JSON.parse(localStorage.getItem(ID_LOCALSTORAGE));
}

function atualizaLocalStorage() {
    localStorage.setItem(ID_LOCALSTORAGE,JSON.stringify(minhaLista));
}
function constroiTabelaDaLista() {
    const divResultado    = document.getElementById(ID_DIVRESULTADO);
    const tabelaLista     = constroiTabela(divResultado);
    const cabecalhoTabela = constroiCabecalho(tabelaLista, ["","Descrição","Valor (R$)",""]);
    const corpoTabela     = constroiCorpo(tabelaLista);
    minhaLista.forEach((item) => {
        constroiLinhaCorpo(corpoTabela,item);
        valorTotal += item.valor;
    })
}

function constroiSpanListaVazia() {
    const divResultado = document.getElementById(ID_DIVRESULTADO);
    divResultado.innerHTML = '';
    const spanListaVazia = document.createElement("span");
    spanListaVazia.innerText = 'Não existe nenhum item adicionado na lista.';
    spanListaVazia.className = 'listaVazia';
    divResultado.appendChild(spanListaVazia);
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
    corpoTabela.appendChild(linhaCorpo);
}

function constroiSelecaoItem(id, valor) {
    const tdItemSelecao = document.createElement('td');
    const checkItemSelecao = document.createElement('input');
    checkItemSelecao.type = 'checkbox';
    checkItemSelecao.checked = valor > 0 ? true : false ;
    checkItemSelecao.setAttribute('data-toggle','modal');
    checkItemSelecao.setAttribute('data-target','#modalPreco');
    checkItemSelecao.setAttribute("onclick","definePrecoItem(" + String(id) + ")");
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
    buttonItemEliminacao.classList.add('btn-danger');
    buttonItemEliminacao.setAttribute("onclick","removeItemLista(" + String(id) + ")");
    buttonItemEliminacao.innerText = 'Eliminar';
    tdEliminacao.appendChild(buttonItemEliminacao);
    tdEliminacao.id = 'bt-' + String(id);
    return tdEliminacao;
}

function alteraValorTotal(valor) {
    const spanValorTotal = document.getElementById(ID_VALORTOTAL);
    spanValorTotal.innerText = String(valor.toFixed(2)).replace('.',',');
}

function removeItemLista(id) {
    let posicaoObjeto;
    posicaoObjeto = minhaLista.findIndex(x => x.id == id);
    minhaLista.splice(posicaoObjeto,1);
    atualizaLocalStorage();
    iniciaPagina();
}

function adicionarProduto() {
    const produto = document.getElementById(ID_PRODUTO);
    const textoProduto = produto.value;
    if(textoProduto != '' && textoProduto != null){
        criaNovoItemLista(textoProduto);
    }
    else{
        alert('Para adicionar um produto deve-se adicionar uma descrição no campo ao lado...');
    }
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

function incrementaIDGeral (){
    id_geral++;
}

function definePrecoItem(id){
    const divPrecoProduto = document.getElementById(ID_PRECO);
    divPrecoProduto.innerHTML = '';
    const modalPreco = criaModalPreco(id);
    divPrecoProduto.appendChild(modalPreco);
    console.log('Veio até aqui');
}

function criaModalPreco (id) {
    const modalPreco = document.createElement('div');
    modalPreco.classList.add('modal');
    modalPreco.classList.add('modalPreco');
    criaModalPreco.id = 'modalPreco';

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const tituloModal = document.createElement('h5');
    tituloModal.classList.add('modal-title');
    tituloModal.innerText = 'Preço para o item:';
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    const formModal = document.createElement('form');
    const formGroup = document.createElement('form-group');
    const inputPreco = document.createElement('input');
    inputPreco.classList.add('form-control');
    inputPreco.type = 'text';
    inputPreco.id = 'valorPreco';
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    const botaoFechar =  document.createElement('button');
    botaoFechar.classList.add('btn')
    botaoFechar.classList.add('btn-primary');
    const botaoAdicionarPreco = document.createElement('button');
    botaoAdicionarPreco.classList.add('btn')
    botaoAdicionarPreco.classList.add('btn-dark');
    botaoFechar.setAttribute('data-dismiss','modalPreco');
    botaoAdicionarPreco.setAttribute('onclick','adicionaPreco(' + inputPreco.value + ',' + id + ')');
    botaoAdicionarPreco.setAttribute('data-dismiss','modalPreco');

    
    modalFooter.appendChild(botaoAdicionarPreco);
    modalFooter.appendChild(botaoFechar);
    formGroup.appendChild(inputPreco);
    formModal.appendChild(formGroup)
    modalBody.appendChild(formModal)
    modalHeader.appendChild(tituloModal);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalPreco.appendChild(modalContent);
    
    return modalPreco;
}
