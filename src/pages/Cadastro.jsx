import React, { useMemo, useState } from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import EmptyState from '../components/dashboard/EmptyState'
import ProdutoForm from '../components/cadastro/ProdutoForm'
import FornecedorForm from '../components/cadastro/FornecedorForm'
import ClienteForm from '../components/cadastro/ClienteForm'
import UsuarioForm from '../components/cadastro/UsuarioForm'
import styles from '../styles/Cadastro.module.css'

const tabLabels = {
  produtos: 'Produtos',
  fornecedores: 'Fornecedores',
  clientes: 'Clientes',
  usuarios: 'Usuários',
}

const searchLabels = {
  produtos: 'Buscar produto, fornecedor ou código',
  fornecedores: 'Buscar fornecedor, CNPJ ou e-mail',
  clientes: 'Buscar cliente, CPF/CNPJ ou telefone',
  usuarios: 'Buscar usuário, cargo ou e-mail',
}

const cadastroTypeLabels = {
  produto: 'Produto',
  fornecedor: 'Fornecedor',
  cliente: 'Cliente',
  usuario: 'Usuário',
}

const sectionLabel = {
  dashboard: 'Dashboard',
  estoque: 'Estoque',
  relatorios: 'Relatórios',
  administrativo: 'Administrativo',
  cadastro: 'Cadastro',
  financeiro: 'Financeiro',
  ajuda: 'Ajuda',
}

const initialProdutos = [
  { id: 1, nome: 'Whey Protein 1kg', codigo: '7891234560001', categoria: 'Suplementos', fornecedor: 'NutriMax', custo: 89.9, margem: 45, venda: 163.45, estoque: 3, estoqueMinimo: 5, unidade: 'un' },
  { id: 2, nome: 'Fone Bluetooth XR', codigo: '7891234560002', categoria: 'Eletrônicos', fornecedor: 'TechDistrib', custo: 45.0, margem: 55, venda: 100.0, estoque: 28, estoqueMinimo: 10, unidade: 'un' },
  { id: 3, nome: 'Caderno A4 200fls', codigo: '7891234560003', categoria: 'Papelaria', fornecedor: 'PaperBR', custo: 12.0, margem: 40, venda: 20.0, estoque: 22, estoqueMinimo: 15, unidade: 'un' },
  { id: 4, nome: 'Tênis Runner Pro', codigo: '7891234560004', categoria: 'Calçados', fornecedor: 'SportCo', custo: 120.0, margem: 50, venda: 240.0, estoque: 8, estoqueMinimo: 12, unidade: 'par' },
  { id: 5, nome: 'Mochila Urban 30L', codigo: '7891234560005', categoria: 'Acessórios', fornecedor: 'BagWorld', custo: 75.0, margem: 48, venda: 144.23, estoque: 6, estoqueMinimo: 8, unidade: 'un' },
]

const initialFornecedores = [
  { id: 1, nome: 'NutriMax Distribuidora', cnpj: '12.345.678/0001-90', telefone: '(11) 9 8888-1111', email: 'contato@nutrimax.com', prazo: '5 dias' },
  { id: 2, nome: 'TechDistrib Eletrônicos', cnpj: '23.456.789/0001-01', telefone: '(21) 9 7777-2222', email: 'vendas@techdistrib.com', prazo: '7 dias' },
  { id: 3, nome: 'PaperBR Papelaria', cnpj: '34.567.890/0001-12', telefone: '(31) 9 6666-3333', email: 'papel@paperbr.com', prazo: '3 dias' },
  { id: 4, nome: 'SportCo Calçados', cnpj: '45.678.901/0001-23', telefone: '(41) 9 5555-4444', email: 'sport@sportco.com', prazo: '10 dias' },
]

