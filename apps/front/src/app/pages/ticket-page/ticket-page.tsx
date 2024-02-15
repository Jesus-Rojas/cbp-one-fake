import moment from 'moment';
import { useEffect } from 'react';
import { useAppointment } from '../../hooks/use-appointment';
import { useRouter } from '../../hooks/use-router';
import './ticket-page.css';

function TicketPage() {
  const { appointment } = useAppointment();
  const { goToLogin, back } = useRouter();

  useEffect(() => {
    if (!(appointment && appointment.id)) {
      goToLogin();
    }
  }, [appointment]);

  if (!(appointment && appointment.id)) {
    return <div />;
  }

  return (
    <div className="ticket-page">
      <div className="header">
        <div className="text-header">Información Anticipada</div>
        <div className="container-icon">
          <svg
            className="icon-header"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
          </svg>
        </div>
      </div>

      <div className="section-cita-information">
        <div className="container-check">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="icon-check"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        </div>

        <p className="title-information">cita programada</p>

        <p className="subtitle-information">
          <>
            Su cita esta programada: {appointment.place} el{' '}
            {moment(appointment.dateTime).format('DD MMM YYYY')} a las{' '}
            {moment(appointment.dateTime).format('HH:mm')}.
          </>
        </p>

        <p className="text-information">
          Su cita en un puerto de entrada se programó con éxito.
          <br />
          <br />
          Guarde su(s) número(s) de confirmación. Se envió un correo electrónico
          de confirmación a la dirección de correo electrónico que utilizó para
          iniciar sesión en{' '}
          <span>
            CBP One<sup>TM</sup>.
          </span>
        </p>

        <button className="cancel-cita">Cancelar cita</button>
      </div>

      <div className="section-viajeros">
        <div className="header-section-viajeros">
          <span>viajeros</span>
          <span>número de confirmación</span>
        </div>
        <div className="grid-section-viajeros">
          {appointment.travelers.map((traveler, indexTraveler) => (
            <div className="row-viajero" key={`row-viajero-${indexTraveler}`}>
              <span className="name-viajero">{traveler.name}</span>
              <span className="numero-viajero">{traveler.numberOfConfirmation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section-detail-cita">
        <div className="header-section-detail-cita">
          <span>detalles de la cita</span>
        </div>
        <div className="content-section-detail-cita">
          <div className="title-content">Puerto de entrada</div>
          <div className="text-content">{appointment.place}</div>
        </div>
      </div>

      <div className="footer" onClick={back}>
        Atrás
      </div>
    </div>
  );
}

export { TicketPage };
