import { useToggle } from "../../hooks/useToggle";
import "./header.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Header() {
  const { openForm } = useToggle();

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
    <div className="header">
      <div onClick={downloadPdf} className="text-header">
        Información Anticipada
      </div>
      <div className="container-icon">
        <svg
          className="icon-header"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={openForm}
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
      </div>
    </div>
  );
}

export { Header };
