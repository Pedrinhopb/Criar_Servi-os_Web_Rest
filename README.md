<<<<<<< HEAD
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

A plataforma conta com **frontend em React** integrado a um **backend Node.js + Express + MongoDB Atlas**, com autenticação segura via **JWT** e senhas criptografadas com **BCrypt**, além de controle de acesso por perfil de usuário.
=======
# 📦 StockEasy – Sistema de Controle de Estoque

## 👨‍💻 Integrantes do Projeto
- Pedro Paulo de Vasconcelos  
- Maria Eduarda Eloi  

---

## 💡 Descrição do Sistema

O **StockEasy** é um sistema web desenvolvido para facilitar o controle de estoque de empresas de pequeno e médio porte.

A aplicação permite gerenciar produtos, clientes e relatórios de forma simples, moderna e eficiente, oferecendo uma interface intuitiva e responsiva.

O sistema segue o modelo **SaaS (Software as a Service)**, com foco em usabilidade, organização e experiência do usuário.
>>>>>>> bc3cef289ac649582f72ebd50294a2ae8a229217

---

## 🚀 Tecnologias Utilizadas

<<<<<<< HEAD
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
- **Controle de acesso por perfil (RBAC)**:
  - **Administrador** — acesso total ao sistema
  - **Operador** — pode criar e visualizar, não pode editar nem excluir
  - **Visualizador** — apenas leitura, sem permissão de escrita
- Variáveis sensíveis ficam no `.env` — nunca sobem para o GitHub

---

## 🧪 Credenciais de Teste

| Perfil | E-mail | Senha | Permissões |
|---|---|---|---|
| Administrador | admin@hotmail.com | admin123 | Acesso total |
| Visualizador  | vis@hotmail.com   | 123456   | Apenas leitura |
=======
- React.js  
- Vite  
- JavaScript (ES6+)  
- CSS3  
- React Router DOM  
- Framer Motion (animações)  
- LocalStorage (simulação de autenticação)  
>>>>>>> bc3cef289ac649582f72ebd50294a2ae8a229217

---

## 🖥️ Telas Desenvolvidas

<<<<<<< HEAD
### 🏠 Landing Page
- Hero com preview do dashboard animado
- Seção de serviços com números impactantes
- Avaliações com rating médio calculado
- FAQ com acordeão animado
- Formulário de contato e Footer completo
- Toggle de tema claro/escuro

### 🔐 Login
- Autenticação real com JWT + BCrypt
- Sem opção de cadastro público — apenas admin cria usuários
- Redirecionamento automático para o Dashboard após login

### 📊 Dashboard
- Saudação personalizada com nome do usuário
- Alertas de estoque em tempo real (produtos críticos e baixo)
- Resumo financeiro (valor estoque, receita, custos, lucro)
- Últimos 5 produtos cadastrados
- Resumo de cadastros (fornecedores, clientes, usuários, custos)

### 📋 Cadastro
- **4 abas:** Produtos · Fornecedores · Clientes · Usuários
- CRUD completo integrado com MongoDB Atlas
- Validação de campos únicos (email, CNPJ, CPF, código de barras)
- Modal de criar e editar para cada entidade
- Confirmação antes de excluir e toast de feedback
- Botões de ação ocultos para Visualizador

### 📦 Estoque
- Cards de resumo clicáveis (Total, Crítico, Baixo, Ok)
- Filtros por busca e categoria
- Tabela colorida por status de estoque
- Movimentação (Entrada e Saída) com preview visual
- Histórico de movimentações da sessão
- Valor total em estoque por produto

### 💼 Administrativo
- CRUD de custos fixos mensais (salvo no MongoDB Atlas)
- Volume médio de vendas e margem de lucro (salvos no Atlas)
- Distribuição de custos por categoria
- Precificação sugerida com preço mínimo por produto

### 💰 Financeiro
- Valor total em estoque
- Receita estimada e lucro bruto/líquido
- Alerta de produtos com preço abaixo do mínimo
- Estoque por categoria com valor e percentual
- Resumo de custos fixos

### 🌙 Dark / Light Mode
- Suporte completo em todas as telas
- Toggle no dropdown do perfil no header

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
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Cadastro.jsx
│   │   │   ├── Estoque.jsx
│   │   │   ├── Administrativo.jsx
│   │   │   ├── Financeiro.jsx
│   │   │   └── WorkInProgress.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── Dashboard.module.css
│   │   │   ├── Cadastro.module.css
│   │   │   ├── Estoque.module.css
│   │   │   ├── Administrativo.module.css
│   │   │   ├── Financeiro.module.css
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
    │   │   ├── authMiddleware.js
    │   │   └── logMiddleware.js
    │   └── index.js
    ├── .env.example
    ├── .gitignore
    └── package.json
