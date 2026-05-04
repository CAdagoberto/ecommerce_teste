import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaShoppingCart } from 'react-icons/fa'
import styles from './navbar.module.css'
import {
    contarUnidadesNoCarrinho,
    EVENTO_CARRINHO_ATUALIZADO,
    CARRINHO_STORAGE_KEY,
} from '../utils/carrinhoStorage'

// lista dos links que aparecem no menu (desktop e mobile)
const linksDoMenu = [
    { to: '/', texto: 'Início' },
    { to: '/produtos', texto: 'Produtos' },
]

const Navbar = () => {
    const [qtdCarrinho, setQtdCarrinho] = useState(() =>
        contarUnidadesNoCarrinho()
    )

    useEffect(() => {
        const atualizarContagem = () => {
            setQtdCarrinho(contarUnidadesNoCarrinho())
        }
        const aoStorageExterno = evento => {
            if (
                evento.key != null &&
                evento.key !== CARRINHO_STORAGE_KEY
            ) {
                return
            }
            atualizarContagem()
        }
        window.addEventListener(EVENTO_CARRINHO_ATUALIZADO, atualizarContagem)
        window.addEventListener('storage', aoStorageExterno)
        return () => {
            window.removeEventListener(
                EVENTO_CARRINHO_ATUALIZADO,
                atualizarContagem
            )
            window.removeEventListener('storage', aoStorageExterno)
        }
    }, [])

    return (
        <header className={styles.cabecalho}>
            <div className={styles.barra}>
                <nav className={styles.nav} aria-label="Principal">
                    <Link to="/" className={styles.logo}>
                        Aurora Market
                    </Link>

                    <div className={styles.painelLinks}>
                        {linksDoMenu.map(item => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={props => {
                                    if (props.isActive === true) {
                                        return `${styles.navLink} ${styles.navLinkAtivo}`
                                    }
                                    return styles.navLink
                                }}
                            >
                                {item.texto}
                            </NavLink>
                        ))}
                    </div>

                    <div className={styles.acoes}>
                        <Link
                            to="/carrinho"
                            className={styles.carrinho}
                            aria-label={
                                qtdCarrinho > 0
                                    ? `Ver carrinho, ${qtdCarrinho} itens`
                                    : 'Ver carrinho'
                            }
                        >
                            <FaShoppingCart
                                className={styles.iconeNav}
                                size={22}
                                aria-hidden="true"
                            />
                            {qtdCarrinho > 0 ? (
                                <span className={styles.badgeCarrinho}>
                                    {qtdCarrinho > 99 ? '99+' : qtdCarrinho}
                                </span>
                            ) : null}
                        </Link>

                        <span
                            className={styles.iconeMenuDecorativo}
                            aria-hidden="true"
                        >
                            <FaBars
                                className={styles.iconeNav}
                                size={22}
                                aria-hidden="true"
                            />
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
