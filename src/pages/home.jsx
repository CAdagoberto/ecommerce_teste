import styles from './home.module.css'
import CardProduto from '../components/cardProduto'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className={styles.home}>
            <section className={styles.sectionHero}>
                <div className={styles.heroContent}>
                    <h1>Inicio</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    <button>Ver produtos</button>
                </div>
            </section>


            <main class="container">
                <section className={styles.beneficios}>
                        <ul>
                            <li>
                                15% OFF NA PRIMEIRA COMPRA
                            </li>
                            <li>
                                FRETE GRÁTIS ACIMA DE R$200
                            </li>
                            <li>
                                PARCELE EM ATÉ 6X SEM JUROS
                            </li>
                            <li>
                                DEVOLUÇÃO GRÁTIS EM 15 DIAS	
                            </li>
                        </ul>
                    </section>

                    <section className={styles.destaques}>
                        <h2>Produtos em destaque</h2>
                        <div className={styles.destaque}>
                            <CardProduto />
                            <CardProduto />
                            <CardProduto />
                        </div>
                    </section>


                    <section className={styles.cta}>
                        <button>
                            <Link to="/produtos">Comprar agora</Link>
                        </button>
                    </section>

                    <section className={styles.produtos}>

                        <div className={styles.categoria}>
                           <div className={styles.categoriaTitulo}>
                                <h3>Titulo da categoria</h3>
                                <p>Descrição da categoria</p>
                                <button>Ver todos</button> 
                           </div>
                          
                            <div className={styles.produtosCategoria}>
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />  
                            </div>
                        </div>

                        <div className={styles.categoria}>
                           <div className={styles.categoriaTitulo}>
                                <h3>Titulo da categoria</h3>
                                <p>Descrição da categoria</p>
                                <button>Ver todos</button> 
                           </div>
                          
                            <div className={styles.produtosCategoria}>
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />  
                            </div>
                        </div>

                        <div className={styles.categoria}>
                           <div className={styles.categoriaTitulo}>
                                <h3>Titulo da categoria</h3>
                                <p>Descrição da categoria</p>
                                <button>Ver todos</button> 
                           </div>
                          
                            <div className={styles.produtosCategoria}>
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />
                                <CardProduto />
                                <CardProduto /> 
                                <CardProduto />  
                            </div>
                        </div>
                        
                    </section>


            </main>
        </div>
    )
}