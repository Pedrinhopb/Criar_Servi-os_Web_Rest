# StockEasy

StockEasy é um protótipo de sistema web para controle de estoque, com foco em gestão de produtos, fornecedores, clientes e usuários. O objetivo deste projeto é oferecer uma interface moderna com navegação interna (SPA) e formulários de cadastro dinâmicos para os principais fluxos de gestão.

## Intenção do projeto

- Centralizar o cadastro e a gestão de estoque em uma interface única.
- Fornecer uma navegação suave entre seções sem recarregar a página.
- Aplicar boas práticas de UI/UX com cards, painéis, espaçamento e responsividade.
- Ter componentes reutilizáveis e código organizado por páginas e componentes.

## Como baixar e executar no PC

1. Clone o repositório:

```bash
git clone <URL-do-repositório>
```

2. Entre na pasta do projeto:

```bash
cd "C:\Users\ppvof\OneDrive\Área de Trabalho\Fase_1\stockeasy"
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

5. Abra o navegador no endereço mostrado pelo Vite, geralmente:

```text
http://localhost:5173
```

### Build de produção

Para gerar uma versão pronta para produção:

```bash
npm run build
```

Para visualizar a build gerada:

```bash
npm run preview
```

## Estrutura do projeto

```text
stockeasy/
  package.json
  README.md
  src/
    App.jsx
    main.jsx
    index.css
    pages/
      LandingPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      Cadastro.jsx
      WorkInProgress.jsx
    components/
      landing/
        Hero.jsx
        Navbar.jsx
        Services.jsx
        Reviews.jsx
        FAQ.jsx
        Contact.jsx
        Footer.jsx
      dashboard/
        Sidebar.jsx
        Sidebar.module.css
        Breadcrumb.jsx
        EmptyState.jsx
      cadastro/
        Modal.jsx
        ProdutoForm.jsx
        FornecedorForm.jsx
        ClienteForm.jsx
        UsuarioForm.jsx
    styles/
      Cadastro.module.css
  dist/
```

## Principais funcionalidades

- Página de landing com seção hero e estatísticas.
- Navegação interna entre abas do painel administrativo.
- Aba de cadastro com seleção de tipo e formulário dinâmico para:
  - Produto
  - Fornecedor
  - Cliente
  - Usuário
- UI moderna com cards, bordas arredondadas e responsividade.

## Observações

- O projeto está construído em React com Vite.
- A navegação entre abas ainda inclui seções em desenvolvimento para algumas áreas.
- O fluxo de cadastro abre o formulário apenas quando o usuário clicar em `+ Novo`.
