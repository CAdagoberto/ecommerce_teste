import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FaBars, FaShoppingCart, FaTimes } from 'react-icons/fa'
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

export default function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false)
    const [qtdCarrinho, setQtdCarrinho] = useState(contarUnidadesNoCarrinho)

    // abre ou fecha o menu do celular
    function abrirFecharMenu() {
        if (menuAberto === true) {
            setMenuAberto(false)
        } else {
            setMenuAberto(true)
        }
    }

    function fecharMenu() {
        setMenuAberto(false)
    }

    // quando o menu ta aberto no celular, nao deixa rolar a pagina de baixo
    // e fecha se apertar ESC
    useEffect(() => {
        if (menuAberto === false) {
            return
        }

        function quandoApertarTecla(evento) {
            if (evento.key === 'Escape') {
                setMenuAberto(false)
            }
        }

        document.addEventListener('keydown', quandoApertarTecla)
        document.body.style.overflow = 'hidden'

        return function limpar() {
            document.removeEventListener('keydown', quandoApertarTecla)
            document.body.style.overflow = ''
        }
    }, [menuAberto])

    useEffect(
        function () {
            function atualizarContagem() {
                setQtdCarrinho(contarUnidadesNoCarrinho())
            }
            function aoStorageExterno(evento) {
                if (
                    evento.key != null &&
                    evento.key !== CARRINHO_STORAGE_KEY
                ) {
                    return
                }
                atualizarContagem()
            }
            window.addEventListener(
                EVENTO_CARRINHO_ATUALIZADO,
                atualizarContagem
            )
            window.addEventListener('storage', aoStorageExterno)
            return function () {
                window.removeEventListener(
                    EVENTO_CARRINHO_ATUALIZADO,
                    atualizarContagem
                )
                window.removeEventListener('storage', aoStorageExterno)
            }
        },
        []
    )

    let classPainel = styles.painelLinks
    if (menuAberto === true) {
        classPainel = classPainel + ' ' + styles.painelLinksAberto
    }

    return (
        <header className={styles.cabecalho}>
            <div className={styles.barra}>
                <nav className={styles.nav} aria-label="Principal">
                    <Link to="/" className={styles.logo} onClick={fecharMenu}>
                        Nome Loja
                    </Link>

                    <div id="menu-links-lateral" className={classPainel}>
                        {linksDoMenu.map(function (item) {
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    onClick={fecharMenu}
                                    className={function (props) {
                                        if (props.isActive === true) {
                                            return (
                                                styles.navLink +
                                                ' ' +
                                                styles.navLinkAtivo
                                            )
                                        }
                                        return styles.navLink
                                    }}
                                >
                                    {item.texto}
                                </NavLink>
                            )
                        })}
                    </div>

                    <div className={styles.acoes}>
                        <Link
                            to="/carrinho"
                            className={styles.carrinho}
                            aria-label={
                                qtdCarrinho > 0
                                    ? 'Ver carrinho, ' +
                                      qtdCarrinho +
                                      ' itens'
                                    : 'Ver carrinho'
                            }
                            onClick={fecharMenu}
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

                        <button
                            type="button"
                            className={styles.botaoMenu}
                            aria-expanded={menuAberto}
                            aria-controls="menu-links-lateral"
                            aria-label={
                                menuAberto === true ? 'Fechar menu' : 'Abrir menu'
                            }
                            onClick={abrirFecharMenu}
                        >
                            {menuAberto === true ? (
                                <FaTimes
                                    className={styles.iconeNav}
                                    size={22}
                                    aria-hidden="true"
                                />
                            ) : (
                                <FaBars
                                    className={styles.iconeNav}
                                    size={22}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {menuAberto === true ? (
                <button
                    type="button"
                    className={styles.fundoMenu}
                    aria-label="Fechar menu"
                    onClick={fecharMenu}
                />
            ) : null}
        </header>
    )
}
