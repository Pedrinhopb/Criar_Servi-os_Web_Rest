import React, { useMemo, useState, useEffect } from 'react'
import Header    from '../components/dashboard/Header'
import Sidebar   from '../components/dashboard/Sidebar'
import EmptyState from '../components/dashboard/EmptyState'
import ProdutoForm    from '../components/cadastro/ProdutoForm'
import FornecedorForm from '../components/cadastro/FornecedorForm'
import ClienteForm    from '../components/cadastro/ClienteForm'
import UsuarioForm    from '../components/cadastro/UsuarioForm'
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

const initialProdutos = [
  { id:1, nome:'Whey Protein 1kg',  codigo:'7891234560001', categoria:'Suplementos', fornecedor:'NutriMax',    custo:89.9,  margem:45, venda:163.45, estoque:3,  estoqueMinimo:5,  unidade:'un'  },
  { id:2, nome:'Fone Bluetooth XR', codigo:'7891234560002', categoria:'Eletrônicos', fornecedor:'TechDistrib', custo:45.0,  margem:55, venda:100.0,  estoque:28, estoqueMinimo:10, unidade:'un'  },
  { id:3, nome:'Caderno A4 200fls', codigo:'7891234560003', categoria:'Papelaria',   fornecedor:'PaperBR',     custo:12.0,  margem:40, venda:20.0,   estoque:22, estoqueMinimo:15, unidade:'un'  },
  { id:4, nome:'Tênis Runner Pro',  codigo:'7891234560004', categoria:'Calçados',    fornecedor:'SportCo',     custo:120.0, margem:50, venda:240.0,  estoque:8,  estoqueMinimo:12, unidade:'par' },
  { id:5, nome:'Mochila Urban 30L', codigo:'7891234560005', categoria:'Acessórios',  fornecedor:'BagWorld',    custo:75.0,  margem:48, venda:144.23, estoque:6,  estoqueMinimo:8,  unidade:'un'  },
]
const initialFornecedores = [
  { id:1, nome:'NutriMax Distribuidora',  cnpj:'12.345.678/0001-90', telefone:'(11) 9 8888-1111', email:'contato@nutrimax.com',  prazo:'5 dias'  },
  { id:2, nome:'TechDistrib Eletrônicos', cnpj:'23.456.789/0001-01', telefone:'(21) 9 7777-2222', email:'vendas@techdistrib.com', prazo:'7 dias'  },
  { id:3, nome:'PaperBR Papelaria',       cnpj:'34.567.890/0001-12', telefone:'(31) 9 6666-3333', email:'papel@paperbr.com',     prazo:'3 dias'  },
  { id:4, nome:'SportCo Calçados',        cnpj:'45.678.901/0001-23', telefone:'(41) 9 5555-4444', email:'sport@sportco.com',     prazo:'10 dias' },
]
const initialClientes = [
  { id:1, nome:'Ana Beatriz Santos',  documento:'123.456.789-00',     telefone:'(83) 9 9111-2222', email:'ana@email.com',    compras:8,  ultimoPedido:'Hoje'           },
  { id:2, nome:'Pedro Henrique Lima', documento:'234.567.890-11',     telefone:'(83) 9 9222-3333', email:'pedro@email.com',  compras:3,  ultimoPedido:'Ontem'          },
  { id:3, nome:'Julia Fernandes',     documento:'345.678.901-22',     telefone:'(83) 9 9333-4444', email:'julia@email.com',  compras:15, ultimoPedido:'3 dias atrás'   },
  { id:4, nome:'Marcos Oliveira',     documento:'67.890.123/0001-45', telefone:'(83) 9 9444-5555', email:'marcos@email.com', compras:2,  ultimoPedido:'1 semana atrás' },
]
const initialUsuarios = [
  { id:1, nome:'João Silva',    email:'js@stockeasy.com', cargo:'Administrador', permissao:'Administrador', status:'Ativo',   ultimoAcesso:'Hoje, 09:14'  },
  { id:2, nome:'Mariana Costa', email:'mc@stockeasy.com', cargo:'Operador',      permissao:'Operador',      status:'Ativo',   ultimoAcesso:'Hoje, 08:50'  },
  { id:3, nome:'Rafael Mendes', email:'rm@stockeasy.com', cargo:'Operador',      permissao:'Operador',      status:'Ativo',   ultimoAcesso:'Ontem, 17:32' },
  { id:4, nome:'Fernanda Lima', email:'fl@stockeasy.com', cargo:'Visualizador',  permissao:'Visualizador',  status:'Inativo', ultimoAcesso:'3 dias atrás' },
  { id:5, nome:'Carlos Souza',  email:'cs@stockeasy.com', cargo:'Visualizador',  permissao:'Visualizador',  status:'Ativo',   ultimoAcesso:'Hoje, 07:45'  },
]

