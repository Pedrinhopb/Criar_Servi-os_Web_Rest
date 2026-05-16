import React from 'react'
import styles from './Footer.module.css'

const links = ['Privacidade', 'Termos de uso', 'Suporte']

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.stock}>Stock</span><span className={styles.easy}>Easy</span>
      </div>
      <div className={styles.copy}>© 2025 StockEasy. Todos os direitos reservados.</div>
      <div className={styles.links}>
        {links.map(link => <a key={link} href="#">{link}</a>)}
      </div>
    </footer>
  )
}
