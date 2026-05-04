import { Link } from 'react-router-dom'
import styles from './heroInicio.module.css'

const HeroInicio = ({
    titulo,
    subtitulo,
    rotuloBotao,
    imagem,
    linkBotao,
}) => {
    let estiloFundo = {
        backgroundImage: `url("${imagem}")`,
    }

    return (
        <section className={styles.sectionHero} style={estiloFundo}>
            <div className={styles.heroContent}>
                <h1>{titulo}</h1>
                <p>{subtitulo}</p>

                {linkBotao != null && linkBotao !== '' ? (
                    <Link to={linkBotao} className={styles.botaoCta}>
                        {rotuloBotao}
                    </Link>
                ) : (
                    <button type="button" className={styles.botaoCta}>
                        {rotuloBotao}
                    </button>
                )}
            </div>
        </section>
    )
}

export default HeroInicio
