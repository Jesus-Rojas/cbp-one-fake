import "./form.css";
import { useForm } from "../../hooks/useForm";
import { useToggle } from "../../hooks/useToggle";

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
    setViajeroSelected,
  } = useForm();
  const { openApp, openTextInformation } = useToggle();

  const addViajero = () => {
    setViajeros((prevState) => [
      ...prevState,
      { name: "", numero: "", birthday: "" },
    ]);
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

  const removeViajero = (indexToDelete) => {
    setViajeros(
      viajeros.filter(
        (__, indexViajero) => indexViajero !== indexToDelete
      )
    );
  };

  const showDetailViajero = (indexToFind) => {
    setViajeroSelected(
      viajeros.find((__, indexViajero) => indexViajero === indexToFind)
    );
    openTextInformation();
  }

  return (
    <div className="form">
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
              onChange={(e) =>
                updateViajero(indexViajero, e.target.value, "name")
              }
              placeholder="nombre"
            />
            <input
              type="number"
              value={viajero.numero}
              placeholder="numero"
              onChange={(e) =>
                updateViajero(indexViajero, e.target.value, "numero")
              }
            />
            <input
              type="date"
              value={viajero.birthday}
              placeholder="birthday"
              onChange={(e) =>
                updateViajero(indexViajero, e.target.value, "birthday")
              }
            />
            <button onClick={() => showDetailViajero(indexViajero)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/>
              </svg>
            </button>
            <button onClick={() => removeViajero(indexViajero)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <br />

      <button
        onClick={openApp}
      >
        Open App
      </button>
    </div>
  );
}

export { Form };
