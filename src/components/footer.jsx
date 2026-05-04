import { Link } from 'react-router-dom'
import styles from './footer.module.css'

const linksRapidos = [
    { to: '/', label: 'Início' },
    { to: '/produtos', label: 'Produtos' },
    { to: '/carrinho', label: 'Carrinho' },
]

const NOME_LOJA = 'Aurora Market'

const Footer = () => {
    const ano = new Date().getFullYear()

    return (
        <footer className={styles.rodape}>
            <div className={`container ${styles.corpo}`}>
                <div className={styles.blocoLinks}>
                    <p className={styles.etiqueta}>Links rápidos</p>
                    <nav aria-label="Links rápidos do rodapé">
                        <ul className={styles.lista}>
                            {linksRapidos.map(item => (
                                <li key={item.to}>
                                    <Link to={item.to} className={styles.link}>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className={styles.faixaDireitos}>
                <div className={`container ${styles.linhaDireitos}`}>
                    <p className={styles.textoDireitos}>
                        © {ano} {NOME_LOJA}. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
