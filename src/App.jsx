import { useState } from 'react'
import { Header } from './components/header/header'
import { CitaInformation } from './components/cita-information/cita-information'
import { Viajeros } from './components/viajeros/viajeros'
import { DetailCita } from './components/detail-cita/detail-cita'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <CitaInformation />
      <Viajeros />
      <DetailCita />
    </>
  )
}

export default App
