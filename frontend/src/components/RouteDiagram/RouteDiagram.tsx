import styles from './RouteDiagram.module.css'

type RouteDiagramProps = {
  segment: 'pickup' | 'delivery'
  origin: string
  destination: string
  distanceKm?: number
}

function RouteDiagram({ segment, origin, destination, distanceKm }: RouteDiagramProps) {
  const isPickup = segment === 'pickup'
  const start = isPickup ? 'Tu ubicación' : `Retiro · ${origin}`
  const end = isPickup ? `Retiro · ${origin}` : `Entrega · ${destination}`

  return (
    <section className={styles.diagram} aria-label={`Gráfico ilustrativo del tramo ${isPickup ? 'hasta el retiro' : 'hasta la entrega'}: ${start} a ${end}`}>
      <span className={styles.caption}>{distanceKm === undefined ? 'Distancia no informada' : `${distanceKm} km`} · tramo ilustrativo</span>
      <svg className={styles.line} viewBox="0 0 800 480" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 100 390 C 260 340, 440 190, 640 110" />
        <circle cx="100" cy="390" r="10" className={styles.startPoint} />
        <circle cx="640" cy="110" r="10" className={styles.endPoint} />
      </svg>
      <span className={styles.start}>{start}</span>
      <span className={styles.end}>{end}</span>
    </section>
  )
}

export default RouteDiagram
