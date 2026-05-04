import { useEffect, useState } from 'react'
import styles from './produtos.module.css'
import HeroInicio from '../components/home/heroInicio'
import FiltrosProdutos from '../components/produtos/FiltrosProdutos'
import GradeProdutos from '../components/produtos/GradeProdutos'
import { filtrarEOrdenarProdutos } from '../utils/produtoCatalogo'
import { esperarMs } from '../utils/esperarMs'

const heroProdutos = {
    titulo: 'Nosso catálogo',
    subtitulo:
        'Filtre por categoria, busque pelo nome e ordene por preço. Encontre a peça certa em poucos cliques.',
    rotuloBotao: 'Voltar ao início',
    imagem: '/assets/images/banner1.png',
    linkBotao: '/',
}

const Produtos = () => {
    const [listaProdutos, setListaProdutos] = useState([])
    const [listaCategorias, setListaCategorias] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erroProdutos, setErroProdutos] = useState('')
    const [erroCategorias, setErroCategorias] = useState('')

    const [textoBusca, setTextoBusca] = useState('')
    const [categoriaEscolhida, setCategoriaEscolhida] = useState('')
    const [ordenacao, setOrdenacao] = useState('padrao')

    useEffect(() => {
        let aindaVale = true

        const carregarProdutos = async () => {
            try {
                await esperarMs(600)

                let res = await fetch('http://localhost:3000/produtos')
                if (aindaVale === false) {
                    return
                }

                if (res.ok === false) {
                    setErroProdutos(
                        'Não foi possível carregar o catálogo. Verifique o servidor.'
                    )
                    return
                }

                let dados = await res.json()
                setListaProdutos(dados)
                setErroProdutos('')
            } catch (error) {
                console.error('Erro ao buscar produtos:', error)
                if (aindaVale === true) {
                    setErroProdutos(
                        'Não foi possível carregar o catálogo. Verifique o servidor.'
                    )
                }
            } finally {
                if (aindaVale === true) {
                    setCarregando(false)
                }
            }
        }

        carregarProdutos()

        return () => {
            aindaVale = false
        }
    }, [])

    useEffect(() => {
        const carregarCategorias = async () => {
            try {
                await esperarMs(400)

                let res = await fetch('http://localhost:3000/categorias')
                if (res.ok === false) {
                    console.error('Resposta ruim ao buscar categorias')
                    return
                }

                let dados = await res.json()
                setListaCategorias(dados)
                setErroCategorias('')
            } catch (error) {
                console.error('Erro ao buscar categorias:', error)
            }
        }

        carregarCategorias()
    }, [])

    let produtosFiltrados = filtrarEOrdenarProdutos(listaProdutos, {
        textoBusca: textoBusca,
        categoriaEscolhida: categoriaEscolhida,
        ordenacao: ordenacao,
    })

    return (
        <div className={styles.pagina}>
            <HeroInicio
                titulo={heroProdutos.titulo}
                subtitulo={heroProdutos.subtitulo}
                rotuloBotao={heroProdutos.rotuloBotao}
                imagem={heroProdutos.imagem}
                linkBotao={heroProdutos.linkBotao}
            />

            <main className="container">
                {erroProdutos !== '' ? (
                    <p className={styles.mensagemErro}>{erroProdutos}</p>
                ) : null}
                {erroCategorias !== '' ? (
                    <p className={styles.mensagemErro}>{erroCategorias}</p>
                ) : null}

                <FiltrosProdutos
                    textoBusca={textoBusca}
                    onMudarBusca={e => {
                        setTextoBusca(e.target.value)
                    }}
                    categoriaEscolhida={categoriaEscolhida}
                    onMudarCategoria={e => {
                        setCategoriaEscolhida(e.target.value)
                    }}
                    ordenacao={ordenacao}
                    onMudarOrdenacao={e => {
                        setOrdenacao(e.target.value)
                    }}
                    categorias={listaCategorias}
                />

                <GradeProdutos
                    carregando={carregando}
                    erroProdutos={erroProdutos}
                    produtosFiltrados={produtosFiltrados}
                />
            </main>
        </div>
    )
}

export default Produtos
