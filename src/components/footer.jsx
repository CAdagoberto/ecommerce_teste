import styles from './footer.module.css'

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerLogo}></div>
            <div className={styles.footerLinks}>
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
            </div>
        </div>
    </footer>
)

export default Footer
