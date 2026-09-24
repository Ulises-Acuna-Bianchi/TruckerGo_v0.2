import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import DadoresFormField, { type DadoresOption } from '../DadoresFormField/DadoresFormField'
import ContactStatus, { type ContactStatusKind } from '../ContactStatus/ContactStatus'
import styles from './ContactForm.module.css'

type ContactValues = {
  name: string
  email: string
  phone: string
  company: string
  profile: string
  reason: string
  message: string
}

type ContactField = keyof ContactValues
type ContactErrors = Partial<Record<ContactField, string>>

type ContactFormProps = {
  initialProfile?: string
  initialReason?: string
}

const profiles: DadoresOption[] = [
  { value: 'dador', label: 'Dador de carga' },
  { value: 'transportista', label: 'Transportista' },
  { value: 'empresa', label: 'Empresa u organización' },
  { value: 'inversor', label: 'Inversor o socio' },
  { value: 'otro', label: 'Otro' },
]

const reasons: DadoresOption[] = [
  { value: 'consulta', label: 'Hacer una consulta' },
  { value: 'demo', label: 'Solicitar una demo' },
  { value: 'publicar-carga', label: 'Publicar una carga' },
  { value: 'buscar-cargas', label: 'Buscar cargas' },
  { value: 'otro', label: 'Otro motivo' },
]

function createInitialValues(initialProfile = '', initialReason = ''): ContactValues {
  return {
    name: '',
    email: '',
    phone: '',
    company: '',
    profile: profiles.some((option) => option.value === initialProfile) ? initialProfile : '',
    reason: reasons.some((option) => option.value === initialReason) ? initialReason : 'consulta',
    message: '',
  }
}

function validate(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const nameParts = values.name.trim().split(/\s+/).filter(Boolean)

  if (nameParts.length < 2) errors.name = 'Ingresá tu nombre y apellido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Ingresá un email válido'
  if (!values.profile) errors.profile = 'Seleccioná tu perfil'
  if (!values.reason) errors.reason = 'Seleccioná un motivo de contacto'
  if (!values.message.trim()) errors.message = 'Contanos el motivo de tu consulta'

  return errors
}

function ContactForm({ initialProfile = '', initialReason = '' }: ContactFormProps) {
  const [values, setValues] = useState(() => createInitialValues(initialProfile, initialReason))
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<ContactStatusKind | null>(null)

  function updateField(field: ContactField, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')
    try {
      // Replace this local confirmation with the contact API when it is available.
      await new Promise((resolve) => window.setTimeout(resolve, 700))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status) {
    return <ContactStatus kind={status} onRetry={() => setStatus(null)} />
  }

  return (
    <section className={styles.card} aria-labelledby="contact-form-title">
      <h2 className={styles.title} id="contact-form-title">Contanos sobre vos</h2>
      <p className={styles.note}>Los campos con * son obligatorios.</p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <DadoresFormField
          label="Nombre y apellido"
          value={values.name}
          onChange={(value) => updateField('name', value)}
          placeholder="Tu nombre completo"
          autoComplete="name"
          required
          error={errors.name}
        />
        <DadoresFormField
          label="Email"
          type="email"
          value={values.email}
          onChange={(value) => updateField('email', value)}
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          required
          error={errors.email}
        />
        <div className={styles.optionalFields}>
          <DadoresFormField
            label="Teléfono (opcional)"
            type="tel"
            value={values.phone}
            onChange={(value) => updateField('phone', value)}
            placeholder="Con código de área"
            autoComplete="tel"
          />
          <DadoresFormField
            label="Empresa (opcional)"
            value={values.company}
            onChange={(value) => updateField('company', value)}
            placeholder="Nombre de la empresa"
            autoComplete="organization"
          />
        </div>
        <DadoresFormField
          label="¿Cuál es tu perfil?"
          type="select"
          value={values.profile}
          onChange={(value) => updateField('profile', value)}
          options={profiles}
          required
          error={errors.profile}
        />
        <DadoresFormField
          label="Motivo de contacto"
          type="select"
          value={values.reason}
          onChange={(value) => updateField('reason', value)}
          options={reasons}
          required
          error={errors.reason}
        />
        <DadoresFormField
          label="Mensaje"
          type="textarea"
          value={values.message}
          onChange={(value) => updateField('message', value)}
          placeholder="Contanos en qué podemos ayudarte"
          required
          error={errors.message}
        />
        <button className={styles.submit} type="submit">
          Enviar consulta <ArrowRight size={18} aria-hidden="true" />
        </button>
      </form>
    </section>
  )
}

export default ContactForm
