import { useState } from 'react'
import { Header } from './components/header/header'
import { CitaInformation } from './components/cita-information/cita-information'
import { Viajeros } from './components/viajeros/viajeros'
import { DetailCita } from './components/detail-cita/detail-cita'
import { Form } from './components/form/form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Form />
      <Header />
      <CitaInformation />
      <Viajeros />
      <DetailCita />
    </>
  )
}

export default App
