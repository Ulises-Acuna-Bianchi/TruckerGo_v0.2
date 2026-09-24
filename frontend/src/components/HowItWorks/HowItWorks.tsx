import styles from './HowItWorks.module.css'

type StepProps = {
  number: string
  audience: string
  title: string
  description: string
}

const steps: StepProps[] = [
  {
    number: '01',
    audience: 'Empresa',
    title: 'Publica la carga',
    description:
      'Indica origen, destino, fecha y el vehículo que necesita.',
  },
  {
    number: '02',
    audience: 'Transportista',
    title: 'Encuentra su viaje',
    description:
      'Compara distancia, pago y requisitos para elegir una carga.',
  },
  {
    number: '03',
    audience: 'Ambas partes',
    title: 'Coordinan el traslado',
    description:
      'Acuerdan las condiciones del viaje, el retiro y la entrega.',
  },
]

function Step({ number, audience, title, description }: StepProps) {
  return (
    <li className={styles.step}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>

      <div className={styles.stepContent}>
        <p className={styles.audience}>{audience}</p>
        <h3>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  )
}

function HowItWorks() {
  return (
    <section
      id="howitworks"
      className={styles.section}
      aria-labelledby="howitworks-title"
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Cómo funciona</p>
          <h2 id="howitworks-title">
            Así conectamos <span>cargas y camiones.</span>
          </h2>
        </div>

        <ol className={styles.steps}>
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
