import styles from './FiltrosProdutos.module.css'

export default function FiltrosProdutos(props) {
    let textoBusca = props.textoBusca
    let onMudarBusca = props.onMudarBusca
    let categoriaEscolhida = props.categoriaEscolhida
    let onMudarCategoria = props.onMudarCategoria
    let ordenacao = props.ordenacao
    let onMudarOrdenacao = props.onMudarOrdenacao
    let categorias = props.categorias

    return (
        <div className={styles.areaFiltros}>
            <div className={styles.campoFiltro + ' ' + styles.campoBusca}>
                <label htmlFor="busca-nome">Buscar por nome</label>
                <input
                    id="busca-nome"
                    type="text"
                    placeholder="Ex: dry fit"
                    value={textoBusca}
                    onChange={onMudarBusca}
                />
            </div>

            <div className={styles.campoFiltro}>
                <label htmlFor="filtro-categoria">Categoria</label>
                <select
                    id="filtro-categoria"
                    value={categoriaEscolhida}
                    onChange={onMudarCategoria}
                >
                    <option value="">Todas</option>
                    {categorias.map(function (cat) {
                        return (
                            <option key={cat.id} value={cat.id}>
                                {cat.nome}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div className={styles.campoFiltro}>
                <label htmlFor="ordenacao-preco">Ordenar preco</label>
                <select
                    id="ordenacao-preco"
                    value={ordenacao}
                    onChange={onMudarOrdenacao}
                >
                    <option value="padrao">Ordem do site</option>
                    <option value="menor">Menor para maior</option>
                    <option value="maior">Maior para menor</option>
                </select>
            </div>
        </div>
    )
}
