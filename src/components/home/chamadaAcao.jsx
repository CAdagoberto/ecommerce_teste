import { Link } from 'react-router-dom'
import styles from './chamadaAcao.module.css'

const ChamadaAcao = ({ to = '/produtos', texto = 'Comprar agora' }) => (
    <section className={styles.cta} aria-label="Chamada para compra">
        <Link to={to} className={styles.link}>
            {texto}
        </Link>
    </section>
)

export default ChamadaAcao
