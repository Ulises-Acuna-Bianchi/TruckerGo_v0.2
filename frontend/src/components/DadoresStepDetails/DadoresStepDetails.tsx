import { ArrowLeft, ArrowRight, ImagePlus, Package } from 'lucide-react'
import type { ChangeEvent } from 'react'
import DadoresFormField from '../DadoresFormField/DadoresFormField'
import type { DadoresDraft, DadoresDraftKey } from '../../pages/DadoresPage/dadoresTypes'
import styles from './DadoresStepDetails.module.css'

type DadoresStepDetailsProps = {
  draft: DadoresDraft
  onChange: (key: DadoresDraftKey, value: string) => void
  onBack: () => void
  onContinue: (event: React.FormEvent<HTMLFormElement>) => void
  photoUrl?: string
  photoError: string
  onPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void
  onPhotoRemove: () => void
}

function DadoresStepDetails({ draft, onChange, onBack, onContinue, photoUrl, photoError, onPhotoChange, onPhotoRemove }: DadoresStepDetailsProps) {
  return (
    <form className={styles.form} onSubmit={onContinue}>
      <div className={styles.routeSummary} aria-label="Resumen de los datos básicos">
        <div className={styles.summaryText}>
          <strong>{draft.cargoName}</strong>
          <span>{draft.originLocality} → {draft.destinationLocality}</span>
        </div>
        <button className={styles.editBasics} type="button" onClick={onBack}>Editar datos básicos</button>
      </div>

      <section className={styles.panel} aria-labelledby="cargo-vehicle-title">
        <h3 id="cargo-vehicle-title">Carga y vehículo</h3>
        <div className={styles.fields}>
          <DadoresFormField
            label="Cantidad"
            value={draft.quantity}
            onChange={(value) => onChange('quantity', value)}
            placeholder="Ej.: 12 pallets"
            required
          />
          <DadoresFormField
            label="Peso total"
            value={draft.weight}
            onChange={(value) => onChange('weight', value)}
            placeholder="Ej.: 8 toneladas"
            required
          />
          <DadoresFormField
            label="Vehículo requerido"
            type="select"
            value={draft.vehicle}
            onChange={(value) => onChange('vehicle', value)}
            required
            options={[
              { value: 'Semirremolque', label: 'Semirremolque' },
              { value: 'Camión', label: 'Camión' },
              { value: 'Camión con acoplado', label: 'Camión con acoplado' },
              { value: 'Furgón', label: 'Furgón' },
              { value: 'A definir', label: 'A definir' },
            ]}
          />
          <div className={styles.fullWidth}>
            <DadoresFormField
              label="Descripción y observaciones"
              type="textarea"
              value={draft.description}
              onChange={(value) => onChange('description', value)}
              placeholder="Contanos detalles importantes para el traslado."
              required
            />
          </div>
        </div>
        <div className={styles.photoRow}>
          <div>
            <strong>Foto de la carga <span>· Opcional</span></strong>
            <p>JPG, PNG o WebP · Máximo 5 MB</p>
          </div>
          <label className={styles.photoButton}>
            <ImagePlus size={18} aria-hidden="true" /> {photoUrl ? 'Cambiar foto' : 'Agregar foto'}
            <input className={styles.photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhotoChange} aria-label="Seleccionar foto de la carga" />
          </label>
        </div>
        <div className={styles.photoPreview}>
          {photoUrl ? <img src={photoUrl} alt="Vista previa de la carga" /> : <Package size={42} strokeWidth={1.5} aria-label="Sin foto de la carga" />}
        </div>
        {photoUrl && <button className={styles.removePhoto} type="button" onClick={onPhotoRemove}>Quitar foto</button>}
        {photoError && <p className={styles.photoError} role="alert">{photoError}</p>}
      </section>

      <section className={styles.panel} aria-labelledby="payment-title">
        <h3 id="payment-title">Pago</h3>
        <div className={styles.fields}>
          <DadoresFormField
            label="Pago ofrecido por viaje · ARS"
            type="number"
            value={draft.payment}
            onChange={(value) => onChange('payment', value)}
            placeholder="Ej.: 380000"
            min="1"
            step="1"
            required
          />
          <DadoresFormField
            label="Plazo de pago"
            type="select"
            value={draft.paymentTerm}
            onChange={(value) => onChange('paymentTerm', value)}
            required
            options={[
              { value: 'A 7 días de la entrega', label: 'A 7 días de la entrega' },
              { value: 'A 15 días de la entrega', label: 'A 15 días de la entrega' },
              { value: 'A 30 días de la entrega', label: 'A 30 días de la entrega' },
              { value: 'A convenir', label: 'A convenir' },
            ]}
          />
        </div>
        <p className={styles.hint}>El importe corresponde al viaje completo.</p>
      </section>

      <section className={styles.panel} aria-labelledby="company-title">
        <h3 id="company-title">Empresa y contacto</h3>
        <div className={styles.fields}>
          <DadoresFormField
            label="Nombre de la empresa"
            value={draft.company}
            onChange={(value) => onChange('company', value)}
            autoComplete="organization"
            required
          />
          <DadoresFormField
            label="Persona de contacto"
            value={draft.contactName}
            onChange={(value) => onChange('contactName', value)}
            autoComplete="name"
            required
          />
          <DadoresFormField
            label="Correo de contacto"
            type="email"
            value={draft.email}
            onChange={(value) => onChange('email', value)}
            autoComplete="email"
            required
          />
          <DadoresFormField
            label="Teléfono de contacto"
            type="tel"
            value={draft.phone}
            onChange={(value) => onChange('phone', value)}
            autoComplete="tel"
            optional
          />
        </div>
      </section>

      <div className={styles.actions}>
        <button className={styles.backButton} type="button" onClick={onBack}>
          <ArrowLeft size={18} aria-hidden="true" /> Volver
        </button>
        <button className={styles.continueButton} type="submit">
          Revisar publicación <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}

export default DadoresStepDetails
