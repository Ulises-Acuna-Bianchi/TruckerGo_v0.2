import { ArrowRight } from 'lucide-react'
import DadoresFormField from '../DadoresFormField/DadoresFormField'
import type { DadoresDraft, DadoresDraftKey } from '../../pages/DadoresPage/dadoresTypes'
import styles from './DadoresStepBasics.module.css'

const localToday = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10)

type DadoresStepBasicsProps = {
  draft: DadoresDraft
  onChange: (key: DadoresDraftKey, value: string) => void
  onContinue: (event: React.FormEvent<HTMLFormElement>) => void
}

function DadoresStepBasics({ draft, onChange, onContinue }: DadoresStepBasicsProps) {
  return (
    <form className={styles.form} onSubmit={onContinue}>
      <h2 className={styles.title}>¿Qué necesitás transportar?</h2>

      <div className={styles.grid}>
        <DadoresFormField
          label="Tipo de mercadería"
          type="select"
          value={draft.cargoType}
          onChange={(value) => onChange('cargoType', value)}
          required
          options={[
            { value: 'Alimentos y bebidas', label: 'Alimentos y bebidas' },
            { value: 'Materiales de construcción', label: 'Materiales de construcción' },
            { value: 'Maquinaria', label: 'Maquinaria' },
            { value: 'Materias primas', label: 'Materias primas' },
            { value: 'Otros', label: 'Otros' },
          ]}
        />
        <DadoresFormField
          label="Nombre de la carga"
          value={draft.cargoName}
          onChange={(value) => onChange('cargoName', value)}
          placeholder="Ej.: 12 pallets de bebidas"
          required
        />
      </div>

      <div className={styles.routeGrid}>
        <fieldset className={styles.placeGroup}>
          <legend>Origen</legend>
          <DadoresFormField
            label="Localidad de retiro"
            value={draft.originLocality}
            onChange={(value) => onChange('originLocality', value)}
            placeholder="Ciudad, provincia"
            required
            autoComplete="address-level2"
          />
          <DadoresFormField
            label="Dirección de retiro"
            value={draft.originAddress}
            onChange={(value) => onChange('originAddress', value)}
            placeholder="Calle y altura"
            required
            autoComplete="street-address"
          />
        </fieldset>

        <fieldset className={styles.placeGroup}>
          <legend>Destino</legend>
          <DadoresFormField
            label="Localidad de entrega"
            value={draft.destinationLocality}
            onChange={(value) => onChange('destinationLocality', value)}
            placeholder="Ciudad, provincia"
            required
            autoComplete="address-level2"
          />
          <DadoresFormField
            label="Dirección de entrega"
            value={draft.destinationAddress}
            onChange={(value) => onChange('destinationAddress', value)}
            placeholder="Calle y altura"
            required
            autoComplete="street-address"
          />
        </fieldset>
      </div>

      <div className={styles.grid}>
        <DadoresFormField
          label="Fecha de retiro"
          type="date"
          value={draft.pickupDate}
          onChange={(value) => onChange('pickupDate', value)}
          min={localToday}
          required
        />
        <DadoresFormField
          label="Franja horaria de retiro"
          value={draft.pickupTime}
          onChange={(value) => onChange('pickupTime', value)}
          placeholder="Ej.: De 8 a 12 h"
          optional
        />
      </div>

      <aside className={styles.distance} aria-live="polite">
        <p className={styles.distanceLabel}>Distancia estimada del viaje</p>
        <p className={styles.distanceValue}>A calcular</p>
        <p className={styles.distanceNote}>
          La estimación se habilitará cuando esté conectado el servicio de rutas.
        </p>
      </aside>

      <div className={styles.actions}>
        <button className={styles.primaryButton} type="submit">
          Continuar con mi carga <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </form>
  )
}

export default DadoresStepBasics
