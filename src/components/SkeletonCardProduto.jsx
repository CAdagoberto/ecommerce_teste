import styles from './SkeletonCardProduto.module.css'

const SkeletonCardProduto = () => (
    <div className={styles.wrap} aria-hidden="true">
        <div className={styles.img} />
        <div className={styles.corpo}>
            <div className={`${styles.linha} ${styles.linhaMedia}`} />
            <div className={`${styles.linha} ${styles.linhaCurta}`} />
            <div className={`${styles.linha} ${styles.linhaAlta}`} />
            <div className={styles.preco} />
            <div className={styles.botoes}>
                <div className={styles.btnFake} />
                <div className={styles.btnFake} />
            </div>
        </div>
    </div>
)

export default SkeletonCardProduto