const initialClientes = [
  { id: 1, nome: 'Ana Beatriz Santos', documento: '123.456.789-00', telefone: '(83) 9 9111-2222', email: 'ana@email.com', compras: 8, ultimoPedido: 'Hoje', tipo: 'Pessoa Física', endereco: 'Rua das Flores, 123', cidade: 'João Pessoa', estado: 'PB' },
  { id: 2, nome: 'Pedro Henrique Lima', documento: '234.567.890-11', telefone: '(83) 9 9222-3333', email: 'pedro@email.com', compras: 3, ultimoPedido: 'Ontem', tipo: 'Pessoa Física', endereco: 'Av. Central, 40', cidade: 'Campina Grande', estado: 'PB' },
  { id: 3, nome: 'Julia Fernandes', documento: '345.678.901-22', telefone: '(83) 9 9333-4444', email: 'julia@email.com', compras: 15, ultimoPedido: '3 dias atrás', tipo: 'Pessoa Física', endereco: 'Rua Principal, 99', cidade: 'Bayeux', estado: 'PB' },
  { id: 4, nome: 'Marcos Oliveira', documento: '67.890.123/0001-45', telefone: '(83) 9 9444-5555', email: 'marcos@email.com', compras: 2, ultimoPedido: '1 semana atrás', tipo: 'Pessoa Jurídica', endereco: 'Av. Empresarial, 210', cidade: 'Santa Rita', estado: 'PB' },
]

