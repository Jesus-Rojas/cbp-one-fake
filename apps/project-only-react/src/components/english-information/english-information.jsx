function EnglishInformation(props) {
  const { getViajero, getDetailCita } = props;

  return (
    <>
      Update from CBP One™ about your Submit Advance Information registration: Your appointment at a Port of Entry was successfully scheduled.

      <br />
      <br />
      <br />

      Please see your appointment details below.

      <br />
      <br />
      
      {getDetailCita('Port of Entry', 'Date', 'Time')}

      <br />

      Please see your confirmation number(s) below.

      {getViajero()}

      <br />
      <br />
      <br />

      Please save this email and bring it with you when you come to the Port of Entry for your appointment. Present this email to the U.S. Customs and Border Protection Official at the boundary line in order to proceed into the Port of Entry for processing.

      <br />
      <br />
      <br />

      Disclaimer: This confirmation email is not and may not be relied upon as legal or binding authority, and does not create or confer any rights, substantive or procedural, enforceable at law by any party in any matter, whether civil or criminal.  It places no legal requirements on U.S. Customs and Border Protection or any other Government agency or department; has no regulatory effect; confers no remedies; and does not have the force of law or a ruling of any administrative agency, court, or other governmental entity.

      <br />
      <br />
      <br />

      ---
    </>
  );
}

export { EnglishInformation };
