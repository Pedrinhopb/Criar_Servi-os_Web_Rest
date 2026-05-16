import React, { useState } from 'react'
import styles from '../../styles/Cadastro.module.css'

export default function UsuarioForm({ onSave, onCancel }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cargo, setCargo] = useState('')
  const [permissao, setPermissao] = useState('Administrador')
  const [senha, setSenha] = useState('')
  const [confirm, setConfirm] = useState('')
  const [ativo, setAtivo] = useState(true)
  const [erro, setErro] = useState('')

  function handleSave(e) {
    e.preventDefault()
    setErro('')
    if (!nome || !email || !senha || !confirm) {
      setErro('Preencha todos os campos obrigatórios')
      return
    }
    if (senha.length < 6) {
      setErro('Senha deve ter ao menos 6 caracteres')
      return
    }
    if (senha !== confirm) {
      setErro('As senhas precisam ser iguais')
      return
    }
    onSave({
      id: Date.now(),
      nome,
      email,
      cargo,
      permissao,
      status: ativo ? 'Ativo' : 'Inativo',
      ativo,
      ultimoAcesso: 'Agora',
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
          <label className={styles.fieldLabel}>E-mail</label>
          <input className={styles.fieldInput} type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Cargo</label>
          <input className={styles.fieldInput} value={cargo} onChange={e => setCargo(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Permissão</label>
          <select className={styles.fieldInput} value={permissao} onChange={e => setPermissao(e.target.value)}>
            <option>Administrador</option>
            <option>Operador</option>
            <option>Visualizador</option>
          </select>
        </div>
      </div>
      <div className={styles.formGrid2}>
        <div>
          <label className={styles.fieldLabel}>Senha</label>
          <input className={styles.fieldInput} type="password" value={senha} onChange={e => setSenha(e.target.value)} />
        </div>
        <div>
          <label className={styles.fieldLabel}>Confirmar senha</label>
          <input className={styles.fieldInput} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />
        </div>
      </div>
      <div className={styles.formGrid1}>
        <label className={styles.fieldLabel}>Status</label>
        <div className={styles.toggleRow}>
          <div className={styles.toggleTrack} onClick={() => setAtivo(v => !v)}>
            <div className={`${styles.toggleThumb} ${ativo ? styles.toggleOn : ''}`} />
          </div>
          <span className={styles.toggleLabel}>{ativo ? 'Ativo' : 'Inativo'}</span>
        </div>
      </div>
      {erro && <div className={styles.errorMessage}>{erro}</div>}
      <div className={styles.modalFooter}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        <button type="submit" className={styles.saveButton}>Salvar Usuário</button>
      </div>
    </form>
  )
}
