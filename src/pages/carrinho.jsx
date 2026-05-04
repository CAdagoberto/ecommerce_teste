import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './carrinho.module.css'
import {
    obterLinhasCarrinho,
    adicionarAoCarrinho,
    removerUmaUnidade,
    removerTodasUnidades,
    esvaziarCarrinho,
    EVENTO_CARRINHO_ATUALIZADO,
    CARRINHO_STORAGE_KEY,
} from '../utils/carrinhoStorage'
import { montarResumoPedido } from '../utils/carrinhoValidacao'

const URL_API = 'http://localhost:3000'

function formatarPreco(valor) {
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
        return 'R$ 0,00'
    }
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

export default function Carrinho() {
    const [linhasArmazenadas, setLinhasArmazenadas] = useState(function () {
        return obterLinhasCarrinho()
    })
    const [produtosApi, setProdutosApi] = useState([])
    const [carregandoCatalogo, setCarregandoCatalogo] = useState(false)
    const [erroApi, setErroApi] = useState('')

    const recarregarDoStorage = useCallback(function () {
        setLinhasArmazenadas(obterLinhasCarrinho())
    }, [])

    useEffect(
        function () {
            function aoAtualizar() {
                recarregarDoStorage()
            }
            function aoStorageExterno(evento) {
                if (
                    evento.key != null &&
                    evento.key !== CARRINHO_STORAGE_KEY
                ) {
                    return
                }
                aoAtualizar()
            }
            window.addEventListener(EVENTO_CARRINHO_ATUALIZADO, aoAtualizar)
            window.addEventListener('storage', aoStorageExterno)
            return function () {
                window.removeEventListener(
                    EVENTO_CARRINHO_ATUALIZADO,
                    aoAtualizar
                )
                window.removeEventListener('storage', aoStorageExterno)
            }
        },
        [recarregarDoStorage]
    )

    useEffect(
        function () {
            let cancelado = false

            if (linhasArmazenadas.length === 0) {
                queueMicrotask(function () {
                    if (cancelado) {
                        return
                    }
                    setProdutosApi([])
                    setErroApi('')
                    setCarregandoCatalogo(false)
                })
                return function () {
                    cancelado = true
                }
            }

            queueMicrotask(function () {
                if (cancelado) {
                    return
                }
                setCarregandoCatalogo(true)
                setErroApi('')
            })

            fetch(URL_API + '/produtos')
                .then(function (res) {
                    if (res.ok === false) {
                        throw new Error('catalogo')
                    }
                    return res.json()
                })
                .then(function (dados) {
                    if (cancelado === false) {
                        setProdutosApi(Array.isArray(dados) ? dados : [])
                        setErroApi('')
                    }
                })
                .catch(function () {
                    if (cancelado === false) {
                        setErroApi(
                            'Não foi possível validar o carrinho com o servidor. Inicie o JSON Server e tente de novo.'
                        )
                        setProdutosApi([])
                    }
                })
                .finally(function () {
                    if (cancelado === false) {
                        setCarregandoCatalogo(false)
                    }
                })

            return function () {
                cancelado = true
            }
        },
        [linhasArmazenadas]
    )

    const resumo =
        linhasArmazenadas.length === 0
            ? { detalhes: [], avisos: [], subtotal: 0 }
            : montarResumoPedido(linhasArmazenadas, produtosApi)

    const vazio = linhasArmazenadas.length === 0

    return (
        <main className={'container paginaComNav ' + styles.pagina}>
            <h1 className={styles.titulo}>Carrinho</h1>
            <p className={styles.subtitulo}>
                Os valores e disponibilidade vêm do catálogo (API), como num
                checkout real.
            </p>

            {vazio ? (
                <div className={styles.vazio}>
                    <p>Seu carrinho está vazio.</p>
                    <Link to="/produtos" className={styles.linkCatalogo}>
                        Ver produtos
                    </Link>
                </div>
            ) : (
                <>
                    {erroApi !== '' ? (
                        <p className={styles.mensagemErro}>{erroApi}</p>
                    ) : null}

                    {resumo.avisos.length > 0 && erroApi === '' ? (
                        <div className={styles.avisos}>
                            <p className={styles.avisosTitulo}>
                                Ajustes na simulação
                            </p>
                            <ul>
                                {resumo.avisos.map(function (a, indice) {
                                    return (
                                        <li key={a.id + '-' + indice}>
                                            {a.texto}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ) : null}

                    <div className={styles.gridResumo}>
                        <div className={styles.lista}>
                            {carregandoCatalogo && erroApi === '' ? (
                                <p>Validando itens com o catálogo…</p>
                            ) : null}

                            {resumo.detalhes.map(function (linha) {
                                const p = linha.produtoApi
                                const img = p != null ? p.img : null
                                const nomeExibir =
                                    p != null ? p.nome : linha.nomeArmazenado

                                return (
                                    <article
                                        key={linha.id}
                                        className={
                                            styles.cartaoLinha +
                                            (linha.valido === false
                                                ? ' ' + styles.cartaoLinhaInvalida
                                                : '')
                                        }
                                    >
                                        <div className={styles.miniImg}>
                                            {img != null ? (
                                                <img
                                                    src={img}
                                                    alt=""
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div
                                                    className={
                                                        styles.placeholderImg
                                                    }
                                                >
                                                    Sem imagem
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.infoLinha}>
                                            <h2 className={styles.nomeProduto}>
                                                {nomeExibir}
                                            </h2>
                                            {p != null &&
                                            linha.nomeArmazenado !== p.nome ? (
                                                <p
                                                    className={
                                                        styles.nomeArmazenado
                                                    }
                                                >
                                                    Salvo como:{' '}
                                                    {linha.nomeArmazenado}
                                                </p>
                                            ) : null}

                                            {linha.valido === true ? (
                                                <p className={styles.meta}>
                                                    {formatarPreco(p.valor)} cada
                                                    · estoque {p.estoque} un.
                                                </p>
                                            ) : null}

                                            {linha.valido === false ? (
                                                <p
                                                    className={
                                                        styles.motivoInvalido
                                                    }
                                                >
                                                    {linha.motivo} — este item
                                                    não entra no total.
                                                </p>
                                            ) : null}
                                        </div>

                                        <div className={styles.acoesLinha}>
                                            {linha.valido === true ? (
                                                <>
                                                    <div
                                                        className={
                                                            styles.controlesQtd
                                                        }
                                                    >
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.btnQtd
                                                            }
                                                            aria-label="Remover uma unidade"
                                                            onClick={function () {
                                                                removerUmaUnidade(
                                                                    linha.id
                                                                )
                                                                recarregarDoStorage()
                                                            }}
                                                        >
                                                            −
                                                        </button>
                                                        <span
                                                            className={
                                                                styles.qtdValor
                                                            }
                                                        >
                                                            {
                                                                linha.quantidadeCarrinho
                                                            }
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.btnQtd
                                                            }
                                                            aria-label="Adicionar uma unidade"
                                                            disabled={
                                                                linha.quantidadeCarrinho >=
                                                                p.estoque
                                                            }
                                                            onClick={function () {
                                                                adicionarAoCarrinho(
                                                                    {
                                                                        id: linha.id,
                                                                        nome: p.nome,
                                                                    }
                                                                )
                                                                recarregarDoStorage()
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <span
                                                        className={
                                                            styles.precoLinha
                                                        }
                                                    >
                                                        {formatarPreco(
                                                            linha.subtotalLinha
                                                        )}
                                                    </span>
                                                </>
                                            ) : (
                                                <span
                                                    className={
                                                        styles.precoLinha
                                                    }
                                                >
                                                    —
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                className={styles.btnRemover}
                                                onClick={function () {
                                                    removerTodasUnidades(
                                                        linha.id
                                                    )
                                                    recarregarDoStorage()
                                                }}
                                            >
                                                Remover do carrinho
                                            </button>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>

                        <aside className={styles.painelResumo}>
                            <h2>Resumo do pedido</h2>
                            <div className={styles.linhaResumo}>
                                <span>Itens válidos</span>
                                <span>
                                    {resumo.detalhes.filter(function (d) {
                                        return d.valido === true
                                    }).length}{' '}
                                    tipo(s)
                                </span>
                            </div>
                            <div className={styles.total}>
                                <span>Total estimado</span>
                                <span className={styles.totalValor}>
                                    {erroApi !== ''
                                        ? '—'
                                        : formatarPreco(resumo.subtotal)}
                                </span>
                            </div>
                            <p className={styles.notaSimulacao}>
                                Total calculado só com itens validados na API
                                (preço atual, disponibilidade e estoque). Nada
                                monetário fica salvo no navegador.
                            </p>
                            <button
                                type="button"
                                className={styles.btnEsvaziar}
                                onClick={function () {
                                    esvaziarCarrinho()
                                    recarregarDoStorage()
                                }}
                            >
                                Esvaziar carrinho
                            </button>
                        </aside>
                    </div>
                </>
            )}
        </main>
    )
}
