import React, { useMemo, useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import EmptyState from '../components/dashboard/EmptyState'
import ProdutoForm from '../components/cadastro/ProdutoForm'
import FornecedorForm from '../components/cadastro/FornecedorForm'
import ClienteForm from '../components/cadastro/ClienteForm'
import UsuarioForm from '../components/cadastro/UsuarioForm'
import styles from '../styles/Cadastro.module.css'

const tabLabels     = { produtos: 'Produtos', fornecedores: 'Fornecedores', clientes: 'Clientes', usuarios: 'Usuários' }
const searchLabels  = { produtos: 'Buscar produto, fornecedor ou código', fornecedores: 'Buscar fornecedor, CNPJ ou e-mail', clientes: 'Buscar cliente, CPF/CNPJ ou telefone', usuarios: 'Buscar usuário, cargo ou e-mail' }
const singularLabels= { produtos: 'produto', fornecedores: 'fornecedor', clientes: 'cliente', usuarios: 'usuário' }
const modalTitles   = { produtos: 'Novo Produto', fornecedores: 'Novo Fornecedor', clientes: 'Novo Cliente', usuarios: 'Novo Usuário' }
const tabIcons      = { produtos: '📦', fornecedores: '🏭', clientes: '👤', usuarios: '🔐' }

const initialProdutos = [
  { id: 1, nome: 'Whey Protein 1kg',  codigo: '7891234560001', categoria: 'Suplementos', fornecedor: 'NutriMax',    custo: 89.9,  margem: 45, venda: 163.45, estoque: 3,  estoqueMinimo: 5,  unidade: 'un'  },
  { id: 2, nome: 'Fone Bluetooth XR', codigo: '7891234560002', categoria: 'Eletrônicos', fornecedor: 'TechDistrib', custo: 45.0,  margem: 55, venda: 100.0,  estoque: 28, estoqueMinimo: 10, unidade: 'un'  },
  { id: 3, nome: 'Caderno A4 200fls', codigo: '7891234560003', categoria: 'Papelaria',   fornecedor: 'PaperBR',     custo: 12.0,  margem: 40, venda: 20.0,   estoque: 22, estoqueMinimo: 15, unidade: 'un'  },
  { id: 4, nome: 'Tênis Runner Pro',  codigo: '7891234560004', categoria: 'Calçados',    fornecedor: 'SportCo',     custo: 120.0, margem: 50, venda: 240.0,  estoque: 8,  estoqueMinimo: 12, unidade: 'par' },
  { id: 5, nome: 'Mochila Urban 30L', codigo: '7891234560005', categoria: 'Acessórios',  fornecedor: 'BagWorld',    custo: 75.0,  margem: 48, venda: 144.23, estoque: 6,  estoqueMinimo: 8,  unidade: 'un'  },
]
const initialFornecedores = [
  { id: 1, nome: 'NutriMax Distribuidora',  cnpj: '12.345.678/0001-90', telefone: '(11) 9 8888-1111', email: 'contato@nutrimax.com',  prazo: '5 dias'  },
  { id: 2, nome: 'TechDistrib Eletrônicos', cnpj: '23.456.789/0001-01', telefone: '(21) 9 7777-2222', email: 'vendas@techdistrib.com', prazo: '7 dias'  },
  { id: 3, nome: 'PaperBR Papelaria',       cnpj: '34.567.890/0001-12', telefone: '(31) 9 6666-3333', email: 'papel@paperbr.com',     prazo: '3 dias'  },
  { id: 4, nome: 'SportCo Calçados',        cnpj: '45.678.901/0001-23', telefone: '(41) 9 5555-4444', email: 'sport@sportco.com',     prazo: '10 dias' },
]
const initialClientes = [
  { id: 1, nome: 'Ana Beatriz Santos',  documento: '123.456.789-00',     telefone: '(83) 9 9111-2222', email: 'ana@email.com',    compras: 8,  ultimoPedido: 'Hoje'           },
  { id: 2, nome: 'Pedro Henrique Lima', documento: '234.567.890-11',     telefone: '(83) 9 9222-3333', email: 'pedro@email.com',  compras: 3,  ultimoPedido: 'Ontem'          },
  { id: 3, nome: 'Julia Fernandes',     documento: '345.678.901-22',     telefone: '(83) 9 9333-4444', email: 'julia@email.com',  compras: 15, ultimoPedido: '3 dias atrás'   },
  { id: 4, nome: 'Marcos Oliveira',     documento: '67.890.123/0001-45', telefone: '(83) 9 9444-5555', email: 'marcos@email.com', compras: 2,  ultimoPedido: '1 semana atrás' },
]
const initialUsuarios = [
  { id: 1, nome: 'João Silva',    email: 'js@stockeasy.com', cargo: 'Administrador', permissao: 'Administrador', status: 'Ativo',   ultimoAcesso: 'Hoje, 09:14'  },
  { id: 2, nome: 'Mariana Costa', email: 'mc@stockeasy.com', cargo: 'Operador',      permissao: 'Operador',      status: 'Ativo',   ultimoAcesso: 'Hoje, 08:50'  },
  { id: 3, nome: 'Rafael Mendes', email: 'rm@stockeasy.com', cargo: 'Operador',      permissao: 'Operador',      status: 'Ativo',   ultimoAcesso: 'Ontem, 17:32' },
  { id: 4, nome: 'Fernanda Lima', email: 'fl@stockeasy.com', cargo: 'Visualizador',  permissao: 'Visualizador',  status: 'Inativo', ultimoAcesso: '3 dias atrás' },
  { id: 5, nome: 'Carlos Souza',  email: 'cs@stockeasy.com', cargo: 'Visualizador',  permissao: 'Visualizador',  status: 'Ativo',   ultimoAcesso: 'Hoje, 07:45'  },
]

function formatCurrency(v) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}

