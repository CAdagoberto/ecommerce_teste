import styles from './cardProduto.module.css'

export default function CardProduto() {
    return (
        <article className={styles.cardProduto}>
            <div className={styles.imgProduto} aria-hidden />
            <div className={styles.corpoCard}>
                <h3 className={styles.titulo}>Nike Running Shoe</h3>
                <div className={styles.etiquetas}>
                    <span className={styles.etiqueta}>EU38</span>
                    <span className={styles.etiqueta}>BLACK/WHITE</span>
                </div>
                <p className={styles.descricao}>
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className={styles.rodape}>
                    <div className={styles.blocoPreco}>
                        <span className={styles.rotuloPreco}>Preço</span>
                        <span className={styles.valorPreco}>R$69.99</span>
                    </div>
                    <button type="button" className={styles.botaoAdicionar}>
                       Adicionar ao carrinho
                    </button>
                </div>
            </div>
        </article>
    )
}
