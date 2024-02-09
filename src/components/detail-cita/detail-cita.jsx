import { useState } from "react";
import "./detail-cita.css";

function DetailCita() {
  return (
    <div className="section-detail-cita">
      <div className="header-section-detail-cita">
        <span>detalles de la cita</span>
      </div>
      <div className="content-section-detail-cita">
        <div className="title-content">Puerto de entrada</div>
        <div className="text-content">San Ysidro</div>
      </div>
    </div>
  );
}

export { DetailCita };
