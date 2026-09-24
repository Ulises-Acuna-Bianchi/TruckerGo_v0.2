import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cargas as originalCargas, type Carga } from '../data/cargas'
import type { DadoresDraft } from '../pages/DadoresPage/dadoresTypes'
import { CargasContext, MAX_TEMPORARY_CARGAS, type PublishResult } from './CargasContext'

function CargasProvider({ children }: { children: ReactNode }) {
  const [temporaryCargas, setTemporaryCargas] = useState<Carga[]>([])
  const temporaryRef = useRef<Carga[]>([])
  const photoUrls = useRef(new Set<string>())

  useEffect(() => () => {
    for (const url of photoUrls.current) URL.revokeObjectURL(url)
    photoUrls.current.clear()
  }, [])

  function publishTemporaryCarga(draft: DadoresDraft, photo: File | null): PublishResult {
    if (temporaryRef.current.length >= MAX_TEMPORARY_CARGAS) {
      return { error: 'La demo permite crear hasta 10 cargas nuevas por sesión.' }
    }

    const paymentAmount = Number(draft.payment)
    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return { error: 'Ingresá un pago válido antes de agregar la carga a la demo.' }
    }

    const id = `demo-${crypto.randomUUID()}`
    const photoUrl = photo ? URL.createObjectURL(photo) : undefined
    if (photoUrl) photoUrls.current.add(photoUrl)

    const carga: Carga = {
      id,
      origin: draft.originLocality.trim(),
      destination: draft.destinationLocality.trim(),
      originAddress: draft.originAddress.trim(),
      destinationAddress: draft.destinationAddress.trim(),
      cargoType: draft.cargoType.trim(),
      cargoName: draft.cargoName.trim(),
      company: draft.company.trim(),
      paymentAmount,
      paymentBasis: 'Por viaje completo',
      paymentTerm: draft.paymentTerm.trim(),
      pickupDate: draft.pickupDate,
      pickupTime: draft.pickupTime.trim() || undefined,
      quantity: draft.quantity.trim(),
      weight: draft.weight.trim(),
      vehicle: draft.vehicle.trim(),
      observations: draft.description.trim(),
      contactName: draft.contactName.trim(),
      contactEmail: draft.email.trim(),
      contactPhone: draft.phone.trim() || undefined,
      photos: photoUrl ? [photoUrl] : undefined,
      temporary: true,
    }

    temporaryRef.current = [...temporaryRef.current, carga]
    setTemporaryCargas(temporaryRef.current)
    return { id }
  }

  return (
    <CargasContext.Provider value={{
      cargas: [...originalCargas, ...temporaryCargas],
      temporaryCount: temporaryCargas.length,
      publishTemporaryCarga,
    }}>
      {children}
    </CargasContext.Provider>
  )
}

export default CargasProvider
