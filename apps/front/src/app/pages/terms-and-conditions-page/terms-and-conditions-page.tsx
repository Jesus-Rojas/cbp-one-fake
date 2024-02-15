import { useAppointmentApi } from '../../hooks/use-appointment-api';
import { useRouter } from '../../hooks/use-router';
import './terms-and-conditions-page.css';

function TermsAndConditionsPage() {
  const { goToLogin, goToHome } = useRouter();
  const { getAppointment } = useAppointmentApi();

  const handleAcceptButton = async () => {
    const appointment = await getAppointment();
    if (!(appointment && appointment.id)) {
      goToLogin();
      return;
    }
    goToHome();
  }

  return (
    <div className='terms-and-conditions-page'>
      <div className="header">
        Terms & Conditions
      </div>

      <div className="content">
        <>
          The CBP One Mobile app is an official mobile application provided by
          U.S. Customs and Border Protection (CBP) that is intended to act as an
          intuitive single point of access to multiple CBP mobile application
          capabilities. CBP One will help guide each type of user to the
          appropriate application, based on their needs.
        </>

        <br />
        <br />

        <span className="content-title">INFORMATION COLLECTED</span>

        <>
          After downloading the CBP One Mobile app, users will register with the
          General Services Administration's Login.gov to securely authenticate
          into the application. Login.gov will enable you to save your information
          for future use. In order to register with Login.gov, you will need to
          provide your email address and phone number, and you will need to create
          a password that you will use for login. Depending on your user profile,
          you will be asked to enter specific information, including, but not
          limited to, Personally Identifiable Information (PII) into the app:
          First Name (Given Name), Last Name (Surname), Date of Birth, Gender,
          Country of Residence, Country of Citizenship, SEVIS number, Trusted
          Traveler Program Number, Petition Number, Travel Document (including,
          Document Type (Passport/BCC), Document Number, Issue Date, Issue
          Country, and Expiration Date), Visa (including Visa Number, Issue Date,
          and Issue Country), Photo of Documents, Email address, Carrier Name,
          Broker Name, Importer Name, Importer ID/Filer Code, Phone Number, GPS
          Location and face image for verification. Your Device ID, including your
          operating system and version number, is also collected in order to send
          you push notifications.
        </>

        <br />
        <br />

        <span className="content-title">USES OF INFORMATION</span>

        <>
          Information gathered through the CBP One Mobile App can be used to
          conduct an inspection, document arrivals into, and departures out of,
          the United States. The mobile application allows users to apply for an
          I-94 permit, trusted traveler programs or landing rights, search for
          existing I-94 permits, view travel history, view cargo holds and request
          inspections. The CBP One Mobile App passes the data entered by a user to
          CBP Agricultural Specialists or CBP Officers, who may correspond with
          the user throughout the inspection process. Within the application
          itself, the correspondence may consist of chat messages or an interview
          between Officers and users. Information collected by the CBP One Mobile
          App may be entered into a CBP database.
        </>

        <br />
        <br />

        <span className="content-title">INFORMATION SHARING</span>

        <>
          CBP One Mobile App does not share information with
          entities outside the Department of Homeland Security (DHS).
        </>

        <br />
        <br />

        <span className="content-title">APPLICATION SECURITY</span>

        <>
          CBP takes the security of your personal information
          very seriously and has implemented precautions to maintain the
          confidentiality, integrity, and availability of the information
          contained in CBP systems. The CBP One Mobile App complies with security
          standards in both iOS Security for iOS 13 and on Google Play, to be
          downloaded on mobile devices such as tablets or phones. Additionally,
          the App is reviewed by the DHS Office of the Chief Information Officer
          to ensure app security and privacy.
        </>

        <br />
        <br />

        <span className="content-title">HOW TO ACCESS OR CORRECT YOUR INFORMATION</span>

        <>
          CBP does not use CBP One
          Mobile App itself to directly share biographic or biometric information
          with entities outside the Department of Homeland Security (DHS).
          However, information provided to the CBP One Mobile App may be shared
          outside of DHS consistent with CBP's Systems of Records Notices and
          Privacy Impact Assessments. For more information, please see the Privacy
          Impact Assessment {' '}
          <a href="#">
            https://www.dhs.gov/publication/dhscbppia-068-cbp-one-mobile-application.
          </a>
        </>

        <br />
        <br />
        
        <span className="content-title">ANALYTICS TOOLS</span>
        <>
          This app does not deploy any analytics tools.
        </>

        <br />
        <br />
        
        <span className="content-title">PRIVACY POLICY CONTACT INFORMATION</span>

        <>
          This application reserves the right
          to make changes to the Privacy Policy by giving notice to its users on
          this page, and by ensuring protection of PII in all cases. For further
          information regarding CBP Privacy Policies, please visit: {' '}

          <a href="#">http://www.cbp.gov/site-policy-notices/privacy-overview.</a>

          <br />

          The use of this App is voluntary. 
          
          <br />
          <br />
          I certify that, to the best of my
          knowledge and belief, all of the information submitted through this App
          is true, correct, and provided in good faith.
          <br />
          <br />
          I certify that all of the
          information I am providing is about myself, or about an individual for
          whom I am acting as an authorized agent.
          <br />
          <br />
          I understand that if I make an
          intentional false statement, or commit deception or fraud through data
          submitted through this App, I may be fined or imprisoned (18 U.S.C.
          Section 1001).
          <br />
          <br />
          I understand that I may not, under any circumstances,
          submit information through CBP One™ 'Submit Advance Information' nor
          'Report My Departure' while using a virtual private network ('VPN').
          <br />
          <br />
          Users may not, under any circumstances, submit or query information on
          either CBP One™ or the I-94 website about another traveler, other than
          themselves, without the expressed permission and consent of that
          individual traveler.
          <br />
          <br />
          Paperwork Reduction Act Statement: An agency may
          not conduct or sponsor an information collection and a person is not
          required to respond to this information unless it displays a current
          valid OMB control number and an expiration date. The control number for
          this collection is 1651-0140. The expiration date for this collection is
          05/31/2026. The estimated average time to complete this collection is 16
          minutes. If you have any comments regarding the
        </>
      </div>

      <div className="actions">
        <button className="decline-button" onClick={goToLogin}>Decline</button>
        <button className="accept-button" onClick={handleAcceptButton}>Accept</button>
      </div>

      <div className="footer"></div>
    </div>
  );
}

export { TermsAndConditionsPage };
