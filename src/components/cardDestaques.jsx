import styles from './cardDestaques.module.css'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'

const CardDestaques = ({ nome, img, id }) => {
    const urlDaImagem = img

    return (
        <article className={styles.cardDestaques}>
            <div className={styles.molduraImagem}>
                <img
                    className={styles.imagem}
                    src={urlDaImagem}
                    alt={nome ? `Categoria ${nome}` : 'Destaque da loja'}
                    loading="lazy"
                />
            </div>

            <div className={styles.conteudo}>
                <h4 className={styles.titulo}>{nome}</h4>
                <Link
                    to={id ? `/produtos?categoria=${id}` : '/produtos'}
                    className={styles.botao}
                >
                    Confira
                    <IoIosArrowForward className={styles.icone} aria-hidden />
                </Link>
            </div>
        </article>
    )
}

export default CardDestaques