const initialUsuarios = [
  { id: 1, nome: 'João Silva', email: 'js@stockeasy.com', cargo: 'Administrador', permissao: 'Administrador', status: 'Ativo', ultimoAcesso: 'Hoje, 09:14' },
  { id: 2, nome: 'Mariana Costa', email: 'mc@stockeasy.com', cargo: 'Operador', permissao: 'Operador', status: 'Ativo', ultimoAcesso: 'Hoje, 08:50' },
  { id: 3, nome: 'Rafael Mendes', email: 'rm@stockeasy.com', cargo: 'Operador', permissao: 'Operador', status: 'Ativo', ultimoAcesso: 'Ontem, 17:32' },
  { id: 4, nome: 'Fernanda Lima', email: 'fl@stockeasy.com', cargo: 'Visualizador', permissao: 'Visualizador', status: 'Inativo', ultimoAcesso: '3 dias atrás' },
  { id: 5, nome: 'Carlos Souza', email: 'cs@stockeasy.com', cargo: 'Visualizador', permissao: 'Visualizador', status: 'Ativo', ultimoAcesso: 'Hoje, 07:45' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export default function Cadastro({ user, onLogout, sidebarAberta, onToggleSidebar, onFecharSidebar }) {
  const [activeSection, setActiveSection] = useState('cadastro')
  const [activeTab, setActiveTab] = useState('produtos')
  const [selectedCadastroType, setSelectedCadastroType] = useState('produto')
  const [cadastroFormVisible, setCadastroFormVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [produtos, setProdutos] = useState(initialProdutos)
  const [fornecedores, setFornecedores] = useState(initialFornecedores)
  const [clientes, setClientes] = useState(initialClientes)
  const [usuarios, setUsuarios] = useState(initialUsuarios)

  const filteredProdutos = useMemo(() => {
    return produtos.filter(item =>
      [item.nome, item.codigo, item.categoria, item.fornecedor].some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [produtos, searchTerm])

  const filteredFornecedores = useMemo(() => {
    return fornecedores.filter(item =>
      [item.nome, item.cnpj, item.email, item.telefone].some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [fornecedores, searchTerm])

  const filteredClientes = useMemo(() => {
    return clientes.filter(item =>
      [item.nome, item.documento, item.email, item.telefone].some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [clientes, searchTerm])

  const filteredUsuarios = useMemo(() => {
    return usuarios.filter(item =>
      [item.nome, item.email, item.cargo].some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [usuarios, searchTerm])

  const currentItems = {
    produtos: filteredProdutos,
    fornecedores: filteredFornecedores,
    clientes: filteredClientes,
    usuarios: filteredUsuarios,
  }[activeTab]

  const counts = {
    produtos: produtos.length,
    fornecedores: fornecedores.length,
    clientes: clientes.length,
    usuarios: usuarios.length,
  }

  const actionLabel = activeTab === 'produtos' ? 'produto' : activeTab === 'fornecedores' ? 'fornecedor' : activeTab === 'clientes' ? 'cliente' : 'usuário'

  function handleSave(type, item) {
    if (type === 'produto') {
      setProdutos(prev => [{ id: Date.now(), ...item }, ...prev])
    }
    if (type === 'fornecedor') setFornecedores(prev => [{ id: Date.now(), ...item }, ...prev])
    if (type === 'cliente') setClientes(prev => [{ id: Date.now(), compras: 0, ultimoPedido: 'Hoje', ...item }, ...prev])
    if (type === 'usuario') setUsuarios(prev => [{ id: Date.now(), ultimoAcesso: 'Agora', ...item }, ...prev])
  }

  return (
    <div className={styles.cadastro}>
      <Sidebar
        aberta={sidebarAberta}
        onFechar={onFecharSidebar}
        onLogout={onLogout}
        onToggle={onToggleSidebar}
        activeSection={activeSection}
        onChangeSection={setActiveSection}
      />

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{sectionLabel[activeSection]}</h1>
        </div>

        {activeSection !== 'cadastro' ? (
          <div className={styles.sectionPanel}>
            <div className={styles.sectionCard}>
              <span className={styles.sectionBadge}>Em desenvolvimento</span>
              <h2>{sectionLabel[activeSection]} em breve</h2>
              <p>Esta seção faz parte da navegação SPA interna. Em breve poderá ser acessada sem sair desta tela.</p>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.cadastroControls}>
              <div className={styles.controlTitle}>
                <h2>Escolha o tipo de cadastro</h2>
                <p>Use o painel abaixo para alternar entre produtos, fornecedores, clientes e usuários.</p>
              </div>
              {cadastroFormVisible && (
              <>
                <div className={styles.typeSelector}>
                  {Object.entries(cadastroTypeLabels).map(([type, label]) => (
                    <button
                      key={type}
                      type="button"
                      className={`${styles.typeButton} ${selectedCadastroType === type ? styles.activeType : ''}`}
                      onClick={() => setSelectedCadastroType(type)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

            {cadastroFormVisible ? (
              <section className={styles.formPanel}>
                <div className={styles.formPanelHeader}>
                  <div>
                    <h2>Cadastro de {cadastroTypeLabels[selectedCadastroType]}</h2>
                    <p>Formulário dinâmico para registrar novos itens de forma rápida e organizada.</p>
                  </div>
                </div>
              <div className={styles.formPanelBody}>
                {selectedCadastroType === 'produto' && (
                  <ProdutoForm
                    fornecedores={fornecedores}
                    onSave={item => {
                      handleSave('produto', item)
                      setCadastroFormVisible(false)
                    }}
                    onCancel={() => setCadastroFormVisible(false)}
                  />
                )}
                {selectedCadastroType === 'fornecedor' && (
                  <FornecedorForm
                    onSave={item => {
                      handleSave('fornecedor', item)
                      setCadastroFormVisible(false)
                    }}
                    onCancel={() => setCadastroFormVisible(false)}
                  />
                )}
                {selectedCadastroType === 'cliente' && (
                  <ClienteForm
                    onSave={item => {
                      handleSave('cliente', item)
                      setCadastroFormVisible(false)
                    }}
                    onCancel={() => setCadastroFormVisible(false)}
                  />
                )}
                {selectedCadastroType === 'usuario' && (
                  <UsuarioForm
                    onSave={item => {
                      handleSave('usuario', item)
                      setCadastroFormVisible(false)
                    }}
                    onCancel={() => setCadastroFormVisible(false)}
                  />
                )}
              </div>
            </section>
            ) : (
              <div className={styles.newFormNotice}>
                Clique em <strong>+ Novo {actionLabel}</strong> para abrir o formulário de cadastro.
              </div>
            )}

            <div className={styles.tabs}>
              {Object.entries(tabLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
                  onClick={() => {
                    setActiveTab(key)
                    setCadastroFormVisible(false)
                  }}
                >
                  <span>{label}</span>
                  <span className={styles.tabCount}>{counts[key]}</span>
                </button>
              ))}
            </div>

            <div className={styles.actions}>
              <input
                className={styles.searchInput}
                placeholder={searchLabels[activeTab]}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button
                className={styles.btnNew}
                type="button"
                onClick={() => {
                  const tabType = activeTab === 'produtos'
                    ? 'produto'
                    : activeTab === 'fornecedores'
                      ? 'fornecedor'
                      : activeTab === 'clientes'
                        ? 'cliente'
                        : 'usuario'
                  setSelectedCadastroType(tabType)
                  setCadastroFormVisible(true)
                }}
              >
                + Novo {actionLabel}
              </button>
            </div>

            <div className={styles.tableContainer}>
              {currentItems.length === 0 ? (
                <EmptyState
                  icone={activeTab === 'produtos' ? '📦' : activeTab === 'fornecedores' ? '🏭' : activeTab === 'clientes' ? '👤' : '🔐'}
                  titulo={activeTab === 'produtos' ? 'Nenhum produto encontrado' : activeTab === 'fornecedores' ? 'Nenhum fornecedor encontrado' : activeTab === 'clientes' ? 'Nenhum cliente encontrado' : 'Nenhum usuário encontrado'}
                  descricao={activeTab === 'produtos' ? 'Cadastre seu primeiro produto.' : activeTab === 'fornecedores' ? 'Cadastre seu primeiro fornecedor.' : activeTab === 'clientes' ? 'Cadastre seu primeiro cliente.' : 'Cadastre o primeiro usuário do sistema.'}
                  labelBotao={`+ Novo ${actionLabel}`}
                  onBotao={() => {
                    const tabType = activeTab === 'produtos'
                      ? 'produto'
                      : activeTab === 'fornecedores'
                        ? 'fornecedor'
                        : activeTab === 'clientes'
                          ? 'cliente'
                          : 'usuario'
                    setSelectedCadastroType(tabType)
                    setCadastroFormVisible(true)
                  }}
                />
              ) : (
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {activeTab === 'produtos' && [
                        'Produto', 'Cód. Barras', 'Categoria', 'Fornecedor', 'Custo', 'Margem', 'Venda', 'Estoque', 'Ações'
                      ].map(head => <th key={head}>{head}</th>)}
                      {activeTab === 'fornecedores' && [
                        'Nome/Razão Social', 'CNPJ', 'Telefone', 'E-mail', 'Prazo Entrega', 'Ações'
                      ].map(head => <th key={head}>{head}</th>)}
                      {activeTab === 'clientes' && [
                        'Nome', 'CPF/CNPJ', 'Telefone', 'E-mail', 'Compras', 'Último pedido', 'Ações'
                      ].map(head => <th key={head}>{head}</th>)}
                      {activeTab === 'usuarios' && [
                        'Usuário', 'Cargo', 'Permissão', 'Status', 'Último acesso', 'Ações'
                      ].map(head => <th key={head}>{head}</th>)}
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
                          <button className={`${styles.btnAction} ${styles.btnEdit}`} data-tooltip="Editar">✏️</button>
                          <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'fornecedores' && currentItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.cnpj}</td>
                        <td>{item.telefone}</td>
                        <td>{item.email}</td>
                        <td>{item.prazo}</td>
                        <td>
                          <button className={`${styles.btnAction} ${styles.btnEdit}`} data-tooltip="Editar">✏️</button>
                          <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'clientes' && currentItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.documento}</td>
                        <td>{item.telefone}</td>
                        <td>{item.email}</td>
                        <td>{item.compras}</td>
                        <td>{item.ultimoPedido}</td>
                        <td>
                          <button className={`${styles.btnAction} ${styles.btnEdit}`} data-tooltip="Editar">✏️</button>
                          <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                        </td>
                      </tr>
                    ))}
                    {activeTab === 'usuarios' && currentItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.userAvatar}>{item.nome.split(' ').map(word => word[0]).join('').slice(0,2)}</div>
                            <div className={styles.userDetails}>
                              <span className={styles.userName}>{item.nome}</span>
                              <span className={styles.userEmail}>{item.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{item.cargo}</td>
                        <td>{item.permissao}</td>
                        <td><span className={item.status === 'Ativo' ? styles.pillGreen : styles.pillRed}>{item.status}</span></td>
                        <td>{item.ultimoAcesso}</td>
                        <td>
                          <button className={`${styles.btnAction} ${styles.btnEdit}`} data-tooltip="Editar">✏️</button>
                          <button className={`${styles.btnAction} ${styles.btnDelete}`} data-tooltip="Excluir">🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
