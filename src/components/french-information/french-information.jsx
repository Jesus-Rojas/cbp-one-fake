import "./french-information.css";

function FrenchInformation(props) {
  const { getViajeros, getDetailCita } = props;

  return (
    <>
      Mizajou soti nan CBP One™ sou enskripsyon Soumèt Enfòmasyon davans ou a: Randevou ou a nan yon Pò Antre te pwograme avèk siksè.

      <br />
      <br />
      <br />

      Tanpri gade detay randevou ou anba a.

      <br />
      <br />

      {getDetailCita('Pò Antre', 'Dat', 'Lè')}

      <br />

      Tanpri gade nimewo konfimasyon ou an (yo) anba a.
      
      {getViajeros('fr')}

      <br />
      <br />
      <br />

      Tanpri sove imel sa a epi pote li avèk ou lè ou vin nan Pò Antre pou randevou ou. Prezante imel sa a bay Ofisyèl Ladwàn ak Pwoteksyon Fwontyè Etazini nan liy fwontyè a pou kapab ale nan Pò Antre pou pwosesis la.

      <br />
      <br />
      <br />

      Limit responsabilite nou: Se pa imèl konfimasyon sa a epi yo pa ka konte sou li kòm otorite legal oswa obligatwa, epi li pa kreye oswa bay okenn dwa, sibstans oswa pwosedi, ki fè respekte lalwa pa nenpòt ki pati nan nenpòt pwoblèm, kit sivil oswa kriminèl. Li pa mete okenn kondisyon legal sou Ladwàn Etazini ak Pwoteksyon Fwontyè oswa nenpòt lòt ajans oswa depatman Gouvènman an; pa gen okenn efè regilasyon; pa bay okenn remèd; epi li pa gen fòs lalwa oswa yon desizyon nenpòt ajans administratif, tribinal, oswa lòt antite gouvènmantal.

      <br />
      <br />
      <br />

      ---
    </>
  );
}

export { FrenchInformation };
