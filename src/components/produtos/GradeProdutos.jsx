import CardProduto from '../cardProduto'
import SkeletonCardProduto from '../SkeletonCardProduto'
import styles from './GradeProdutos.module.css'
import { montarEtiquetas } from '../../utils/produtoCatalogo'

export default function GradeProdutos(props) {
    let carregando = props.carregando
    let erroProdutos = props.erroProdutos
    let produtosFiltrados = props.produtosFiltrados

    if (carregando === true) {
        let placeholders = [0, 1, 2, 3, 4, 5, 6, 7]
        return (
            <div
                className={styles.gridProdutos}
                aria-busy="true"
                aria-label="Carregando produtos"
            >
                {placeholders.map(function (n) {
                    return <SkeletonCardProduto key={'sk-produto-' + n} />
                })}
            </div>
        )
    }

    if (erroProdutos !== '') {
        return (
            <p className={styles.mensagemVazia}>
                Corrija o problema da API e atualize a página para ver os
                produtos.
            </p>
        )
    }

    return (
        <div className={styles.gridProdutos}>
            {produtosFiltrados.length === 0 ? (
                <p className={styles.mensagemVazia}>
                    Nenhum produto encontrado com esses filtros.
                </p>
            ) : (
                produtosFiltrados.map(function (produto) {
                    return (
                        <CardProduto
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            descricao={produto.descricao}
                            valor={produto.valor}
                            img={produto.img}
                            estoque={produto.estoque}
                            etiquetas={montarEtiquetas(produto)}
                            disponivel={produto.disponivel}
                        />
                    )
                })
            )}
        </div>
    )
}
