import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import DadoresProgress, { type DadoresStep } from '../../components/DadoresProgress/DadoresProgress'
import DadoresStepBasics from '../../components/DadoresStepBasics/DadoresStepBasics'
import DadoresStepDetails from '../../components/DadoresStepDetails/DadoresStepDetails'
import DadoresStepReview from '../../components/DadoresStepReview/DadoresStepReview'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { MAX_TEMPORARY_CARGAS, useCargas } from '../../context/CargasContext'
import { emptyDadoresDraft, type DadoresDraftKey } from './dadoresTypes'
import styles from './DadoresPage.module.css'

function DadoresPage() {
  const { publishTemporaryCarga, temporaryCount } = useCargas()
  const [currentStep, setCurrentStep] = useState<DadoresStep>(1)
  const [draft, setDraft] = useState(emptyDadoresDraft)
  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null)
  const photoUrl = useRef<string | null>(null)
  const [photoError, setPhotoError] = useState('')
  const [publishError, setPublishError] = useState('')
  const [publishedId, setPublishedId] = useState<string | null>(null)

  useEffect(() => () => {
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
  }, [])

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setPhotoError('Elegí una imagen JPG, PNG o WebP.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('La foto debe pesar 5 MB o menos.')
      return
    }
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
    const url = URL.createObjectURL(file)
    photoUrl.current = url
    setPhoto({ file, url })
    setPhotoError('')
  }

  function removePhoto() {
    if (photoUrl.current) URL.revokeObjectURL(photoUrl.current)
    photoUrl.current = null
    setPhoto(null)
    setPhotoError('')
  }

  function publish() {
    const result = publishTemporaryCarga(draft, photo?.file ?? null)
    if (result.error !== undefined) {
      setPublishError(result.error)
      return
    }
    removePhoto()
    setPublishError('')
    setPublishedId(result.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function createAnother() {
    setDraft(emptyDadoresDraft)
    setCurrentStep(1)
    setPublishedId(null)
  }

  function updateDraft(key: DadoresDraftKey, value: string) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }))
  }

  function continueToDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCurrentStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function continueToReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function goBackToBasics() {
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function editStep(step: DadoresStep) {
    setCurrentStep(step)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>DADORES DE CARGA</p>
          <h1>
            {publishedId ? 'Carga agregada a la demo' : currentStep === 1
              ? 'Encontrá transporte para tu carga.'
              : currentStep === 2
                ? 'Completá los detalles'
                : 'Revisá tu publicación'}
          </h1>
          <p className={styles.description}>
            {publishedId ? 'Tu carga ficticia ya aparece en los listados durante esta sesión.' : currentStep === 1
              ? 'Contanos qué necesitás trasladar y qué recorrido necesitás hacer.'
              : currentStep === 2
                ? 'Sumá la información necesaria para preparar tu publicación.'
                : 'Comprobá los datos antes de publicar tu carga.'}
          </p>
          {!publishedId && currentStep === 1 && (
            <Link className={styles.demoLink} to="/contacto?perfil=dador&motivo=demo">Solicitar una demo</Link>
          )}
        </div>

        <p className={styles.temporaryNotice}>Demo temporal: las cargas que crees se borran al recargar o cerrar esta pestaña</p>

        {publishedId ? (
          <div className={styles.publishedPanel} role="status">
            <p>Esta es una simulación con datos ficticios. No se envió información a un servidor.</p>
            <div className={styles.publishedActions}>
              <Link to={`/cargas/${publishedId}`}>Ver detalle de la carga</Link>
              <Link to="/transportistas">Ver todas las cargas</Link>
              {temporaryCount < MAX_TEMPORARY_CARGAS && <button type="button" onClick={createAnother}>Crear otra carga</button>}
            </div>
          </div>
        ) : <>

        <div className={currentStep === 3 ? styles.reviewProgress : styles.formProgress}>
          <DadoresProgress currentStep={currentStep} />
        </div>

        {currentStep === 1 && (
          <DadoresStepBasics draft={draft} onChange={updateDraft} onContinue={continueToDetails} />
        )}
        {currentStep === 2 && (
          <DadoresStepDetails
            draft={draft}
            onChange={updateDraft}
            onBack={goBackToBasics}
            onContinue={continueToReview}
            photoUrl={photo?.url}
            photoError={photoError}
            onPhotoChange={choosePhoto}
            onPhotoRemove={removePhoto}
          />
        )}
        {currentStep === 3 && (
          <DadoresStepReview draft={draft} photoUrl={photo?.url} onEdit={editStep} onBack={() => editStep(2)} onPublish={publish} publishError={publishError} atLimit={temporaryCount >= MAX_TEMPORARY_CARGAS} />
        )}
        </>}
      </main>
      <Footer />
    </>
  )
}

export default DadoresPage
