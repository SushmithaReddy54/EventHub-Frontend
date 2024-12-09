import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useGlobalFilter, useSortBy, usePagination, useFilters } from 'react-table';
import {
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterListIcon from '@mui/icons-material/FilterList';

const UsersTable = ({ data: initialData, columns }) => {

  const [data, setData] = useState(initialData);
  const [filter, setFilter] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
    page,
    state: { pageIndex, pageSize },
    setPageSize,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5, pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  return (

    <TableContainer component={Paper} style={{ maxHeight: '80vh', overflow: 'auto', minWidth: '500px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
          padding: '10px',
        }}
      >
        <div>
          <Tooltip
            title="Column Filter"
            placement='right-end'
          >
            <FilterListIcon style={{ cursor: 'pointer' }} title="filter" onClick={() => setFilter(!filter)} />
          </Tooltip>
        </div>
        <div>
          <TextField
            variant="standard"
            placeholder="Search"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <Table {...getTableProps()} className="workshops-table">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <React.Fragment key={column.id}>
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      borderBottom: '1px solid #ddd',
                      width: column.width,
                      padding: '12px',
                      background: '#f2f2f2',
                      color: '#333',
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {column.render('Header')}
                    <span style={{ marginLeft: '4px' }}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDownwardIcon fontSize="smaller" />
                        ) : (
                          <ArrowUpwardIcon fontSize="smaller" />
                        )
                      ) : null}
                    </span>
                    {filter && column.canFilter ? column.render('Filter') : null}
                  </TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div
        className="pagination"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          position: 'sticky',
          bottom: 0,
          background: 'white',
          zIndex: 1,
        }}
      >
        <div>
          <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
            {'<<'}
          </button>{' '}
          <button onClick={() => gotoPage(pageIndex - 1)} disabled={pageIndex === 0}>
            {'<'}
          </button>{' '}
          Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}{' '}
          <button onClick={() => gotoPage(pageIndex + 1)} disabled={pageIndex === Math.ceil(data.length / pageSize) - 1}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(Math.ceil(data.length / pageSize) - 1)}
            disabled={pageIndex === Math.ceil(data.length / pageSize) - 1}
          >
            {'>>'}
          </button>
        </div>
        <div>
          <span>
            Records per page:{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setData(initialData);
              }}
            >
              {[5, 10, 25, 50, 100].map((pageSizeOption) => (
                <option key={pageSizeOption} value={pageSizeOption}>
                  {pageSizeOption}
                </option>
              ))}
            </select>
          </span>
        </div>
      </div>
    </TableContainer>
  );
};

export default UsersTable;
