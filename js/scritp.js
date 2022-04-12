const ID_LOCALSTORAGE = 'minhaListaDeCompras';
const ID_DIVRESULTADO = 'divResultado';

let verificaStorage = () => {
    
}

function selecionaItem() {
    const valorCheckBox = document.getElementById(id);
    //alert(valorCheckBox.value);
}

function excluiItem() {
    alert("Excluindo item ");
}

function constroiTabela(divTabela){
    const tabela = document.createElement('table')
    tabela.className('table, table-dark')
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