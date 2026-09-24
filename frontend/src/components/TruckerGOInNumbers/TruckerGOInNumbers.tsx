import styles from './TruckerGOInNumbers.module.css'

type MetricProps = {
  value: string
  label: string
}

const metrics: MetricProps[] = [
  { value: '1000', label: 'cargas proyectadas' },
  { value: '+500', label: 'transportistas activos' },
  { value: '-30%', label: 'tiempo de asignación' },
  { value: '3', label: 'provincias conectadas' },
]

function Metric({ value, label }: MetricProps) {
  return (
    <article className={styles.metric}>
      <strong>{value}</strong>
      <p>{label}</p>
    </article>
  )
}

function TruckerGOInNumbers() {
  return (
    <section
      id="truckerGOinnumbers"
      className={styles.section}
      aria-labelledby="truckergo-numbers-title"
    >
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 id="truckergo-numbers-title">TruckerGO en números</h2>
          <p>Datos ilustrativos del prototipo.</p>
        </div>
      </header>

      <div className={styles.metricsArea}>
        <div className={styles.metricsGrid}>
          {metrics.map((metric) => (
            <Metric key={metric.label} {...metric} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TruckerGOInNumbers
