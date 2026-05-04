import { Link } from 'react-router-dom'
import styles from './cardProduto.module.css'
import { adicionarAoCarrinho } from '../utils/carrinhoStorage'



export default function CardProduto(props) {
    let id = props.id
    let nome = props.nome
    let descricao = props.descricao
    let valor = props.valor
    let img = props.img
    let estoque = props.estoque
    let disponivel = props.disponivel

    let etiquetas = props.etiquetas
    if (etiquetas == null) {
        etiquetas = []
    }

    

    let urlDoProduto = '/produto/' + id

    if (typeof estoque === 'number') {
        if (estoque <= 0) {
            disponivel = false
        }
    }

    function aoClicarAdicionar(evento) {
        evento.preventDefault()
        evento.stopPropagation()
        if (disponivel === false) {
            return
        }
        adicionarAoCarrinho({ id: id, nome: nome })
    }

    return (
        <article className={styles.cardProduto}>
            <Link
                to={urlDoProduto}
                className={styles.areaMidia}
                aria-label={'Ver detalhes de ' + nome}
            >
                <div className={styles.imgProduto}>
                    <img src={img} alt="" loading="lazy" decoding="async" />
                </div>
            </Link>

            <div className={styles.corpoCard}>
                <div className={styles.linhaTitulo}>
                    <h3 className={styles.titulo}>
                        <Link to={urlDoProduto} className={styles.tituloLink}>
                            {nome}
                        </Link>
                    </h3>

                    {typeof estoque === 'number' ? (
                        <span
                            className={
                                disponivel
                                    ? styles.Estoque
                                    : styles.EstoqueOff
                            }
                        >
                            {disponivel ? 'Disponível' : 'Esgotado'}
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

                <p className={styles.descricao}>{descricao}</p>

                <div className={styles.rodape}>
                    <div className={styles.blocoPreco}>
                        <span className={styles.rotuloPreco}>Preço</span>
                        <span className={styles.valorPreco}>R$ {valor}</span>
                    </div>

                    <div className={styles.linhaBotoes}>
                        <button
                            type="button"
                            className={styles.botaoCarrinho}
                            disabled={disponivel === false}
                            onClick={aoClicarAdicionar}
                        >
                            Adicionar ao carrinho
                        </button>
                        <Link
                            to={urlDoProduto}
                            className={styles.botaoDetalhes}>
                            Ver detalhes
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}
