import { Link } from 'react-router-dom'
import styles from './chamadaAcao.module.css'

export default function ChamadaAcao({
    to = '/produtos',
    texto = 'Comprar agora',
}) {
    return (
        <section className={styles.cta} aria-label="Chamada para compra">
            <Link to={to} className={styles.link}>
                {texto}
            </Link>
        </section>
    )
}
