import styles from './loading.module.scss';

function Loading() {
  return (
    <div className={styles['container-loading']}>
      <div className={styles['container-loader']}>
        <img className={styles['logo-image']} src="/assets/images/loading.png" alt="" />
        <span className={styles['loader']}></span>
      </div>
    </div>
  );
}

export { Loading };
