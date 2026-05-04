import styles from './home.module.css'
import BlocoCategoria from '../components/blocoCategoria'
import HeroInicio from '../components/home/heroInicio'
import BarraBeneficios from '../components/home/barraBeneficios'
import SecaoDestaques from '../components/home/secaoDestaques'
import ChamadaAcao from '../components/home/chamadaAcao'
import { useEffect, useState } from 'react'
import CardDestaques from '../components/cardDestaques'

// textos do hero da home (troca aqui quando quiser)
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

    useEffect(function () {
        fetch('http://localhost:3000/produtos')
            .then(res => res.json())
            .then(data => {
                setProdutos(data)
            })
              .catch(error => console.error('Erro ao buscar produtos:', error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
            .then(res => res.json())
            .then(data => {
                setCategorias(data)
            })
            .catch(error => console.error('Erro ao buscar categorias:', error))
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
                    {categorias.map(function (categoria) {
                        return (
                            <CardDestaques key={categoria.id} {...categoria} />
                        )
                    })}
                </SecaoDestaques>

                <ChamadaAcao />

                <section className={styles.produtos}>
                    {categorias.map(function (categoria) {
                        return (
                            <BlocoCategoria
                                key={categoria.id}
                                {...categoria}
                                produtos={produtos.filter(function (produto) {
                                    return produto.categoriaId === categoria.id
                                })}
                                titulo={categoria.nome}
                                descricao={categoria.descricao}
                            />
                        )
                    })}
                </section>
            </main>
        </div>
    )
}
