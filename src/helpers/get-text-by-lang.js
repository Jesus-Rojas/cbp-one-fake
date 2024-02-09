
import moment from "moment";

export const getTextInformation = (viajero, detailCita) => {
  const getViajero = () => {
    return [
      viajero.name,
      '\n',
      moment(viajero.birthday).format("MM/DD/YYYY").concat(' (MM/DD/YYYY)'),
      '\n',
      viajero.numero,
    ].join('')
  }
  
  const getDetailCitaByLang = (textLugar, textDate, textTime) => {
    const { lugar, date, time } = detailCita;
    return [
      `${textLugar}: ${lugar}`,
      `${textDate}: ${moment(date).format("MM/DD/YYYY").concat(' (MM/DD/YYYY)')}`,
      `${textTime}: ${time}`,
    ].join('\n');
  }
  
  const getInformationEnglish = () => {
    return [
      'Update from CBP One™ about your Submit Advance Information registration: Your appointment at a Port of Entry was successfully scheduled.',
      '\n\n\n',
      'Please see your appointment details below.',
      '\n\n\n',
      getDetailCitaByLang('Port of Entry', 'Date', 'Time'),
      '\n\n\n',
      'Please see your confirmation number(s) below.',
      '\n\n\n',
      getViajero(),
      '\n\n\n',
      'Please save this email and bring it with you when you come to the Port of Entry for your appointment. Present this email to the U.S. Customs and Border Protection Official at the boundary line in order to proceed into the Port of Entry for processing.',
      '\n\n\n',
      'Disclaimer: This confirmation email is not and may not be relied upon as legal or binding authority, and does not create or confer any rights, substantive or procedural, enforceable at law by any party in any matter, whether civil or criminal.  It places no legal requirements on U.S. Customs and Border Protection or any other Government agency or department; has no regulatory effect; confers no remedies; and does not have the force of law or a ruling of any administrative agency, court, or other governmental entity.',
      '\n\n\n\n',
      '---',
      '\n\n\n\n',
    ].join('');
  }

  const getInformationSpanish = () => {
    return [
      'Actualización de CBP One™ sobre su registro de envío de información anticipada: Su cita en un puerto de entrada se programó con éxito.',
      '\n\n\n',
      'Consulte los detalles de su cita a continuación.',
      '\n\n\n',
      getDetailCitaByLang('Puerto de Entrada', 'Fecha', 'Hora'),
      '\n\n\n',
      'Consulte su(s) número(s) de confirmación a continuación',
      '\n\n\n',
      getViajero(),
      '\n\n\n',
      'Guarde este correo electrónico y tráigalo con usted cuando venga al puerto de entrada para su cita. Presente este correo electrónico al Oficial de Aduanas y Protección Fronteriza de los EE. UU. en la línea fronteriza para proceder al Puerto de Entrada para su procesamiento.',
      '\n\n\n',
      'Descargo de responsabilidad: Este correo electrónico de confirmación no es ni puede ser invocado como autoridad legal o vinculante, y no crea ni confiere ningún derecho, sustantivo o procesal, exigible por ley por ninguna de las partes en ningún asunto, ya sea civil o penal.  No impone requisitos legales a la Oficina de Aduanas y Protección Fronteriza de los Estados Unidos ni a ninguna otra agencia o departamento del Gobierno; no tiene ningún efecto regulatorio; no confiere recursos; y no tiene fuerza de ley ni una decisión de ninguna agencia administrativa, tribunal u otra entidad gubernamental.',
      '\n\n\n\n',
      '---',
      '\n\n\n\n',
    ].join('');
  }

  const getInformationFrench = () => {
    return [
      'Mizajou soti nan CBP One™ sou enskripsyon Soumèt Enfòmasyon davans ou a: Randevou ou a nan yon Pò Antre te pwograme avèk siksè.',
      '\n\n\n',
      'Tanpri gade detay randevou ou anba a.',
      '\n\n\n',
      getDetailCitaByLang('Pò Antre: ', 'Dat', 'Lè'),
      '\n\n\n',
      'Tanpri gade nimewo konfimasyon ou an (yo) anba a.',
      '\n\n\n',
      getViajero(),
      '\n\n\n',
      'Tanpri sove imel sa a epi pote li avèk ou lè ou vin nan Pò Antre pou randevou ou. Prezante imel sa a bay Ofisyèl Ladwàn ak Pwoteksyon Fwontyè Etazini nan liy fwontyè a pou kapab ale nan Pò Antre pou pwosesis la.',
      '\n\n\n',
      'Limit responsabilite nou: Se pa imèl konfimasyon sa a epi yo pa ka konte sou li kòm otorite legal oswa obligatwa, epi li pa kreye oswa bay okenn dwa, sibstans oswa pwosedi, ki fè respekte lalwa pa nenpòt ki pati nan nenpòt pwoblèm, kit sivil oswa kriminèl. Li pa mete okenn kondisyon legal sou Ladwàn Etazini ak Pwoteksyon Fwontyè oswa nenpòt lòt ajans oswa depatman Gouvènman an; pa gen okenn efè regilasyon; pa bay okenn remèd; epi li pa gen fòs lalwa oswa yon desizyon nenpòt ajans administratif, tribinal, oswa lòt antite gouvènmantal.',
      '\n\n\n\n',
      '---',
      '\n\n\n\n',
      'Sincerely',
      '\n\n',
      'U.S. Customs and Border Protection',
    ].join('');
  }

  return [
    getInformationEnglish(),
    getInformationSpanish(),
    getInformationFrench(),
  ].join('');
}