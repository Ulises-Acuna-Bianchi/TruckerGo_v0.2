import styles from './DadoresProgress.module.css'

export type DadoresStep = 1 | 2 | 3

const stepNames = ['Datos básicos', 'Detalles', 'Revisión']

type DadoresProgressProps = { currentStep: DadoresStep }

function DadoresProgress({ currentStep }: DadoresProgressProps) {
  return (
    <div className={styles.progress}>
      <p className={styles.label}>
        Paso {currentStep} de 3 <span aria-hidden="true">·</span> {stepNames[currentStep - 1]}
      </p>
      <ol className={styles.steps} aria-label="Progreso de publicación">
        {stepNames.map((name, index) => {
          const step = index + 1
          const completed = step < currentStep
          const current = step === currentStep
          return (
            <li
              key={name}
              className={`${styles.segment} ${completed ? styles.completed : ''} ${current ? styles.current : ''}`}
              aria-current={current ? 'step' : undefined}
              aria-label={`${name}${completed ? ', completado' : current ? ', paso actual' : ''}`}
            />
          )
        })}
      </ol>
    </div>
  )
}

export default DadoresProgress
