'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function SpentHistoryTable({ rows }: { rows: any[] }) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Entry', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
    { field: 'desc', headerName: 'Description', width: 150 },
    { field: 'balance', headerName: 'Spent', width: 150 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        sx={(theme) => ({
          borderColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[700]
              : theme.palette.grey[200],
          '& .MuiDataGrid-cell': {
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.grey[700]
                : theme.palette.grey[200],
          },
        })}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
