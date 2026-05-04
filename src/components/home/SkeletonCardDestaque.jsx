import styles from './SkeletonCardDestaque.module.css'

export default function SkeletonCardDestaque() {
    return (
        <div className={styles.card} aria-hidden="true">
            <div className={styles.areaFoto} />
            <div className={styles.rodapeFake} />
        </div>
    )
}
