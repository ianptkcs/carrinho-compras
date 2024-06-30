// Crio variáveis globais
let produtos = [],
    carrinho = [],
    total = 0

// Limpo o carrinho
limpar()

// Preenche a lista de produtos
let listaProdutos = document.getElementById('produto')
for (let opcao of listaProdutos.children) {
    let text = opcao.value
    produtos.push({
        nome: text.split(' - ')[0],
        preco: text.split('R$')[1],
    })
}

// Crio a classe Produto
class Produto {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
    }
    qtde = 1
}

// Crio a função adicionar
function adicionar() {
    // Pega o valor do select
    let elementoSelect = document.getElementById('produto')
    let opcao =
        elementoSelect.options[elementoSelect.selectedIndex].value.split(
            ' - '
        )[0]

    // Pega a quantidade
    let quantidade = document.getElementById('quantidade').value
    if (quantidade === '') quantidade = 1

    // Crio variáveis auxiliares
    let jaExiste = false
    let produto

    // Atualiza a quantidade ou adiciona um novo produto
    for (let produtoTemp of carrinho) {
        if (produtoTemp.nome === opcao) {
            produtoTemp.qtde = parseInt(produtoTemp.qtde) + parseInt(quantidade)
            produto = produtoTemp
            jaExiste = true
        }
    }
    if (!jaExiste) {
        switch (opcao) {
            case produtos[0].nome:
                produto = new Produto(produtos[0].nome, produtos[0].preco)
                produto.qtde = quantidade
                carrinho.push(produto)
                break
            case produtos[1].nome:
                produto = new Produto(produtos[1].nome, produtos[1].preco)
                produto.qtde = quantidade
                carrinho.push(produto)
                break
            case produtos[2].nome:
                produto = new Produto(produtos[2].nome, produtos[2].preco)
                produto.qtde = quantidade
                carrinho.push(produto)
                break
        }
    }

    // Atualiza o display do carrinho
    let listaCarrinho = document.getElementById('lista-produtos')
    if (jaExiste) {
        for (let produtoTemp of listaCarrinho.children) {
            if (produtoTemp.innerText.includes(opcao)) {
                produtoTemp.querySelector('span').innerText = `${produto.qtde}x`
            }
        }
    } else {
        listaCarrinho.innerHTML =
            listaCarrinho.innerHTML +
            `<section class="carrinho__produtos__produto"><span class="texto-azul">${produto.qtde}x</span> ${produto.nome} <span class="texto-azul">R$${produto.preco}</span></section>`
    }

    // Atualiza o valor total
    let carrinhoTotal = document.getElementById('valor-total')
    total += produto.preco * quantidade

    carrinhoTotal.innerText = `R$${total}`

    // Limpa o campo de quantidade
    document.getElementById('quantidade').value = ''

    return
}

// Crio a função limpar
function limpar() {
    total = 0
    document.getElementById('lista-produtos').innerHTML = ''
    document.getElementById('valor-total').innerText = 'R$0'
    carrinho = []
    return
}