export default function Cadastro({ user, onLogout, sidebarAberta, onToggleSidebar, onFecharSidebar }) {
  const [activeTab, setActiveTab]       = useState('produtos')
  const [modalOpen, setModalOpen]       = useState(false)
  const [searchTerm, setSearchTerm]     = useState('')
  const [produtos, setProdutos]         = useState(initialProdutos)
  const [fornecedores, setFornecedores] = useState(initialFornecedores)
  const [clientes, setClientes]         = useState(initialClientes)
  const [usuarios, setUsuarios]         = useState(initialUsuarios)

  const filteredProdutos     = useMemo(() => produtos.filter(p     => [p.nome, p.codigo, p.categoria, p.fornecedor].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))), [produtos, searchTerm])
  const filteredFornecedores = useMemo(() => fornecedores.filter(f => [f.nome, f.cnpj, f.email, f.telefone].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),        [fornecedores, searchTerm])
  const filteredClientes     = useMemo(() => clientes.filter(c     => [c.nome, c.documento, c.email, c.telefone].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),   [clientes, searchTerm])
  const filteredUsuarios     = useMemo(() => usuarios.filter(u     => [u.nome, u.email, u.cargo].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),                    [usuarios, searchTerm])

  const counts      = { produtos: produtos.length, fornecedores: fornecedores.length, clientes: clientes.length, usuarios: usuarios.length }
  const currentItems= { produtos: filteredProdutos, fornecedores: filteredFornecedores, clientes: filteredClientes, usuarios: filteredUsuarios }[activeTab]

  function handleSave(type, item) {
    if (type === 'produto')    setProdutos(prev     => [{ id: Date.now(), ...item }, ...prev])
    if (type === 'fornecedor') setFornecedores(prev => [{ id: Date.now(), ...item }, ...prev])
    if (type === 'cliente')    setClientes(prev     => [{ id: Date.now(), compras: 0, ultimoPedido: 'Hoje', ...item }, ...prev])
    if (type === 'usuario')    setUsuarios(prev     => [{ id: Date.now(), ultimoAcesso: 'Agora', ...item }, ...prev])
    setModalOpen(false)
  }

  return (
    <div className={styles.cadastro}>
      <Sidebar aberta={sidebarAberta} onFechar={onFecharSidebar} onLogout={onLogout} onToggle={onToggleSidebar} />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Cadastro</h1>
          <p className={styles.pageSubtitle}>Gerencie produtos, fornecedores, clientes e usuários</p>
        </div>

        {/* abas */}
        <div className={styles.tabs}>
          {Object.entries(tabLabels).map(([key, label]) => (
            <button key={key} type="button"
              className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
              onClick={() => { setActiveTab(key); setSearchTerm('') }}
            >
              <span>{label}</span>
              <span className={styles.tabCount}>{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* barra de ações */}
        <div className={styles.actions}>
          <input
            className={styles.searchInput}
            placeholder={searchLabels[activeTab]}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className={styles.btnNew} type="button" onClick={() => setModalOpen(true)}>
            + Novo {singularLabels[activeTab]}
          </button>
        </div>

        {/* tabela */}
        <div className={styles.tableContainer}>
          {currentItems.length === 0 ? (
            <EmptyState
              icone={tabIcons[activeTab]}
              titulo={`Nenhum ${singularLabels[activeTab]} encontrado`}
              descricao={`Cadastre seu primeiro ${singularLabels[activeTab]}.`}
              labelBotao={`+ Novo ${singularLabels[activeTab]}`}
              onBotao={() => setModalOpen(true)}
            />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {activeTab === 'produtos'     && ['Produto','Cód. Barras','Categoria','Fornecedor','Custo','Margem','Venda','Estoque','Ações'].map(h => <th key={h}>{h}</th>)}
                  {activeTab === 'fornecedores' && ['Nome / Razão Social','CNPJ','Telefone','E-mail','Prazo','Ações'].map(h => <th key={h}>{h}</th>)}
                  {activeTab === 'clientes'     && ['Nome','CPF/CNPJ','Telefone','E-mail','Compras','Último pedido','Ações'].map(h => <th key={h}>{h}</th>)}
                  {activeTab === 'usuarios'     && ['Usuário','Cargo','Permissão','Status','Último acesso','Ações'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'produtos' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productIcon}>📦</div>
                        <div className={styles.productDetails}>
                          <span className={styles.productName}>{item.nome}</span>
                          <span className={styles.productUnit}>{item.unidade}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.codigo}</td>
                    <td>{item.categoria}</td>
                    <td>{item.fornecedor}</td>
                    <td>{formatCurrency(item.custo)}</td>
                    <td>{item.margem}%</td>
                    <td>{formatCurrency(item.venda)}</td>
                    <td>
                      <span className={item.estoque <= item.estoqueMinimo ? styles.lowStock : ''}>{item.estoque}</span>
                      {item.estoque <= item.estoqueMinimo && <span className={styles.lowStockBadge}>Baixo</span>}
                    </td>
                    <td>
                      <button className={`${styles.btnAction} ${styles.btnEdit}`}   data-tooltip="Editar">✏️</button>
                      <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'fornecedores' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.nome}</td><td>{item.cnpj}</td><td>{item.telefone}</td><td>{item.email}</td><td>{item.prazo}</td>
                    <td>
                      <button className={`${styles.btnAction} ${styles.btnEdit}`}   data-tooltip="Editar">✏️</button>
                      <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'clientes' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.nome}</td><td>{item.documento}</td><td>{item.telefone}</td><td>{item.email}</td>
                    <td><span className={styles.purchaseBadge}>{item.compras} compras</span></td>
                    <td>{item.ultimoPedido}</td>
                    <td>
                      <button className={`${styles.btnAction} ${styles.btnEdit}`}   data-tooltip="Editar">✏️</button>
                      <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'usuarios' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>{item.nome.split(' ').map(w => w[0]).join('').slice(0,2)}</div>
                        <div className={styles.userDetails}>
                          <span className={styles.userName}>{item.nome}</span>
                          <span className={styles.userEmail}>{item.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{item.cargo}</td>
                    <td>
                      <span className={item.permissao === 'Administrador' ? styles.pillGreen : item.permissao === 'Operador' ? styles.pillAmber : styles.pillGray}>
                        {item.permissao}
                      </span>
                    </td>
                    <td>
                      <span className={item.status === 'Ativo' ? styles.pillGreen : styles.pillRed}>{item.status}</span>
                    </td>
                    <td>{item.ultimoAcesso}</td>
                    <td>
                      <button className={`${styles.btnAction} ${styles.btnEdit}`}   data-tooltip="Editar">✏️</button>
                      <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal — formulário da aba ativa */}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitles[activeTab]}>
          {activeTab === 'produtos'     && <ProdutoForm     fornecedores={fornecedores} onSave={item => handleSave('produto', item)}    onCancel={() => setModalOpen(false)} />}
          {activeTab === 'fornecedores' && <FornecedorForm                             onSave={item => handleSave('fornecedor', item)} onCancel={() => setModalOpen(false)} />}
          {activeTab === 'clientes'     && <ClienteForm                                onSave={item => handleSave('cliente', item)}    onCancel={() => setModalOpen(false)} />}
          {activeTab === 'usuarios'     && <UsuarioForm                                onSave={item => handleSave('usuario', item)}    onCancel={() => setModalOpen(false)} />}
        </Modal>
      </main>
    </div>
  )
}