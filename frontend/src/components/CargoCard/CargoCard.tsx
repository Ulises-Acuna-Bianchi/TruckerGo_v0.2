import { ArrowRight } from 'lucide-react'
import { Link, useLocation } from 'react-router'
import type { Carga } from '../../data/cargas'
import { formatPayment, formatPickupTime } from '../../data/cargas'
import styles from './CargoCard.module.css'

type CargoCardProps = { carga: Carga }

function CargoCard({ carga }: CargoCardProps) {
  const location = useLocation()
  const from = location.pathname === '/'
    ? '/#findcargo'
    : `${location.pathname}${location.search}${location.hash}`

  return (
    <article className={styles.card}>
      {carga.photos?.[0] ? (
        <img className={styles.image} src={carga.photos[0]} alt={`Carga: ${carga.cargoName}`} />
      ) : (
        <div className={styles.imagePlaceholder} role="img" aria-label={`Espacio reservado para una fotografía de ${carga.cargoName}`} />
      )}

      <div className={styles.content}>
        <div className={styles.routeGroup}>
          <p className={styles.label}>Ruta</p>
          <h3>{carga.origin}<br />→ {carga.destination}</h3>
        </div>

        <div className={styles.cargoGroup}>
          <p className={styles.cargo}>{carga.cargoName}</p>
          <p className={styles.company}>Publicado por {carga.company}</p>
        </div>

        <div className={styles.paymentGroup}>
          <p className={styles.label}>Pago · ARS</p>
          <strong>{formatPayment(carga.paymentAmount)}</strong>
          <p>{carga.paymentBasis}</p>
        </div>

        <div className={styles.details}>
          <div>
            <strong>Hasta la carga: {carga.pickupDistanceKm === undefined ? 'Pendiente' : `${carga.pickupDistanceKm} km`}</strong>
            <span>{carga.pickupDistanceKm === undefined ? 'Distancia sin calcular' : 'Distancia ilustrativa'}</span>
          </div>
          <div>
            <strong>Recorrido: {carga.routeDistanceKm === undefined ? 'Pendiente' : `${carga.routeDistanceKm} km`}</strong>
            <span>Del retiro al destino</span>
          </div>
          <div>
            <strong>Retiro</strong>
            <span>{formatPickupTime(carga.pickupDate, carga.pickupTime)}</span>
          </div>
          {carga.weight && (
            <div>
              <strong>Peso</strong>
              <span>{carga.weight}</span>
            </div>
          )}
          {carga.vehicle && (
            <div>
              <strong>Vehículo</strong>
              <span>{carga.vehicle}</span>
            </div>
          )}
        </div>

        <Link
          className={styles.detailsButton}
          to={`/cargas/${carga.id}`}
          state={{ from }}
        >
          <span>Ver detalles</span>
          <ArrowRight aria-hidden="true" strokeWidth={2} />
        </Link>
      </div>
    </article>
  )
}

export default CargoCard
