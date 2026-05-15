import React, { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  { question: 'Preciso instalar algum programa?', answer: 'Não! A StockEasy é 100% online.' },
  { question: 'Posso testar antes de contratar?', answer: 'Sim, 14 dias grátis sem precisar de cartão de crédito.' },
  { question: 'Quantos usuários posso cadastrar?', answer: 'Depende do plano: básico 3, profissional 10, empresarial ilimitado.' },
  { question: 'Meus dados ficam seguros?', answer: 'Sim, criptografia de ponta a ponta e backups automáticos diários.' },
  { question: 'Posso cancelar quando quiser?', answer: 'Sim, sem multas ou burocracia, direto pelo painel.' },
]

export default function FAQ() {
  const [active, setActive] = useState(null)
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.label}>FAQ</span>
        <h2>Perguntas mais frequentes</h2>
      </div>
      <div className={styles.list}>
        {faqs.map((item, index) => {
          const open = index === active
          return (
            <div key={item.question} className={styles.item}>
              <button className={styles.question} onClick={() => setActive(open ? null : index)}>
                <span>{item.question}</span>
                <span className={`${styles.icon} ${open ? styles.open : ''}`}>+</span>
              </button>
              <div className={`${styles.answer} ${open ? styles.revealed : ''}`}>
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
