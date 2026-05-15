import React from 'react'
import styles from './Services.module.css'

const items = [
  { icon: '📦', title: 'Cadastro de produtos', description: 'Registre produtos com categorias, preços e fornecedores.' },
  { icon: '🔄', title: 'Movimentações', description: 'Registre entradas e saídas com histórico completo.' },
  { icon: '📊', title: 'Relatórios em tempo real', description: 'Dashboards e gráficos atualizados automaticamente.' },
  { icon: '🔔', title: 'Alertas de estoque', description: 'Seja notificado quando produtos atingirem o mínimo.' },
  { icon: '👥', title: 'Multi-usuário', description: 'Gerencie permissões da sua equipe com controle de acesso.' },
  { icon: '☁️', title: '100% na nuvem', description: 'Acesse de qualquer dispositivo, dados sempre seguros.' },
]

export default function Services() {
  return (
    <section id="servicos" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.label}>O que oferecemos</span>
        <h2>Tudo que você precisa para gerir seu estoque</h2>
      </div>
      <div className={styles.grid}>
        {items.map(item => (
          <article key={item.title} className={styles.card}>
            <div className={styles.icon}>{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
