import "./form.css";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

function Form() {
  const {
    date,
    lugar,
    time,
    viajeros,
    setDate,
    setLugar,
    setTime,
    setViajeros,
  } = useForm();

  const [hide, setHide] = useState(false);

  const addViajero = () => {
    setViajeros((prevState) => [...prevState, { name: '', numero: '' }]);
  };

  const updateViajero = (indexToUpdate, text, type) => {
    setViajeros(
      viajeros.map((viajero, indexViajero) => {
        if (indexToUpdate === indexViajero) {
          return {
            ...viajero,
            [type]: text,
          };
        }
        return viajero;
      })
    );
  };

  const removeViajero = (indexViajeroToDelete) => {
    setViajeros(
      viajeros.filter(
        (__, indexViajero) => indexViajero !== indexViajeroToDelete
      )
    );
  };

  const hideForm = () => {
    setHide(true);
  }

  return (
    <div className={`form ${hide && 'hide-form'}`}>
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
        <button onClick={addViajero}>Agregar Viajero</button>
      </div>

      <br />

      <div className="grid-viajeros">
        {viajeros.map((viajero, indexViajero) => (
          <div className="viajero" key={`viajero-${indexViajero}`}>
            <input
              type="text"
              value={viajero.name}
              onChange={(e) => updateViajero(indexViajero, e.target.value, 'name')}
              placeholder="nombre"
            />
            <input
              type="number"
              value={viajero.numero}
              placeholder="numero"
              onChange={(e) => updateViajero(indexViajero, e.target.value, 'numero')}
            />
            <button onClick={() => removeViajero(indexViajero)}>x</button>
          </div>
        ))}
      </div>

      <br />

      <button onClick={hideForm}>Hide</button>

      <br />

    </div>
  );
}

export { Form };
