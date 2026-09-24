import { CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import styles from './ContactStatus.module.css'

export type ContactStatusKind = 'sending' | 'success' | 'error'

type ContactStatusProps = {
  kind: ContactStatusKind
  onRetry?: () => void
}

const messages = {
  sending: { title: 'Enviando…', description: 'Estamos procesando tu solicitud.' },
  success: { title: 'Gracias por contactarnos', description: 'Recibimos tu mensaje.' },
  error: {
    title: 'No pudimos enviar tu mensaje.',
    description: 'Intentá nuevamente.',
  },
}

function ContactStatus({ kind, onRetry }: ContactStatusProps) {
  const message = messages[kind]

  return (
    <section
      className={`${styles.status} ${styles[kind]}`}
      role={kind === 'error' ? 'alert' : 'status'}
      aria-live={kind === 'error' ? 'assertive' : 'polite'}
      aria-busy={kind === 'sending'}
    >
      {kind === 'sending' && <LoaderCircle className={styles.spinner} size={28} aria-hidden="true" />}
      {kind === 'success' && <CircleCheck size={28} aria-hidden="true" />}
      {kind === 'error' && <CircleAlert size={28} aria-hidden="true" />}
      <h2>{message.title}</h2>
      <p>{message.description}</p>
      {kind === 'error' && (
        <>
          <p className={styles.preserved}>Los datos ingresados se conservan.</p>
          <button type="button" onClick={onRetry}>Intentar nuevamente</button>
        </>
      )}
      {kind === 'sending' && <span className={styles.sendingLabel}>Enviando…</span>}
    </section>
  )
}

export default ContactStatus
