import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
  Icon,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { DataTable } from '../../../core/components/data-table/data-table';
import { Header } from '../../../core/components/headers/header';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { useCustomPrizes } from '../../hooks/use-custom-prizes';
import styles from './custom-prize-table.module.scss';
import { ColumnDefinition } from '../../../core/types/column-definition';
import { useState } from 'react';
import { CustomPrizeDTO } from '@zooverse/api-interfaces';
import { useToast } from '../../../core/hooks/use-toast';

export function CustomPrizeTable() {
  const { syncCustomPrizes, customPrizes, loading, deletePrize } =
    useCustomPrizes();
  const [customPrizeId, setCustomPrizeId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();
  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'name',
      field: 'name',
      header: 'Name',
    },
    {
      id: 'description',
      field: 'description',
      header: 'Description',
    },
  ];

  const rowActions = (row: CustomPrizeDTO) => {
    return (
      <div className={styles['row-action-buttons']}>
        <IconButton>
          <Link to={`view/${row.id}`}>
            <Icon className={styles['row-action-button']}>visibility</Icon>
          </Link>
        </IconButton>

        <IconButton>
          <Link to={`edit/${row.id}`}>
            <Icon className={styles['row-action-button']}>edit</Icon>
          </Link>
        </IconButton>

        <IconButton
          onClick={() => {
            setCustomPrizeId(row.id);
            setIsOpen(true);
          }}
        >
          <Icon className={styles['row-action-button']}>delete</Icon>
        </IconButton>
      </div>
    );
  };

  const removeCustomPrize = async () => {
    await deletePrize(customPrizeId);
    showToast(`Custom prize: ${customPrizeId} was deleted`);
    setIsOpen(false);
    syncCustomPrizes();
  };
  useOnInit(() => {
    syncCustomPrizes();
  });

  return (
    <div className={styles['container']}>
      <Header title="Custom prizes" subtitle="List of custom prizes rewards" />
      <div className={styles['actions-container']}>
        <Button variant="contained">
          <Link to="create">Create</Link>
        </Button>
      </div>
      <div className={styles['grid-container']}>
        <DataTable
          loading={loading}
          columnDefinitions={columnDefinitions}
          rows={customPrizes}
          rowActions={rowActions}
        />
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles['title']}>
          <DialogTitle>Delete record?</DialogTitle>
          <IconButton
            className={styles['close-btn']}
            aria-label="close"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={styles['dialog-content']}>
          <DialogContentText>This action can't be reversed</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={styles['cancel-btn']}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            className={styles['delete-btn']}
            onClick={removeCustomPrize}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
