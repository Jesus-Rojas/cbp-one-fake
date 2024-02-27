import { useEffect } from 'react';
import { sleep } from '../../helpers/sleep';
import { useAppointment } from '../../hooks/use-appointment';
import { useComingSoon } from '../../hooks/use-coming-soon';
import { useLoading } from '../../hooks/use-loading';
import { useRouter } from '../../hooks/use-router';
import { ContentOption } from '../../types/content-option.interface';
import styles from './home-page.module.scss';
import { useAccessToken } from '../../hooks/use-access-token';

function HomePage() {
  const { goToTicket, goToLogin } = useRouter();
  const { open: openLoading, close: closeLoading } = useLoading();
  const { open: openComingSoon } = useComingSoon();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (!accessToken) goToLogin();
  }, [accessToken]);

  const contentOptions: ContentOption[] = [
    {
      urlImage: '/assets/images/opt-traveler.png',
      text: 'Traveler | Viajero',
      onClick: async () => {
        openLoading();
        await sleep();
        closeLoading();
        goToTicket();
      }
    },
    {
      urlImage: '/assets/images/opt-broker.png',
      text: 'Broker/Carrier/Forwarder',
    },
    {
      urlImage: '/assets/images/opt-aircraft.png',
      text: 'Aircraft Operator',
    },
    {
      urlImage: '/assets/images/opt-bus.png',
      text: 'Bus Operator',
    },
    {
      urlImage: '/assets/images/opt-seaplane.png',
      text: 'Seaplane Pilot',
    },
    {
      urlImage: '/assets/images/opt-truck.png',
      text: 'Commercial Truck Driver',
    },
    {
      urlImage: '/assets/images/opt-org.png',
      text: 'International Organization',
    },
  ];

  const renderIconHeader = (className = '') => (
    <svg className={styles[className]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
    </svg>
  );

  const renderContentOption = (contentOption: ContentOption, index: number) => {
    const { text, urlImage, onClick = openComingSoon } = contentOption;
    return (
      <div
        className={styles['content-option']}
        onClick={onClick}
        key={`content-option-${index}`}
      >
        <img src={urlImage} alt="" />
        <span>{text}</span>
      </div>
    );
  };

  return (
    <>
      <div className={styles['header']}>
        {renderIconHeader('icon-header-hidden')}
        <span className={styles['title-header']}>Who Are You</span>
        {renderIconHeader()}
      </div>
      <img className={styles['cbp-one-image']} src="/assets/images/cbp_one.png" alt="" />
      <div className={styles['line-image']}></div>
      <div className={styles['content-information']}>
        <div className={styles['title-content-information']}>
          I am a... | Soy un...
        </div>
        <div className={styles['subtitle-content-information']}>
          Please a select from the options provided below. | Por favor 
          seleccione una de las opciones a continuación.
        </div>
      </div>
      <div className={styles['content-options']}>
        {contentOptions.map((contentOption, index) => renderContentOption(contentOption, index))}
      </div>
    </>
  );
}

export { HomePage };
