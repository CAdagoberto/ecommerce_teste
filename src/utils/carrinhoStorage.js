// Guarda no navegador só id e nome. Cada linha = 1 unidade no carrinho.

export const CARRINHO_STORAGE_KEY = 'ecommerce_carrinho_v1'

export const EVENTO_CARRINHO_ATUALIZADO = 'ecommerce-carrinho-atualizado'

// avisa a navbar e outras telas que o carrinho mudou
const avisarOutrasPartes = () => {
    if (typeof window === 'undefined') {
        return
    }
    window.dispatchEvent(new CustomEvent(EVENTO_CARRINHO_ATUALIZADO))
}

// tenta transformar o id em número; se não der, devolve null
const pegarIdNumero = valor => {
    if (typeof valor === 'number') {
        if (isNaN(valor)) {
            return null
        }
        return valor
    }
    let n = Number(valor)
    if (isNaN(n)) {
        return null
    }
    return n
}

// confere se o objeto tem só id e nome e se os valores prestam
const itemEstaOk = item => {
    if (item === null || item === undefined) {
        return false
    }
    if (typeof item !== 'object') {
        return false
    }

    let chaves = Object.keys(item)
    for (let c = 0; c < chaves.length; c++) {
        let k = chaves[c]
        if (k !== 'id' && k !== 'nome') {
            return false
        }
    }

    let idNum = pegarIdNumero(item.id)
    if (idNum === null) {
        return false
    }

    if (typeof item.nome !== 'string') {
        return false
    }
    if (item.nome.trim() === '') {
        return false
    }

    return true
}

// grava o array no localStorage e dispara o evento
const guardarListaNoLocalStorage = lista => {
    let texto = JSON.stringify(lista)
    window.localStorage.setItem(CARRINHO_STORAGE_KEY, texto)
    avisarOutrasPartes()
}

export const obterLinhasCarrinho = () => {
    if (typeof window === 'undefined') {
        return []
    }

    let texto = window.localStorage.getItem(CARRINHO_STORAGE_KEY)
    if (texto === null || texto === '') {
        return []
    }

    let lista
    try {
        lista = JSON.parse(texto)
    } catch (err) {
        console.error('Erro ao ler carrinho:', err)
        return []
    }

    if (lista instanceof Array === false) {
        return []
    }

    let resultado = []
    for (let i = 0; i < lista.length; i++) {
        let item = lista[i]
        if (itemEstaOk(item)) {
            resultado.push({
                id: pegarIdNumero(item.id),
                nome: item.nome.trim(),
            })
        }
    }

    return resultado
}

export const salvarLinhasCarrinho = linhas => {
    if (typeof window === 'undefined') {
        return
    }

    let novaLista = []
    if (linhas instanceof Array) {
        for (let i = 0; i < linhas.length; i++) {
            if (itemEstaOk(linhas[i])) {
                novaLista.push({
                    id: pegarIdNumero(linhas[i].id),
                    nome: linhas[i].nome.trim(),
                })
            }
        }
    }
    guardarListaNoLocalStorage(novaLista)
}

export const adicionarAoCarrinho = item => {
    if (itemEstaOk(item) === false) {
        return obterLinhasCarrinho()
    }

    let lista = obterLinhasCarrinho()
    let novoItem = {
        id: pegarIdNumero(item.id),
        nome: item.nome.trim(),
    }
    lista.push(novoItem)
    guardarListaNoLocalStorage(lista)
    return lista
}

export const removerUmaUnidade = id => {
    let idNum = pegarIdNumero(id)
    if (idNum === null) {
        return obterLinhasCarrinho()
    }

    let lista = obterLinhasCarrinho()
    let achou = -1
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id === idNum) {
            achou = i
            break
        }
    }

    if (achou === -1) {
        return lista
    }

    lista.splice(achou, 1)
    guardarListaNoLocalStorage(lista)
    return lista
}

export const removerTodasUnidades = id => {
    let idNum = pegarIdNumero(id)
    if (idNum === null) {
        return obterLinhasCarrinho()
    }

    let lista = obterLinhasCarrinho()
    let nova = []
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].id !== idNum) {
            nova.push(lista[i])
        }
    }
    guardarListaNoLocalStorage(nova)
    return nova
}

export const esvaziarCarrinho = () => {
    if (typeof window === 'undefined') {
        return
    }
    window.localStorage.removeItem(CARRINHO_STORAGE_KEY)
    avisarOutrasPartes()
}

export const contarUnidadesNoCarrinho = () => {
    let lista = obterLinhasCarrinho()
    return lista.length
}
