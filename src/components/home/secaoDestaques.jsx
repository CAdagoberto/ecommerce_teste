import styles from './secaoDestaques.module.css'

export default function SecaoDestaques({ titulo = 'Produtos em destaque', children }) {
    return (
        <section className={styles.destaques} aria-labelledby="titulo-destaques">
            <h2 id="titulo-destaques" className={styles.titulo} style={{ marginBottom: '20px' }}>
                {titulo}
            </h2>
            <div className={styles.grade}>{children}</div>
        </section>
    )
}
