import { useComingSoon } from '../../hooks/use-coming-soon';
import styles from './coming-soon.module.scss';

function ComingSoon() {
  const { close: closeComingSoon } = useComingSoon();

  return (
    <div className={styles['container-coming-soon']}>
      <div className={styles['container-dialog']}>
        <div className={styles['title-dialog']}>
          Coming Soon
        </div>
        <div className={styles['description-dialog']}>
          This feature is coming soon.
          <br />
          Aditional services will be rolled out
          <br />
          over the next year
        </div>
        <div className={styles['line-dialog']} />
        <div className={styles['footer-dialog']} onClick={closeComingSoon}>
          OK
        </div>
      </div>
    </div>
  );
}

export { ComingSoon };
