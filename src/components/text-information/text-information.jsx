import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { useToggle } from "../../hooks/useToggle";
import { EnglishInformation } from "../english-information/english-information";
import { FrenchInformation } from "../french-information/french-information";
import { SpanishInformation } from "../spanish-information/spanish-information";
import "./text-information.css";

function TextInformation() {
  const { viajeros, date, lugar, time } = useForm();
  const { openForm } = useToggle();

  const getDetailCita = (entryText, dateText, timeText) => {
    return (
      <p onClick={openForm}>
        {entryText}: {lugar}
        <br />
        {dateText}: {moment(date).format("MM/DD/YYYY")} (MM/DD/YYYY)
        <br />
        {timeText}: {time}
      </p>
    );
  };

  const getViajeros = (lang) => {
    return viajeros.map((viajero, index) => (
      <div key={`viajero-${lang}-${index}`}>
        <br />
        <br />
        {viajero.name}
        <br />
        {moment(viajero.birthday).format("MM/DD/YYYY")} (MM/DD/YYYY)
        <br />
        {viajero.numero}
      </div>
    ));
  };

  return (
    <div className="container">
      <EnglishInformation
        getViajeros={getViajeros}
        getDetailCita={getDetailCita}
      />
      <br />
      <br />
      <br />
      <SpanishInformation
        getViajeros={getViajeros}
        getDetailCita={getDetailCita}
      />
      <br />
      <br />
      <br />
      <FrenchInformation
        getViajeros={getViajeros}
        getDetailCita={getDetailCita}
      />
      <br />
      <br />
      <br />
      Sincerely, U.S. Customs and Border Protection
    </div>
  );
}

export { TextInformation };
