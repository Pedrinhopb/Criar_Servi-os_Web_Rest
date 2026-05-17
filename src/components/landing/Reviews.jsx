import React from 'react'
import styles from './Reviews.module.css'

const reviews = [
  {
    name:  'Marcos Ribeiro',
    title: 'Dono, Mercearia Central',
    stars: 5,
    quote: 'Antes perdíamos produtos por falta de controle. Hoje sabemos exatamente o que temos e quando repor.',
  },
  {
    name:  'Patrícia Souza',
    title: 'Gerente, Farmácia Vida',
    stars: 5,
    quote: 'Interface super simples. Minha equipe aprendeu em menos de uma hora. Recomendo para qualquer negócio.',
  },
  {
    name:  'Lucas Oliveira',
    title: 'Diretor, Papelaria Mix',
    stars: 4,
    quote: 'Ótimo custo-benefício. O alerta de estoque mínimo sozinho já valeu o investimento.',
  },
]

function initials(name) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
}

function Stars({ count }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="avaliacoes" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.label}>Depoimentos</span>
        <h2>O que os clientes dizem sobre nós</h2>
      </div>

      <div className={styles.grid}>
        {reviews.map(review => (
          <article key={review.name} className={styles.card}>
            <Stars count={review.stars} />
            <p className={styles.quote}>"{review.quote}"</p>
            <div className={styles.reviewer}>
              <div className={styles.avatar}>{initials(review.name)}</div>
              <div>
                <div className={styles.name}>{review.name}</div>
                <div className={styles.role}>{review.title}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}