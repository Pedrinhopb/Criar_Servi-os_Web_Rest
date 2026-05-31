import React, { useMemo, useState } from 'react'
import styles from '../../styles/Cadastro.module.css'

const categorias = ['Suplementos','Eletrônicos','Papelaria','Calçados','Acessórios','Outros']
const unidades   = ['un','kg','g','L','ml','cx','par','m']

export default function ProdutoForm({ fornecedores, initialData, onSave, onCancel }) {
  const ed = initialData || {}
  const [nome,          setNome]          = useState(ed.nome          || '')
  const [codigo,        setCodigo]        = useState(ed.codigoBarras   || '')
  const [categoria,     setCategoria]     = useState(ed.categoria      || categorias[0])
  const [unidade,       setUnidade]       = useState(ed.unidade        || unidades[0])
  const [fornecedor,    setFornecedor]    = useState(ed.fornecedor     || '')
  const [custo,         setCusto]         = useState(ed.custo?.toString().replace('.', ',') || '')
  const [margem,        setMargem]        = useState(ed.margem?.toString() || '')
  const [estoque,       setEstoque]       = useState(ed.estoque?.toString()       || '')
  const [estoqueMinimo, setEstoqueMinimo] = useState(ed.estoqueMinimo?.toString() || '')
  const [erro,          setErro]          = useState('')

  const precoVenda = useMemo(() => {
    const c = Number(custo.replace(',', '.'))
    const m = Number(margem)
    if (!c || !m || m >= 100) return 0
    return c / (1 - m / 100)
  }, [custo, margem])

  function handleSave(e) {
    e.preventDefault()
    setErro('')
    if (!nome || !codigo || !custo || !margem) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }
    if (Number(margem) >= 100) {
      setErro('Margem deve ser menor que 100%')
      return
    }
    onSave({
      nome,
      codigoBarras:  codigo,
      categoria,
      fornecedor,
      custo:         Number(custo.replace(',', '.')),
      margem:        Number(margem),
      venda:         parseFloat(precoVenda.toFixed(2)),
      estoque:       Number(estoque)       || 0,
      estoqueMinimo: Number(estoqueMinimo) || 0,
      unidade,
    })
  }

  return (
    <form onSubmit={handleSave}>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Nome do produto *</label>
          <input className={styles.fieldInput} value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Whey Protein 1kg" />
        </div>
        <div>
          <label className={styles.fieldLabel}>Código de barras *</label>
          <input className={styles.fieldInput} value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Ex: 7891234560001" />
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Categoria</label>
          <select className={styles.fieldInput} value={categoria} onChange={e => setCategoria(e.target.value)}>
            {categorias.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        <div>
          <label className={styles.fieldLabel}>Unidade</label>
          <select className={styles.fieldInput} value={unidade} onChange={e => setUnidade(e.target.value)}>
            {unidades.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.formGrid1}>
        <div>
          <label className={styles.fieldLabel}>Fornecedor vinculado</label>
          <select className={styles.fieldInput} value={fornecedor} onChange={e => setFornecedor(e.target.value)}>
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map(item => <option key={item._id || item.nome} value={item.nome}>{item.nome}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.formGrid3}>
        <div>
          <label className={styles.fieldLabel}>Custo (R$) *</label>
          <input className={styles.fieldInput} value={custo} onChange={e => setCusto(e.target.value)} placeholder="0,00" />
        </div>
        <div>
          <label className={styles.fieldLabel}>Margem % *</label>
          <input className={styles.fieldInput} value={margem} onChange={e => setMargem(e.target.value)} placeholder="0" />
        </div>
        <div>
          <label className={styles.fieldLabel}>Preço de venda</label>
          <input className={styles.fieldInput} readOnly value={new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(precoVenda||0)} />
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Estoque atual</label>
          <input className={styles.fieldInput} type="number" min="0" value={estoque} onChange={e => setEstoque(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Estoque mínimo</label>
          <input className={styles.fieldInput} type="number" min="0" value={estoqueMinimo} onChange={e => setEstoqueMinimo(e.target.value)} />
        </div>
      </div>
      {erro && <div className={styles.errorMessage}>{erro}</div>}
      <div className={styles.modalFooter}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        <button type="submit" className={styles.saveButton}>{initialData ? 'Salvar alterações' : 'Salvar Produto'}</button>
      </div>
    </form>
  )
}