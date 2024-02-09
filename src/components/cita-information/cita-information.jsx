import './cita-information.css'
import moment from "moment";
import { useForm } from "../../hooks/useForm";

function CitaInformation() {
  const { date, time, lugar } = useForm();

  return (
    <div className="section-cita-information">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="icon-check"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
      </svg>

      <p className="title-information">
        cita programada
      </p>

      <p className="subtitle-information">
        Su cita esta programada: {lugar} el {moment(date).format("DD MMM YYYY")} a las {time}.
      </p>

      <p className="text-information">
        Su cita en un puerto de entrada se programó con éxito.

        <br />
        <br />

        Guarde su(s) número(s) de confirmación. Se envió un correo electrónico de confirmación a la dirección de correo electrónico que utilizó para iniciar sesión en {' '}

        <span>CBP One<sup>TM</sup>.</span>
      </p>

      <button className="cancel-cita">Cancelar cita</button>
    </div>
  )
}

export { CitaInformation }
