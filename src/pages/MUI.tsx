import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  GridCsvExportOptions,
  GridCsvGetRowsToExportParams,
  gridExpandedSortedRowIdsSelector,
  gridPaginatedVisibleSortedGridRowIdsSelector, gridSortedRowIdsSelector,
  GridToolbarContainer,
  // GridToolbarExport,
  useGridApiContext
} from '@mui/x-data-grid';
import './MUI.css';
import {Button} from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
    headerClassName: 'super-app-header',
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (_, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function CustomToolbar() {
  const apiRef = useGridApiContext();

  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options);

  const getRowsFromCurrentPage = ({apiRef}: GridCsvGetRowsToExportParams) =>
    gridPaginatedVisibleSortedGridRowIdsSelector(apiRef);

  const getUnfilteredRows = ({apiRef}: GridCsvGetRowsToExportParams) =>
    gridSortedRowIdsSelector(apiRef);

  const getFilteredRows = ({apiRef}: GridCsvGetRowsToExportParams) =>
    gridExpandedSortedRowIdsSelector(apiRef);

  return (
    <GridToolbarContainer>
      <Button
        startIcon={<FileDownloadIcon />}
        onClick={() => handleExport({getRowsToExport: getRowsFromCurrentPage})}
      >
        Current page rows
      </Button>
      <Button
        startIcon={<FileDownloadIcon />}
        onClick={() => handleExport({getRowsToExport: getFilteredRows})}
      >
        Filtered rows
      </Button>
      <Button
        startIcon={<FileDownloadIcon />}
        onClick={() => handleExport({getRowsToExport: getUnfilteredRows})}
      >
        Unfiltered rows
      </Button>
    </GridToolbarContainer>
  );
}

export default function MUI() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        columnHeaderHeight={35}
        rowHeight={32}
        getRowClassName={(params) => `super-app-theme--${params.row.age! > 21 ? 'adult' : 'child'}`}
        slots={{ toolbar: CustomToolbar }}
      />
    </Box>
  );
}