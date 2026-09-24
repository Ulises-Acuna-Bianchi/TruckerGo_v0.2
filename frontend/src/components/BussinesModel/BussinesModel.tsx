import styles from './BussinesModel.module.css'

type Milestone = {
  status: 'Realizado' | 'Previsto'
  description: string
  complete?: boolean
}

const milestones: Milestone[] = [
  {
    status: 'Realizado',
    description: 'Prototipo visual. Diseño de la experiencia y de la plataforma.',
    complete: true,
  },
  {
    status: 'Previsto',
    description: 'Validación con usuarios. Probar la propuesta con dadores y transportistas.',
  },
  {
    status: 'Previsto',
    description: 'Piloto. Probar una primera operación en un alcance controlado.',
  },
]

function RevenueModel() {
  return (
    <article className={styles.revenueCard}>
      <div className={styles.orangeAccent} />
      <div className={styles.revenueContent}>
        <p className={styles.cardEyebrow}>Modelo inicial a validar</p>
        <h3>Comisión por viaje</h3>
        <p className={styles.revenueDescription}>
          La <strong>empresa que publica la carga</strong> abonaría una comisión por los viajes que gestione a través de TruckerGO.
        </p>
        <div className={styles.divider} />
        <p className={styles.disclaimer}>Porcentaje y momento de cobro por definir.</p>
      </div>
    </article>
  )
}

function Progress() {
  return (
    <div className={styles.progress}>
      <h3>Dónde estamos</h3>
      <ol className={styles.milestones}>
        {milestones.map((milestone, index) => (
          <li className={styles.milestone} key={milestone.description}>
            <span
              className={`${styles.indicator} ${milestone.complete ? styles.complete : ''}`}
              aria-hidden="true"
            />
            <div className={styles.milestoneContent}>
              <p className={styles.status}>{milestone.status}</p>
              <p>{milestone.description}</p>
            </div>
            {index < milestones.length - 1 && <span className={styles.milestoneDivider} aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </div>
  )
}

function BussinesModel() {
  return (
    <section id="bussinesmodel" className={styles.section} aria-labelledby="bussinesmodel-title">
      <div className={styles.container}>
        <header className={styles.heading}>
          <div className={styles.eyebrowRow}>
            <span className={styles.eyebrowAccent} aria-hidden="true" />
            <p>Modelo de negocio</p>
          </div>
          <h2 id="bussinesmodel-title">
            Cómo generaría <span>ingresos TruckerGO.</span>
          </h2>
        </header>

        <div className={styles.columns}>
          <RevenueModel />
          <Progress />
        </div>
      </div>
    </section>
  )
}

export default BussinesModel
