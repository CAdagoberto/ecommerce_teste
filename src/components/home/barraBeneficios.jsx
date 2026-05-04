import styles from './barraBeneficios.module.css'
import { FaCreditCard, FaPercent, FaTruck, FaUndo } from 'react-icons/fa'

const ITENS_PADRAO = [
    {
        id: 'desconto',
        texto: '15% na primeira compra',
        Icone: FaPercent,
    },
    {
        id: 'frete',
        texto: 'Frete grátis acima de R$ 200',
        Icone: FaTruck,
    },
    {
        id: 'parcelas',
        texto: 'Parcele em até 6x sem juros',
        Icone: FaCreditCard,
    },
    {
        id: 'troca',
        texto: 'Devolução grátis em 15 dias',
        Icone: FaUndo,
    },
]

const BarraBeneficios = ({ itens = ITENS_PADRAO }) => (
    <section className={styles.beneficios} aria-label="Benefícios da loja">
        <ul className={styles.lista}>
            {itens.map(item => {
                const IconeComponente = item.Icone
                return (
                    <li key={item.id} className={styles.item}>
                        <IconeComponente
                            className={styles.icone}
                            size={18}
                            aria-hidden="true"
                        />
                        <span>{item.texto}</span>
                    </li>
                )
            })}
        </ul>
    </section>
)

export default BarraBeneficios
