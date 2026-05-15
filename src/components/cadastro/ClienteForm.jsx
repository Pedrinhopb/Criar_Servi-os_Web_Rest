import React, { useMemo, useState } from 'react'
import styles from '../../styles/Cadastro.module.css'

const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

function formatCPF(value) {
  const digits = value.replace(/\D/g, '').slice(0,11)
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2')
}

function formatCNPJ(value) {
  const digits = value.replace(/\D/g, '').slice(0,14)
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2}\.\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, '$1/$2')
    .replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, '$1-$2')
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0,11)
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/^(\(\d{2}\) \d{1})(\d{4})(\d)/, '$1 $2-$3')
}

export default function ClienteForm({ onSave, onCancel }) {
  const [nome, setNome] = useState('')
  const [tipo, setTipo] = useState('Pessoa Física')
  const [documento, setDocumento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState(estados[0])
  const [erro, setErro] = useState('')

  const documentoLabel = tipo === 'Pessoa Física' ? 'CPF' : 'CNPJ'
  const formattedDocumento = useMemo(() => {
    if (tipo === 'Pessoa Física') return formatCPF(documento)
    return formatCNPJ(documento)
  }, [documento, tipo])

  function handleTipoChange(e) {
    setTipo(e.target.value)
    setDocumento('')
  }

  function handleSave(e) {
    e.preventDefault()
    setErro('')
    if (!nome || !documento || !telefone || !email) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }
    onSave({
      id: Date.now(),
      nome,
      tipo,
      documento: formattedDocumento,
      telefone,
      email,
      endereco,
      cidade,
      estado,
      compras: 0,
      ultimoPedido: 'Nenhum',
    })
  }

  return (
    <form onSubmit={handleSave}>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Nome completo</label>
          <input className={styles.fieldInput} value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Tipo</label>
          <select className={styles.fieldInput} value={tipo} onChange={handleTipoChange}>
            <option>Pessoa Física</option>
            <option>Pessoa Jurídica</option>
          </select>
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>{documentoLabel}</label>
          <input className={styles.fieldInput} value={formattedDocumento} onChange={e => setDocumento(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Telefone</label>
          <input className={styles.fieldInput} value={telefone} onChange={e => setTelefone(formatPhone(e.target.value))} placeholder="(00) 0 0000-0000" />
        </div>
      </div>
      <div className={styles.formGrid1}>
        <label className={styles.fieldLabel}>E-mail</label>
        <input className={styles.fieldInput} type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className={styles.formGrid1}>
        <label className={styles.fieldLabel}>Endereço completo</label>
        <input className={styles.fieldInput} value={endereco} onChange={e => setEndereco(e.target.value)} />
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Cidade</label>
          <input className={styles.fieldInput} value={cidade} onChange={e => setCidade(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Estado</label>
          <select className={styles.fieldInput} value={estado} onChange={e => setEstado(e.target.value)}>
            {estados.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </div>
      {erro && <div className={styles.errorMessage}>{erro}</div>}
      <div className={styles.modalFooter}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        <button type="submit" className={styles.saveButton}>Salvar Cliente</button>
      </div>
    </form>
  )
}
