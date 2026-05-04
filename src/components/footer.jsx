import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLogo}>
                    
                </div>
                <div className={styles.footerLinks}>
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                </div>
            </div>
        </footer>
    )
}