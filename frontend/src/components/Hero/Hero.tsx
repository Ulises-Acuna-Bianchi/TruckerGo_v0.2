import { Link } from 'react-router'
import heroVideo from '../../assets/hero.mp4'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <video
        className={styles.video}
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
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

          <Link className={styles.primaryButton} to="/contacto?motivo=demo">
            Solicitar una demo
          </Link>
          <a className={styles.textLink} href="#howitworks">
            Ver cómo funciona <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
