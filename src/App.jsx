import { Header } from './components/header/header'
import { CitaInformation } from './components/cita-information/cita-information'
import { Viajeros } from './components/viajeros/viajeros'
import { DetailCita } from './components/detail-cita/detail-cita'
import { Form } from './components/form/form'
import { useToggle } from './hooks/useToggle'
import { TextInformation } from './components/text-information/text-information'

function App() {
  const { showApp, showForm, showTextInformation } = useToggle();
  return (
    <>
      {showForm && <Form />}
      {showApp && (
        <>
          <Header />
          <CitaInformation />
          <Viajeros />
          <DetailCita />
        </>
      )}
      {showTextInformation && <TextInformation />}
    </>
  )
}

export default App
