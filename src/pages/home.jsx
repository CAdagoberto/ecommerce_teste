import styles from './home.module.css'
import CardProduto from '../components/cardProduto'
import BlocoCategoria from '../components/blocoCategoria'
import HeroInicio from '../components/home/heroInicio'
import BarraBeneficios from '../components/home/barraBeneficios'
import SecaoDestaques from '../components/home/secaoDestaques'
import ChamadaAcao from '../components/home/chamadaAcao'
import { useEffect, useState } from 'react'

export default function Home() {

    const [produtos, setProdutos] = useState([])
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(data => setProdutos(data))
        .catch(error => console.error('Erro ao buscar produtos:', error))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(data => setCategorias(data))
        .catch(error => console.error('Erro ao buscar categorias:', error))
    }, [])

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
                  {categorias.map((categoria) => (
                    <BlocoCategoria key={categoria.id} {...categoria}
                    produtos={produtos.filter((produto) => produto.categoriaId === categoria.id)}
                    titulo={categoria.nome}
                    descricao={categoria.descricao}
                    />
                  ))}
                </section>
      </main>
    </div>
  );
}
