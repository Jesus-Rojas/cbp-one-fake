import { ColumnDefinition } from '../../../core/types/column-definition';
import { DataTable } from '../../../core/components/data-table/data-table';
import { Header } from '../../../core/components/headers/header';
import styles from './custom-prizes-winners-table.module.scss';
import { useCustomPrizesWinners } from '../../hooks/use-custom-prizes-winners';
import { useOnInit } from '../../../core/hooks/use-on-init';
import { SelectSearch } from '../../../shared/components/SelectSearch';
import { useEffect, useMemo, useState } from 'react';

export function CustomPrizesWinnersTable() {
  const {
    customPrizesWinners: customPrizesWinnersAll,
    loading,
    syncCustomPrizeWinners,
  } = useCustomPrizesWinners();
  const [customPrizesWinners, setCustomPrizesWinners] = useState(
    customPrizesWinnersAll,
  );

  const columnDefinitions: ColumnDefinition[] = [
    {
      id: 'amount',
      field: 'amount',
      header: 'Amount',
    },
    {
      id: 'name',
      field: 'name',
      header: 'Name',
    },
    {
      id: 'customPrizeId',
      field: 'customPrizeId',
      header: 'Custom Prize ID',
    },
    {
      id: 'userAddress',
      field: 'userAddress',
      header: 'User address',
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
      setCustomPrizesWinners(customPrizesWinnersAll);
      return;
    }

    const customPrizesWinnersFiltered = customPrizesWinnersAll.filter(
      (customPrizeWinner) =>
        filtersActive.every(
          (filterActive) =>
            filters[filterActive] ===
            (customPrizeWinner as Record<string, any>)[filterActive],
        ),
    );

    setCustomPrizesWinners(customPrizesWinnersFiltered);
  };

  useEffect(() => {
    filterRows();
  }, [filters, filtersData]);

  useEffect(() => {
    const customPrizeFiltersData = customPrizesWinnersAll.reduce(
      (acc, customPrizeWinner) => {
        filterKeys.forEach((filterKey) => {
          const dataToEval = (customPrizeWinner as any)[filterKey];
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
  }, [customPrizesWinnersAll]);

  useOnInit(() => {
    syncCustomPrizeWinners();
  });

  return (
    <div className={styles['container']}>
      <Header
        title="Custom prizes winners"
        subtitle="List to validate which prize each user won"
      />
      <div className={styles['filters']}>
        {columnDefinitions
          .filter(
            (columnDefinition) =>
              columnDefinition.id === 'customPrizeId' ||
              columnDefinition.id === 'userAddress',
          )
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
          rows={customPrizesWinners}
        />
      </div>
    </div>
  );
}
