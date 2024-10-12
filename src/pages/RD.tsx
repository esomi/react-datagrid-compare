import React, {useState} from 'react';
import DataGrid, {
  Column,
  CopyEvent,
  DataGridHandle,
  FillEvent,
  PasteEvent,
  Row,
  SelectColumn,
  textEditor
} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import './RD.css';
import {flushSync} from "react-dom";
import {exportToCsv, exportToPdf} from "@src/utils/exportUtils.tsx";

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
  const [isExporting, setIsExporting] = useState(false);
  const gridRef = React.useRef<DataGridHandle>(null);

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

  // 직접 구현 시
  /*const _handleExportToCsv = () => {
    const csv = rows.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  }*/

  // exportUtils.tsx(git code) 사용 시
  function handleExportToCsv() {
    flushSync(() => {
      setIsExporting(true);
    });

    exportToCsv(gridRef.current!.element!, 'MyTasks.csv');
    // https://github.com/adazzle/react-data-grid/blob/main/website/exportUtils.tsx
    flushSync(() => {
      setIsExporting(false);
    });
  }
  async function handleExportToPdf() {
    flushSync(() => {
      setIsExporting(true);
    });

    await exportToPdf(gridRef.current!.element!, 'MyTasks.pdf');

    flushSync(() => {
      setIsExporting(false);
    });
  }

  return (
    <>
      <div className="export-btn-group">
        <button type="button" onClick={handleExportToCsv}>
          Export to CSV
        </button>
        <button type="button" onClick={handleExportToPdf}>
          Export to PDF
        </button>
      </div>
      <DataGrid
        ref={gridRef}
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
        enableVirtualization={!isExporting}
      />
    </>
  );
}

export default RD;