import { useEffect } from 'react';
import { sleep } from '../../helpers/sleep';
import { useAppointment } from '../../hooks/use-appointment';
import { useLoading } from '../../hooks/use-loading';
import { useRouter } from '../../hooks/use-router';
import { ContentOption } from '../../types/content-option.interface';
import './home-page.css';

function HomePage() {
  const { goToTicket, goToLogin } = useRouter();
  const { appointment } = useAppointment();
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (!(appointment && appointment.id)) {
      goToLogin();
    }
  }, [appointment]);

  const contentOptions: ContentOption[] = [
    {
      urlImage: '/assets/opt-traveler.png',
      text: 'Traveler | Viajero',
      onClick: async () => {
        setIsLoading(true);
        await sleep();
        setIsLoading(false);
        goToTicket();
      }
    },
    {
      urlImage: '/assets/opt-broker.png',
      text: 'Broker/Carrier/Forwarder',
    },
    {
      urlImage: '/assets/opt-aircraft.png',
      text: 'Aircraft Operator',
    },
    {
      urlImage: '/assets/opt-bus.png',
      text: 'Bus Operator',
    },
    {
      urlImage: '/assets/opt-seaplane.png',
      text: 'Seaplane Pilot',
    },
    {
      urlImage: '/assets/opt-truck.png',
      text: 'Commercial Truck Driver',
    },
    {
      urlImage: '/assets/opt-org.png',
      text: 'International Organization',
    },
  ];

  const renderIconHeader = (className = '') => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>
  );

  const onClickDefaultContentOption = () => {
    // Mostrar modal de iphone
    alert('Not working this moment')
  }

  const renderContentOption = (contentOption: ContentOption, index: number) => {
    const { text, urlImage, onClick = onClickDefaultContentOption } = contentOption;
    return (
      <div className="content-option" onClick={onClick} key={`content-option-${index}`}>
        <img src={urlImage} alt="" />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div className='home-page'>
      <div className="header">
        {renderIconHeader('icon-header-hidden')}
        <span className='title-header'>Who Are You</span>
        {renderIconHeader()}
      </div>
      <img className='cbp-one-image' src="/assets/cbp_one.png" alt="" />
      <div className="line-image"></div>
      <div className="content-information">
        <div className="title-content-information">
          I am a... | Soy un...
        </div>
        <div className="subtitle-content-information">
          Please a select from the options provided below. | Por favor 
          seleccione una de las opciones a continuación.
        </div>
      </div>
      <div className="content-options">
        {contentOptions.map((contentOption, index) => renderContentOption(contentOption, index))}
      </div>
    </div>
  );
}

export { HomePage };
