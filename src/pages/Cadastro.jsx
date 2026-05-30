import React, { useEffect, useMemo, useState } from 'react'
import Header     from '../components/dashboard/Header'
import Sidebar    from '../components/dashboard/Sidebar'
import EmptyState from '../components/dashboard/EmptyState'
import ProdutoForm    from '../components/cadastro/ProdutoForm'
import FornecedorForm from '../components/cadastro/FornecedorForm'
import ClienteForm    from '../components/cadastro/ClienteForm'
import UsuarioForm    from '../components/cadastro/UsuarioForm'
import { produtosAPI, fornecedoresAPI, clientesAPI, usuariosAPI } from '../services/api'
import styles from '../styles/Cadastro.module.css'

const TABS = [
  { key:'produtos',     label:'Produtos',     icon:'📦' },
  { key:'fornecedores', label:'Fornecedores', icon:'🏭' },
  { key:'clientes',     label:'Clientes',     icon:'👤' },
  { key:'usuarios',     label:'Usuários',     icon:'🔐' },
]

const SEARCH_PH = {
  produtos:     'Buscar produto, código ou categoria...',
  fornecedores: 'Buscar fornecedor, CNPJ ou e-mail...',
  clientes:     'Buscar cliente, CPF/CNPJ ou telefone...',
  usuarios:     'Buscar usuário, cargo ou e-mail...',
}

const SINGULAR = { produtos:'produto', fornecedores:'fornecedor', clientes:'cliente', usuarios:'usuário' }

const fmt = v => new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(v)

/* ── Modal ── */
function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])
  if (!isOpen) return null
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  )
}

/* ── Toast ── */
function Toast({ msg, tipo = 'sucesso', onDone }) {
  useEffect(() => { if (msg) { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) } }, [msg])
  if (!msg) return null
  return (
    <div className={`${styles.toast} ${tipo === 'erro' ? styles.toastErro : ''}`}>
      <span>{tipo === 'erro' ? '✗' : '✓'}</span> {msg}
    </div>
  )
}

/* ── Confirmação de exclusão ── */
function ConfirmDialog({ msg, onConfirm, onCancel }) {
  if (!msg) return null
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
        <div className={styles.confirmIcon}>⚠️</div>
        <p className={styles.confirmMsg}>{msg}</p>
        <div className={styles.confirmBtns}>
          <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
          <button className={styles.deleteButton} onClick={onConfirm}>Excluir</button>
        </div>
      </div>
    </div>
  )
}

/* ── Loading ── */
function Loading() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
      <p>Carregando dados...</p>
    </div>
  )
}

