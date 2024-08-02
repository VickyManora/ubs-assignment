import React from 'react';
import { AgGridReact } from 'ag-grid-react'; // Import AG Grid React component
import 'ag-grid-community/styles/ag-grid.css'; // Import AG Grid base styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Import AG Grid Alpine theme styles
import styled from 'styled-components';

// Interface defining the props for the DataGrid component
interface DataGridProps {
  rowData: any[]; // Array of row data to be displayed in the grid
  columnDefs: any[]; // Array of column definitions for the grid
}

// Styled component to wrap the AG Grid, setting responsive heights
const GridWrapper = styled.div`
  width: 100%; // Full width of the container
  height: 500px; // Default height

  @media (min-width: 768px) {
    height: 600px; // Height for medium screens and up
  }

  @media (min-width: 1024px) {
    height: 700px; // Height for large screens and up
  }

  .ag-theme-alpine {
    width: 100%; // Full width of the AG Grid
    height: 100%; // Full height of the AG Grid wrapper
  }
`;

// Functional component to render the AG Grid data table
const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs }) => {
  // Options for configuring the AG Grid
  const gridOptions = {
    defaultColDef: {
      resizable: true, // Allow columns to be resized
      sortable: true,  // Allow columns to be sorted
      filter: true,    // Enable filtering in columns
    },
    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit(); // Automatically fit columns to the grid width
    },
  };

  return (
    <GridWrapper>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions} // Apply the grid options
          domLayout="autoHeight" // Adjust grid height based on content
        />
      </div>
    </GridWrapper>
  );
};

export default React.memo(DataGrid); // Memoize the component to prevent unnecessary re-renders
