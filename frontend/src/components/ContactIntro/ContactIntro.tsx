import { Link } from 'react-router'
import styles from './ContactIntro.module.css'

function ContactIntro() {
  return (
    <section className={styles.intro} aria-labelledby="contact-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>HABLEMOS</p>
        <h1 id="contact-title">Conversemos sobre TruckerGO.</h1>
        <p className={styles.description}>
          Contanos qué necesitás. Podemos mostrarte la propuesta de TruckerGO y conversar sobre tu operación.
        </p>
        <p className={styles.secondary}>
          Empresas, transportistas y nuevas ideas para conectar cada viaje.
        </p>
        <div className={styles.actions}>
          <Link className={styles.homeLink} to="/">← Ir a inicio</Link>
        </div>
      </div>
    </section>
  )
}

export default ContactIntro
