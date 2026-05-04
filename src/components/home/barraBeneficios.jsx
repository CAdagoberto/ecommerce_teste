import styles from './barraBeneficios.module.css'

const ITENS_PADRAO = [
    '15% OFF NA PRIMEIRA COMPRA',
    'FRETE GRÁTIS ACIMA DE R$200',
    'PARCELE EM ATÉ 6X SEM JUROS',
    'DEVOLUÇÃO GRÁTIS EM 15 DIAS',
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
