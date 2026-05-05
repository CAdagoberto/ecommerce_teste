# Aurora Market — e-commerce (front-end)

Projeto de loja fictícia em **React**. A ideia é mostrar catálogo, detalhe do produto e carrinho com dados vindos de uma **API fake** (JSON).

---

## O que o projeto faz (resumo)

1. **Home** — hero, benefícios, categorias em destaque e blocos por categoria.
2. **Produtos** — lista com filtros (busca, categoria, ordenação).
3. **Produto** — página de um item com preço, estoque e botão para o carrinho.
4. **Carrinho** — itens salvos no **navegador** (`localStorage`), resumo com validação contra a API e “finalizar” simulado.

---

## Ferramentas usadas e por quê

| Ferramenta | Para que serve | Por que escolhi / uso aqui |
|------------|----------------|----------------------------|
| **React** | Interface em componentes | É o padrão do mercado, boa documentação e reaproveitamento de código (cards, navbar, etc.). |
| **Vite** | Servidor de desenvolvimento e build | Mais rápido que setups antigos; `npm run dev` sobe o site na hora. |
| **React Router** | Rotas (`/`, `/produtos`, `/produto/:id`, `/carrinho`) | Sem recarregar a página inteira ao navegar; fica parecido com um app real. |
| **JSON Server** | API REST fake em cima de um `.json` | Não precisa de backend próprio para o TCC/portfólio; dá `GET` em `/produtos` e `/categorias` como uma API de verdade. |
| **react-icons** | Ícones (carrinho, menu, etc.) | Evita baixar vários SVGs na mão; um pacote só. |
| **ESLint** | Avisos de código (`npm run lint`) | Ajuda a manter padrão e pegar erro bobo antes de entregar. |
| **CSS Modules** | Estilo por ficheiro (ex.: `navbar.module.css`) | Nomes de classes não “chocam” entre componentes; é comum em projetos React. |

---


## Estrutura

```
src/
  components/   → peças reutilizáveis (navbar, cards, footer…)
  pages/         → ecrãs (home, produtos, produto, carrinho)
  utils/         → lógica do carrinho e validação com a API
public/
  assets/        → imagens estáticas (hero, produtos, etc.)
dbTeste.json     → dados da “API” (categorias + produtos)
```

---

## Notas 

- Se o **JSON Server** não estiver ligado, listas e carrinho podem falhar ou mostrar erro — é esperado.
- O **carrinho** não manda pedido para servidor; grava no **localStorage** do browser.
- Nome da loja e textos são **fictícios** para estudo.

---

**Bons testes.**