const fmt = v => new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL' }).format(v)

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

function Toast({ msg, onDone }) {
  useEffect(() => { if (msg) { const t = setTimeout(onDone, 3000); return () => clearTimeout(t) } }, [msg])
  if (!msg) return null
  return <div className={styles.toast}><span>✓</span>{msg}</div>
}

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

export default function Cadastro({ user, onLogout, sidebarAberta, onToggleSidebar, onFecharSidebar }) {
  const [activeTab,  setActiveTab]  = useState('produtos')
  const [modalOpen,  setModalOpen]  = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [toast,      setToast]      = useState('')
  const [confirmMsg, setConfirmMsg] = useState('')
  const [pendingDel, setPendingDel] = useState(null)

  const [produtos,     setProdutos]     = useState(initialProdutos)
  const [fornecedores, setFornecedores] = useState(initialFornecedores)
  const [clientes,     setClientes]     = useState(initialClientes)
  const [usuarios,     setUsuarios]     = useState(initialUsuarios)

  const fP = useMemo(() => produtos.filter(p     => [p.nome,p.codigo,p.categoria,p.fornecedor].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))), [produtos, searchTerm])
  const fF = useMemo(() => fornecedores.filter(f => [f.nome,f.cnpj,f.email].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),                    [fornecedores, searchTerm])
  const fC = useMemo(() => clientes.filter(c     => [c.nome,c.documento,c.email,c.telefone].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),    [clientes, searchTerm])
  const fU = useMemo(() => usuarios.filter(u     => [u.nome,u.email,u.cargo].some(v => v.toLowerCase().includes(searchTerm.toLowerCase()))),                    [usuarios, searchTerm])

  const counts      = { produtos:produtos.length, fornecedores:fornecedores.length, clientes:clientes.length, usuarios:usuarios.length }
  const currentItems= { produtos:fP, fornecedores:fF, clientes:fC, usuarios:fU }[activeTab]

  function handleSave(type, item) {
    if (type==='produto')    setProdutos(p     => [{ id:Date.now(),...item },...p])
    if (type==='fornecedor') setFornecedores(p => [{ id:Date.now(),...item },...p])
    if (type==='cliente')    setClientes(p     => [{ id:Date.now(),compras:0,ultimoPedido:'Hoje',...item },...p])
    if (type==='usuario')    setUsuarios(p     => [{ id:Date.now(),ultimoAcesso:'Agora',...item },...p])
    setModalOpen(false)
    setToast(`${SINGULAR[activeTab].charAt(0).toUpperCase()+SINGULAR[activeTab].slice(1)} cadastrado com sucesso!`)
  }

  function askDelete(type, id, nome) { setPendingDel({type,id}); setConfirmMsg(`Deseja excluir "${nome}"? Esta ação não pode ser desfeita.`) }

  function confirmDelete() {
    if (!pendingDel) return
    const {type,id} = pendingDel
    if (type==='produto')    setProdutos(p     => p.filter(i => i.id!==id))
    if (type==='fornecedor') setFornecedores(p => p.filter(i => i.id!==id))
    if (type==='cliente')    setClientes(p     => p.filter(i => i.id!==id))
    if (type==='usuario')    setUsuarios(p     => p.filter(i => i.id!==id))
    setPendingDel(null); setConfirmMsg(''); setToast('Item excluído com sucesso.')
  }

  function changeTab(key) { setActiveTab(key); setSearchTerm('') }

  const summaryCards = [
    { key:'produtos',     icon:'📦', label:'Produtos',     value:produtos.length,     alert:produtos.filter(p=>p.estoque<=p.estoqueMinimo).length, alertLabel:'em alerta' },
    { key:'fornecedores', icon:'🏭', label:'Fornecedores', value:fornecedores.length, alert:0 },
    { key:'clientes',     icon:'👤', label:'Clientes',     value:clientes.length,     alert:0 },
    { key:'usuarios',     icon:'🔐', label:'Usuários',     value:usuarios.length,     alert:usuarios.filter(u=>u.status==='Inativo').length, alertLabel:'inativos' },
  ]

  const modalTitle = `Novo ${SINGULAR[activeTab].charAt(0).toUpperCase()+SINGULAR[activeTab].slice(1)}`

  return (
    <div className={styles.page}>
      <Header user={user} onLogout={onLogout} onToggleSidebar={onToggleSidebar} />
      <Sidebar aberta={sidebarAberta} onFechar={onFecharSidebar} onLogout={onLogout} onToggle={onToggleSidebar} />

      <main className={styles.main}>
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
          <button className={styles.btnNew} onClick={() => setModalOpen(true)}>+ Novo {SINGULAR[activeTab]}</button>
        </div>

        {/* tabela */}
        <div className={styles.tableWrap}>
          {currentItems.length === 0 ? (
            <EmptyState icone={TABS.find(t=>t.key===activeTab)?.icon} titulo={`Nenhum ${SINGULAR[activeTab]} encontrado`} descricao={searchTerm?'Tente buscar por outro termo.':`Cadastre seu primeiro ${SINGULAR[activeTab]}.`} labelBotao={searchTerm?null:`+ Novo ${SINGULAR[activeTab]}`} onBotao={() => setModalOpen(true)} />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {activeTab==='produtos'     && ['Produto','Cód. Barras','Categoria','Fornecedor','Custo','Margem','Venda','Estoque','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='fornecedores' && ['Nome / Razão Social','CNPJ','Telefone','E-mail','Prazo','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='clientes'     && ['Nome','CPF/CNPJ','Telefone','E-mail','Compras','Último pedido','Ações'].map(h=><th key={h}>{h}</th>)}
                  {activeTab==='usuarios'     && ['Usuário','Cargo','Permissão','Status','Último acesso','Ações'].map(h=><th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {activeTab==='produtos' && currentItems.map(item => {
                  const low = item.estoque <= item.estoqueMinimo
                  return (
                    <tr key={item.id} className={low?styles.rowAlert:''}>
                      <td><div className={styles.productCell}><div className={styles.productIcon}>📦</div><div><div className={styles.productName}>{item.nome}</div><div className={styles.productUnit}>{item.unidade}</div></div></div></td>
                      <td className={styles.mono}>{item.codigo}</td>
                      <td>{item.categoria}</td>
                      <td>{item.fornecedor}</td>
                      <td>{fmt(item.custo)}</td>
                      <td>{item.margem}%</td>
                      <td className={styles.bold}>{fmt(item.venda)}</td>
                      <td><span className={low?styles.stockLow:styles.stockOk}>{item.estoque}</span>{low&&<span className={styles.pillRed}>Baixo</span>}</td>
                      <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete('produto',item.id,item.nome)}>🗑️</button></div></td>
                    </tr>
                  )
                })}
                {activeTab==='fornecedores' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td className={styles.bold}>{item.nome}</td><td className={styles.mono}>{item.cnpj}</td><td>{item.telefone}</td><td>{item.email}</td>
                    <td><span className={styles.pillGreen}>{item.prazo}</span></td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete('fornecedor',item.id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
                {activeTab==='clientes' && currentItems.map(item => (
                  <tr key={item.id}>
                    <td className={styles.bold}>{item.nome}</td><td className={styles.mono}>{item.documento}</td><td>{item.telefone}</td><td>{item.email}</td>
                    <td><span className={styles.pillGreen}>{item.compras} compras</span></td><td>{item.ultimoPedido}</td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete('cliente',item.id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
                {activeTab==='usuarios' && currentItems.map(item => (
                  <tr key={item.id} className={item.status==='Inativo'?styles.rowInactive:''}>
                    <td><div className={styles.userCell}><div className={styles.userAvatar}>{item.nome.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div><div className={styles.userName}>{item.nome}</div><div className={styles.userEmail}>{item.email}</div></div></div></td>
                    <td>{item.cargo}</td>
                    <td><span className={item.permissao==='Administrador'?styles.pillGreen:item.permissao==='Operador'?styles.pillAmber:styles.pillGray}>{item.permissao}</span></td>
                    <td><span className={item.status==='Ativo'?styles.pillGreen:styles.pillRed}>{item.status}</span></td>
                    <td>{item.ultimoAcesso}</td>
                    <td><div className={styles.actionBtns}><button className={styles.btnEdit} data-tooltip="Editar">✏️</button><button className={styles.btnDelete} data-tooltip="Excluir" onClick={()=>askDelete('usuario',item.id,item.nome)}>🗑️</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {currentItems.length > 0 && (
          <div className={styles.tableFooter}>{currentItems.length} {currentItems.length===1?'item':'itens'} encontrado{currentItems.length!==1?'s':''}</div>
        )}
      </main>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {activeTab==='produtos'     && <ProdutoForm     fornecedores={fornecedores} onSave={i=>handleSave('produto',i)}    onCancel={()=>setModalOpen(false)} />}
        {activeTab==='fornecedores' && <FornecedorForm                             onSave={i=>handleSave('fornecedor',i)} onCancel={()=>setModalOpen(false)} />}
        {activeTab==='clientes'     && <ClienteForm                                onSave={i=>handleSave('cliente',i)}    onCancel={()=>setModalOpen(false)} />}
        {activeTab==='usuarios'     && <UsuarioForm                                onSave={i=>handleSave('usuario',i)}    onCancel={()=>setModalOpen(false)} />}
      </Modal>

      <ConfirmDialog msg={confirmMsg} onConfirm={confirmDelete} onCancel={()=>{setConfirmMsg('');setPendingDel(null)}} />
      <Toast msg={toast} onDone={() => setToast('')} />
    </div>
  )
}