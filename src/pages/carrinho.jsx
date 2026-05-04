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

const formatarPreco = valor => {
    if (typeof valor !== 'number' || Number.isNaN(valor)) {
        return 'R$ 0,00'
    }
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

const Carrinho = () => {
    const [linhasArmazenadas, setLinhasArmazenadas] = useState(() =>
        obterLinhasCarrinho()
    )
    const [produtosApi, setProdutosApi] = useState([])
    const [carregandoCatalogo, setCarregandoCatalogo] = useState(false)
    const [erroApi, setErroApi] = useState('')
    const [mensagemPedidoFinalizado, setMensagemPedidoFinalizado] = useState('')

    const recarregarDoStorage = useCallback(() => {
        setLinhasArmazenadas(obterLinhasCarrinho())
    }, [])

    useEffect(() => {
        const aoAtualizar = () => {
            recarregarDoStorage()
        }
        const aoStorageExterno = evento => {
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
        return () => {
            window.removeEventListener(
                EVENTO_CARRINHO_ATUALIZADO,
                aoAtualizar
            )
            window.removeEventListener('storage', aoStorageExterno)
        }
    }, [recarregarDoStorage])

    useEffect(() => {
        let cancelado = false

        const carregarCatalogo = async () => {
            if (linhasArmazenadas.length === 0) {
                setProdutosApi([])
                setErroApi('')
                setCarregandoCatalogo(false)
                return
            }

            setCarregandoCatalogo(true)
            setErroApi('')

            try {
                let res = await fetch(`${URL_API}/produtos`)
                if (cancelado === true) {
                    return
                }

                if (res.ok === false) {
                    setErroApi(
                        'Não foi possível validar o carrinho com o servidor. Inicie o JSON Server e tente de novo.'
                    )
                    setProdutosApi([])
                    return
                }

                let dados = await res.json()
                setProdutosApi(Array.isArray(dados) ? dados : [])
                setErroApi('')
            } catch {
                if (cancelado === false) {
                    setErroApi(
                        'Não foi possível validar o carrinho com o servidor. Inicie o JSON Server e tente de novo.'
                    )
                    setProdutosApi([])
                }
            } finally {
                if (cancelado === false) {
                    setCarregandoCatalogo(false)
                }
            }
        }

        carregarCatalogo()

        return () => {
            cancelado = true
        }
    }, [linhasArmazenadas])

    const resumo =
        linhasArmazenadas.length === 0
            ? { detalhes: [], avisos: [], subtotal: 0 }
            : montarResumoPedido(linhasArmazenadas, produtosApi)

    const vazio = linhasArmazenadas.length === 0

    const qtdTiposValidos = resumo.detalhes.filter(d => d.valido === true)
        .length
    const podeFinalizarPedido =
        erroApi === '' &&
        carregandoCatalogo === false &&
        resumo.subtotal > 0 &&
        qtdTiposValidos > 0

    const FinalizarPedido = () => {
        if (podeFinalizarPedido === false) {
            return
        }
        let totalTexto = formatarPreco(resumo.subtotal)
        let confirma = window.confirm(
            `Confirma o pedido no valor de ${totalTexto}?\n\n(Isto é apenas uma simulação — não há pagamento real.)`
        )
        if (confirma === false) {
            return
        }
        esvaziarCarrinho()
        recarregarDoStorage()
        setMensagemPedidoFinalizado(
            `Pedido criado com sucesso. Total: ${totalTexto}. Obrigado pela preferência!`
        )
    }

    return (
        <main className={`container paginaComNav ${styles.pagina}`}>
            <h1 className={styles.titulo}>Carrinho</h1>
            <p className={styles.subtitulo}>
                Veja o resumo do seu pedido antes de finalizar a compra.
            </p>

            {mensagemPedidoFinalizado !== '' ? (
                <div
                    className={styles.pedidoSucesso}
                    role="status"
                    aria-live="polite"
                >
                    <p className={styles.pedidoSucessoTexto}>
                        {mensagemPedidoFinalizado}
                    </p>
                    <div className={styles.pedidoSucessoAcoes}>
                        <button
                            type="button"
                            className={styles.btnFecharAviso}
                            onClick={() => setMensagemPedidoFinalizado('')}
                        >
                            Fechar aviso
                        </button>
                        <Link
                            to="/produtos"
                            className={styles.linkAposPedido}
                            onClick={() => setMensagemPedidoFinalizado('')}
                        >
                            Continuar comprando
                        </Link>
                    </div>
                </div>
            ) : null}

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
                                {resumo.avisos.map((a, indice) => (
                                    <li key={`${a.id}-${indice}`}>
                                        {a.texto}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    <div className={styles.gridResumo}>
                        <div className={styles.lista}>
                            {carregandoCatalogo && erroApi === '' ? (
                                <p>Validando itens com o catálogo…</p>
                            ) : null}

                            {resumo.detalhes.map(linha => {
                                const p = linha.produtoApi
                                const img = p != null ? p.img : null
                                const nomeExibir =
                                    p != null ? p.nome : linha.nomeArmazenado

                                return (
                                    <article
                                        key={linha.id}
                                        className={`${styles.cartaoLinha}${
                                            linha.valido === false
                                                ? ` ${styles.cartaoLinhaInvalida}`
                                                : ''
                                        }`}
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
                                                    {formatarPreco(p.valor)}{' '}
                                                    cada · estoque {p.estoque}{' '}
                                                    un.
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
                                                            onClick={() => {
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
                                                            onClick={() => {
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
                                                onClick={() => {
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
                                    {
                                        resumo.detalhes.filter(
                                            d => d.valido === true
                                        ).length
                                    }{' '}
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
                                Confira o total acima. Ao finalizar, o pedido é
                                só uma simulação (sem pagamento nem entrega
                                real).
                            </p>
                            <button
                                type="button"
                                className={styles.btnFinalizar}
                                disabled={podeFinalizarPedido === false}
                                title={
                                    podeFinalizarPedido === false
                                        ? 'Valide o carrinho com a API e tenha itens com total maior que zero para finalizar.'
                                        : undefined
                                }
                                onClick={FinalizarPedido}
                            >
                                Finalizar pedido
                            </button>
                            <button
                                type="button"
                                className={styles.btnEsvaziar}
                                onClick={() => {
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

export default Carrinho
