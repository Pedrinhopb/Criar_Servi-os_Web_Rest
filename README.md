# 📦 StockEasy — Sistema de Controle de Estoque

> Plataforma SaaS moderna para gestão de estoque de pequenas e médias empresas.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧑‍💻 Integrantes

| Nome |
|------|
| Pedro Paulo de Vasconcelos |
| Maria Eduarda Bandeira Eloy |

---

## 🎯 Sobre o Projeto

O **StockEasy** é uma aplicação web full stack desenvolvida para facilitar o controle de estoque de empresas de pequeno e médio porte. O sistema segue o modelo **SaaS (Software as a Service)** com foco em usabilidade, organização e experiência do usuário.

A plataforma conta com **frontend em React** integrado a um **backend Node.js + Express + MongoDB Atlas**, oferecendo uma interface moderna com suporte a **tema claro e escuro**, animações, contadores dinâmicos e um painel interno completo.

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
| **LocalStorage** | Persistência de autenticação e tema |

### Backend
| Tecnologia | Uso |
|---|---|
| **Node.js** | Ambiente de execução JavaScript no servidor |
| **Express** | Framework para criação das rotas da API REST |
| **Mongoose** | ODM para comunicação com o MongoDB |
| **MongoDB Atlas** | Banco de dados na nuvem |
| **dotenv** | Gerenciamento de variáveis de ambiente |
| **cors** | Permissão de requisições cross-origin |
| **nodemon** | Reinício automático do servidor em desenvolvimento |

---

## 🧪 Usuário de Teste

```
📧 Email: admin@hotmail.com
🔑 Senha: admin
```

---

## 🖥️ Telas Desenvolvidas

### 🏠 Landing Page
- Hero com preview do dashboard animado e contadores em tempo real
- Seção de números impactantes (+500 empresas, 98% satisfação)
- Cards de funcionalidades com hover animado e brilho colorido
- Avaliações com rating médio calculado
- FAQ com acordeão animado por `scrollHeight`
- Formulário de contato
- Footer com 4 colunas
- Toggle de tema claro/escuro na navbar

### 🔐 Login
- Autenticação integrada com o backend
- Fallback para credencial de teste quando offline
- Mostrar/esconder senha
- Validação de campos

### 📝 Cadastro de Conta
- Formulário com validação completa
- Barra de força de senha
- Checkbox de termos de uso

### 📋 Cadastro (Área Interna)
- **Header** com notificações, engrenagem de configurações e perfil do usuário
- **Sidebar** colapsável com tooltips e navegação ativa
- **4 abas** com ícones e contadores: Produtos · Fornecedores · Clientes · Usuários
- Cards de resumo clicáveis com alertas de estoque baixo
- Busca em tempo real com botão limpar
- Tabela com zebra striping, hover e linha vermelha para estoque crítico
- Modal de cadastro com formulário específico por aba
- Confirmação antes de excluir qualquer item
- Toast de feedback após salvar ou excluir
- Aviso visual quando o backend está offline
- **Integração completa com a API REST**

### 🚧 Em Desenvolvimento
- Dashboard · Relatórios · Administrativo · Estoque · Financeiro · Ajuda

---

## 🌙 Dark / Light Mode

Suporte completo a tema escuro e claro em todas as telas. A preferência é salva no `localStorage` e aplicada automaticamente. O toggle fica na navbar da landing page e na engrenagem do painel interno.

---

## 📁 Estrutura do Projeto

