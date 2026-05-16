<<<<<<< HEAD
# 📦 StockEasy – Sistema de Controle de Estoque

## 👨‍💻 Integrantes do Projeto
- Pedro Paulo de Vasconcelos  
- Maria Eduarda Eloi  

---

## 💡 Descrição do Sistema

O **StockEasy** é um sistema web desenvolvido para facilitar o controle de estoque de empresas de pequeno e médio porte.

A aplicação permite gerenciar produtos, clientes e relatórios de forma simples, moderna e eficiente, oferecendo uma interface intuitiva e responsiva.

O sistema segue o modelo **SaaS (Software as a Service)**, com foco em usabilidade, organização e experiência do usuário.

---

## 🚀 Tecnologias Utilizadas

- React.js  
- Vite  
- JavaScript (ES6+)  
- CSS3  
- React Router DOM  
- Framer Motion (animações)  
- LocalStorage (simulação de autenticação)  

---

## 🖥️ Telas Desenvolvidas

### 🔹 Home (Landing Page)
- Apresentação do sistema  
- Hero com chamada principal  
- Seção de produto  
- Funcionalidades (features)  
- Avaliações de usuários  
- Planos (pricing)  
- Formulário de contato  
- CTA (call to action)  

---

### 🔹 Login
- Formulário de autenticação  
- Redirecionamento para área interna  
- Link para cadastro  

---

### 🔹 Cadastro
- Registro de novos usuários  
- Integração com login  

---

### 🔹 Dashboard (Em desenvolvimento)
- Área interna do sistema  
- Acesso após login  

---

### 🔹 Outras telas (em construção)
- Estoque  
- Relatórios  
- Administrativo  
- Financeiro  
- Ajuda  

---

## 📁 Organização do Projeto


src/
├── components/
│ ├── Navbar/
│ ├── Hero/
│ ├── Product/
│ ├── Features/
│ ├── Testimonials/
│ ├── Pricing/
│ ├── Contact/
│ ├── CTA/
│ └── Footer/
│
├── pages/
│ ├── Home.jsx
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ └── Cadastro/
│
├── styles/
│ └── home.css
│
├── App.jsx
└── main.jsx


---

## ⚙️ Como Rodar o Projeto

### 1. Clone o repositório


git clone https://github.com/Pedrinhopb/Criar_Servi-os_Web_Rest.git


---

### 2. Acesse a pasta do projeto


cd stockeasy


---

### 3. Instale as dependências


npm install


---

### 4. Execute o projeto


npm run dev


---

### 5. Acesse no navegador


http://localhost:5173


*(ou a porta exibida no terminal)*

---

## 📌 Status do Projeto

🚧 Em desenvolvimento  
✔ Interface moderna implementada  
✔ Navegação funcional  
✔ Autenticação simulada  
⏳ Funcionalidades completas em construção  

---

## 📞 Contato

📧 contato@stockeasy.com  
📍 Campina Grande - PB  

---

## 🎓 Objetivo Acadêmico

Este projeto foi desenvolvido com fins acadêmicos, com o objetivo de aplicar conceitos de desenvolvimento web moderno, 
=======
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
>>>>>>> d9137a107c56eeb0d10be248de4c5c4cd21f1c8c
