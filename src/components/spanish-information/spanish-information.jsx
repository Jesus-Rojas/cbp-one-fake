import "./spanish-information.css";

function SpanishInformation(props) {
  const { getViajeros, getDetailCita } = props;

  return (
    <>
      Actualización de CBP One™ sobre su registro de envío de información anticipada: Su cita en un puerto de entrada se programó con éxito.

      <br />
      <br />
      <br />

      Consulte los detalles de su cita a continuación.

      <br />
      <br />

      {getDetailCita('Puerto de Entrada', 'Fecha', 'Hora')}

      <br />

      Consulte su(s) número(s) de confirmación a continuación
      
      {getViajeros('es')}

      <br />
      <br />
      <br />

      Guarde este correo electrónico y tráigalo con usted cuando venga al puerto de entrada para su cita. Presente este correo electrónico al Oficial de Aduanas y Protección Fronteriza de los EE. UU. en la línea fronteriza para proceder al Puerto de Entrada para su procesamiento.

      <br />
      <br />
      <br />

      Descargo de responsabilidad: Este correo electrónico de confirmación no es ni puede ser invocado como autoridad legal o vinculante, y no crea ni confiere ningún derecho, sustantivo o procesal, exigible por ley por ninguna de las partes en ningún asunto, ya sea civil o penal.  No impone requisitos legales a la Oficina de Aduanas y Protección Fronteriza de los Estados Unidos ni a ninguna otra agencia o departamento del Gobierno; no tiene ningún efecto regulatorio; no confiere recursos; y no tiene fuerza de ley ni una decisión de ninguna agencia administrativa, tribunal u otra entidad gubernamental.

      <br />
      <br />
      <br />

      ---
    </>
  );
}

export { SpanishInformation };
