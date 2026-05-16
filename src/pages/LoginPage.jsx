import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from '../styles/Auth.module.css'

export default function LoginPage({ onLogin }){
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [erro,setErro] = useState('')
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    setErro('')
    if(!email || !senha){
      setErro('Preencha todos os campos')
      return
    }
    if(email === 'admin@hotmail.com' && senha === 'admin'){
      const user = { name: 'Administrador', email }
      onLogin && onLogin(user)
      navigate('/cadastro')
    } else {
      setErro('E-mail ou senha incorretos')
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.decorCircleTop}></div>
      <div className={styles.decorCircleBottom}></div>
      <form onSubmit={submit} className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandStrong}><span className={styles.brandStock}>Stock</span><span className={styles.brandEasy}>Easy</span></div>
        </div>
        <p className={styles.subtitle}>Entre na sua conta para continuar</p>
        {erro && <div className={styles.error}>{erro}</div>}

        <div className={styles.field}>
          <label className={styles.label}>E-mail</label>
          <input className={styles.input} value={email} onChange={e=>setEmail(e.target.value)} type="email" />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Senha</label>
          <input className={styles.input} value={senha} onChange={e=>setSenha(e.target.value)} type="password" />
        </div>

        <div className={styles.forgot}><Link to="/forgot" style={{color:'#22a860'}}>Esqueci minha senha</Link></div>

        <button type="submit" className={styles.btnPrimary}>Entrar</button>

        <div className={styles.footerText}>Não tem uma conta? <Link to="/register" className={styles.link}>Criar conta agora</Link></div>
      </form>
    </div>
  )
}
