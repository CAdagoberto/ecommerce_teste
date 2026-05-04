import styles from './blocoCategoria.module.css'
import CardProduto from './cardProduto'

export default function BlocoCategoria({ titulo, descricao, produtos, verTodos = 'Ver todos' }) {
    return (
        <>
            <div className={styles.categoria}>
                           <div className={styles.categoriaTitulo}>
                                <h2>{titulo}</h2>
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