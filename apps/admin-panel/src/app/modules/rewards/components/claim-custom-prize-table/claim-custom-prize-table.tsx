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
import CloseIcon from '@mui/icons-material/Close';
import { ColumnDefinition } from '../../../core/types/column-definition';
import { CustomPrizeDTO } from '@zooverse/api-interfaces';
import { DataTable } from '../../../core/components/data-table/data-table';
import { Header } from '../../../core/components/headers/header';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import styles from './claim-custom-prize-table.module.scss';
import { useClaimCustomPrize } from '../../hooks/use-claim-custom-prize';
import { useCustomPrizesWinners } from '../../hooks/use-custom-prizes-winners';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '../../../core/hooks/use-toast';
import { SelectSearch } from '../../../shared/components/SelectSearch';

export function ClaimCustomPrizeTable() {
  const {
    customPrizeClaims: customPrizeClaimsAll,
    loading,
    remove,
    syncCustomPrizeClaims,
  } = useClaimCustomPrize();
  const { syncCustomPrizeWinners } = useCustomPrizesWinners();
  const [customPrizeClaimId, setCustomPrizeClaimId] = useState(0);
  const [customPrizeClaims, setCustomPrizeClaims] =
    useState(customPrizeClaimsAll);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'code',
      field: 'code',
      header: 'Code',
    },
    {
      id: 'signedMessage',
      field: 'signedMessage',
      header: 'Signature',
    },
    {
      id: 'customPrizeId',
      field: 'customPrizeId',
      header: 'Custom Prize ID',
    },
    {
      id: 'claimerAddress',
      field: 'claimerAddress',
      header: 'Claimer address',
    },
    {
      id: 'deliveryStatus',
      field: 'deliveryStatus',
      header: 'Delivery status',
    },
  ];

  const filterKeys = useMemo(
    () => columnDefinitions.map((columnDefinition) => columnDefinition.id),
    [],
  );

  const [filters, setFilters] = useState<Record<string, null | string>>(
    getKeys(null),
  );

  const [filtersData, setFiltersData] = useState<Record<string, string[]>>(
    getKeys([]),
  );

  const removeCustomPrizeClaim = async () => {
    await remove(customPrizeClaimId);
    showToast(`Custom prize claim: ${customPrizeClaimId} was deleted`);
    setIsOpen(false);
    syncCustomPrizeClaims();
  };

  function getKeys<T>(defaultValue: T) {
    return filterKeys.reduce((acc, filterKey) => {
      acc[filterKey] = defaultValue;
      return acc;
    }, {} as Record<string, T>);
  }

  const filterRows = () => {
    const filtersActive = filterKeys.filter(
      (filterKey) => filters[filterKey] !== null,
    );
    if (!filtersActive.length) {
      setCustomPrizeClaims(customPrizeClaimsAll);
      return;
    }

    const customPrizeClaimsFiltered = customPrizeClaimsAll.filter(
      (customPrizeClaim) =>
        filtersActive.every(
          (filterActive) =>
            filters[filterActive] ===
            (customPrizeClaim as Record<string, any>)[filterActive],
        ),
    );

    setCustomPrizeClaims(customPrizeClaimsFiltered);
  };

  useEffect(() => {
    filterRows();
  }, [filters, filtersData]);

  useEffect(() => {
    const customPrizeFiltersData = customPrizeClaimsAll.reduce(
      (acc, customPrizeClaim) => {
        filterKeys.forEach((filterKey) => {
          const dataToEval = (customPrizeClaim as any)[filterKey];
          const exist = acc[filterKey].includes(dataToEval);
          if (!exist) {
            acc[filterKey] = [...acc[filterKey], dataToEval];
          }
        });
        return acc;
      },
      getKeys<string[]>([]),
    );
    setFiltersData(customPrizeFiltersData);
  }, [customPrizeClaimsAll]);

  useOnInit(() => {
    syncCustomPrizeClaims();
    syncCustomPrizeWinners();
  });

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
            setCustomPrizeClaimId(row.id);
            setIsOpen(true);
          }}
        >
          <Icon className={styles['row-action-button']}>delete</Icon>
        </IconButton>
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <Header
        title="Custom prize claim processes"
        subtitle="List of custom prize claims"
      />
      <div className={styles['actions-container']}>
        <Button variant="contained">
          <Link to="create">Create</Link>
        </Button>

        <Button className={styles['secondary-btn']} variant="contained">
          <Link to="verify-signature">Verify a signature</Link>
        </Button>
      </div>
      <div className={styles['filters']}>
        {columnDefinitions
          .filter((columnDefinition) => columnDefinition.id !== 'signedMessage')
          .map((columnDefinition) => (
            <SelectSearch
              value={filters[columnDefinition.id]}
              onChange={(__, value) => {
                setFilters((prevState) => ({
                  ...prevState,
                  [columnDefinition.id]: value,
                }));
              }}
              label={columnDefinition.header}
              options={filtersData[columnDefinition.id]}
              getOptionLabel={(optionLabel) => optionLabel}
              isOptionEqualToValue={(optionA, optionB) => optionA === optionB}
              key={`filter${columnDefinition.id}`}
            />
          ))}
      </div>
      <div className={styles['grid-container']}>
        <DataTable
          loading={loading}
          columnDefinitions={columnDefinitions}
          rows={customPrizeClaims}
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
            onClick={removeCustomPrizeClaim}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
