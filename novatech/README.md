# NovaTech Store — Projeto Integrador (Programação Web I)

**Aluno(s):** _[Edy Laus Ferreira Guimarães Vieira]_
**Tema escolhido:** E-commerce simplificado (catálogo de produtos, sem backend real)

## 📌 Descrição do projeto

A **NovaTech Store** é uma loja fictícia de eletrônicos (notebooks, smartphones, áudio e acessórios), desenvolvida como Projeto Integrador da disciplina de Programação Web I. O site simula uma vitrine de e-commerce completa, com catálogo filtrável, carrinho de compras funcional (persistido no navegador), formulário de contato validado e página institucional.

Esta é a **versão final do projeto**.

## 🗂️ Estrutura de pastas

```
projeto-web/
├── index.html               → Página inicial (hero, carrossel de destaques, categorias)
├── /pages
│   ├── produtos.html        → Catálogo com filtro por categoria e "adicionar ao carrinho"
│   ├── sobre.html           → Institucional (missão, valores, trajetória)
│   ├── contato.html         → Formulário com validação JavaScript
│   └── carrinho.html        → Carrinho de compras 
├── /css
│   └── style.css            → Folha de estilos própria do projeto
├── /js
│   ├── script.js            → Interatividade geral (filtros, validação, eventos, Swiper)
│   └── carrinho.js          → Módulo do carrinho de compras (localStorage)
├── /img                     → Reservado para imagens adicionais
└── README.md
```

## 🛠️ Tecnologias, bibliotecas e plug-ins utilizados

| Tecnologia | Uso no projeto |
|---|---|
| **HTML5 semântico** | Estrutura de todas as páginas (`header`, `nav`, `section`, `footer`, formulários) |
| **CSS3 próprio** | `css/style.css` — variáveis, Flexbox, Grid, animações simples, responsividade |
| **Bootstrap 5.3** | Grid system, navbar responsiva, cards, botões, formulários |
| **Bootstrap Icons** | Ícones vetoriais em todo o site |
| **JavaScript (puro)** | Filtro de produtos por categoria, carrinho de compras, validação de formulário, manipulação de DOM |
| **jQuery 3.7** | Efeitos visuais (fade in/out no toast e nas mensagens de feedback), fechamento automático do menu mobile |
| **Swiper.js** (biblioteca externa) | Carrossel de produtos em destaque na página inicial |
| **localStorage** | Persistência do carrinho de compras entre páginas e recarregamentos |

## ✨ Funcionalidades interativas

1. **Filtro de produtos por categoria** — `pages/produtos.html`: manipulação de DOM para mostrar/ocultar cards conforme a categoria selecionada.
2. **Carrinho de compras completo** — adicionar produto, alterar quantidade, remover item, esvaziar carrinho e calcular total automaticamente (`js/carrinho.js`, persistido em `localStorage`).
3. **Validação de formulário via JavaScript** — `pages/contato.html`: nome, e-mail (regex), assunto e mensagem validados antes do envio, com mensagens de erro específicas por campo.
4. **jQuery** — efeitos de fade em notificações (toast de "produto adicionado") e no feedback do formulário; fechamento do menu mobile ao navegar.
5. **Swiper.js (plug-in externo)** — carrossel responsivo de produtos em destaque na página inicial, com autoplay e paginação.
6. **Eventos de usuário** — clique (filtros, adicionar ao carrinho, remover item), `input`/`change` (validação em tempo real, atualização de quantidade), `submit` (formulário de contato).

## ✅ Itens contemplados nesta entrega

- [x] JavaScript para 3+ funcionalidades interativas (filtro, carrinho, validação de formulário)
- [x] Manipulação dinâmica do DOM (renderização do carrinho, exibição/ocultação de produtos)
- [x] Eventos de usuário (clique, input, change, submit)
- [x] jQuery aplicado em funcionalidades adicionais (efeitos de fade)
- [x] Biblioteca externa (Swiper.js) para o carrossel de destaques
- [x] Revisão de responsividade e usabilidade
- [x] README atualizado com tecnologias, instruções e funcionalidades

## ▶️ Como executar o projeto

1. Baixe/extraia a pasta `projeto-web`.
2. Abra o arquivo `index.html` diretamente no navegador **ou** sirva a pasta com um servidor local simples, por exemplo:
   ```bash
   # Python
   python3 -m http.server 8000
   # depois acesse http://localhost:8000
   ```
3. Navegue pelo menu para testar o catálogo, adicionar produtos ao carrinho, aplicar filtros e enviar o formulário de contato.

> Observação: por ser um projeto sem backend, o carrinho é salvo no `localStorage` do navegador (fica salvo apenas no seu dispositivo/navegador) e a finalização de compra é apenas uma simulação.

## 🖥️ Principais telas

- **Início** — hero de apresentação + carrossel de produtos em destaque + categorias
- **Produtos** — catálogo com 9 produtos, filtráveis por categoria
- **Carrinho** — lista de itens, quantidade editável, subtotal e total
- **Sobre** — institucional, valores e linha do tempo
- **Contato** — formulário validado com feedback visual de sucesso/erro

## 🧪 Testado em

- Google Chrome (desktop e mobile)
- Mozilla Firefox
- Resoluções: 1920px (desktop), 768px (tablet) e 375px (mobile)
