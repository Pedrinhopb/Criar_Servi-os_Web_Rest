import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const metrics = [
  { label: 'Produtos',   value: '1.284' },
  { label: 'Est. baixo', value: '7'     },
  { label: 'Entradas',   value: 'R$48k' },
  { label: 'Saídas',     value: 'R$31k' },
]

const bars = [36, 52, 68, 44, 74, 58, 82]

const stats = [
  { value: '+45%', label: 'Estoque otimizado',    description: 'Menos perdas e mais precisão.'       },
  { value: '24/7', label: 'Alertas inteligentes', description: 'Notificações em tempo real.'          },
  { value: '8s',   label: 'Decisões mais rápidas',description: 'Relatórios claros e instantâneos.'   },
]

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.radial}></div>
      <div className={styles.inner}>

        {/* ===== COPY (esquerda) ===== */}
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
            A StockEasy é a plataforma ideal para pequenas e médias empresas
            gerenciarem produtos, movimentações e relatórios em tempo real.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primary} to="/login">Entrar →</Link>
            <Link className={styles.secondary} to="/register">Cadastrar</Link>
          </div>

          <div className={styles.heroStats}>
            {stats.map(item => (
              <div key={item.label} className={styles.highlightCard}>
                <span className={styles.highlightValue}>{item.value}</span>
                <span className={styles.highlightLabel}>{item.label}</span>
                <span className={styles.highlightDescription}>{item.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PREVIEW CARD (direita) — inline styles para fonte garantida ===== */}
        <div style={{
          width: '100%',
          background: '#fff',
          border: '1px solid #d0e6d8',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(26,122,74,0.12)',
        }}>
          {/* barra de título */}
          <div style={{
            display: 'flex', gap: 6, alignItems: 'center',
            padding: '10px 14px', background: '#0f1a14',
          }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56', display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f', display: 'inline-block', flexShrink: 0 }}></span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 6, fontFamily: 'system-ui, sans-serif' }}>
              StockEasy — Dashboard
            </span>
          </div>

          {/* corpo */}
          <div style={{ padding: 16, background: '#f8fdf9' }}>

            {/* grid de métricas — todos com mesmo height e font fixa */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8,
              marginBottom: 12,
            }}>
              {metrics.map(m => (
                <div key={m.label} style={{
                  background: '#fff',
                  border: '1px solid #d0e6d8',
                  borderRadius: 8,
                  padding: '10px 10px',
                  height: 62,                      /* altura fixa — todos iguais */
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    fontSize: 9,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: '#5a7566',
                    whiteSpace: 'nowrap',
                    fontFamily: 'system-ui, -apple-system, sans-serif', /* sem depender do Google Fonts */
                    lineHeight: 1,
                  }}>
                    {m.label}
                  </div>
                  <div style={{
                    fontSize: 18,                  /* tamanho fixo igual em todos */
                    fontWeight: 800,
                    color: '#0f1a14',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.5px',
                    fontFamily: 'system-ui, -apple-system, sans-serif', /* sem depender do Google Fonts */
                  }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* gráfico de barras */}
            <div style={{
              background: '#fff',
              border: '1px solid #d0e6d8',
              borderRadius: 8,
              padding: '10px 10px 0',
            }}>
              <div style={{
                fontSize: 9,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#5a7566',
                marginBottom: 8,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                Movimentações — últimos 7 dias
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 4,
                height: 56,               /* altura fixa — barras não transbordam */
              }}>
                {bars.map((h, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === 4 ? '#22a860' : '#1a7a4a',
                    borderRadius: '3px 3px 0 0',
                    opacity: i === 4 ? 1 : 0.78,
                    minWidth: 0,
                  }} />
                ))}
              </div>
            </div>

          </div>
        </div>
        {/* ===== fim preview card ===== */}

      </div>
    </section>
  )
}