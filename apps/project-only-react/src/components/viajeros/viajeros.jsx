import { useForm } from "../../hooks/useForm";
import "./viajeros.css";

function Viajeros() {
  const { viajeros } = useForm();

  return (
    <div className="section-viajeros">
      <div className="header-section-viajeros">
        <span>viajeros</span>
        <span>número de confirmación</span>
      </div>
      <div className="grid-section-viajeros">
        {viajeros.map((viajero, indexViajero) => (
          <div className="row-viajero" key={`row-viajero-${indexViajero}`}>
            <span className="name-viajero">{viajero.name}</span>
            <span className="numero-viajero">{viajero.numero}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { Viajeros };
