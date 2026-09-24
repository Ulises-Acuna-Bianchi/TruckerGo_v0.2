import { createContext, useContext } from 'react'
import type { Carga } from '../data/cargas'
import type { DadoresDraft } from '../pages/DadoresPage/dadoresTypes'

export const MAX_TEMPORARY_CARGAS = 10

export type PublishResult = { id: string; error?: never } | { id?: never; error: string }

export type CargasContextValue = {
  cargas: Carga[]
  temporaryCount: number
  publishTemporaryCarga: (draft: DadoresDraft, photo: File | null) => PublishResult
}

export const CargasContext = createContext<CargasContextValue | null>(null)

export function useCargas() {
  const context = useContext(CargasContext)
  if (!context) throw new Error('useCargas debe usarse dentro de CargasProvider')
  return context
}
