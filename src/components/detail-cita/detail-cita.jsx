import { useForm } from "../../hooks/useForm";
import "./detail-cita.css";

function DetailCita() {
  const { lugar } = useForm();
  return (
    <div className="section-detail-cita">
      <div className="header-section-detail-cita">
        <span>detalles de la cita</span>
      </div>
      <div className="content-section-detail-cita">
        <div className="title-content">Puerto de entrada</div>
        <div className="text-content">{lugar}</div>
      </div>
    </div>
  );
}

export { DetailCita };
