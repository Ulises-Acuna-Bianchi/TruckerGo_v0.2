import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router'
import GoogleRouteMap from '../../components/GoogleRouteMap/GoogleRouteMap'
import RouteDiagram from '../../components/RouteDiagram/RouteDiagram'
import { useCargas } from '../../context/CargasContext'
import { formatPickupDate } from '../../data/cargas'
import styles from './CargaRoutePage.module.css'

type Segment = 'pickup' | 'delivery'
const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY?.trim()

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
  const [departureInput, setDepartureInput] = useState('')
  const [departure, setDeparture] = useState('')

  const pickupPlace = carga ? locationLabel(carga.originAddress, carga.origin) : ''
  const deliveryPlace = carga ? locationLabel(carga.destinationAddress, carga.destination) : ''
  const distance = segment === 'pickup' ? carga?.pickupDistanceKm : carga?.routeDistanceKm
  const pickupDate = carga?.pickupDate
    ? formatPickupDate(carga.pickupDate, { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'No informada'
  const pickupTime = carga?.pickupTime || 'Horario no informado'
  const routeOrigin = segment === 'pickup' ? departure : carga?.origin ? pickupPlace : ''
  const routeDestination = segment === 'pickup' ? carga?.origin ? pickupPlace : '' : carga?.destination ? deliveryPlace : ''
  const mapPlace = segment === 'pickup'
    ? carga?.origin ? pickupPlace : ''
    : carga?.origin ? pickupPlace : carga?.destination ? deliveryPlace : ''
  const hasRoute = Boolean(routeOrigin && routeDestination)
  const mapsUrl = hasRoute
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(routeOrigin)}&destination=${encodeURIComponent(routeDestination)}&travelmode=driving`
    : undefined

  function showPickupRoute(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDeparture(departureInput.trim())
  }

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

            {segment === 'pickup' && (
              <form className={styles.departureForm} onSubmit={showPickupRoute}>
                <label htmlFor="pickup-departure">¿Desde dónde salís? <span>Escribí una ciudad o dirección. Se enviará a Google Maps para mostrar la ruta; no usamos GPS ni guardamos este dato.</span></label>
                <div className={styles.departureControls}>
                  <input id="pickup-departure" type="search" value={departureInput} onChange={(event) => setDepartureInput(event.target.value)} placeholder="Ej.: Córdoba, Argentina" autoComplete="street-address" />
                  <button type="submit">Mostrar recorrido</button>
                  {departure && <button type="button" className={styles.clearDeparture} onClick={() => { setDeparture(''); setDepartureInput('') }}>Quitar salida</button>}
                </div>
              </form>
            )}

            <div className={styles.layout}>
              {mapsApiKey && hasRoute ? (
                <GoogleRouteMap apiKey={mapsApiKey} mode="directions" origin={routeOrigin} destination={routeDestination} title={`Mapa de Google del tramo ${segment === 'pickup' ? 'hasta el retiro' : 'hasta la entrega'}`} />
              ) : mapsApiKey && mapPlace ? (
                <GoogleRouteMap apiKey={mapsApiKey} mode="place" place={mapPlace} title={`Mapa de Google del ${segment === 'pickup' ? 'punto de retiro' : 'punto disponible'}`} />
              ) : (
                <RouteDiagram segment={segment} origin={carga.origin || 'No informado'} destination={carga.destination || 'No informado'} distanceKm={distance} />
              )}
              <section className={styles.routePanel} aria-live="polite">
                <p className={styles.eyebrow}>{segment === 'pickup' ? 'PUNTO DE RETIRO' : 'PUNTO DE ENTREGA'}</p>
                <h2>{segment === 'pickup' ? pickupPlace : deliveryPlace}</h2>
                <p className={styles.description}>{carga.cargoName || 'Carga no informada'} · {carga.company || 'Empresa no informada'}</p>
                <div className={styles.metrics}>
                  <div>
                    <strong>{distanceLabel(distance)}</strong>
                    <span>{segment === 'pickup' ? 'Distancia de ejemplo hasta la carga' : 'Distancia de ejemplo desde el retiro'}</span>
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
                {!mapsApiKey && <p className={styles.mapNote}>El mapa de Google no está configurado en esta demo; se muestra el recorrido conceptual.</p>}
                {segment === 'pickup' && !departure && <p className={styles.mapNote}>Ingresá un punto de partida para ver una posible ruta. Por ahora se muestra sólo el retiro.{!carga.originAddress && ' Como sólo conocemos la ciudad, ese punto es aproximado.'}</p>}
                {segment === 'pickup' && departure && <p className={styles.mapNote}>Google muestra una posible ruta desde el lugar que ingresaste. La distancia de la ficha es de ejemplo y puede diferir de la del mapa.</p>}
                {segment === 'delivery' && !hasRoute && <p className={styles.mapNote}>No se puede trazar este tramo: faltan el origen o el destino.</p>}
                {segment === 'delivery' && hasRoute && <p className={styles.mapNote}>{!carga.originAddress || !carga.destinationAddress ? 'El mapa usa las ciudades disponibles; los puntos son aproximados.' : 'El mapa usa las direcciones ingresadas para esta carga.'} La distancia de la ficha es de ejemplo y puede diferir de la del mapa.</p>}
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
