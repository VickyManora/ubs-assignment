import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import styled from 'styled-components';

interface DataGridProps {
  rowData: any[];
  columnDefs: any[];
}

const GridWrapper = styled.div`
  width: 100%;
  height: 500px;

  @media (min-width: 768px) {
    height: 600px;
  }

  @media (min-width: 1024px) {
    height: 700px;
  }

  .ag-theme-alpine {
    width: 100%;
    height: 100%;
  }
`;

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs }) => {
  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit();
    },
  };

  return (
    <GridWrapper>
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={gridOptions}
          domLayout="autoHeight"
        />
      </div>
    </GridWrapper>
  );
};

export default React.memo(DataGrid);;
