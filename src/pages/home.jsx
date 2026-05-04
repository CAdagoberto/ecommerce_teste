import styles from './home.module.css'
import BlocoCategoria from '../components/blocoCategoria'
import HeroInicio from '../components/home/heroInicio'
import BarraBeneficios from '../components/home/barraBeneficios'
import SecaoDestaques from '../components/home/secaoDestaques'
import ChamadaAcao from '../components/home/chamadaAcao'
import { useEffect, useState } from 'react'
import CardDestaques from '../components/cardDestaques'
import SkeletonCardDestaque from '../components/home/SkeletonCardDestaque'
import SkeletonCardProduto from '../components/SkeletonCardProduto'
import { esperarMs } from '../utils/esperarMs'

// Textos do hero da home
const heroHome = {
    titulo: 'Estilo e conforto para o seu dia a dia',
    subtitulo:
        'Peças selecionadas em dry fit, social e blusas. Qualidade que você veste no trabalho, na academia e no lazer.',
    rotuloBotao: 'Ver produtos',
    imagem: '/assets/images/banner2.webp',
    linkBotao: '/produtos',
}

const Home = () => {
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        let cancelar = false

        const carregar = async () => {
            try {
                await esperarMs(700)

                let resProdutos = await fetch(
                    'http://localhost:3000/produtos'
                )
                let listaProdutos = []
                if (resProdutos.ok === true) {
                    listaProdutos = await resProdutos.json()
                } else {
                    console.error('Resposta ruim ao buscar produtos (home)')
                }

                let resCategorias = await fetch(
                    'http://localhost:3000/categorias'
                )
                let listaCategorias = []
                if (resCategorias.ok === true) {
                    listaCategorias = await resCategorias.json()
                } else {
                    console.error('Resposta ruim ao buscar categorias (home)')
                }

                if (cancelar === true) {
                    return
                }
                setProdutos(listaProdutos)
                setCategorias(listaCategorias)
            } catch (erro) {
                console.error('Erro ao buscar dados da home:', erro)
            } finally {
                if (cancelar === false) {
                    setCarregando(false)
                }
            }
        }

        carregar()

        return () => {
            cancelar = true
        }
    }, [])

    return (
        <div className={styles.home}>
            <HeroInicio
                titulo={heroHome.titulo}
                subtitulo={heroHome.subtitulo}
                rotuloBotao={heroHome.rotuloBotao}
                imagem={heroHome.imagem}
                linkBotao={heroHome.linkBotao}
            />

            <main className="container">
                <BarraBeneficios />

                <SecaoDestaques>
                    {carregando === true ? (
                        <>
                            <SkeletonCardDestaque key="sk-cat-0" />
                            <SkeletonCardDestaque key="sk-cat-1" />
                            <SkeletonCardDestaque key="sk-cat-2" />
                        </>
                    ) : (
                        categorias.map(categoria => (
                            <CardDestaques
                                key={categoria.id}
                                {...categoria}
                            />
                        ))
                    )}
                </SecaoDestaques>

                <ChamadaAcao />

                <section className={styles.produtos}>
                    {carregando === true ? (
                        <div
                            className={styles.skeletonGrade}
                            aria-busy="true"
                            aria-label="Carregando produtos"
                        >
                            <SkeletonCardProduto key="sk-p-0" />
                            <SkeletonCardProduto key="sk-p-1" />
                            <SkeletonCardProduto key="sk-p-2" />
                            <SkeletonCardProduto key="sk-p-3" />
                            <SkeletonCardProduto key="sk-p-4" />
                            <SkeletonCardProduto key="sk-p-5" />
                        </div>
                    ) : (
                        categorias.map(categoria => (
                            <BlocoCategoria
                                key={categoria.id}
                                {...categoria}
                                produtos={produtos.filter(
                                    produto =>
                                        produto.categoriaId === categoria.id
                                )}
                                titulo={categoria.nome}
                                descricao={categoria.descricao}
                            />
                        ))
                    )}
                </section>
            </main>
        </div>
    )
}

export default Home
