# Aurora Market — e-commerce

Projeto de loja fictícia em **React**. A ideia é mostrar catálogo, detalhe do produto e carrinho com dados vindos de uma **API fake** (JSON).

---

## O que o projeto faz (resumo)

1. **Home** — hero, benefícios, categorias em destaque e blocos por categoria.
2. **Produtos** — lista com filtros (busca, categoria, ordenação).
3. **Produto** — página de um item com preço, estoque e botão para o carrinho.
4. **Carrinho** — itens salvos no **navegador** (`localStorage`), resumo com validação contra a API e “finalizar” simulado.

---

## Ferramentas usadas

| Ferramenta | Para que serve |
|------------|----------------|
| **React** | Interface em componentes |
| **Vite** | Servidor de desenvolvimento e build |
| **React Router** | Rotas (`/`, `/produtos`, `/produto/:id`, `/carrinho`) |
| **JSON Server** | API REST fake em cima de um `.json` |
| **react-icons** | Ícones (carrinho, menu, etc.) |
| **CSS Modules** | Estilo por ficheiro (ex.: `navbar.module.css`) |

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

- Se o **JSON Server** não estiver ligado, listas e carrinho podem falhar ou mostrar erro.
- O **carrinho** não manda pedido para servidor; grava no **localStorage** do browser.
- Nome da loja e textos são **fictícios** para o teste.

---

**Bons testes.**
