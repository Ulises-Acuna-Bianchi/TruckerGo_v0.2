import { Link } from 'react-router'
import styles from './LetsTalk.module.css'

function LetsTalk() {
  return (
    <section id="contacto" className={styles.section} aria-labelledby="lets-talk-title">
      <div className={styles.container}>
        <div className={styles.copy}>
          <h2 id="lets-talk-title" className={styles.title}>
            Conversemos sobre TruckerGO
          </h2>
          <p className={styles.description}>
            Si te interesa el proyecto, nos gustaría conversar con vos.
          </p>
        </div>

        <Link className={styles.action} to="/contacto?motivo=consulta">
          Contactar al equipo
        </Link>
      </div>
    </section>
  )
}

export default LetsTalk
