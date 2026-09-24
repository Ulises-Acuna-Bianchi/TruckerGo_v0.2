import { useId, type ChangeEvent } from 'react'
import styles from './DadoresFormField.module.css'

export type DadoresOption = { value: string; label: string }
export type DadoresFieldType = 'text' | 'email' | 'tel' | 'date' | 'number' | 'select' | 'textarea'

type DadoresFormFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  optional?: boolean
  type?: DadoresFieldType
  options?: DadoresOption[]
  min?: string
  step?: string
  autoComplete?: string
  error?: string
}

function DadoresFormField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  optional = false,
  type = 'text',
  options = [],
  min,
  step,
  autoComplete,
  error,
}: DadoresFormFieldProps) {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange(event.target.value)

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required} aria-hidden="true"> *</span>}
        {optional && <span className={styles.optional}> · Opcional</span>}
      </label>
      {type === 'select' ? (
        <select
          className={styles.control}
          id={id}
          value={value}
          required={required}
          onChange={handleChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        >
          <option value="">Seleccioná una opción</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className={`${styles.control} ${styles.textarea}`}
          id={id}
          value={value}
          required={required}
          onChange={handleChange}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      ) : (
        <input
          className={styles.control}
          id={id}
          type={type}
          value={value}
          required={required}
          min={min}
          step={step}
          onChange={handleChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
      )}
      {error && <p className={styles.error} id={errorId} role="alert">{error}</p>}
    </div>
  )
}

export default DadoresFormField
