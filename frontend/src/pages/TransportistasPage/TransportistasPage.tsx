import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import CargoCard from '../../components/CargoCard/CargoCard'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useCargas } from '../../context/CargasContext'
import styles from './TransportistasPage.module.css'

function TransportistasPage() {
  const { cargas } = useCargas()
  const location = useLocation()
  const navigate = useNavigate()

  function searchCargas(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    const query = new URLSearchParams()
    for (const [key, value] of fields) {
      if (typeof value === 'string' && value.trim()) query.set(key, value.trim())
    }
    navigate(`/transportistas${query.size ? `?${query}` : ''}`)
  }
  const params = new URLSearchParams(location.search)
  const departure = params.get('salida')?.trim().toLocaleLowerCase('es-AR') ?? ''
  const destination = params.get('destino')?.trim().toLocaleLowerCase('es-AR') ?? ''
  const maxDistance = Number(params.get('radio')) || Number.POSITIVE_INFINITY
  const vehicle = params.get('vehiculo') ?? ''
  const availableFrom = params.get('fecha') ?? ''

  const results = cargas
    .filter((carga) => {
      const matchesDeparture = !departure || carga.origin.toLocaleLowerCase('es-AR').includes(departure)
      const matchesDestination = !destination || carga.destination.toLocaleLowerCase('es-AR').includes(destination)
      const matchesDistance = !Number.isFinite(maxDistance) || (carga.pickupDistanceKm !== undefined && carga.pickupDistanceKm <= maxDistance)
      const matchesVehicle = !vehicle || carga.vehicle === vehicle
      const matchesDate = !availableFrom || carga.pickupDate >= availableFrom
      return matchesDeparture && matchesDestination && matchesDistance && matchesVehicle && matchesDate
    })

  const selectedVehicle = params.get('vehiculo') ?? ''

  return (
    <>
      <Header />
      <main className={styles.main}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>TRANSPORTISTAS</p>
          <h1>Encontrá una carga para tu próximo viaje.</h1>
          <p className={styles.description}>
            Explorá cargas según tu ubicación, tu vehículo y el recorrido que querés hacer.
          </p>
          <Link className={styles.demoLink} to="/contacto?perfil=transportista&motivo=demo">Solicitar una demo</Link>
        </header>

        <form key={location.search} className={styles.searchPanel} onSubmit={searchCargas}>
          <h2>¿Desde dónde querés salir?</h2>
          <div className={styles.searchFields}>
            <label className={styles.field}>
              <span>Ubicación de salida</span>
              <input
                name="salida"
                type="search"
                placeholder="Localidad o dirección"
                defaultValue={params.get('salida') ?? ''}
              />
            </label>
            <div className={styles.locationAction}>
              <button type="button" disabled title="La ubicación automática estará disponible más adelante.">
                Usar mi ubicación
              </button>
              <span>Ubicación automática no disponible en esta demo.</span>
            </div>

            <label className={styles.field}>
              <span>Hasta dónde podés acercarte</span>
              <select name="radio" defaultValue={params.get('radio') ?? ''}>
                <option value="">Sin límite</option>
                <option value="10">Hasta 10 km</option>
                <option value="25">Hasta 25 km</option>
                <option value="50">Hasta 50 km</option>
                <option value="100">Hasta 100 km</option>
              </select>
            </label>
            <label className={styles.field}>
              <span>Tipo de vehículo</span>
              <select name="vehiculo" defaultValue={selectedVehicle}>
                <option value="">Todos los vehículos</option>
                {[...new Set(cargas.map((carga) => carga.vehicle).filter(Boolean))].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Fecha de disponibilidad</span>
              <input name="fecha" type="date" defaultValue={availableFrom} />
            </label>
            <label className={styles.field}>
              <span>Destino preferido <em>· Opcional</em></span>
              <input
                name="destino"
                type="search"
                placeholder="Localidad o provincia"
                defaultValue={params.get('destino') ?? ''}
              />
            </label>
          </div>
          <button className={styles.searchButton} type="submit">Buscar cargas</button>
        </form>

        <section className={styles.results} aria-labelledby="results-title">
          <>
              <div className={styles.resultsHeading}>
                <div>
                  <h2 id="results-title">Cargas para tu próximo viaje</h2>
                  <p>{results.length} {results.length === 1 ? 'carga encontrada' : 'cargas encontradas'}</p>
                </div>
                <p>Orden de publicación</p>
              </div>

              {results.length > 0 ? (
                <div className={styles.grid}>
                  {results.map((carga) => <CargoCard key={carga.id} carga={carga} />)}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <h3>No encontramos cargas con esos criterios.</h3>
                  <p>Probá cambiar la ubicación, el vehículo o la fecha.</p>
                  <Link to="/transportistas">Limpiar filtros</Link>
                </div>
              )}

              <p className={styles.note}>
                Vista conceptual. Cargas, empresas, pagos y distancias de ejemplo.
              </p>
            </>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default TransportistasPage
