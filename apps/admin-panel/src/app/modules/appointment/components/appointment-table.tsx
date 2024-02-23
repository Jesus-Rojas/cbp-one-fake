import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

import { Header } from '../../core/components/headers/header';
import styles from './appointment-table.module.scss';
import { Icon } from '../../core/components/icon/icon';
import { DataTable } from '../../core/components/data-table/data-table';
import { useAppointmentTable } from '../hooks/use-appointment-table';

export function AppointmentTable() {
  const {
    loadingTable,
    columnDefinitions,
    appointments,
    isOpen,
    closeDialog,
    loadingDelete,
    deleteAppointment,
    openDialog,
  } = useAppointmentTable();

  const rowActions = (row: { id: number }) => {
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

        <IconButton onClick={() => openDialog(row.id)}>
          <Icon className={styles['row-action-button']}>delete</Icon>
        </IconButton>
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <Header title="Appointments" subtitle="List of appointments" />
      <div className={styles['actions-container']}>
        <Button variant="contained">
          <Link to="create">Create</Link>
        </Button>
      </div>
      <div className={styles['grid-container']}>
        <DataTable
          loading={loadingTable}
          columnDefinitions={columnDefinitions}
          rows={appointments}
          rowActions={rowActions}
        />
      </div>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles['title']}>
          <DialogTitle padding={0}>Delete record?</DialogTitle>
          <IconButton
            className={styles['close-btn']}
            aria-label="close"
            onClick={closeDialog}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent className={styles['dialog-content']}>
          <DialogContentText>This action can't be reversed</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={styles['cancel-btn']} onClick={closeDialog}>
            Cancel
          </Button>
          <LoadingButton
            className={styles['delete-btn']}
            loading={loadingDelete}
            onClick={deleteAppointment}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
