import React, {useState, useMemo, Key, useEffect} from 'react';
import DataGrid, { Column, Row, Renderers, SortColumn, RenderCheckboxProps, RenderRowProps } from 'react-data-grid';
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
  {
    key: 'id',
    name: 'ID',
    frozen: true,
    resizable: true,
  },
  {
    key: 'title',
    name: 'Title',
    renderEditCell: TextEditor,
    editable: true,
    sortable: true,
    resizable: true,
  },
  {
    key: 'complete',
    name: 'Complete',
    renderCell: ({ row }: { row: Row }) => (
      <>{row.complete ? '✅' : '❌'}</>
    ),
    renderEditCell: BooleanEditor,
    editable: true,
    sortable: true,
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
    renderEditCell: TextEditor,
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

function TextEditor<TRow extends { [key: string]: any }>({ row, column, onRowChange }: EditorProps<TRow>) {
  return (
    <input
      value={row[column.key as keyof TRow] as string}
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.value })}
    />
  );
}

function BooleanEditor<TRow extends { [key: string]: any }>({ row, column, onRowChange }: EditorProps<TRow>) {
  return (
    <input
      type="checkbox"
      checked={row[column.key as keyof TRow] as boolean}
      onChange={(e) => onRowChange({ ...row, [column.key]: e.target.checked })}
    />
  );
}

function PriorityEditor<TRow extends { [key: string]: any }>({ row, column, onRowChange }: EditorProps<TRow>) {
  return (
    <select
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
  const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

  useEffect(() => {
    console.log('Rows:', rows);
    console.log('Selected Rows:', selectedRows);
  }, []);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;
    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = (a: Row, b: Row) => {
          if (a[sort.columnKey as keyof Row] === b[sort.columnKey as keyof Row]) return 0;
          return a[sort.columnKey as keyof Row] > b[sort.columnKey as keyof Row] ? 1 : -1;
        };
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  const renderers: Renderers<Row,unknown> = {
    renderCheckbox: (props: RenderCheckboxProps) => (
      <input
        type="checkbox"
        checked={props.checked}
      />
    ),
    renderRow: (key: Key, props: RenderRowProps<Row>) => (
      <Row {...props} key={key} className={selectedRows.has(props.row.id) ? 'selected-row' : ''} />
    )
  };

  return (
    <DataGrid
      columns={columns}
      rows={sortedRows}
      renderers={renderers}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      rowKeyGetter={(row) => row.id}
      className="fill-grid"
    />
  );
}

export default RD;