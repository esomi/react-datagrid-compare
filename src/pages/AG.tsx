import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import {useCallback, useRef, useState} from "react";
import {ColDef} from "ag-grid-community"; // Optional Theme applied to the Data Grid
import './AG.css';

interface IRowData {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
export const AG = () => {
  const gridRef = useRef<AgGridReact<IRowData>>(null);

  // Row Data: The data to be displayed.
  const [rowData] = useState([
    {make: "Tesla", model: "Model Y", price: 64950, electric: true},
    {make: "Ford", model: "F-Series", price: 33850, electric: false},
    {make: "Toyota", model: "Corolla", price: 29600, electric: false},
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef[]>([
    {field: "make", flex: 2}, //This column will be twice as wide as the others
    {field: "model", flex: 1},
    {field: "price", flex: 1},
    {field: "electric", flex: 1}
  ]);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv()
  }, []);

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{height: 500}} // the Data Grid will fill the size of the parent container
    >
      <button
        onClick={onBtExport}
        style={{marginBottom: "5px", fontWeight: "bold"}}
      >
        Export to CSV
      </button>
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={colDefs}
        enableCellTextSelection={true}
        domLayout="autoHeight"
      />
    </div>
  )
};

