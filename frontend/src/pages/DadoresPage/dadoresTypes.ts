export type DadoresDraft = {
  cargoType: string
  cargoName: string
  originLocality: string
  originAddress: string
  destinationLocality: string
  destinationAddress: string
  pickupDate: string
  pickupTime: string
  quantity: string
  weight: string
  vehicle: string
  description: string
  payment: string
  paymentTerm: string
  company: string
  contactName: string
  email: string
  phone: string
}

export type DadoresDraftKey = keyof DadoresDraft

export const emptyDadoresDraft: DadoresDraft = {
  cargoType: '',
  cargoName: '',
  originLocality: '',
  originAddress: '',
  destinationLocality: '',
  destinationAddress: '',
  pickupDate: '',
  pickupTime: '',
  quantity: '',
  weight: '',
  vehicle: '',
  description: '',
  payment: '',
  paymentTerm: '',
  company: '',
  contactName: '',
  email: '',
  phone: '',
}