```
stockeasy/
├── Criar_Servi-os_Web_Rest/          ← Frontend React
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/              ← Navbar, Hero, Services, Reviews, FAQ, Contact, Footer
│   │   │   ├── dashboard/            ← Header, Sidebar, Breadcrumb, EmptyState
│   │   │   └── cadastro/             ← ProdutoForm, FornecedorForm, ClienteForm, UsuarioForm
│   │   ├── context/
│   │   │   └── ThemeContext.jsx      ← Dark/Light mode global
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── Cadastro.jsx          ← integrado com API
│   │   │   └── WorkInProgress.jsx
│   │   ├── services/
│   │   │   └── api.js                ← centraliza todas as chamadas à API
│   │   ├── styles/
│   │   │   ├── Cadastro.module.css
│   │   │   ├── Auth.module.css
│   │   │   └── WorkInProgress.module.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css                 ← variáveis CSS para dark/light mode
│   ├── index.html
│   └── package.json
│
└── stockEasy-backend/                ← Backend Node.js
    ├── src/
    │   ├── config/
    │   │   └── db.js                 ← conexão MongoDB Atlas com reconexão automática
    │   ├── models/
    │   │   ├── Produto.js            ← calcula preço de venda automaticamente
    │   │   ├── Fornecedor.js
    │   │   ├── Cliente.js
    │   │   └── Usuario.js
    │   ├── controllers/
    │   │   ├── produtoController.js
    │   │   ├── fornecedorController.js
    │   │   ├── clienteController.js
    │   │   └── usuarioController.js
    │   ├── routes/
    │   │   ├── produtos.js
    │   │   ├── fornecedores.js
    │   │   ├── clientes.js
    │   │   └── usuarios.js
    │   ├── middlewares/
    │   │   └── logMiddleware.js      ← log de todas as requisições
    │   └── index.js                  ← servidor principal
    ├── .env                          ← string de conexão (não subir no Git)
    ├── .gitignore
    └── package.json
```

---

## 🔀 Rotas da API REST

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/produtos` | Listar produtos |
| POST | `/api/produtos` | Criar produto |
| PUT | `/api/produtos/:id` | Atualizar produto |
| DELETE | `/api/produtos/:id` | Remover produto |
| GET | `/api/fornecedores` | Listar fornecedores |
| POST | `/api/fornecedores` | Criar fornecedor |
| PUT | `/api/fornecedores/:id` | Atualizar fornecedor |
| DELETE | `/api/fornecedores/:id` | Remover fornecedor |
| GET | `/api/clientes` | Listar clientes |
| POST | `/api/clientes` | Criar cliente |
| PUT | `/api/clientes/:id` | Atualizar cliente |
| DELETE | `/api/clientes/:id` | Remover cliente |
| GET | `/api/usuarios` | Listar usuários |
| POST | `/api/usuarios` | Criar usuário |
| PUT | `/api/usuarios/:id` | Atualizar usuário |
| DELETE | `/api/usuarios/:id` | Remover usuário |

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Node.js 16 ou superior
- Conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (gratuito)

### Frontend

```bash
cd Criar_Servi-os_Web_Rest
npm install
npm run dev
# acesse http://localhost:5173
```

### Backend

```bash
cd stockEasy-backend
npm install
```

Configure o `.env`:
```
PORT=3000
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/stockeasy?appName=stockEasy
```

```bash
npm run dev
# acesse http://localhost:3000
```

### Testar no Postman

```
GET    http://localhost:3000/api/produtos
POST   http://localhost:3000/api/produtos   (Body → raw → JSON)
PUT    http://localhost:3000/api/produtos/:id
DELETE http://localhost:3000/api/produtos/:id
```

---

## 🔀 Rotas do Frontend

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

## 🎨 Identidade Visual

| Variável | Claro | Escuro |
|---|---|---|
| Fundo página | `#f4f6f8` | `#0a0f0c` |
| Fundo card | `#ffffff` | `#111a14` |
| Verde principal | `#1a7a4a` | `#22a860` |
| Verde pálido | `#e6f5ee` | `rgba(34,168,96,0.15)` |
| Texto título | `#0f1a14` | `#e8f5ee` |
| Texto suave | `#5a7566` | `#7a9e88` |
| Fonte títulos | **Syne 800** | **Syne 800** |
| Fonte corpo | **DM Sans** | **DM Sans** |

---

## 📌 Próximos Passos

- [ ] Autenticação real com JWT
- [ ] Módulo de Estoque com movimentações
- [ ] Módulo Financeiro com fluxo de caixa
- [ ] Upload de foto de produtos
- [ ] Dashboard com gráficos reais
- [ ] Exportação de relatórios em PDF/Excel
- [ ] Deploy em produção

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos — Curso de Desenvolvimento Web.
