import { useState } from 'react'
import { Link, useParams } from 'react-router'
import RouteDiagram from '../../components/RouteDiagram/RouteDiagram'
import { useCargas } from '../../context/CargasContext'
import { formatPickupDate } from '../../data/cargas'
import styles from './CargaRoutePage.module.css'

type Segment = 'pickup' | 'delivery'

function locationLabel(address: string | undefined, city: string) {
  return address ? `${address}, ${city}` : city || 'No informada'
}

function distanceLabel(distance: number | undefined) {
  return distance === undefined ? 'No informada' : `${distance} km`
}

function CargaRoutePage() {
  const { cargas } = useCargas()
  const { id } = useParams()
  const carga = cargas.find((item) => item.id === id)
  const [segment, setSegment] = useState<Segment>('pickup')

  const pickupPlace = carga ? locationLabel(carga.originAddress, carga.origin) : ''
  const deliveryPlace = carga ? locationLabel(carga.destinationAddress, carga.destination) : ''
  const distance = segment === 'pickup' ? carga?.pickupDistanceKm : carga?.routeDistanceKm
  const pickupDate = carga?.pickupDate
    ? formatPickupDate(carga.pickupDate, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'No informada'
  const pickupTime = carga?.pickupTime || 'Horario no informado'
  const canOpenDeliveryMap = segment === 'delivery' && Boolean(carga?.origin && carga?.destination)
  const mapsUrl = canOpenDeliveryMap
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickupPlace)}&destination=${encodeURIComponent(deliveryPlace)}&travelmode=driving`
    : undefined

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={carga ? `/cargas/${carga.id}` : '/transportistas'}>← {carga ? 'Volver al detalle' : 'Volver al listado'}</Link>
          <Link className={styles.brand} to="/">TruckerGO</Link>
        </div>
      </header>
      <main className={styles.main}>
        {carga ? (
          <div className={styles.container}>
            <div className={styles.heading}>
              <h1>Recorrido de la carga</h1>
              <p className={styles.route}>{carga.origin || 'Origen no informado'} → {carga.destination || 'Destino no informado'}</p>
              <p className={styles.cargo}>{carga.cargoName || 'Carga no informada'} · {carga.company || 'Empresa no informada'}</p>
            </div>

            <div className={styles.segmentSwitch} role="group" aria-label="Tramo del recorrido">
              <button type="button" className={segment === 'pickup' ? styles.selected : ''} aria-pressed={segment === 'pickup'} onClick={() => setSegment('pickup')}>Hasta el retiro</button>
              <button type="button" className={segment === 'delivery' ? styles.selected : ''} aria-pressed={segment === 'delivery'} onClick={() => setSegment('delivery')}>Hasta la entrega</button>
            </div>

            <div className={styles.layout}>
              <RouteDiagram segment={segment} origin={carga.origin || 'No informado'} destination={carga.destination || 'No informado'} distanceKm={distance} />
              <section className={styles.routePanel} aria-live="polite">
                <p className={styles.eyebrow}>{segment === 'pickup' ? 'PUNTO DE RETIRO' : 'PUNTO DE ENTREGA'}</p>
                <h2>{segment === 'pickup' ? pickupPlace : deliveryPlace}</h2>
                <p className={styles.description}>{carga.cargoName || 'Carga no informada'} · {carga.company || 'Empresa no informada'}</p>
                <div className={styles.metrics}>
                  <div>
                    <strong>{distanceLabel(distance)}</strong>
                    <span>{segment === 'pickup' ? 'Desde tu ubicación conceptual' : 'Desde el punto de retiro'}</span>
                  </div>
                  <div>
                    <strong>{pickupDate}</strong>
                    <span>Retiro: {pickupTime}</span>
                  </div>
                </div>
                {segment === 'pickup' ? (
                  <p className={styles.extra}>Después del retiro: {distanceLabel(carga.routeDistanceKm)} hasta {carga.destination || 'destino no informado'}.</p>
                ) : (
                  <p className={styles.extra}>Fecha y horario de entrega: no informados.</p>
                )}
                {mapsUrl ? (
                  <a className={styles.externalMap} href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir en Google Maps ↗</a>
                ) : (
                  <button className={styles.externalMap} type="button" disabled>Abrir en Google Maps</button>
                )}
                {segment === 'pickup' ? (
                  <p className={styles.mapNote}>No se puede abrir este tramo: falta la ubicación de partida del transportista. La demo no solicita GPS.</p>
                ) : !mapsUrl ? (
                  <p className={styles.mapNote}>No se puede abrir este tramo: faltan el origen o el destino.</p>
                ) : (!carga.originAddress || !carga.destinationAddress) ? (
                  <p className={styles.mapNote}>El mapa usa sólo las ciudades disponibles; la ubicación es aproximada.</p>
                ) : (
                  <p className={styles.mapNote}>El mapa usa las direcciones ingresadas para esta carga.</p>
                )}
                <p className={styles.panelNote}>Vista conceptual. Ubicaciones y distancias de ejemplo.</p>
              </section>
            </div>

            <p className={styles.note}>Cambiar el tramo representado no significa que la carga haya sido retirada o entregada. “Tomar carga” no realiza una asignación real ni modifica su disponibilidad.</p>
          </div>
        ) : (
          <section className={styles.notFound}>
            <h1>{id?.startsWith('demo-') ? 'Esta carga temporal ya no está disponible.' : 'No encontramos esta carga.'}</h1>
            <p>{id?.startsWith('demo-') ? 'Las cargas de la demo se borran al recargar o cerrar esta pestaña.' : 'El enlace puede ser incorrecto.'}</p>
            <Link to="/transportistas">Volver al listado de cargas</Link>
          </section>
        )}
      </main>
    </>
  )
}

export default CargaRoutePage
