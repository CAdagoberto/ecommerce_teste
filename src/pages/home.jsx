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

export default function Home() {
    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(function () {
        let cancelar = false

        let buscaProdutos = fetch('http://localhost:3000/produtos').then(
            function (res) {
                if (res.ok === false) {
                    throw new Error('produtos')
                }
                return res.json()
            }
        )

        let buscaCategorias = fetch('http://localhost:3000/categorias').then(
            function (res) {
                if (res.ok === false) {
                    throw new Error('categorias')
                }
                return res.json()
            }
        )

        let demoraFake = esperarMs(700)

        Promise.all([buscaProdutos, buscaCategorias, demoraFake])
            .then(function (tudo) {
                if (cancelar === true) {
                    return
                }
                setProdutos(tudo[0])
                setCategorias(tudo[1])
            })
            .catch(function (erro) {
                console.error('Erro ao buscar dados da home:', erro)
            })
            .finally(function () {
                if (cancelar === false) {
                    setCarregando(false)
                }
            })

        return function () {
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
                        categorias.map(function (categoria) {
                            return (
                                <CardDestaques
                                    key={categoria.id}
                                    {...categoria}
                                />
                            )
                        })
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
                        categorias.map(function (categoria) {
                            return (
                                <BlocoCategoria
                                    key={categoria.id}
                                    {...categoria}
                                    produtos={produtos.filter(function (
                                        produto
                                    ) {
                                        return (
                                            produto.categoriaId ===
                                            categoria.id
                                        )
                                    })}
                                    titulo={categoria.nome}
                                    descricao={categoria.descricao}
                                />
                            )
                        })
                    )}
                </section>
            </main>
        </div>
    )
}