```

---

## 🗄️ Modelagem do Banco de Dados

### Usuario
| Campo | Tipo | Descrição |
|---|---|---|
| nome | String | Nome completo |
| email | String (único) | E-mail de acesso |
| senha | String | Hash BCrypt |
| cargo | String | Cargo na empresa |
| permissao | Enum | Administrador / Operador / Visualizador |
| status | Enum | Ativo / Inativo |

### Produto
| Campo | Tipo | Descrição |
|---|---|---|
| nome | String | Nome do produto |
| codigoBarras | String (único) | Código de barras |
| categoria | String | Categoria do produto |
| unidade | String | Unidade de medida |
| fornecedor | String | Nome do fornecedor vinculado |
| custo | Number | Preço de custo |
| margem | Number | Markup percentual |
| venda | Number | Preço de venda calculado |
| estoque | Number | Quantidade em estoque |
| estoqueMinimo | Number | Estoque mínimo ideal |

### Fornecedor
| Campo | Tipo | Descrição |
|---|---|---|
| nome | String | Razão social |
| cnpj | String (único) | CNPJ |
| telefone | String | Telefone |
| email | String | E-mail |
| endereco | String | Endereço completo |
| cidade | String | Cidade |
| estado | String | Estado |
| prazoEntrega | Number | Prazo em dias |

### Cliente
| Campo | Tipo | Descrição |
|---|---|---|
| nome | String | Nome completo |
| tipo | Enum | Pessoa Física / Pessoa Jurídica |
| documento | String (único) | CPF ou CNPJ |
| telefone | String | Telefone |
| email | String | E-mail |
| endereco | String | Endereço |
| cidade | String | Cidade |
| estado | String | Estado |
| totalCompras | Number | Contador de compras |

### CustoFixo
| Campo | Tipo | Descrição |
|---|---|---|
| nome | String | Descrição do custo |
| categoria | String | Categoria (Infraestrutura, Pessoal...) |
| valor | Number | Valor mensal |

### Configuracao
| Campo | Tipo | Descrição |
|---|---|---|
| chave | String (único) | Nome da configuração |
| valor | Mixed | Valor da configuração |

---

## 🔀 Rotas da API

### Autenticação (pública)
| Método | Rota | Descrição |
|---|---|---|
| POST | `/api/auth/login` | Login com email e senha → retorna JWT |
| GET  | `/api/auth/me`    | Dados do usuário logado |

### Rotas protegidas por JWT

| Método | Rota | Admin | Operador | Visualizador |
|---|---|---|---|---|
| GET | `/api/produtos` | ✅ | ✅ | ✅ |
| POST | `/api/produtos` | ✅ | ✅ | ❌ |
| PUT/DELETE | `/api/produtos/:id` | ✅ | ✅ | ❌ |
| GET | `/api/fornecedores` | ✅ | ✅ | ✅ |
| POST | `/api/fornecedores` | ✅ | ✅ | ❌ |
| PUT/DELETE | `/api/fornecedores/:id` | ✅ | ✅ | ❌ |
| GET | `/api/clientes` | ✅ | ✅ | ✅ |
| POST | `/api/clientes` | ✅ | ✅ | ❌ |
| PUT/DELETE | `/api/clientes/:id` | ✅ | ✅ | ❌ |
| GET | `/api/usuarios` | ✅ | ✅ | ✅ |
| POST/PUT/DELETE | `/api/usuarios/:id` | ✅ | ❌ | ❌ |
| GET | `/api/custos` | ✅ | ✅ | ✅ |
| POST/PUT/DELETE | `/api/custos/:id` | ✅ | ✅ | ❌ |
| GET | `/api/configuracoes` | ✅ | ✅ | ✅ |
| PUT | `/api/configuracoes` | ✅ | ✅ | ❌ |
=======
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

>>>>>>> bc3cef289ac649582f72ebd50294a2ae8a229217

---

## ⚙️ Como Rodar o Projeto

<<<<<<< HEAD
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
# Servidor rodando em http://localhost:3000
```

### Frontend

```bash
cd Criar_Servi-os_Web_Rest
npm install
npm run dev
# Acesse http://localhost:5173
```

---

## 🔀 Rotas do Frontend

| Rota | Página | Acesso |
|---|---|---|
| `/` | Landing Page | Público |
| `/login` | Login | Público |
| `/dashboard` | Dashboard geral | 🔒 Autenticado |
| `/cadastro` | Gestão de cadastros | 🔒 Autenticado |
| `/estoque` | Controle de estoque | 🔒 Autenticado |
| `/administrativo` | Custos e precificação | 🔒 Autenticado |
| `/financeiro` | Visão financeira | 🔒 Autenticado |
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

- [ ] Dashboard com gráficos visuais
- [ ] Upload de foto de produtos
- [ ] Página de Ajuda
- [ ] Deploy em produção




=======
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
>>>>>>> bc3cef289ac649582f72ebd50294a2ae8a229217
