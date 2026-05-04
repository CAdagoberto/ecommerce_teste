// Junta as linhas do carrinho com a lista que veio da API e monta o resumo (preço, estoque, etc).

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

// procura o produto no array da API pelo id
const acharProdutoNoCatalogo = (catalogo, idProcurado) => {
    for (let i = 0; i < catalogo.length; i++) {
        let p = catalogo[i]
        let idP = pegarIdNumero(p.id)
        if (idP === idProcurado) {
            return p
        }
    }
    return null
}

// junta várias linhas com o mesmo id e conta quantas tem
export const agregarLinhasPorId = linhasDoStorage => {
    if (linhasDoStorage instanceof Array === false) {
        return []
    }

    let grupos = []

    for (let i = 0; i < linhasDoStorage.length; i++) {
        let linha = linhasDoStorage[i]
        let id = pegarIdNumero(linha.id)
        if (id === null) {
            continue
        }

        let nome = ''
        if (typeof linha.nome === 'string') {
            nome = linha.nome.trim()
        }

        let jaTem = false
        for (let g = 0; g < grupos.length; g++) {
            if (grupos[g].id === id) {
                grupos[g].quantidade = grupos[g].quantidade + 1
                if (nome !== '') {
                    grupos[g].nome = nome
                }
                jaTem = true
                break
            }
        }

        if (jaTem === false) {
            grupos.push({
                id: id,
                nome: nome,
                quantidade: 1,
            })
        }
    }

    return grupos
}

export const montarResumoPedido = (linhasDoStorage, produtosDaApi) => {
    let catalogo = []
    if (produtosDaApi instanceof Array) {
        catalogo = produtosDaApi
    }

    let blocos = agregarLinhasPorId(linhasDoStorage)
    let detalhes = []
    let avisos = []
    let subtotal = 0

    for (let b = 0; b < blocos.length; b++) {
        let bloco = blocos[b]
        let id = bloco.id
        let qtdNoCarrinho = bloco.quantidade
        let nomeSalvo = bloco.nome

        let produto = acharProdutoNoCatalogo(catalogo, id)

        // caso 1: api não tem esse produto
        if (produto === null) {
            detalhes.push({
                id: id,
                nomeArmazenado: nomeSalvo,
                produtoApi: null,
                valido: false,
                motivo: 'Produto não encontrado no catálogo',
                quantidadeCarrinho: qtdNoCarrinho,
                quantidadeCobrada: 0,
                subtotalLinha: 0,
            })
            continue
        }

        // caso 2: produto existe mas não dá pra comprar (esgotado ou flag)
        let podeComprar = true
        if (produto.disponivel !== true) {
            podeComprar = false
        }
        if (typeof produto.estoque !== 'number') {
            podeComprar = false
        } else if (produto.estoque <= 0) {
            podeComprar = false
        }

        if (podeComprar === false) {
            detalhes.push({
                id: id,
                nomeArmazenado: nomeSalvo,
                produtoApi: produto,
                valido: false,
                motivo: 'Produto indisponível ou sem estoque',
                quantidadeCarrinho: qtdNoCarrinho,
                quantidadeCobrada: 0,
                subtotalLinha: 0,
            })
            continue
        }

        // caso 3: dá pra comprar; talvez precise cortar a quantidade pelo estoque
        let estoque = produto.estoque
        let qtdQueVaiPagar = qtdNoCarrinho
        if (qtdQueVaiPagar > estoque) {
            qtdQueVaiPagar = estoque
        }

        if (qtdQueVaiPagar < qtdNoCarrinho) {
            avisos.push({
                id: id,
                texto: `Quantidade de "${produto.nome}" limitada ao estoque (${estoque} un.).`,
            })
        }

        let precoUnitario = 0
        if (typeof produto.valor === 'number') {
            precoUnitario = produto.valor
        }

        let totalDaLinha = precoUnitario * qtdQueVaiPagar
        subtotal = subtotal + totalDaLinha

        detalhes.push({
            id: id,
            nomeArmazenado: nomeSalvo,
            produtoApi: produto,
            valido: true,
            quantidadeCarrinho: qtdNoCarrinho,
            quantidadeCobrada: qtdQueVaiPagar,
            subtotalLinha: totalDaLinha,
        })
    }

    return {
        detalhes: detalhes,
        avisos: avisos,
        subtotal: subtotal,
    }
}
