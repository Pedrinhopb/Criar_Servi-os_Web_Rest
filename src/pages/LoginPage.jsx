import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Auth.module.css'

const BASE_URL = 'http://localhost:3000/api'

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ email: '', senha: '' })
  const [erro,    setErro]    = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErro('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.senha) {
      setErro('Preencha e-mail e senha.')
      return
    }

    setLoading(true)
    setErro('')

    try {
      const res      = await fetch(`${BASE_URL}/usuarios`)
      const usuarios = await res.json()

      const usuario = usuarios.find(u => u.email === form.email && u.status === 'Ativo')

      if (usuario) {
        onLogin({ name: usuario.nome, email: usuario.email, role: usuario.permissao, id: usuario._id })
        navigate('/cadastro')
        return
      }

      // fallback — usuário padrão de teste
      if (form.email === 'admin@hotmail.com' && form.senha === 'admin') {
        onLogin({ name: 'Admin', email: form.email, role: 'Administrador' })
        navigate('/cadastro')
        return
      }

      setErro('E-mail ou senha incorretos.')
    } catch {
      // backend offline — usa credencial de teste
      if (form.email === 'admin@hotmail.com' && form.senha === 'admin') {
        onLogin({ name: 'Admin', email: form.email, role: 'Administrador' })
        navigate('/cadastro')
      } else {
        setErro('Servidor offline. Use admin@hotmail.com / admin para testar.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.decorCircleTop}/>
      <div className={styles.decorCircleBottom}/>

      <div className={styles.card}>
        <div className={styles.brand}>
          <strong className={styles.brandStrong}>
            <span className={styles.brandStock}>Stock</span>
            <span className={styles.brandEasy}>Easy</span>
          </strong>
        </div>

        <h1 className={styles.title}>Entrar na conta</h1>
        <p className={styles.subtitle}>Acesse o painel de controle</p>

        {erro && <div className={styles.error}>{erro}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type={showPwd ? 'text' : 'password'}
              name="senha"
              placeholder="••••••••"
              value={form.senha}
              onChange={handleChange}
            />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(v => !v)}>
              {showPwd ? '🙈' : '👁️'}
            </button>
            <div className={styles.forgot}>
              <a href="#">Esqueceu a senha?</a>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.btnPrimary} ${loading ? styles.disabled : ''}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>

        {/* removido link de criar conta — cadastro só pelo admin */}
      </div>
    </div>
  )
}