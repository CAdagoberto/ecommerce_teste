import styles from './heroInicio.module.css'

export default function HeroInicio({
    titulo = 'Inicio',
    subtitulo = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
    rotuloBotao = 'Ver produtos',
}) {
    return (
        <section className={styles.sectionHero}>
            <div className={styles.heroContent}>
                <h1>{titulo}</h1>
                <p>{subtitulo}</p>
                <button type="button">{rotuloBotao}</button>
            </div>
        </section>
    )
}
