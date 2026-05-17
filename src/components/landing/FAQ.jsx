import React, { useState, useRef } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  { question: 'Preciso instalar algum programa?',  answer: 'Não! A StockEasy é 100% online. Basta ter um navegador e internet. Funciona no computador, tablet e celular.' },
  { question: 'Posso testar antes de contratar?',  answer: 'Sim, oferecemos 14 dias de teste gratuito sem precisar de cartão de crédito. Você terá acesso a todas as funcionalidades.' },
  { question: 'Quantos usuários posso cadastrar?', answer: 'Depende do plano escolhido. O plano básico permite até 3 usuários, o profissional até 10 e o empresarial é ilimitado.' },
  { question: 'Meus dados ficam seguros?',         answer: 'Absolutamente. Utilizamos criptografia de ponta a ponta e backups automáticos diários. Seus dados são somente seus.' },
  { question: 'Posso cancelar quando quiser?',     answer: 'Sim, sem multas nem burocracia. Você pode cancelar a qualquer momento diretamente no painel da sua conta.' },
]

function FAQItem({ item, open, onToggle }) {
  const bodyRef = useRef(null)

  return (
    <div className={`${styles.item} ${open ? styles.itemOpen : ''}`}>
      <button className={styles.question} onClick={onToggle}>
        <span>{item.question}</span>
        <span className={`${styles.icon} ${open ? styles.iconOpen : ''}`}>+</span>
      </button>
      {/* Animação com height real via ref — sem corte */}
      <div
        className={styles.answerWrap}
        style={{ maxHeight: open ? bodyRef.current?.scrollHeight + 'px' : '0px' }}
      >
        <div ref={bodyRef} className={styles.answer}>
          {item.answer}
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [active, setActive] = useState(null)

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.label}>FAQ</span>
        <h2>Perguntas mais frequentes</h2>
        <p className={styles.subhead}>Respondemos as dúvidas mais comuns sobre a plataforma.</p>
      </div>

      <div className={styles.list}>
        {faqs.map((item, index) => (
          <FAQItem
            key={item.question}
            item={item}
            open={index === active}
            onToggle={() => setActive(index === active ? null : index)}
          />
        ))}
      </div>
    </section>
  )
}