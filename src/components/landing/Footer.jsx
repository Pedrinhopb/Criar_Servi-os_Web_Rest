import React from 'react'
import styles from './Footer.module.css'

const navLinks = [
  { label: 'Serviços',   href: '#servicos'  },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'FAQ',        href: '#faq'        },
  { label: 'Contato',    href: '#contato'    },
]

const legalLinks = [
  { label: 'Privacidade', href: '#' },
  { label: 'Termos de uso', href: '#' },
  { label: 'Suporte', href: '#' },
]

const socials = [
  { label: 'Instagram', icon: '📷', href: '#' },
  { label: 'LinkedIn',  icon: '💼', href: '#' },
  { label: 'WhatsApp',  icon: '💬', href: '#' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Coluna 1 — marca e descrição */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.stock}>Stock</span>
            <span className={styles.easy}>Easy</span>
          </div>
          <p className={styles.tagline}>
            Gestão de estoque inteligente para pequenas e médias empresas.
          </p>
          <div className={styles.socials}>
            {socials.map(s => (
              <a key={s.label} href={s.href} className={styles.socialBtn} title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Coluna 2 — navegação */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navegação</h4>
          <ul className={styles.colLinks}>
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 3 — legal */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Legal</h4>
          <ul className={styles.colLinks}>
            {legalLinks.map(link => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Coluna 4 — contato rápido */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contato</h4>
          <ul className={styles.colLinks}>
            <li><a href="mailto:contato@stockeasy.com.br">contato@stockeasy.com.br</a></li>
            <li><a href="#">(83) 9 9999-0000</a></li>
            <li><span className={styles.hours}>Seg a Sex, 8h às 18h</span></li>
          </ul>
        </div>

      </div>

      {/* Rodapé inferior */}
      <div className={styles.bottom}>
        <div className={styles.inner}>
          <span className={styles.copy}>© 2025 StockEasy. Todos os direitos reservados.</span>
          <span className={styles.madeWith}>Feito com 💚 no Brasil</span>
        </div>
      </div>
    </footer>
  )
}