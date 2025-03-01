'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function SpentHistoryTable() {
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch('/api/spent-history', {
          next: { revalidate: 3600 },
        });

        const result = await response.json();

        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Entry',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      sortComparator: (v1, v2) => parseInt(v1) - parseInt(v2),
      renderHeader: () => (
        <>
          <NumbersIcon fontSize="small" style={{ marginRight: 4 }} />
          Entry
        </>
      ),
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 180,
      renderHeader: () => (
        <>
          <AccessTimeIcon fontSize="small" style={{ marginRight: 4 }} />
          Date
        </>
      ),
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: 250,
      renderHeader: () => (
        <>
          <DescriptionIcon fontSize="small" style={{ marginRight: 4 }} />
          Description
        </>
      ),
    },
    {
      field: 'balance',
      headerName: 'Spent',
      width: 130,
      renderHeader: () => (
        <>
          <MonetizationOnIcon fontSize="small" style={{ marginRight: 4 }} />
          Spent
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        width: '700px',
        overflowX: 'auto',
      }}
    >
      <DataGrid
        checkboxSelection
        rows={data}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 30 } },
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
        pageSizeOptions={[30, 50, 100]}
        density="compact"
      />
    </div>
  );
}
