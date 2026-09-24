import styles from './OurVision.module.css'

function VisionCopy() {
  return (
    <div className={styles.copy}>
      <p className={styles.eyebrow}>Nuestra visión</p>
      <h2 id="ourvision-title">
        Más oportunidades <span>en cada recorrido.</span>
      </h2>
      <p className={styles.description}>
        Buscamos un transporte de cargas donde encontrar un viaje de regreso sea más simple, las empresas tengan más opciones y los transportistas puedan aprovechar mejor sus recorridos.
      </p>
      <p className={styles.closing}>TruckerGO es una propuesta para acercar ese futuro.</p>
      <span className={styles.decorativeLine} aria-hidden="true" />
    </div>
  )
}

function OurVision() {
  return (
    <section id="ourvision" className={styles.section} aria-labelledby="ourvision-title">
      <div className={styles.container}>
        <div className={styles.composition}>
          <div
            className={styles.videoPlaceholder}
            role="img"
            aria-label="Camiones cargando"
          />
          <VisionCopy />
        </div>
        <div className={styles.mobileBottomSpace} aria-hidden="true" />
      </div>
    </section>
  )
}

export default OurVision
