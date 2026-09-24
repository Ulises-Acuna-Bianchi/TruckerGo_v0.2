export type Carga = {
  id: string
  origin: string
  destination: string
  originAddress?: string
  destinationAddress?: string
  cargoType?: string
  cargoName: string
  company: string
  paymentAmount: number
  paymentBasis: string
  paymentTerm?: string
  pickupDistanceKm?: number
  routeDistanceKm?: number
  pickupDate: string
  pickupTime?: string
  quantity?: string
  weight?: string
  vehicle?: string
  observations?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  photos?: string[]
  temporary?: boolean
}

export const cargas: Carga[] = [
  {
    id: 'zarate-rosario',
    origin: 'Zárate',
    destination: 'Rosario',
    cargoName: '12 pallets de bebidas',
    company: 'Empresa de ejemplo A',
    paymentAmount: 380_000,
    paymentBasis: 'Por viaje completo',
    paymentTerm: 'A 7 días de la entrega',
    pickupDistanceKm: 8,
    routeDistanceKm: 246,
    pickupDate: '2026-09-10',
    pickupTime: '8 a 12 h',
    quantity: '12 pallets',
    weight: '8 toneladas',
    vehicle: 'Semirremolque',
    observations: 'Carga paletizada. Descarga con autoelevador.',
  },
  {
    id: 'campana-pergamino',
    origin: 'Campana',
    destination: 'Pergamino',
    cargoName: 'Maquinaria agrícola',
    company: 'Empresa de ejemplo B',
    paymentAmount: 450_000,
    paymentBasis: 'Por viaje completo',
    pickupDistanceKm: 15,
    routeDistanceKm: 180,
    pickupDate: '2026-09-12',
    pickupTime: '9 a 13 h',
    weight: '10 toneladas',
    vehicle: 'Carretón',
    observations: 'Sin observaciones adicionales',
  },
  {
    id: 'escobar-la-plata',
    origin: 'Escobar',
    destination: 'La Plata',
    cargoName: '20 pallets de ladrillos',
    company: 'Empresa de ejemplo C',
    paymentAmount: 290_000,
    paymentBasis: 'Por viaje completo',
    pickupDistanceKm: 24,
    routeDistanceKm: 125,
    pickupDate: '2026-09-14',
    pickupTime: '7 a 11 h',
    quantity: '20 pallets',
    weight: '24 toneladas',
    vehicle: 'Semirremolque',
    observations: 'Sin observaciones adicionales',
  },
  {
    id: 'pilar-mar-del-plata',
    origin: 'Pilar',
    destination: 'Mar del Plata',
    cargoName: '16 pallets de productos refrigerados',
    company: 'Empresa de ejemplo D',
    paymentAmount: 720_000,
    paymentBasis: 'Por viaje completo',
    pickupDistanceKm: 55,
    routeDistanceKm: 460,
    pickupDate: '2026-09-15',
    pickupTime: '6 a 10 h',
    quantity: '16 pallets',
    weight: '12 toneladas',
    vehicle: 'Semirremolque refrigerado',
    observations: 'Sin observaciones adicionales',
  },
]

export function formatPayment(amount: number) {
  return amount.toLocaleString('es-AR')
}

export function formatPickupDate(date: string, options: Intl.DateTimeFormatOptions = {}) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('es-AR', options)
}

export function formatPickupTime(date: string, time?: string) {
  const formattedDate = formatPickupDate(date, { day: 'numeric', month: 'short' })
  return time ? `${formattedDate}, de ${time}` : `${formattedDate} · horario pendiente`
}
