import styles from './icon.module.scss';
import { Icon as MuiIcon, IconProps } from '@mui/material';
import cn from 'classnames';

export function Icon(props: IconProps) {
  return <MuiIcon {...props} className={cn(props.className, styles['icon'])} />;
}
