import { Link } from 'react-router-dom'
import styles from './heroInicio.module.css'

export default function HeroInicio(props) {
    let titulo = props.titulo
    let subtitulo = props.subtitulo
    let rotuloBotao = props.rotuloBotao
    let imagem = props.imagem
    let linkBotao = props.linkBotao

    let estiloFundo = {
        backgroundImage: 'url("' + imagem + '")',
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
