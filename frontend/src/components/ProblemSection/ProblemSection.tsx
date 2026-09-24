import {
  ClipboardList,
  Route,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import styles from './ProblemSection.module.css'

type Comparison = {
  number: string
  problemTitle: string
  problemDescription: string
  proposalTitle: string
  proposalDescription: string
  icon: LucideIcon
}

const comparisons: Comparison[] = [
  {
    number: '01',
    problemTitle: 'Información dispersa',
    problemDescription:
      'Origen, fechas y requisitos repartidos entre llamadas y mensajes.',
    proposalTitle: 'Una publicación clara',
    proposalDescription:
      'Carga, recorrido, vehículo y retiro reunidos en un mismo lugar.',
    icon: ClipboardList,
  },
  {
    number: '02',
    problemTitle: 'Opciones difíciles de comparar',
    problemDescription:
      'Evaluar un viaje requiere conocer el pago, los plazos y las distancias.',
    proposalTitle: 'Datos para decidir',
    proposalDescription:
      'Pago, distancia hasta la carga y recorrido a destino visibles antes de elegir.',
    icon: Route,
  },
  {
    number: '03',
    problemTitle: 'Regresos sin carga',
    problemDescription:
      'Capacidad disponible cuando el camión vuelve de una entrega.',
    proposalTitle: 'Búsqueda para el próximo tramo',
    proposalDescription:
      'Explorar cargas por ubicación y destino para encontrar un viaje compatible.',
    icon: Truck,
  },
]

function ProposalIcon({ icon: Icon }: Pick<Comparison, 'icon'>) {
  return <Icon aria-hidden="true" strokeWidth={2} />
}

function ProblemSection() {
  return (
    <section className={styles.section} aria-labelledby="problem-title">
      <div className={styles.container}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>El problema y nuestra propuesta</p>
          <h2 id="problem-title" className={styles.title}>
            Mover una carga todavía exige demasiadas vueltas.
          </h2>
          <p className={styles.description}>
            TruckerGO propone reunir la información del viaje y acercar empresas y
            transportistas.
          </p>
        </header>

        <div className={styles.videos}>
          <article className={styles.videoBlock}>
            <h3 className={styles.videoLabel}>El problema</h3>
            <div
              className={styles.videoPlaceholder}
              role="img"
              aria-label="Video sobre el problema actual del transporte de cargas"
            />
          </article>

          <article className={styles.videoBlock}>
            <h3 className={styles.videoLabel}>Nuestra propuesta</h3>
            <div
              className={styles.videoPlaceholder}
              role="img"
              aria-label="Video sobre la propuesta de TruckerGO"
            />
          </article>
        </div>

        <div className={styles.comparison}>
          <div className={styles.comparisonHeader} aria-hidden="true">
            <p>Lo que complica el viaje</p>
            <p>Cómo lo aborda TruckerGO</p>
          </div>

          {comparisons.map((item) => (
            <div className={styles.comparisonRow} key={item.number}>
              <article className={styles.problemCard}>
                <span className={styles.number}>{item.number}</span>
                <div className={styles.cardContent}>
                  <p className={styles.mobileCardLabel}>El problema</p>
                  <h3>{item.problemTitle}</h3>
                  <p>{item.problemDescription}</p>
                </div>
              </article>

              <article className={styles.proposalCard}>
                <span className={styles.proposalIcon}>
                  <ProposalIcon icon={item.icon} />
                </span>
                <div className={styles.cardContent}>
                  <p className={styles.mobileProposalLabel}>La propuesta</p>
                  <h3>{item.proposalTitle}</h3>
                  <p>{item.proposalDescription}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
