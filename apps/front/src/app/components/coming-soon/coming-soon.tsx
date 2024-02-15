import { useComingSoon } from '../../hooks/use-coming-soon';
import './coming-soon.css';

function ComingSoon() {
  const { close: closeComingSoon } = useComingSoon();

  return (
    <div className='container-coming-soon'>
      <div className="container-dialog">
        <div className="title-dialog">
          Coming Soon
        </div>
        <div className="description-dialog">
          This feature is coming soon.
          <br />
          Aditional services will be rolled out
          <br />
          over the next year
        </div>
        <div className="line-dialog" />
        <div className="footer-dialog" onClick={closeComingSoon}>
          OK
        </div>
      
      </div>
    </div>
  );
}

export { ComingSoon };
