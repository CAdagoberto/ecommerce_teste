import CardProduto from '../cardProduto'
import styles from './GradeProdutos.module.css'
import { montarEtiquetas } from '../../utils/produtoCatalogo'

export default function GradeProdutos(props) {
    let carregando = props.carregando
    let erroProdutos = props.erroProdutos
    let produtosFiltrados = props.produtosFiltrados

    if (carregando === true) {
        return <p>Carregando...</p>
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
