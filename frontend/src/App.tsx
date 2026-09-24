import { Route, Routes } from 'react-router'
import DadoresPage from './pages/DadoresPage/DadoresPage'
import CargaDetailPage from './pages/CargaDetailPage/CargaDetailPage'
import CargaRoutePage from './pages/CargaRoutePage/CargaRoutePage'
import ContactoPage from './pages/ContactoPage/ContactoPage'
import HomePage from './pages/HomePage/HomePage'
import TransportistasPage from './pages/TransportistasPage/TransportistasPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dadores" element={<DadoresPage />} />
      <Route path="/transportistas" element={<TransportistasPage />} />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/cargas/:id/recorrido" element={<CargaRoutePage />} />
      <Route path="/cargas/:id" element={<CargaDetailPage />} />
    </Routes>
  )
}

export default App
