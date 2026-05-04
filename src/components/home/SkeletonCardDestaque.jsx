import styles from './SkeletonCardDestaque.module.css'

const SkeletonCardDestaque = () => (
    <div className={styles.card} aria-hidden="true">
        <div className={styles.areaFoto} />
        <div className={styles.rodapeFake} />
    </div>
)

export default SkeletonCardDestaque