export default function Cadastro({ user, onLogout, sidebarAberta, onToggleSidebar, onFecharSidebar }) {
  const [activeTab,  setActiveTab]  = useState('produtos')
  const [modalOpen,  setModalOpen]  = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast,      setToast]      = useState({ msg: '', tipo: 'sucesso' })
  const [confirmMsg, setConfirmMsg] = useState('')
  const [pendingDel, setPendingDel] = useState(null)
  const [loading,    setLoading]    = useState(false)
  const [backendOk,  setBackendOk]  = useState(true)

  const [produtos,     setProdutos]     = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [clientes,     setClientes]     = useState([])
  const [usuarios,     setUsuarios]     = useState([])

  const apis = {
    produtos:     produtosAPI,
    fornecedores: fornecedoresAPI,
    clientes:     clientesAPI,
    usuarios:     usuariosAPI,
  }

  const setters = {
    produtos:     setProdutos,
    fornecedores: setFornecedores,
    clientes:     setClientes,
    usuarios:     setUsuarios,
  }

  // Carregar dados da aba ativa
  async function carregarDados(tab = activeTab) {
    setLoading(true)
    try {
      const dados = await apis[tab].listar()
      setters[tab](dados)
      setBackendOk(true)
    } catch (err) {
      setBackendOk(false)
      showToast('Backend offline — verifique se o servidor está rodando', 'erro')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { carregarDados(activeTab) }, [activeTab])

  function showToast(msg, tipo = 'sucesso') {
    setToast({ msg, tipo })
  }

  // Filtros
  const fP = useMemo(() => produtos.filter(p     => [p.nome, p.codigoBarras, p.categoria, p.fornecedor].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()))), [produtos, searchTerm])
  const fF = useMemo(() => fornecedores.filter(f => [f.nome, f.cnpj, f.email].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()))),                            [fornecedores, searchTerm])
  const fC = useMemo(() => clientes.filter(c     => [c.nome, c.documento, c.email, c.telefone].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()))),            [clientes, searchTerm])
  const fU = useMemo(() => usuarios.filter(u     => [u.nome, u.email, u.cargo].some(v => v?.toLowerCase().includes(searchTerm.toLowerCase()))),                            [usuarios, searchTerm])

  const counts       = { produtos: produtos.length, fornecedores: fornecedores.length, clientes: clientes.length, usuarios: usuarios.length }
  const currentItems = { produtos: fP, fornecedores: fF, clientes: fC, usuarios: fU }[activeTab]

  // Salvar
  async function handleSave(type, dados) {
    try {
      await apis[activeTab].criar(dados)
      setModalOpen(false)
      showToast(`${SINGULAR[activeTab].charAt(0).toUpperCase() + SINGULAR[activeTab].slice(1)} cadastrado com sucesso!`)
      carregarDados()
    } catch (err) {
      showToast(err.message || 'Erro ao salvar', 'erro')
    }
  }

  // Excluir
  function askDelete(id, nome) {
    setPendingDel(id)
    setConfirmMsg(`Deseja excluir "${nome}"? Esta ação não pode ser desfeita.`)
  }

  async function confirmDelete() {
    try {
      await apis[activeTab].remover(pendingDel)
      setPendingDel(null); setConfirmMsg('')
      showToast('Item excluído com sucesso.')
      carregarDados()
    } catch (err) {
      showToast(err.message || 'Erro ao excluir', 'erro')
    }
  }

  function changeTab(key) { setActiveTab(key); setSearchTerm('') }

  const summaryCards = [
    { key:'produtos',     icon:'📦', label:'Produtos',     value:produtos.length,     alert:produtos.filter(p=>p.estoque<=p.estoqueMinimo&&p.estoqueMinimo>0).length, alertLabel:'em alerta' },
    { key:'fornecedores', icon:'🏭', label:'Fornecedores', value:fornecedores.length, alert:0 },
    { key:'clientes',     icon:'👤', label:'Clientes',     value:clientes.length,     alert:0 },
    { key:'usuarios',     icon:'🔐', label:'Usuários',     value:usuarios.length,     alert:usuarios.filter(u=>u.status==='Inativo').length, alertLabel:'inativos' },
  ]

  return (
    <div className={styles.page}>
      <Header user={user} onLogout={onLogout} onToggleSidebar={onToggleSidebar} />
      <Sidebar aberta={sidebarAberta} onFechar={onFecharSidebar} onLogout={onLogout} onToggle={onToggleSidebar} />

      <main className={styles.main}>

        {/* aviso de backend offline */}
        {!backendOk && (
          <div style={{ background:'rgba(231,76,60,0.1)', border:'1px solid rgba(231,76,60,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:16, fontSize:14, color:'#e74c3c', display:'flex', alignItems:'center', gap:10 }}>
            ⚠️ Backend offline — rode <code style={{background:'rgba(0,0,0,0.1)',padding:'2px 6px',borderRadius:4}}>npm run dev</code> na pasta <code style={{background:'rgba(0,0,0,0.1)',padding:'2px 6px',borderRadius:4}}>stockEasy-backend</code>
          </div>
        )}

        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Cadastro</h1>
          <p className={styles.pageSubtitle}>Gerencie produtos, fornecedores, clientes e usuários</p>
        </div>

        {/* summary cards */}
        <div className={styles.summaryGrid}>
          {summaryCards.map(card => (
            <button key={card.key} className={`${styles.summaryCard} ${activeTab===card.key?styles.summaryActive:''}`} onClick={() => changeTab(card.key)}>
              <div className={styles.summaryIcon}>{card.icon}</div>
              <div className={styles.summaryInfo}>
                <div className={styles.summaryValue}>{card.value}</div>
                <div className={styles.summaryLabel}>{card.label}</div>
              </div>
              {card.alert > 0 && <div className={styles.summaryAlert}>{card.alert} {card.alertLabel}</div>}
            </button>
          ))}
        </div>

        {/* abas */}
        <div className={styles.tabs}>
          {TABS.map(tab => (
            <button key={tab.key} className={`${styles.tab} ${activeTab===tab.key?styles.tabActive:''}`} onClick={() => changeTab(tab.key)}>
              <span>{tab.icon}</span><span>{tab.label}</span>
              <span className={styles.tabCount}>{counts[tab.key]}</span>
            </button>
          ))}
        </div>

        {/* ações */}
        <div className={styles.actions}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input className={styles.searchInput} placeholder={SEARCH_PH[activeTab]} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            {searchTerm && <button className={styles.searchClear} onClick={() => setSearchTerm('')}>×</button>}
          </div>
          <button className={styles.btnNew} onClick={() => setModalOpen(true)}>
            + Novo {SINGULAR[activeTab]}
          </button>
        </div>

        {/* tabela */}
        <div className={styles.tableWrap}>
          {loading ? <Loading /> : currentItems.length === 0 ? (
            <EmptyState
              icone={TABS.find(t=>t.key===activeTab)?.icon}
              titulo={`Nenhum ${SINGULAR[activeTab]} encontrado`}
              descricao={searchTerm ? 'Tente buscar por outro termo.' : `Cadastre seu primeiro ${SINGULAR[activeTab]}.`}
              labelBotao={searchTerm ? null : `+ Novo ${SINGULAR[activeTab]}`}
              onBotao={() => setModalOpen(true)}
            />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {activeTab==='produtos'     && ['Produto','Cód. Barras','Categoria','Fornecedor','Custo','Margem','Venda','Estoque','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='fornecedores' && ['Nome / Razão Social','CNPJ','Telefone','E-mail','Prazo','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='clientes'     && ['Nome','CPF/CNPJ','Telefone','E-mail','Compras','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='usuarios'     && ['Usuário','Cargo','Permissão','Status','Ações'].map(h=><th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {activeTab==='produtos' && currentItems.map(item => {
                  const low = item.estoque <= item.estoqueMinimo && item.estoqueMinimo > 0
                  return (
                    <tr key={item._id} className={low?styles.rowAlert:''}>
                      <td><div className={styles.productCell}><div className={styles.productIcon}>📦</div><div><div className={styles.productName}>{item.nome}</div><div className={styles.productUnit}>{item.unidade}</div></div></div></td>
                      <td className={styles.mono}>{item.codigoBarras}</td>
                      <td>{item.categoria}</td>
                      <td>{item.fornecedor}</td>
                      <td>{fmt(item.custo)}</td>
                      <td>{item.margem}%</td>
                      <td className={styles.bold}>{fmt(item.venda)}</td>
                      <td><span className={low?styles.stockLow:styles.stockOk}>{item.estoque}</span>{low&&<span className={styles.pillRed}>Baixo</span>}</td>
                      <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete(item._id,item.nome)}>🗑️</button></div></td>
                    </tr>
                  )
                })}
                {activeTab==='fornecedores' && currentItems.map(item => (
                  <tr key={item._id}>
                    <td className={styles.bold}>{item.nome}</td>
                    <td className={styles.mono}>{item.cnpj}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                    <td><span className={styles.pillGreen}>{item.prazoEntrega} dias</span></td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete(item._id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
                {activeTab==='clientes' && currentItems.map(item => (
                  <tr key={item._id}>
                    <td className={styles.bold}>{item.nome}</td>
                    <td className={styles.mono}>{item.documento}</td>
                    <td>{item.telefone}</td>
                    <td>{item.email}</td>
                    <td><span className={styles.pillGreen}>{item.totalCompras} compras</span></td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete(item._id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
                {activeTab==='usuarios' && currentItems.map(item => (
                  <tr key={item._id} className={item.status==='Inativo'?styles.rowInactive:''}>
                    <td><div className={styles.userCell}><div className={styles.userAvatar}>{item.nome?.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div><div className={styles.userName}>{item.nome}</div><div className={styles.userEmail}>{item.email}</div></div></div></td>
                    <td>{item.cargo}</td>
                    <td><span className={item.permissao==='Administrador'?styles.pillGreen:item.permissao==='Operador'?styles.pillAmber:styles.pillGray}>{item.permissao}</span></td>
                    <td><span className={item.status==='Ativo'?styles.pillGreen:styles.pillRed}>{item.status}</span></td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete(item._id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {currentItems.length > 0 && !loading && (
          <div className={styles.tableFooter}>
            {currentItems.length} {currentItems.length===1?'item':'itens'} encontrado{currentItems.length!==1?'s':''}
          </div>
        )}
      </main>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Novo ${SINGULAR[activeTab].charAt(0).toUpperCase()+SINGULAR[activeTab].slice(1)}`}>
        {activeTab==='produtos'     && <ProdutoForm     fornecedores={fornecedores} onSave={i=>handleSave('produto',i)}    onCancel={()=>setModalOpen(false)} />}
        {activeTab==='fornecedores' && <FornecedorForm                             onSave={i=>handleSave('fornecedor',i)} onCancel={()=>setModalOpen(false)} />}
        {activeTab==='clientes'     && <ClienteForm                                onSave={i=>handleSave('cliente',i)}    onCancel={()=>setModalOpen(false)} />}
        {activeTab==='usuarios'     && <UsuarioForm                                onSave={i=>handleSave('usuario',i)}    onCancel={()=>setModalOpen(false)} />}
      </Modal>

      <ConfirmDialog msg={confirmMsg} onConfirm={confirmDelete} onCancel={()=>{setConfirmMsg('');setPendingDel(null)}} />
      <Toast msg={toast.msg} tipo={toast.tipo} onDone={() => setToast({ msg:'', tipo:'sucesso' })} />
    </div>
  )
}