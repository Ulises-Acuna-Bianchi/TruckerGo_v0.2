import { Link, useLocation, useParams } from 'react-router'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { formatPayment, formatPickupTime } from '../../data/cargas'
import { useCargas } from '../../context/CargasContext'
import styles from './CargaDetailPage.module.css'

function CargaDetailPage() {
  const { cargas } = useCargas()
  const { id } = useParams()
  const location = useLocation()
  const carga = cargas.find((item) => item.id === id)
  const from = (location.state as { from?: string } | null)?.from ?? '/transportistas'

  if (!carga) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <section className={styles.notFound}>
            <p className={styles.eyebrow}>CARGA NO DISPONIBLE</p>
            <h1>{id?.startsWith('demo-') ? 'Esta carga temporal ya no está disponible.' : 'No encontramos esta carga.'}</h1>
            <p>{id?.startsWith('demo-') ? 'Las cargas de la demo se borran al recargar o cerrar esta pestaña.' : 'Puede que el enlace sea incorrecto o que la carga ya no esté disponible.'}</p>
            <Link className={styles.primaryLink} to="/transportistas">Volver al listado</Link>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link className={styles.backLink} to={from}>← Volver a resultados</Link>
          <div className={styles.topGrid}>
            <section className={styles.gallery} aria-label="Fotografías de la carga">
              {carga.photos?.length ? (
                <>
                  <img className={styles.heroPhoto} src={carga.photos[0]} alt={`Fotografía de ${carga.cargoName}`} />
                  <div className={styles.thumbnails}>
                    {carga.photos.slice(1, 4).map((photo) => <img key={photo} src={photo} alt="" />)}
                  </div>
                </>
              ) : (
                <div className={styles.photoPlaceholder} role="img" aria-label="Espacio reservado para fotografías de la carga">
                  <span>Fotografías de la carga</span>
                </div>
              )}
            </section>

            <aside className={styles.summary}>
              <p className={styles.eyebrow}>DETALLE DE CARGA</p>
              <h1>{carga.origin} <span aria-hidden="true">→</span> {carga.destination}</h1>
              <h2>{carga.cargoName}</h2>
              <p className={styles.company}>Publicada por {carga.company}</p>
              <div className={styles.payment}>
                <span>Pago · ARS</span>
                <strong>$ {formatPayment(carga.paymentAmount)}</strong>
                <p>{carga.paymentBasis}</p>
                <p>Plazo: {carga.paymentTerm ?? 'No especificado'}</p>
              </div>
              <div className={styles.distances}>
                <div><strong>{carga.pickupDistanceKm === undefined ? 'Pendiente' : `${carga.pickupDistanceKm} km`}</strong><span>Hasta el retiro</span></div>
                <div><strong>{carga.routeDistanceKm === undefined ? 'Pendiente' : `${carga.routeDistanceKm} km`}</strong><span>Recorrido total</span></div>
              </div>
              <div className={styles.actions}>
                <Link className={styles.takeLink} to={`/cargas/${carga.id}/recorrido`}>Tomar carga</Link>
                <p>Inicia un recorrido de demostración. No asigna la carga ni cambia su disponibilidad.</p>
                <Link to={`/cargas/${carga.id}/recorrido`}>Ver recorrido</Link>
              </div>
            </aside>
          </div>

          <section className={styles.operations} aria-labelledby="operations-title">
            <h2 id="operations-title">Información operativa</h2>
            <dl>
              <div><dt>Retiro</dt><dd>{formatPickupTime(carga.pickupDate, carga.pickupTime)}</dd></div>
              {carga.cargoType && <div><dt>Mercadería</dt><dd>{carga.cargoType}</dd></div>}
              {carga.originAddress && <div><dt>Dirección de retiro</dt><dd>{carga.originAddress}</dd></div>}
              {carga.destinationAddress && <div><dt>Dirección de entrega</dt><dd>{carga.destinationAddress}</dd></div>}
              <div><dt>Cantidad</dt><dd>{carga.quantity ?? 'No especificada'}</dd></div>
              <div><dt>Peso</dt><dd>{carga.weight ?? 'No especificado'}</dd></div>
              <div><dt>Vehículo</dt><dd>{carga.vehicle ?? 'No especificado'}</dd></div>
            </dl>
          </section>

          {carga.temporary && <section className={styles.operations} aria-label="Contacto de la carga"><h2>Contacto</h2><dl><div><dt>Persona</dt><dd>{carga.contactName || 'Pendiente'}</dd></div><div><dt>Correo</dt><dd>{carga.contactEmail || 'Pendiente'}</dd></div><div><dt>Teléfono</dt><dd>{carga.contactPhone || 'Pendiente'}</dd></div></dl></section>}

          <details className={styles.conditions}>
            <summary>Más condiciones de la carga</summary>
            <p>No se especificaron condiciones adicionales.</p>
          </details>

          <section className={styles.observations}>
            <h2>Observaciones</h2>
            <p>{carga.observations ?? 'Sin observaciones adicionales'}</p>
          </section>
          <p className={styles.disclaimer}>Vista conceptual con datos ficticios. Las cargas creadas en esta demo son temporales y no son publicaciones reales.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default CargaDetailPage
