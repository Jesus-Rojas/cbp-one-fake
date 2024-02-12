import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { useToggle } from "../../hooks/useToggle";
import { EnglishInformation } from "../english-information/english-information";
import "./text-information.css";
import jsPDF from "jspdf";
import { getTextInformation } from "../../helpers/get-text-by-lang";

function TextInformation() {
  const { viajeroSelected, date, lugar, time } = useForm();
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

  const getViajero = () => {
    return (
      viajeroSelected && (
        <div>
          <br />
          <br />
          {viajeroSelected.name}
          <br />
          {moment(viajeroSelected.birthday).format("MM/DD/YYYY")} (MM/DD/YYYY)
          <br />
          {viajeroSelected.numero}
        </div>
      )
    );
  };

  const downloadPdf = () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
    const sizeMargin = 60;
    const margins = {
      top: sizeMargin,
      bottom: sizeMargin,
      left: sizeMargin,
      right: sizeMargin,
    };

    const fontSize = 10.3;
    pdf.setFontSize(fontSize);
    const lineHeight = fontSize * 1.2;
    const lines = pdf.splitTextToSize(
      getTextInformation(viajeroSelected, { date, lugar, time }),
      pdf.internal.pageSize.getWidth() - margins.left - margins.right
    );
    let yPosition = margins.top;

    lines.forEach((line) => {
      if (yPosition > pdf.internal.pageSize.getHeight() - margins.bottom) {
        pdf.addPage();
        yPosition = margins.top;
      }
      pdf.text(line, margins.left, yPosition);
      yPosition += lineHeight;
    });
    pdf.save(`CITA-${window.cita}-${viajeroSelected.name.toUpperCase()}.pdf`);
  };

  return (
    <div className="container">
      <EnglishInformation
        getViajero={getViajero}
        getDetailCita={getDetailCita}
      />
      <br />
      <br />
      <br />
      <span onClick={downloadPdf}>
        Sincerely, U.S. Customs and Border Protection
      </span>
    </div>
  );
}

export { TextInformation };
