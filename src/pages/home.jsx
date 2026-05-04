import styles from './home.module.css'
import CardProduto from '../components/cardProduto'
import BlocoCategoria from '../components/blocoCategoria'
import HeroInicio from '../components/home/heroInicio'
import BarraBeneficios from '../components/home/barraBeneficios'
import SecaoDestaques from '../components/home/secaoDestaques'
import ChamadaAcao from '../components/home/chamadaAcao'

export default function Home() {
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 100 },
        { id: 2, nome: 'Produto 2', preco: 200 },
        { id: 3, nome: 'Produto 3', preco: 300 },
    ]

    return (
        <div className={styles.home}>
            <HeroInicio />

            <main className="container">
                <BarraBeneficios />

                <SecaoDestaques>
                    <CardProduto />
                    <CardProduto />
                    <CardProduto />
                </SecaoDestaques>

                <ChamadaAcao />

                <section className={styles.produtos}>
                    <BlocoCategoria
                        titulo="Produtos em destaque"
                        descricao="Descrição dos produtos em destaque"
                        produtos={produtos}
                        verTodos="Ver todos"
                    />

                    <BlocoCategoria
                        titulo="Produtos em destaque"
                        descricao="Descrição dos produtos em destaque"
                        produtos={produtos}
                        verTodos="Ver todos"
                    />

                    <BlocoCategoria
                        titulo="Produtos em destaque"
                        descricao="Descrição dos produtos em destaque"
                        produtos={produtos}
                        verTodos="Ver todos"
                    />
                </section>
            </main>
        </div>
    )
}
