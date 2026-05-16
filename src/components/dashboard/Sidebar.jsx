import React from 'react'
import styles from './Sidebar.module.css'

const sections = [
  { title: 'PRINCIPAL', items: [
    { key: 'dashboard', label: '🏠 Dashboard' },
    { key: 'relatorios', label: '📊 Relatórios' },
  ]},
  { title: 'GESTÃO', items: [
    { key: 'administrativo', label: '🏭 Administrativo' },
    { key: 'cadastro', label: '📋 Cadastro' },
    { key: 'estoque', label: '📦 Estoque' },
    { key: 'financeiro', label: '💰 Financeiro' },
  ]},
  { title: 'SUPORTE', items: [
    { key: 'ajuda', label: '❓ Ajuda' },
  ]},
]

export default function Sidebar({ aberta, onFechar, onLogout, onToggle, activeSection, onChangeSection }) {
  function handleLogout() {
    onLogout && onLogout()
  }

  return (
    <>
      <aside className={`${styles.sidebar} ${aberta ? styles.expanded : styles.collapsed}`}>
        <button className={styles.collapseBtn} onClick={onToggle}>
          {aberta ? '←' : '→'}
        </button>
        <div className={styles.menu}>
          {sections.map(section => (
            <div key={section.title} className={styles.section}>
              <div className={styles.sectionTitle}>{section.title}</div>
              {section.items.map(item => (
                <button
                  key={item.key}
                  type="button"
                  className={`${styles.link} ${activeSection === item.key ? styles.active : ''}`}
                  onClick={() => onChangeSection && onChangeSection(item.key)}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          🚪 Sair
        </button>
      </aside>
      <div className={aberta ? styles.overlayVisible : styles.overlay} onClick={onFechar}></div>
    </>
  )
}
