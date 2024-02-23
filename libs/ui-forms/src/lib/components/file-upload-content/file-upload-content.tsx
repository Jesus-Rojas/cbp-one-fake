import styles from './file-upload-content.module.scss';
import { useCallback } from 'react';
import { Icon } from '../icon/icon';
import { Button } from '@mui/material';
import cn from 'classnames';

export interface FileUploadContentProps {
  file: File;
  fileTypes: string[];
  error?: string;
}

export function FileUploadContent(props: FileUploadContentProps) {
  const { file, fileTypes, error } = props;

  const fileExtensions = useCallback(
    (menuItem: string[]) =>
      menuItem.join(', ').replace(/, ([^,]*)$/, ' and $1'),
    [],
  );

  return (
    <div className={cn({ [styles['with-errors']]: !!error })}>
      <div
        className={cn(styles['container'], {
          [styles['container-filled']]: !!file,
        })}
      >
        <div className={styles['content']}>
          <Icon className={styles['icon']}>
            {file ? 'delete_forever' : 'upload'}
          </Icon>
          {file && <div className={styles['helper-text']}>{file.name}</div>}
          {!file && (
            <div>
              <div className={styles['action']}>
                <div className={styles['helper-text']}>Drag and drop or</div>
                <Button
                  variant="outlined"
                  className={styles['browse-btn']}
                  size="small"
                >
                  browse
                </Button>
              </div>
              <div className={cn(styles['helper-text'], styles['small'])}>
                Only{' '}
                <span className={styles['extensions']}>
                  {fileExtensions(fileTypes)}
                </span>{' '}
                files are supported
              </div>
            </div>
          )}
        </div>
      </div>
      <p className={styles['error']}>{error}</p>
    </div>
  );
}
