import "./form.css";
import { useForm } from "../../hooks/useForm";

function Form() {
  const { date, lugar, time, setDate, setLugar, setTime } = useForm();

  return (
    <>
      <br />

      <div>
        Fecha:{" "}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <br />

      <div>
        Hora:{" "}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <br />

      <div>
        Lugar:{" "}
        <input
          type="text"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
        />
      </div>

      <br />

      <div>
        <button>Agregar Viajero</button>
      </div>

      <br />

      <div className="grid-viajeros"></div>
    </>
  );
}

export { Form };
