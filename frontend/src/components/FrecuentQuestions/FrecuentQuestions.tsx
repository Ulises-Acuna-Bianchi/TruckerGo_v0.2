import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import styles from './FrecuentQuestions.module.css'

type Question = {
  question: string
  answer: string
}

const questions: Question[] = [
  {
    question: '¿Qué necesito para publicar una carga?',
    answer: 'Origen, destino, fecha y el tipo de vehículo que necesitás para el viaje.',
  },
  {
    question: '¿Cómo encuentro una carga compatible?',
    answer: 'Podés comparar recorrido, pago y requisitos para elegir una carga adecuada.',
  },
  {
    question: '¿Qué puedo ver en una demo?',
    answer: 'La demo muestra cómo publicar cargas, consultar viajes y conectar ambas partes.',
  },
]

function QuestionItem({ question, answer, isOpen, onToggle }: Question & { isOpen: boolean; onToggle: () => void }) {
  return (
    <li className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
      <button
        className={styles.questionButton}
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{question}</span>
        <ChevronDown className={styles.icon} aria-hidden="true" />
      </button>
      {isOpen && <p className={styles.answer}>{answer}</p>}
    </li>
  )
}

function FrecuentQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="frecuentquestions" className={styles.section} aria-labelledby="frecuentquestions-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Preguntas frecuentes</p>
          <h2 id="frecuentquestions-title">Preguntas frecuentes</h2>
          <p className={styles.introduction}>
            Respuestas breves sobre publicar, buscar cargas y conocer la demo.
          </p>
        </header>

        <ul className={styles.list}>
          {questions.map((question, index) => (
            <QuestionItem
              key={question.question}
              {...question}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FrecuentQuestions
