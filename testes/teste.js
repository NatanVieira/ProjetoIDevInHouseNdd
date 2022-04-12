
function gravaLocalStorage() {
    // console.log("TESTE");
    // localStorage.setItem("teste","natanael");
    // localStorage.setItem("teste","susane");
    // localStorage.setItem("teste2","dih");
    // console.log(localStorage.getItem("teste"));

    // let meuArray = [];
    // for(let i = 1; i < 5 ; i++){
    //     let obj = {
    //         id: i,
    //         nome: 'natanael' + String(i)
    //     }
    //     meuArray.push(obj);
    // }
    
    // localStorage.setItem("objetos",JSON.stringify(meuArray));
    
    let minhaLista = []
    let obj1 = {
        id: 1,
        descricao: 'Laranja',
        valor: 0
    }
    let obj2 = {
        id: 2,
        descricao: 'Banana',
        valor: 0
    }
    let obj3 = {
        id: 3,
        descricao: 'Maçã',
        valor: 2.5
    }
    minhaLista.push(obj1);
    minhaLista.push(obj2);
    minhaLista.push(obj3);
    localStorage.setItem("minhaListaDeCompras",JSON.stringify(minhaLista));
}

function buscaItensLocalStorage() {
    let meuArray = JSON.parse(localStorage.getItem("objetos"));
    
    meuArray.forEach((elemento) => {
        console.log(`ID: ${elemento.id} - NOME: ${elemento.nome}`);
    })
}