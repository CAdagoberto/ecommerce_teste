import { Link } from 'react-router-dom'
import styles from './navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/produto/1">Produto</Link>
        </nav>
    )
}
