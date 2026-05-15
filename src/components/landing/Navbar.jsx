import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.stock}>Stock</span>
          <span className={styles.easy}>Easy</span>
        </div>
        <nav className={styles.links}>
          {links.map(link => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <button className={styles.loginButton} onClick={() => navigate('/login')}>
          Entrar
        </button>
      </div>
    </header>
  )
}
