# 📦 StockEasy — Sistema de Controle de Estoque

> Plataforma SaaS moderna para gestão de estoque de pequenas e médias empresas.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-autenticação-orange)
![BCrypt](https://img.shields.io/badge/BCrypt-criptografia-blue)

---

## 🧑‍💻 Integrantes

| Nome |
|------|
| Pedro Paulo de Vasconcelos |
| Maria Eduarda Bandeira Eloy |

---

## 🎯 Sobre o Projeto

O **StockEasy** é uma aplicação web full stack desenvolvida para facilitar o controle de estoque de empresas de pequeno e médio porte. O sistema segue o modelo **SaaS (Software as a Service)** com foco em usabilidade, organização e experiência do usuário.

A plataforma conta com **frontend em React** integrado a um **backend Node.js + Express + MongoDB Atlas**, com autenticação segura via **JWT** e senhas criptografadas com **BCrypt**.

---

## 🚀 Tecnologias Utilizadas

### Frontend
| Tecnologia | Uso |
|---|---|
| **React 18** | Biblioteca principal de UI |
| **Vite 5** | Bundler e servidor de desenvolvimento |
| **React Router DOM 6** | Roteamento e navegação |
| **CSS Modules** | Estilização por componente sem conflitos |
| **Context API** | Gerenciamento de tema global (dark/light mode) |

### Backend
| Tecnologia | Uso |
|---|---|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **Express** | Framework para criação das rotas da API REST |
| **Mongoose** | ODM para comunicação com o MongoDB |
| **MongoDB Atlas** | Banco de dados na nuvem |
| **JWT (jsonwebtoken)** | Autenticação segura com tokens |
| **BCrypt (bcryptjs)** | Criptografia de senhas |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **cors** | Permissão de requisições cross-origin |
| **nodemon** | Reinício automático do servidor em desenvolvimento |

---

## 🔐 Segurança

- Senhas criptografadas com **BCrypt** (10 rounds) — nunca salvas em texto puro
- Autenticação via **JWT** — token válido por 8 horas
- Todas as rotas da API são **protegidas** e exigem token válido
- Variáveis sensíveis (senha do banco, chave JWT) ficam no `.env` — nunca sobem para o GitHub
- Arquivo `.env.example` disponível para orientar a configuração

---

## 🧪 Credencial de Teste

```
📧 Email: admin@hotmail.com
🔑 Senha: admin123
```

---

## 🖥️ Telas Desenvolvidas

### 🏠 Landing Page
- Hero com preview do dashboard animado e contadores em tempo real
- Seção de serviços com números impactantes
- Avaliações com rating médio calculado
- FAQ com acordeão animado
- Formulário de contato
- Footer completo
- Toggle de tema claro/escuro

### 🔐 Login
- Autenticação real com JWT
- Senha criptografada com BCrypt
- Mostrar/esconder senha
- Validação de campos
- Sem opção de cadastro público — apenas admin cria usuários

### 📋 Cadastro (Área Interna)
- Header com notificações reais de estoque baixo (atualiza a cada 60s)
- Sidebar colapsável com navegação ativa
- **4 abas:** Produtos · Fornecedores · Clientes · Usuários
- CRUD completo integrado com MongoDB Atlas
- Validação de campos únicos (email, CNPJ, CPF, código de barras)
- Modal de criar e editar para cada entidade
- Confirmação antes de excluir
- Toast de feedback
- Busca em tempo real

### 📦 Estoque
- Visualização com 4 cards de resumo clicáveis (Total, Crítico, Baixo, Ok)
- Filtros por busca e categoria
- Tabela colorida por status de estoque
- Movimentação de estoque (Entrada e Saída)
- Preview visual da movimentação (Antes → Quantidade → Depois)
- Histórico de movimentações da sessão
- Valor total em estoque por produto

### 💼 Administrativo
- Cadastro de custos fixos mensais (salvos no MongoDB Atlas)
- Distribuição de custos por categoria com barras de progresso
- Volume médio de vendas e margem de lucro alvo (salvos no Atlas)
- Cálculo automático do custo fixo por produto
- Precificação sugerida — preço mínimo por produto com indicador de status

### 🌙 Dark / Light Mode
- Suporte completo em todas as telas
- Preferência salva no localStorage
- Toggle no dropdown do perfil

---

## 📁 Estrutura do Projeto

```
stockeasy/
├── Criar_Servi-os_Web_Rest/          ← Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/              ← Navbar, Hero, Services, Reviews, FAQ, Contact, Footer
│   │   │   ├── dashboard/            ← Header, Sidebar, EmptyState
│   │   │   └── cadastro/             ← ProdutoForm, FornecedorForm, ClienteForm, UsuarioForm
│   │   ├── context/
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Estoque.jsx
│   │   │   ├── Administrativo.jsx
│   │   │   └── WorkInProgress.jsx
│   │   ├── services/
│   │   │   └── api.js                ← todas as chamadas à API com JWT
│   │   ├── styles/
│   │   │   ├── Cadastro.module.css
│   │   │   ├── Estoque.module.css
│   │   │   ├── Administrativo.module.css
│   │   │   └── Auth.module.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── stockEasy-backend/                ← Backend Node.js
    ├── src/
    │   ├── config/
    │   │   └── db.js
    │   ├── models/
    │   │   ├── Usuario.js
    │   │   ├── Produto.js
    │   │   ├── Fornecedor.js
    │   │   ├── Cliente.js
    │   │   ├── CustoFixo.js
    │   │   └── Configuracao.js
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── usuarioController.js
    │   │   ├── produtoController.js
    │   │   ├── fornecedorController.js
    │   │   ├── clienteController.js
    │   │   ├── custoFixoController.js
    │   │   └── configuracaoController.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   ├── usuarios.js
    │   │   ├── produtos.js
    │   │   ├── fornecedores.js
    │   │   ├── clientes.js
    │   │   ├── custos.js
    │   │   └── configuracoes.js
    │   ├── middlewares/
    │   │   ├── authMiddleware.js     ← verifica JWT em todas as rotas
    │   │   └── logMiddleware.js
    │   └── index.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## 🔀 Rotas da API

### Autenticação (pública)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Login com email e senha |
| GET  | `/api/auth/me`    | Dados do usuário logado |

### Rotas protegidas (exigem token JWT)
| Método | Rota | Descrição |
|---|---|---|
| GET/POST | `/api/produtos` | Listar e criar produtos |
| GET/PUT/DELETE | `/api/produtos/:id` | Buscar, atualizar e remover |
| GET/POST | `/api/fornecedores` | Listar e criar fornecedores |
| GET/PUT/DELETE | `/api/fornecedores/:id` | Buscar, atualizar e remover |
| GET/POST | `/api/clientes` | Listar e criar clientes |
| GET/PUT/DELETE | `/api/clientes/:id` | Buscar, atualizar e remover |
| GET/POST | `/api/usuarios` | Listar e criar usuários |
| GET/PUT/DELETE | `/api/usuarios/:id` | Buscar, atualizar e remover |
| GET/POST | `/api/custos` | Listar e criar custos fixos |
| GET/PUT/DELETE | `/api/custos/:id` | Buscar, atualizar e remover |
| GET | `/api/configuracoes` | Listar configurações |
| PUT | `/api/configuracoes` | Salvar configuração |

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 16 ou superior
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)

### Backend

```bash
cd stockEasy-backend
npm install
```

Configure o `.env` a partir do `.env.example`:
```
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/stockeasy
JWT_SECRET=sua_chave_secreta_longa_aqui
```

```bash
npm run dev
```

### Frontend

```bash
cd Criar_Servi-os_Web_Rest
npm install
npm run dev
```

Acesse: `http://localhost:5173`

---

## 🔀 Rotas do Frontend

| Rota | Página | Acesso |
|---|---|---|
| `/` | Landing Page | Público |
| `/login` | Login | Público |
| `/cadastro` | Gestão de cadastros | 🔒 Autenticado |
| `/estoque` | Controle de estoque | 🔒 Autenticado |
| `/administrativo` | Custos e precificação | 🔒 Autenticado |
| `/dashboard` | Dashboard | 🔒 Em desenvolvimento |
| `/relatorios` | Relatórios | 🔒 Em desenvolvimento |
| `/financeiro` | Financeiro | 🔒 Em desenvolvimento |
| `/ajuda` | Ajuda | 🔒 Em desenvolvimento |

---

## 🎨 Identidade Visual

| Variável | Claro | Escuro |
|---|---|---|
| Fundo página | `#f4f6f8` | `#0a0f0c` |
| Fundo card | `#ffffff` | `#111a14` |
| Verde principal | `#1a7a4a` | `#22a860` |
| Fonte títulos | **Syne 800** | **Syne 800** |
| Fonte corpo | **DM Sans** | **DM Sans** |

---

## 📌 Próximos Passos

- [ ] Dashboard com gráficos e métricas reais
- [ ] Página de Relatórios
- [ ] Controle de acesso por perfil (RBAC)
- [ ] Upload de foto de produtos
- [ ] Deploy em produção

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos — Curso de Desenvolvimento Web REST.

---
