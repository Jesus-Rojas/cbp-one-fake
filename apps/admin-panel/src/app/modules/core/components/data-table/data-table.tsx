import styles from './data-table.module.scss';
import {
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { ColumnDefinition } from '../../types/column-definition';
import React, {
  createContext,
  forwardRef,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import {
  VariableSizeList,
  ListChildComponentProps,
  ListItemKeySelector,
} from 'react-window';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = any;

export interface TableContext<T> {
  loading: boolean;
  columnDefinitions: ColumnDefinition<T>[];
  totalGrow: number;
  rows: Row[];
  rowActions?: (row: Row) => ReactElement;
  hoveringColumns?: Record<string, number>;
  setHoveringColumns?: (column: Record<string, number>) => void;
  columnWidths?: Record<string, number>;
  setColumnWidths?: (widths: Record<string, number>) => void;
  onSelect?: (row: Row) => void;
  rowsFiltered: Row[];
  setRowsFiltered: (rows: Row[]) => void;
  filter: string;
  setFilter: (filter: string) => void;
  extraFilters?: () => ReactElement;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Context = createContext<TableContext<any>>({
  loading: false,
  columnDefinitions: [],
  totalGrow: 1,
  rows: [],
  rowsFiltered: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRowsFiltered: () => {},
  filter: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilter: () => {},
});

export interface DataTableProps<T> {
  uniqueId?: string;
  loading?: boolean;
  columnDefinitions: ColumnDefinition<T>[];
  rows: Row[];
  rowActions?: (row: Row) => ReactElement;
  size?: 'small' | 'medium';
  itemSize?: number;
  maxRows?: number;
  itemKey?: ListItemKeySelector;
  onSelect?: (row: Row) => void;
  extraFilters?: () => ReactElement;
}

export interface DraggableProps {
  className: string;
  thumbClassName: string;
  onDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onChange: (distance: number, e: MouseEvent) => void;
  onUp: (distance: number) => void;
}

function Draggable(props: DraggableProps) {
  const { className, thumbClassName, onDown, onUp, onChange } = props;
  const [distance, setDistance] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    onDown(event);
    let d = 0;
    const thumb = ref.current as HTMLDivElement;

    if (!thumb) return;

    const slider = thumb.parentElement;

    // prevent selection start
    event.preventDefault();

    const shiftX = event.clientX - thumb.getBoundingClientRect().left;
    // shiftY not needed, the thumb moves only horizontally

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event: MouseEvent) {
      if (slider) {
        d = event.clientX - shiftX - slider.getBoundingClientRect().left;
        setDistance(d);
        onChange(d, event);
      }
    }

    function onMouseUp() {
      onUp(d);
      setDistance(0);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  }

  return (
    <div className={className}>
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        onDragStart={() => false}
        className={thumbClassName}
        style={{ left: `${distance}px` }}
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const InnerElementType = forwardRef(({ children, ...rest }: any, ref) => (
  <div ref={ref} {...rest} className={styles['inner-table-type']}>
    {children}
  </div>
));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OuterElementType = forwardRef(({ children, ...rest }: any, ref) => {
  const {
    columnDefinitions,
    totalGrow,
    loading,
    columnWidths,
    setColumnWidths,
    hoveringColumns,
    setHoveringColumns,
  } = useContext(Context);

  return (
    <div ref={ref} {...rest} className={styles['outer-table-type']}>
      <div className={styles['table-header']}>
        {columnDefinitions.length > 0 && loading && (
          <LinearProgress className={styles['loader']} />
        )}
        <div className={cn(styles['row'], styles['table-row'])}>
          {columnDefinitions.map((columnDefinition) => {
            const { grow = 1 } = columnDefinition;
            const percentage = (100 / totalGrow) * grow;
            let w = 0;
            if (columnWidths) {
              w = columnWidths[columnDefinition.id];
            }
            let defaultValue = 0;
            return (
              <div
                className={cn(styles['cell'])}
                style={{
                  flex: w === 0 ? `${percentage}%` : undefined,
                  maxWidth: w === 0 ? `${percentage}%` : undefined,
                  width: w === 0 ? undefined : `${w}px`,
                }}
                key={columnDefinition.id}
              >
                <span className={styles['cell-content']}>
                  {columnDefinition.header}
                </span>
                <Draggable
                  className={styles['handle']}
                  thumbClassName={styles['handle-thumb']}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onDown={(e: any) => {
                    defaultValue = e.target.parentNode.parentNode.clientWidth;
                  }}
                  onChange={(change) => {
                    setHoveringColumns?.({
                      ...hoveringColumns,
                      [columnDefinition.id]: change,
                    });
                  }}
                  onUp={(change) => {
                    const current =
                      w === 0
                        ? defaultValue
                        : columnWidths![columnDefinition.id]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
                    const newW = current + change;
                    setColumnWidths?.({
                      ...columnWidths,
                      [columnDefinition.id]: newW,
                    });
                    setHoveringColumns?.({
                      ...hoveringColumns,
                      [columnDefinition.id]: 0,
                    });
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {children}
    </div>
  );
});

const Row = (props: ListChildComponentProps) => {
  const {
    columnDefinitions,
    totalGrow,
    rowsFiltered,
    rowActions,
    columnWidths,
    hoveringColumns,
    onSelect,
  } = useContext(Context);

  const index = props.index;
  const row = rowsFiltered[index];
  const isSelectable = !!onSelect;

  return (
    row && (
      <div
        key={index}
        className={cn(styles['row'], styles['table-row'], {
          [styles['row-selectable']]: isSelectable,
        })}
        onClick={() => isSelectable && onSelect(row)}
        style={props.style}
      >
        {columnDefinitions.map((columnDefinition) => {
          const { grow = 1 } = columnDefinition;
          const percentage = (100 / totalGrow) * grow;
          let w = 0;
          if (columnWidths) {
            w = columnWidths[columnDefinition.id];
          }
          const cellClass = columnDefinition.rendererCellClass?.(row);

          return (
            <div
              className={cn(styles['cell'], { [cellClass + '']: cellClass })}
              style={{
                flex: w === 0 ? `${percentage}%` : undefined,
                maxWidth: w === 0 ? `${percentage}%` : undefined,
                width: w === 0 ? undefined : `${w}px`,
              }}
              key={columnDefinition.id}
            >
              {columnDefinition.field && (
                <div className={styles['cell-content']}>
                  {row[columnDefinition.field]}
                </div>
              )}
              {columnDefinition.renderer && (
                <span className={styles['cell-content']}>
                  {columnDefinition.renderer(row)}
                </span>
              )}
              {hoveringColumns &&
                hoveringColumns[columnDefinition.id] !== 0 && (
                  <div className={styles['resize-helper-container']}>
                    <div
                      className={styles['resize-helper']}
                      style={{
                        left: `${
                          hoveringColumns
                            ? hoveringColumns[columnDefinition.id]
                            : 0
                        }px`,
                      }}
                    />
                  </div>
                )}
            </div>
          );
        })}
        {rowActions && (
          <div className={styles['row-actions']}>{rowActions(row)}</div>
        )}
      </div>
    )
  );
};

const FilterInput = () => {
  const { extraFilters, setFilter } = useContext(Context);
  return (
    <Stack direction="row" justifyContent="end" mb={2}>
      <div>{extraFilters?.()}</div>
      <TextField
        size="small"
        label="Search"
        autoComplete="off"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Stack>
  );
};

export function DataTable<T>(props: DataTableProps<T>) {
  const {
    loading = false,
    columnDefinitions,
    rows,
    rowActions,
    itemSize = 54,
    maxRows = 10,
    itemKey,
    onSelect,
    extraFilters,
  } = props;

  const tableRef = useRef<HTMLDivElement | null>(null);
  const [rowsFiltered, setRowsFiltered] = useState([...rows]);
  const [filter, setFilter] = useState('');
  const headerSize = 54;
  const tableSize = rowsFiltered.length * itemSize + headerSize;
  const maxTableSize = maxRows * itemSize;
  const fixedTableSize = tableSize > maxTableSize ? maxTableSize : tableSize;
  const totalGrow = columnDefinitions
    .map((columnDefinition) => columnDefinition.grow || 1)
    .reduce((acc, current) => acc + current, 0);
  const [hoveringColumns, setHoveringColumns] = useState<
    Record<string, number>
  >({});
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  useEffect(() => {
    if (tableRef.current !== null) {
      setColumnWidths(() => {
        return columnDefinitions.reduce((acc, current) => {
          if (!tableRef.current) return acc;
          const { grow = 1 } = current;
          const percentage = (100 / totalGrow) * grow;
          acc[current.id] = (tableRef.current.clientWidth * percentage) / 100;
          return acc;
        }, {} as Record<string, number>);
      });

      setHoveringColumns(
        columnDefinitions.reduce((acc, current) => {
          acc[current.id] = 0;
          return acc;
        }, {} as Record<string, number>),
      );
    }
  }, [columnDefinitions, setColumnWidths, totalGrow]);

  useEffect(() => {
    if (filter === '') {
      setRowsFiltered([...rows]);
    } else {
      const filterable = columnDefinitions.filter(
        (columnDefinition) => columnDefinition.filterable,
      );

      const rowsFiltered = rows.filter((row) => {
        return filterable.some((columnDefinition) => {
          const value = columnDefinition.filterValue
            ? columnDefinition.filterValue(row)
            : row[columnDefinition.field as string];
          return value
            ? value.toLowerCase().includes(filter.toLowerCase())
            : false;
        });
      });
      setRowsFiltered(rowsFiltered);
    }
  }, [rows, columnDefinitions, filter]);

  const getItemSize = useCallback((_: number) => itemSize, [itemSize]);

  return (
    <div className={styles['container']}>
      <Context.Provider
        value={{
          columnDefinitions,
          totalGrow,
          rows,
          rowActions,
          loading,
          hoveringColumns,
          setHoveringColumns,
          columnWidths,
          setColumnWidths,
          onSelect,
          rowsFiltered,
          setRowsFiltered,
          filter,
          setFilter,
          extraFilters,
        }}
      >
        {columnDefinitions.some(
          (columnDefinition) => columnDefinition.filterable,
        ) && <FilterInput></FilterInput>}
        <div className={styles['table-container']}>
          <div className={styles['content-table-body']} ref={tableRef}>
            <VariableSizeList
              height={fixedTableSize}
              itemCount={rowsFiltered.length}
              itemSize={getItemSize}
              width="100%"
              outerElementType={OuterElementType}
              innerElementType={InnerElementType}
              itemKey={itemKey}
            >
              {Row}
            </VariableSizeList>

            {rows.length === 0 && !loading && (
              <div>
                <div className={styles['cell']}>
                  Oops, there's nothing to show
                </div>
              </div>
            )}
          </div>
        </div>
      </Context.Provider>
    </div>
  );
}
