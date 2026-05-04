import styles from './blocoCategoria.module.css'
import CardProduto from './cardProduto'
import { Link } from 'react-router-dom'

const BlocoCategoria = ({
    titulo,
    descricao,
    produtos,
    verTodos = 'Ver todos',
}) => (
    <>
        <div className={styles.categoria}>
            <div className={styles.categoriaTitulo}>
                <h2>{titulo}</h2>
                <p>{descricao}</p>
                <Link to="/produtos" className={styles.linkVerTodos}>{verTodos}</Link>
            </div>

            <div className={styles.produtosCategoria}>
                {produtos.map(produto => (
                    <CardProduto key={produto.id} {...produto} />
                ))}
            </div>
        </div>
    </>
)

export default BlocoCategoria
