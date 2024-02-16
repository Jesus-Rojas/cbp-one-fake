import styles from './headers.module.scss';
import cn from 'classnames';

interface HeadersProps {
  title: string;
  subtitle: string;
  removeMargin?: boolean;
}

export function Header(props: HeadersProps) {
  const { title, subtitle, removeMargin } = props;

  return (
    <div
      className={cn(styles['header'], {
        [styles['remove-margin']]: removeMargin,
      })}
    >
      <div>
        <div className={styles['title']}>{title}</div>
        <div className={styles['sub-title']}>{subtitle}</div>
      </div>
    </div>
  );
}
