import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CardProduto from '../components/cardProduto'
import { montarEtiquetas } from '../utils/produtoCatalogo'
import { adicionarAoCarrinho } from '../utils/carrinhoStorage'
import styles from './produto.module.css'

const URL_API = 'http://localhost:3000'

/** JSON Server v1 pode devolver `id` como string; o db usa número. */
function idProdutoValidoNaResposta(valor) {
    if (valor == null || valor === '') {
        return false
    }
    if (typeof valor === 'number' && Number.isFinite(valor)) {
        return true
    }
    if (typeof valor === 'string' && String(valor).trim() !== '') {
        return Number.isFinite(Number(valor))
    }
    return false
}

function normalizarIdProduto(valor) {
    return typeof valor === 'number' ? valor : Number(valor)
}

function formatarPreco(valor) {
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
        return '—'
    }
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

function produtoPodeComprar(produto) {
    if (produto == null) {
        return false
    }
    if (produto.disponivel !== true) {
        return false
    }
    if (typeof produto.estoque === 'number' && produto.estoque <= 0) {
        return false
    }
    return true
}

export default function Produto() {
    const { id } = useParams()
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [produto, setProduto] = useState(null)
    const [nomeCategoria, setNomeCategoria] = useState('')
    const [relacionados, setRelacionados] = useState([])

    useEffect(
        function () {
            let cancelado = false

            async function carregar() {
                setCarregando(true)
                setErro('')
                setProduto(null)
                setNomeCategoria('')
                setRelacionados([])

                if (id == null || String(id).trim() === '') {
                    setErro('produto_nao_encontrado')
                    setCarregando(false)
                    return
                }

                try {
                    const resProduto = await fetch(
                        URL_API + '/produtos/' + encodeURIComponent(id)
                    )
                    const resCategorias = await fetch(URL_API + '/categorias')

                    if (cancelado) {
                        return
                    }

                    if (resProduto.ok === false) {
                        setErro('produto_nao_encontrado')
                        setCarregando(false)
                        return
                    }

                    const dadosProduto = await resProduto.json()
                    if (
                        dadosProduto == null ||
                        idProdutoValidoNaResposta(dadosProduto.id) === false
                    ) {
                        setErro('produto_nao_encontrado')
                        setCarregando(false)
                        return
                    }

                    const produtoApi = {
                        ...dadosProduto,
                        id: normalizarIdProduto(dadosProduto.id),
                    }

                    let listaCategorias = []
                    if (resCategorias.ok === true) {
                        listaCategorias = await resCategorias.json()
                    }

                    const cat = Array.isArray(listaCategorias)
                        ? listaCategorias.find(function (c) {
                              return c.id === produtoApi.categoriaId
                          })
                        : null

                    const resMesmaCategoria = await fetch(
                        URL_API +
                            '/produtos?categoriaId=' +
                            encodeURIComponent(produtoApi.categoriaId)
                    )
                    let listaMesma = []
                    if (resMesmaCategoria.ok === true) {
                        listaMesma = await resMesmaCategoria.json()
                    }

                    if (cancelado) {
                        return
                    }

                    const outros = Array.isArray(listaMesma)
                        ? listaMesma.filter(function (p) {
                              return normalizarIdProduto(p.id) !== produtoApi.id
                          })
                        : []

                    setProduto(produtoApi)
                    setNomeCategoria(cat != null ? cat.nome : 'Categoria')
                    setRelacionados(outros.slice(0, 4))
                    setErro('')
                } catch (e) {
                    console.error('Erro ao carregar produto:', e)
                    if (cancelado === false) {
                        setErro('network')
                    }
                } finally {
                    if (cancelado === false) {
                        setCarregando(false)
                    }
                }
            }

            carregar()

            return function () {
                cancelado = true
            }
        },
        [id]
    )

    useEffect(
        function () {
            if (produto != null && produto.nome != null) {
                document.title = produto.nome + ' · Nome Loja'
            } else {
                document.title = 'Produto · Nome Loja'
            }
            return function () {
                document.title = 'Nome Loja'
            }
        },
        [produto]
    )

    if (carregando === true) {
        return (
            <main className={'container paginaComNav ' + styles.pagina}>
                <div className={styles.skeletonPagina} aria-busy="true">
                    <div
                        className={styles.skBloco + ' ' + styles.skImagem}
                    />
                    <div>
                        <div
                            className={
                                styles.skBloco +
                                ' ' +
                                styles.skTitulo +
                                ' ' +
                                styles.skLinha
                            }
                        />
                        <div
                            className={
                                styles.skBloco +
                                ' ' +
                                styles.skLinha +
                                ' ' +
                                styles.skLinhaMedia
                            }
                        />
                        <div
                            className={
                                styles.skBloco +
                                ' ' +
                                styles.skLinha +
                                ' ' +
                                styles.skLinhaCurta
                            }
                        />
                        <div
                            className={
                                styles.skBloco +
                                ' ' +
                                styles.skPreco +
                                ' ' +
                                styles.skLinha
                            }
                        />
                    </div>
                </div>
            </main>
        )
    }

    if (erro === 'produto_nao_encontrado') {
        return (
            <main className={'container paginaComNav ' + styles.pagina}>
                <nav className={styles.breadcrumb} aria-label="Navegação">
                    <Link to="/">Início</Link>
                    <span className={styles.sep}>/</span>
                    <Link to="/produtos">Produtos</Link>
                    <span className={styles.sep}>/</span>
                    <span>Indisponível</span>
                </nav>
                <p className={styles.mensagemErro}>
                    Produto não encontrado. Verifique o link ou volte ao
                    catálogo.
                </p>
                <p className={styles.acaoCentro}>
                    <Link to="/produtos" className={styles.linkCatalogo}>
                        Ver todos os produtos
                    </Link>
                </p>
            </main>
        )
    }

    if (erro === 'network') {
        return (
            <main className={'container paginaComNav ' + styles.pagina}>
                <nav className={styles.breadcrumb} aria-label="Navegação">
                    <Link to="/">Início</Link>
                    <span className={styles.sep}>/</span>
                    <Link to="/produtos">Produtos</Link>
                </nav>
                <p className={styles.mensagemErro}>
                    Não foi possível carregar os dados. Confira se o JSON Server
                    está rodando (por exemplo:{' '}
                    <code style={{ fontSize: '0.9em' }}>npx json-server dbTeste.json</code>
                    ) e atualize a página.
                </p>
            </main>
        )
    }

    if (produto == null) {
        return null
    }

    const podeComprar = produtoPodeComprar(produto)
    const etiquetas = montarEtiquetas(produto)

    return (
        <main className={'container paginaComNav ' + styles.pagina}>
            <nav className={styles.breadcrumb} aria-label="Navegação">
                <Link to="/">Início</Link>
                <span className={styles.sep}>/</span>
                <Link to="/produtos">Produtos</Link>
                <span className={styles.sep}>/</span>
                <span aria-current="page">{produto.nome}</span>
            </nav>

            <article className={styles.gridPrincipal}>
                <div className={styles.areaImagem}>
                    <img src={produto.img} alt={produto.nome} />
                </div>

                <div>
                    <div className={styles.cabecalhoProduto}>
                        <h1 className={styles.titulo}>{produto.nome}</h1>
                        <span
                            className={
                                podeComprar
                                    ? styles.pillEstoque
                                    : styles.pillEstoqueOff
                            }
                        >
                            {podeComprar ? 'Disponível' : 'Indisponível'}
                        </span>
                    </div>

                    <div className={styles.metaLinha}>
                        <span>
                            Categoria:{' '}
                            <span className={styles.metaDestaque}>
                                {nomeCategoria}
                            </span>
                        </span>
                        <span>
                            SKU:{' '}
                            <span className={styles.metaDestaque}>
                                {produto.sku}
                            </span>
                        </span>
                        {typeof produto.estoque === 'number' ? (
                            <span>
                                Estoque:{' '}
                                <span className={styles.metaDestaque}>
                                    {produto.estoque} un.
                                </span>
                            </span>
                        ) : null}
                    </div>

                    {etiquetas.length > 0 ? (
                        <div className={styles.etiquetas}>
                            {etiquetas.map(function (etiqueta) {
                                return (
                                    <span
                                        className={styles.etiqueta}
                                        key={etiqueta.id}
                                    >
                                        {etiqueta.nome}
                                    </span>
                                )
                            })}
                        </div>
                    ) : null}

                    <p className={styles.descricao}>{produto.descricao}</p>

                    <div className={styles.precoBloco}>
                        <span className={styles.rotuloPreco}>Preço</span>
                        <span className={styles.preco}>
                            {formatarPreco(produto.valor)}
                        </span>
                    </div>

                    <div className={styles.acoes}>
                        <button
                            type="button"
                            className={styles.botaoCarrinho}
                            disabled={podeComprar === false}
                            onClick={function () {
                                if (podeComprar === false) {
                                    return
                                }
                                adicionarAoCarrinho({
                                    id: produto.id,
                                    nome: produto.nome,
                                })
                            }}
                        >
                            Adicionar ao carrinho
                        </button>
                        <Link
                            to="/produtos"
                            className={styles.linkCatalogo}
                        >
                            Continuar comprando
                        </Link>
                    </div>
                </div>
            </article>

            {relacionados.length > 0 ? (
                <section
                    className={styles.secaoRelacionados}
                    aria-labelledby="titulo-relacionados"
                >
                    <h2 id="titulo-relacionados" className={styles.tituloSecao}>
                        Você também pode gostar
                    </h2>
                    <div className={styles.gridRelacionados}>
                        {relacionados.map(function (p) {
                            return (
                                <CardProduto
                                    key={p.id}
                                    id={p.id}
                                    nome={p.nome}
                                    descricao={p.descricao}
                                    valor={p.valor}
                                    img={p.img}
                                    estoque={p.estoque}
                                    etiquetas={montarEtiquetas(p)}
                                    disponivel={p.disponivel}
                                />
                            )
                        })}
                    </div>
                </section>
            ) : null}
        </main>
    )
}
