import visionVideo from '../../assets/vision.mp4'
import visionPoster from '../../assets/posters/vision.jpg'
import LazyVideo from '../LazyVideo/LazyVideo'
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
          <LazyVideo
            className={styles.video}
            src={visionVideo}
            poster={visionPoster}
            aria-label="Video sobre la visión de TruckerGO"
          >
            Tu navegador no puede reproducir este video. <a href={visionVideo}>Abrir video de nuestra visión</a>.
          </LazyVideo>
          <VisionCopy />
        </div>
        <div className={styles.mobileBottomSpace} aria-hidden="true" />
      </div>
    </section>
  )
}

export default OurVision
