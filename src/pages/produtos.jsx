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

export default function Produtos() {
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

        let pedidoProdutos = fetch('http://localhost:3000/produtos').then(
            function (res) {
                if (res.ok === false) {
                    throw new Error('erro http')
                }
                return res.json()
            }
        )

        let timerFake = esperarMs(600)

        Promise.all([pedidoProdutos, timerFake])
            .then(function (resultados) {
                let dados = resultados[0]
                if (aindaVale === false) {
                    return
                }
                setListaProdutos(dados)
                setErroProdutos('')
            })
            .catch(function (error) {
                console.error('Erro ao buscar produtos:', error)
                if (aindaVale === false) {
                    return
                }
                setErroProdutos(
                    'Não foi possível carregar o catálogo. Verifique o servidor.'
                )
            })
            .finally(function () {
                if (aindaVale === true) {
                    setCarregando(false)
                }
            })

        return function () {
            aindaVale = false
        }
    }, [])

    useEffect(() => {
        let pedidoCategorias = fetch('http://localhost:3000/categorias').then(
            function (res) {
                if (res.ok === false) {
                    throw new Error('erro http')
                }
                return res.json()
            }
        )

        let timerFake = esperarMs(400)

        Promise.all([pedidoCategorias, timerFake])
            .then(function (resultados) {
                let dados = resultados[0]
                setListaCategorias(dados)
                setErroCategorias('')
            })
            .catch(function (error) {
                console.error('Erro ao buscar categorias:', error)
            })
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
