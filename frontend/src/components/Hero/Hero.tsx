import { preventPendingNavigation } from '../../pendingLinks'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.brand}>TruckerGO</p>
          <p className={styles.eyebrow}>Logística conectada</p>
          <span className={styles.accentLine} aria-hidden="true" />
          <h1 id="hero-title" className={styles.title}>
            Tu carga encuentra el camino.
          </h1>

          <p className={styles.description}>
            Conectamos dadores de carga y transportistas para publicar,
            encontrar y gestionar operaciones desde una sola plataforma.
          </p>

          <a className={styles.primaryButton} href="#pendiente-demo" onClick={preventPendingNavigation}>
            Solicitar una demo
          </a>
          <a className={styles.textLink} href="#howitworks">
            Ver cómo funciona <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
