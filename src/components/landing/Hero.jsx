import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.radial}></div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}>●</span>
            <span>Gestão de estoque inteligente</span>
          </div>
          <h1 className={styles.title}>
            Transforme seu estoque<br />
            <span>em vantagem competitiva</span>
          </h1>
          <p className={styles.subtitle}>
            A StockEasy é a plataforma ideal para pequenas e médias empresas gerenciarem produtos, movimentações e relatórios em tempo real.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/login">Entrar →</Link>
            <Link className={styles.secondary} to="/register">Cadastrar</Link>
          </div>

          <div className={styles.heroStats}>
            {[
              { value: '+45%', label: 'Estoque otimizado', description: 'Menos perdas e mais precisão.' },
              { value: '24/7', label: 'Alertas inteligentes', description: 'Notificações em tempo real.' },
              { value: '8s', label: 'Decisões mais rápidas', description: 'Relatórios claros e instantâneos.' },
            ].map(item => (
              <div key={item.label} className={styles.highlightCard}>
                <span className={styles.highlightValue}>{item.value}</span>
                <span className={styles.highlightLabel}>{item.label}</span>
                <span className={styles.highlightDescription}>{item.description}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.previewDot} style={{ background: '#ff5f56' }}></span>
            <span className={styles.previewDot} style={{ background: '#ffbd2e' }}></span>
            <span className={styles.previewDot} style={{ background: '#27c93f' }}></span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}><div className={styles.metricLabel}>Produtos</div><div className={styles.metricValue}>1.284</div></div>
              <div className={styles.metricCard}><div className={styles.metricLabel}>Estoque baixo</div><div className={styles.metricValue}>7</div></div>
              <div className={styles.metricCard}><div className={styles.metricLabel}>Entradas</div><div className={styles.metricValue}>R$48k</div></div>
              <div className={styles.metricCard}><div className={styles.metricLabel}>Saídas</div><div className={styles.metricValue}>R$31k</div></div>
            </div>
            <div className={styles.chart}>
              <div className={styles.bar} style={{ height: '36%' }}></div>
              <div className={styles.bar} style={{ height: '52%' }}></div>
              <div className={styles.bar} style={{ height: '68%' }}></div>
              <div className={styles.bar} style={{ height: '44%' }}></div>
              <div className={styles.bar} style={{ height: '74%', background: '#22a860' }}></div>
              <div className={styles.bar} style={{ height: '58%' }}></div>
              <div className={styles.bar} style={{ height: '82%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
