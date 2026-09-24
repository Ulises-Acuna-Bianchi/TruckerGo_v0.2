import { ArrowLeft, ArrowRight, Package } from 'lucide-react'
import type { DadoresStep } from '../DadoresProgress/DadoresProgress'
import type { DadoresDraft } from '../../pages/DadoresPage/dadoresTypes'
import styles from './DadoresStepReview.module.css'

type DadoresStepReviewProps = {
  draft: DadoresDraft
  onEdit: (step: DadoresStep) => void
  onBack: () => void
  photoUrl?: string
  onPublish: () => void
  publishError: string
  atLimit: boolean
}

function formatDate(value: string) {
  if (!value) return 'Sin fecha'
  return new Date(`${value}T00:00:00`).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function formatPayment(value: string) {
  const amount = Number(value)
  return Number.isFinite(amount) && amount > 0
    ? amount.toLocaleString('es-AR')
    : 'A definir'
}

function DadoresStepReview({ draft, photoUrl, onEdit, onBack, onPublish, publishError, atLimit }: DadoresStepReviewProps) {
  return (
    <div className={styles.review}>
      <section className={styles.previewColumn} aria-labelledby="preview-title">
        <h2 id="preview-title">Así se verá tu carga</h2>
        <article className={styles.previewCard}>
          <div className={styles.imagePlaceholder}>
            {photoUrl ? <img className={styles.previewPhoto} src={photoUrl} alt="Vista previa de la carga" /> : <Package size={42} strokeWidth={1.5} aria-label="Sin foto de la carga" />}
          </div>
          <div className={styles.previewBody}>
            <p className={styles.previewEyebrow}>RUTA</p>
            <h3>{draft.originLocality || 'Origen'}<br />→ {draft.destinationLocality || 'Destino'}</h3>
            <p className={styles.cargoName}>{draft.cargoName || 'Nombre de la carga'}</p>
            <div className={styles.payment}>
              <p className={styles.previewEyebrow}>PAGO · ARS</p>
              <strong>{formatPayment(draft.payment)}</strong>
              <span>Por viaje completo · {draft.paymentTerm || 'Plazo a definir'}</span>
            </div>
            <div className={styles.distanceInfo}>
              <strong>Hasta la carga: Según ubicación</strong>
              <span>La distancia se calculará al conectar el servicio de rutas.</span>
              <strong>Recorrido: A calcular</strong>
              <span>Del retiro al destino</span>
            </div>
          </div>
        </article>
      </section>

      <section className={styles.summaryColumn} aria-labelledby="summary-title">
        <h2 id="summary-title">Resumen y edición</h2>
        <div className={styles.summaryGrid}>
          <article className={styles.summaryCard}>
            <div className={styles.cardHeading}>
              <h3>Datos básicos</h3>
              <button type="button" onClick={() => onEdit(1)}>Editar</button>
            </div>
            <p>
              <strong>Mercadería:</strong> {draft.cargoType || 'Sin definir'}<br />
              <strong>Carga:</strong> {draft.cargoName || 'Sin definir'}<br />
              <strong>Retiro:</strong> {draft.originLocality || 'Sin definir'}<br />
              <strong>Dirección:</strong> {draft.originAddress || 'Sin definir'}<br />
              <strong>Entrega:</strong> {draft.destinationLocality || 'Sin definir'}<br />
              <strong>Dirección:</strong> {draft.destinationAddress || 'Sin definir'}<br />
              <strong>Fecha:</strong> {formatDate(draft.pickupDate)}{draft.pickupTime ? `, ${draft.pickupTime}` : ''}
            </p>
          </article>

          <article className={styles.summaryCard}>
            <div className={styles.cardHeading}>
              <h3>Detalles de la carga</h3>
              <button type="button" onClick={() => onEdit(2)}>Editar</button>
            </div>
            <p>
              <strong>Cantidad:</strong> {draft.quantity || 'Sin definir'}<br />
              <strong>Peso:</strong> {draft.weight || 'Sin definir'}<br />
              <strong>Vehículo:</strong> {draft.vehicle || 'Sin definir'}<br />
              <strong>Observaciones:</strong> {draft.description || 'Sin observaciones'}<br />
              <strong>Pago:</strong> ARS {formatPayment(draft.payment)} · {draft.paymentTerm || 'plazo a definir'}
            </p>
          </article>

          <article className={`${styles.summaryCard} ${styles.contactCard}`}>
            <div className={styles.cardHeading}>
              <h3>Empresa y contacto</h3>
              <button type="button" onClick={() => onEdit(2)}>Editar</button>
            </div>
            <p>
              <strong>{draft.company || 'Empresa sin definir'}</strong><br />
              Contacto: {draft.contactName || 'Sin definir'} · {draft.email || 'Sin correo'}
              {draft.phone && <><br />Teléfono: {draft.phone}</>}
            </p>
          </article>
        </div>

        <div className={styles.actions}>
          <button className={styles.backButton} type="button" onClick={onBack}>
            <ArrowLeft size={18} aria-hidden="true" /> Volver a detalles
          </button>
          <div className={styles.publishGroup}>
            <button className={styles.publishButton} type="button" onClick={onPublish} disabled={atLimit}>
              Publicar carga <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p role={publishError || atLimit ? 'alert' : 'status'}>{publishError || (atLimit ? 'Alcanzaste el máximo de 10 cargas nuevas por sesión.' : 'Publicación ficticia disponible sólo durante esta sesión.')}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DadoresStepReview
