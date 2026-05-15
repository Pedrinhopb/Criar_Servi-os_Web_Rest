import React, { useState } from 'react'
import styles from '../../styles/Cadastro.module.css'

const estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

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

export default function FornecedorForm({ onSave, onCancel }) {
  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [cidade, setCidade] = useState('')
  const [estado, setEstado] = useState(estados[0])
  const [prazo, setPrazo] = useState('')
  const [erro, setErro] = useState('')

  function handleSave(e) {
    e.preventDefault()
    setErro('')
    if (!nome || !cnpj || !telefone || !email) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }
    onSave({
      id: Date.now(),
      nome,
      cnpj,
      telefone,
      email,
      endereco,
      cidade,
      estado,
      prazo: prazo ? `${prazo} dias` : '',
    })
  }

  return (
    <form onSubmit={handleSave}>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Nome/Razão Social</label>
          <input className={styles.fieldInput} value={nome} onChange={e => setNome(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>CNPJ</label>
          <input className={styles.fieldInput} value={cnpj} onChange={e => setCnpj(formatCNPJ(e.target.value))} placeholder="00.000.000/0000-00" />
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Telefone</label>
          <input className={styles.fieldInput} value={telefone} onChange={e => setTelefone(formatPhone(e.target.value))} placeholder="(00) 0 0000-0000" />
        </div>
        <div>
          <label className={styles.fieldLabel}>E-mail</label>
          <input className={styles.fieldInput} type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
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
      <div className={styles.formGrid1}>
        <label className={styles.fieldLabel}>Prazo de entrega</label>
        <input className={styles.fieldInput} type="number" min="1" value={prazo} onChange={e => setPrazo(e.target.value)} placeholder="dias" />
      </div>
      {erro && <div className={styles.errorMessage}>{erro}</div>}
      <div className={styles.modalFooter}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        <button type="submit" className={styles.saveButton}>Salvar Fornecedor</button>
      </div>
    </form>
  )
}
