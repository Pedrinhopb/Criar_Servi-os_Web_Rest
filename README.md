# 📦 StockEasy — Sistema de Controle de Estoque

> Plataforma SaaS moderna para gestão de estoque de pequenas e médias empresas.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧑‍💻 Integrantes

| Nome | 
|------|
| Pedro Paulo de Vasconcelos |
| Maria Eduarda Eloe | 

---

## 🎯 Sobre o Projeto

O **StockEasy** é uma aplicação web desenvolvida para facilitar o controle de estoque de empresas de pequeno e médio porte. O sistema segue o modelo **SaaS (Software as a Service)** com foco em usabilidade, organização e experiência do usuário.

A plataforma oferece uma interface moderna com suporte a **tema claro e escuro**, animações, contadores dinâmicos e um painel interno completo para gestão de produtos, fornecedores, clientes e usuários.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **React 18** | Biblioteca principal de UI |
| **Vite 5** | Bundler e servidor de desenvolvimento |
| **React Router DOM 6** | Roteamento e navegação |
| **CSS Modules** | Estilização por componente sem conflitos |
| **Context API** | Gerenciamento de tema global (dark/light mode) |
| **LocalStorage** | Simulação de autenticação e persistência de tema |
| **JavaScript ES6+** | Lógica da aplicação |

---

## 🧪 Usuário de Teste

Para facilitar a avaliação do sistema, utilize as credenciais abaixo:

```
📧 Email: admin@hotmail.com
🔑 Senha: admin
```

---

## 🖥️ Telas Desenvolvidas

### 🏠 Landing Page (Home)
- Hero com chamada principal, preview do dashboard animado e contadores em tempo real
- Seção de números impactantes (+500 empresas, 98% satisfação)
- Cards de funcionalidades com hover animado
- Avaliações de clientes com rating médio
- FAQ com acordeão animado
- Formulário de contato
- Footer com 4 colunas e redes sociais
- **Toggle de tema claro/escuro** na navbar

### 🔐 Login
- Formulário com validação de campos
- Mostrar/esconder senha
- Mensagem de erro visual
- Redirecionamento para área interna após autenticação

### 📝 Cadastro de Conta
- Formulário completo com validação
- Barra de força de senha (Fraca / Média / Forte / Muito forte)
- Checkbox de termos de uso
- Link de retorno para login

### 📋 Cadastro (Área Interna)
- **Header** com notificações, engrenagem de configurações e perfil do usuário
- **Sidebar** colapsável com tooltips e navegação ativa
- **Cards de resumo** mostrando totais e alertas por categoria
- **4 abas** com ícones e contadores: Produtos · Fornecedores · Clientes · Usuários
- Busca em tempo real com botão limpar
- Tabela com zebra striping, hover e linha vermelha para estoque baixo
- **Modal** de cadastro com formulário referente à aba ativa
- **Confirmação** antes de excluir qualquer item
- **Toast** de feedback após salvar ou excluir
- Cálculo automático de preço de venda pela margem: `Venda = Custo ÷ (1 − Margem%)`

### 🚧 Páginas em Desenvolvimento
Todas as rotas internas possuem uma tela de "Em desenvolvimento" com barra de progresso animada:
- Dashboard · Relatórios · Administrativo · Estoque · Financeiro · Ajuda

---

## 🎨 Identidade Visual

| Elemento | Valor |
|---|---|
| Verde principal | `#1a7a4a` |
| Verde claro | `#22a860` |
| Verde pálido | `#e6f5ee` |
| Fundo claro | `#f4f6f8` |
| Fundo escuro | `#0a0f0c` |
| Texto escuro | `#0f1a14` |
| Texto suave | `#5a7566` |
| Bordas | `#d0e6d8` |
| Fonte títulos | **Syne** (800) |
| Fonte corpo | **DM Sans** (400/500) |

---

## 🌙 Dark / Light Mode

O sistema possui suporte completo a **tema escuro e claro** em todas as telas. A preferência é salva no `localStorage` e aplicada automaticamente na próxima visita. O toggle fica visível na navbar da landing page e na engrenagem do painel interno.

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── landing/
│   │   ├── Navbar.jsx          # Navbar com scroll effect e toggle de tema
│   │   ├── Hero.jsx            # Hero com contadores animados e gráficos
│   │   ├── Services.jsx        # Cards de funcionalidades com hover
│   │   ├── Reviews.jsx         # Avaliações com rating médio
│   │   ├── FAQ.jsx             # Acordeão com animação real
│   │   ├── Contact.jsx         # Formulário de contato
│   │   └── Footer.jsx          # Footer com 4 colunas
│   │
│   ├── dashboard/
│   │   ├── Header.jsx          # Header com notificações, engrenagem e perfil
│   │   ├── Sidebar.jsx         # Sidebar colapsável com NavLink ativo
│   │   ├── Breadcrumb.jsx      # Navegação por caminho
│   │   └── EmptyState.jsx      # Estado vazio reutilizável
│   │
│   └── cadastro/
│       ├── ProdutoForm.jsx     # Formulário com cálculo de margem em tempo real
│       ├── FornecedorForm.jsx  # Formulário com máscara de CNPJ
│       ├── ClienteForm.jsx     # Formulário com CPF/CNPJ dinâmico
│       └── UsuarioForm.jsx     # Formulário com toggle de status
│
├── context/
│   └── ThemeContext.jsx        # Context API para dark/light mode global
│
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── Cadastro.jsx
│   └── WorkInProgress.jsx
│
├── styles/
│   ├── Cadastro.module.css
│   ├── Auth.module.css
│   └── WorkInProgress.module.css
│
├── App.jsx
├── main.jsx
├── index.css                   # Variáveis CSS para dark/light mode
└── index.html                  # Fontes Google: Syne + DM Sans
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 16 ou superior
- npm instalado

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Pedrinhopb/Criar_Servi-os_Web_Rest.git

# 2. Acesse a pasta
cd Criar_Servi-os_Web_Rest

# 3. Instale as dependências
npm install

# 4. Inicie o servidor
npm run dev

# 5. Acesse no navegador
# http://localhost:5173
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run preview` | Visualiza o build localmente |

---

## 🔀 Rotas da Aplicação

| Rota | Página | Acesso |
|---|---|---|
| `/` | Landing Page | Público |
| `/login` | Login | Público |
| `/register` | Cadastro de conta | Público |
| `/cadastro` | Gestão de cadastros | 🔒 Autenticado |
| `/dashboard` | Dashboard | 🔒 Em desenvolvimento |
| `/relatorios` | Relatórios | 🔒 Em desenvolvimento |
| `/administrativo` | Administrativo | 🔒 Em desenvolvimento |
| `/estoque` | Estoque | 🔒 Em desenvolvimento |
| `/financeiro` | Financeiro | 🔒 Em desenvolvimento |
| `/ajuda` | Ajuda | 🔒 Em desenvolvimento |

---

## 📌 Próximos Passos

- [ ] Backend com **Node.js + Express**
- [ ] Banco de dados **MongoDB**
- [ ] Autenticação real com **JWT**
- [ ] API REST completa para todas as entidades
- [ ] Módulo de Estoque com movimentações
- [ ] Módulo Financeiro com fluxo de caixa
- [ ] Upload de foto de produtos
- [ ] Notificações em tempo real
- [ ] Exportação de relatórios em PDF/Excel

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

<div align="center">
  Feito com 💚 por Pedro Paulo e Maria Eduarda — Campina Grande, PB
</div>
