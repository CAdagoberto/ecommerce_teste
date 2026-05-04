import styles from './cardProduto.module.css'

export default function CardProduto({nome, descricao, valor, etiquetas = [], img, estoque}) {
    return (
        <article className={styles.cardProduto}>
            <div className={styles.imgProduto} aria-hidden>
                <img src={img} alt={nome} />
            </div>
            <div className={styles.corpoCard}>
                <h3 className={styles.titulo}>{nome}</h3>
                <div className={styles.etiquetas}>
                    {etiquetas.map((etiqueta) => (
                        <span className={styles.etiqueta} key={etiqueta.id}>{etiqueta.nome}</span>
                    ))}
                </div>
                <p className={styles.descricao}>{descricao}</p>
                <div className={styles.rodape}>
                    <div className={styles.blocoPreco}>
                        <span className={styles.rotuloPreco}>Preço</span>
                        <span className={styles.valorPreco}>R${valor}</span>
                    </div>
                    <button type="button" className={styles.botaoAdicionar}>
                       Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </article>
    )
}
