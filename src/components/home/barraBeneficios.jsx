import styles from './barraBeneficios.module.css'

const ITENS_PADRAO = [
    '15% na primeira compra',
    'Frete grátis acima de R$ 200',
    'Parcele em até 6x sem juros',
    'Devolução grátis em 15 dias',
]

export default function BarraBeneficios({ itens = ITENS_PADRAO }) {
    return (
        <section className={styles.beneficios} aria-label="Benefícios da loja">
            <ul className={styles.lista}>
                {itens.map((texto) => (
                    <li key={texto} className={styles.item}>
                        {texto}
                    </li>
                ))}
            </ul>
        </section>
    )
}
