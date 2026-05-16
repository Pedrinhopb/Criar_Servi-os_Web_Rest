import React from 'react'
import { Link } from 'react-router-dom'

export default function WorkInProgress({ title }) {
  return (
    <div style={{ minHeight: '100vh', padding: 32, background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 560, width: '100%', background: '#fff', borderRadius: 18, border: '1px solid #dde8e0', padding: 32, boxShadow: '0 24px 60px rgba(3, 18, 12, 0.08)' }}>
        <p style={{ margin: 0, color: '#1a7a4a', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1.2 }}>Em desenvolvimento</p>
        <h1 style={{ margin: '16px 0 10px', fontSize: 32, lineHeight: 1.1, color: '#0f1a14' }}>{title}</h1>
        <p style={{ margin: '0 0 24px', color: '#52675b', fontSize: 16, lineHeight: 1.6 }}>
          Estamos trabalhando nesta página. Em breve ela estará disponível com todas as funcionalidades do StockEasy.
        </p>
        <Link to="/cadastro" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 22px', borderRadius: 10, background: '#1a7a4a', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
          Voltar ao Cadastro
        </Link>
      </div>
    </div>
  )
}
