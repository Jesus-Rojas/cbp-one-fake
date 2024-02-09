import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { useToggle } from "../../hooks/useToggle";
import { EnglishInformation } from "../english-information/english-information";
import "./text-information.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    return viajeroSelected && (
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
  };

  const downloadPdf = () => {
    html2canvas(document.body).then((canvas) => {
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgWidth = 595.28 / 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const canvasDataURL = canvas.toDataURL('image/png');
      pdf.addImage(canvasDataURL, 'PNG', imgWidth / 2, 0, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
  }

  return (
    <div className="container">
      <EnglishInformation
        getViajero={getViajero}
        getDetailCita={getDetailCita}
      />
      <br />
      <br />
      <br />
      <span onClick={downloadPdf}>Sincerely, U.S. Customs and Border Protection</span>
    </div>
  );
}

export { TextInformation };
