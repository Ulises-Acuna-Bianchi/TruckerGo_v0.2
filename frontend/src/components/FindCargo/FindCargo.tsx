import CargoCard from '../CargoCard/CargoCard'
import { useCargas } from '../../context/CargasContext'
import styles from './FindCargo.module.css'

function FindCargo() {
  const { cargas } = useCargas()
  return (
    <section
      id="findcargo"
      className={styles.section}
      aria-labelledby="findcargo-title"
    >
      <h2 id="findcargo-title">Encontrá tu próxima carga</h2>
      <p className={styles.description}>
        Compará recorridos, pagos y requisitos para elegir tu próximo viaje
      </p>

      <div className={styles.grid}>
        {cargas.map((carga) => (
          <CargoCard key={carga.id} carga={carga} />
        ))}
      </div>

      <p className={styles.note}>
        Vista conceptual. Cargas, empresas, pagos y distancias de ejemplo.
      </p>
    </section>
  )
}

export default FindCargo
