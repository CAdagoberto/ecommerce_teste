import styles from './blocoCategoria.module.css'
import CardProduto from './cardProduto'

export default function BlocoCategoria({ titulo, descricao, produtos, verTodos }) {
    return (
        <>
            <div className={styles.categoria}>
                           <div className={styles.categoriaTitulo}>
                                <h3>{titulo}</h3>
                                <p>{descricao}</p>
                                <button>{verTodos}</button> 
                           </div>
                          
                            <div className={styles.produtosCategoria}>
                                {produtos.map((produto) => (
                                    <CardProduto key={produto.id} {...produto} />
                                ))}
                            </div>
                </div>

        </>
    )
}