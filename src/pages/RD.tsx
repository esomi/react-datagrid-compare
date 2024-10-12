import React, {useState} from 'react';
import DataGrid, {Column, CopyEvent, FillEvent, PasteEvent, Row, SelectColumn, textEditor} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import './RD.css';

interface Row {
  id: number;
  title: string;
  complete: boolean;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  dueDate: Date;
}

const columns: Column<Row>[] = [
  SelectColumn,
  {
    key: 'id',
    name: 'ID',
    frozen: true,
    resizable: true,
  },
  {
    key: 'title',
    name: 'Title',
    renderEditCell: textEditor,
    editable: true,
    sortable: true,
    resizable: true,
  },
  {
    key: 'priority',
    name: 'Priority',
    renderEditCell: PriorityEditor,
    editable: true,
    sortable: true,
  },
  {
    key: 'description',
    name: 'Description',
    renderEditCell: textEditor,
    editable: true,
    sortable: true,
  },
  {
    key: 'dueDate',
    name: 'Due Date',
    renderEditCell: DateEditor,
    editable: true,
    renderCell: ({ row }: { row: Row }) => (
      <>{row.dueDate.toLocaleDateString()}</>
    ),
    sortable: true,
  }
];

const initialRows: Row[] = [
  { id: 0, title: 'Task 1', complete: false, priority: 'High', description: 'Complete project proposal', dueDate: new Date(2024, 0, 15) },
  { id: 1, title: 'Task 2', complete: true, priority: 'Medium', description: 'Review code changes', dueDate: new Date(2024, 0, 10) },
  { id: 2, title: 'Task 3', complete: false, priority: 'Low', description: 'Update documentation', dueDate: new Date(2024, 0, 20) }
];

interface EditorProps<TRow> {
  row: TRow;
  column: Column<TRow>;
  onRowChange: (row: TRow) => void;
}

function PriorityEditor<TRow extends { [key: string]: any }>({ row, column, onRowChange }: EditorProps<TRow>) {
  return (
    <select
      className={'rdg-text-editor'}
      autoFocus
      value={row[column.key as keyof TRow] as string}
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  );
}

function DateEditor<TRow extends { [key: string]: any }>({ row, column, onRowChange }: EditorProps<TRow>) {
  return (
    <input
      type="date"
      value={(row[column.key as keyof TRow] as Date).toISOString().split('T')[0]}
      onChange={(e) => onRowChange({ ...row, [column.key]: new Date(e.target.value) })}
    />
  );
}

const RD: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(new Set());

  // const onSelectedRowsChange = (selectedRows: ReadonlySet<number>) => {
  //   console.log(selectedRows);
  //   setSelectedRows(selectedRows);
  // };

  function handleFill({ columnKey, sourceRow, targetRow }: FillEvent<Row>): Row {
    return { ...targetRow, [columnKey]: sourceRow[columnKey as keyof Row] };
  }

  function handlePaste({
                         sourceColumnKey,
                         sourceRow,
                         targetColumnKey,
                         targetRow
                       }: PasteEvent<Row>): Row {
    const incompatibleColumns = ['email', 'zipCode', 'date'];
    if (
      sourceColumnKey === 'avatar' ||
      ['id', 'avatar'].includes(targetColumnKey) ||
      ((incompatibleColumns.includes(targetColumnKey) ||
          incompatibleColumns.includes(sourceColumnKey)) &&
        sourceColumnKey !== targetColumnKey)
    ) {
      return targetRow;
    }

    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey as keyof Row] };
  }

  function handleCopy({sourceRow, sourceColumnKey}: CopyEvent<Row>): void {
    if (window.isSecureContext) {
      navigator.clipboard.writeText(sourceRow[sourceColumnKey as keyof Row] as string);
    }
  }


  return (
    <DataGrid
      columns={columns}
      rows={rows}
      onFill={handleFill}
      onCopy={handleCopy}
      onPaste={handlePaste}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      // onSelectedRowsChange={onSelectedRowsChange} // TESTING
      onRowsChange={setRows}
      rowKeyGetter={(row) => row.id}
      className="fill-grid rdg-light"
      rowHeight={30}
      isRowSelectionDisabled={(row) => row.id === 0}
      rowClass={(row) =>
        row.id === 1 ? 'highlight-row' : undefined
      }
      onCellClick={(args, event) => {
        if (args.column.key === 'title') {
          event.preventGridDefault();
          args.selectCell(true);
        }
      }}
    />
  );
}

export default RD;