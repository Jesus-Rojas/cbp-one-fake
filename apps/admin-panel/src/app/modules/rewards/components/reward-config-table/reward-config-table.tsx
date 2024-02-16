import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { RewardConfigTableDTO } from '@zooverse/api-interfaces';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { useRewardTable } from '../../hooks/use-reward-table';
import styles from './reward-config-table.module.scss';
import {
  IconButton,
  Icon,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DataTable } from '../../../core/components/data-table/data-table';
import { Header } from '../../../core/components/headers/header';
import { ColumnDefinition } from '../../../core/types/column-definition';
import { RewardConfig } from '../reward-config/reward-config';
import { useToast } from '../../../core/hooks/use-toast';

export function RewardConfigTable() {
  const {
    rewardConfigTables,
    syncRewardConfigTables,
    loading,
    deleteRewardConfig,
  } = useRewardTable();
  const [rewardConfigTableId, setRewardConfigTableId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'name',
      field: 'name',
      header: 'Name',
    },
    {
      id: 'startAt',
      field: 'startAt',
      header: 'from',
      grow: 1.5,
    },
    {
      id: 'finishAt',
      field: 'finishAt',
      header: 'to',
      grow: 1.5,
    },
    {
      id: 'defaultReward',
      header: 'default ',
      grow: 2,
      renderer: (rewardConfigTable: RewardConfigTableDTO) => {
        const { defaultRewardConfig } = rewardConfigTable;
        return <RewardConfig config={defaultRewardConfig} />;
      },
    },
  ];

  const rowActions = (row: RewardConfigTableDTO) => {
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
            setRewardConfigTableId(row.id);
            setIsOpen(true);
          }}
        >
          <Icon className={styles['row-action-button']}>delete</Icon>
        </IconButton>
      </div>
    );
  };

  const removeRewardConfig = async () => {
    await deleteRewardConfig(rewardConfigTableId);
    showToast(`Table: ${rewardConfigTableId} was deleted`);
    setIsOpen(false);
    syncRewardConfigTables();
  };

  useOnInit(() => {
    syncRewardConfigTables();
  });

  return (
    <div className={styles['container']}>
      <Header
        title="Rewards configuration"
        subtitle="List of rewards configuration"
      />
      <div className={styles['actions-container']}>
        <Button variant="contained">
          <Link to="create">Create</Link>
        </Button>
      </div>
      <div className={styles['grid-container']}>
        <DataTable
          loading={loading}
          columnDefinitions={columnDefinitions}
          rows={rewardConfigTables.map((table) => ({
            ...table,
            startAt: new Date(table.startAt).toDateString(),
            finishAt: new Date(table.finishAt).toDateString(),
          }))}
          rowActions={rowActions}
          itemSize={400}
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
            onClick={removeRewardConfig}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
