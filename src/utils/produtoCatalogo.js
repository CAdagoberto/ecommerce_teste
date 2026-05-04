// coisas de produto que a pagina e os cards usam (sem React)

export const montarEtiquetas = produto => {
    let lista = []
    if (produto.etiquetaTamanho) {
        lista.push({ id: `${produto.id}-tam`, nome: produto.etiquetaTamanho })
    }
    if (produto.etiquetaVariacao) {
        lista.push({ id: `${produto.id}-var`, nome: produto.etiquetaVariacao })
    }
    return lista
}

// filtra por categoria e nome, depois ordena por preço se pedir
export const filtrarEOrdenarProdutos = (lista, opcoes) => {
    let textoBusca = opcoes.textoBusca
    let categoriaEscolhida = opcoes.categoriaEscolhida
    let ordenacao = opcoes.ordenacao

    if (!Array.isArray(lista)) {
        return []
    }

    let resultado = []

    for (let i = 0; i < lista.length; i++) {
        let p = lista[i]

        if (categoriaEscolhida !== '' && p.categoriaId !== categoriaEscolhida) {
            continue
        }

        if (textoBusca.trim() !== '') {
            let nomeMinusculo = p.nome.toLowerCase()
            let buscaMinusculo = textoBusca.trim().toLowerCase()
            if (nomeMinusculo.includes(buscaMinusculo) === false) {
                continue
            }
        }

        resultado.push(p)
    }

    if (ordenacao === 'menor') {
        resultado = resultado.slice().sort((a, b) => {
            return a.valor - b.valor
        })
    }
    if (ordenacao === 'maior') {
        resultado = resultado.slice().sort((a, b) => {
            return b.valor - a.valor
        })
    }

    return resultado
}
