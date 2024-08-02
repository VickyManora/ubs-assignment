// src/App.tsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchData } from './services/api';
import DataGrid from './components/DataGrid';
import ToggleButtons from './components/ToggleButtons';
import styled from 'styled-components';
import './App.css';

const AppWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    padding: 60px;
  }
`;

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDataset, setSelectedDataset] = useState<string>('Posts');
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const datasets = ['Posts', 'Comments', 'Albums', 'Photos', 'Users'];

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData(selectedDataset);
        setData(response.data);

        if (response.data.length > 0) {
          const columns = Object.keys(response.data[0]).map(key => ({
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
            field: key
          }));
          setColumnDefs(columns);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, [selectedDataset]);
  
  const handleSelectDataset = useCallback((dataset: string) => {
    setSelectedDataset(dataset);
  }, []);
  
  const filteredData = useMemo(() => 
    data.filter(item =>
      Object.values(item).some(val => 
        typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ), [data, searchTerm]);

  return (
    <AppWrapper>
      <h1>React Data Grid with TypeScript</h1>
      <ToggleButtons options={datasets} selected={selectedDataset} onSelect={handleSelectDataset} className="custom-toggle-buttons" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <DataGrid rowData={filteredData} columnDefs={columnDefs} />}
    </AppWrapper>
  );
};

export default App;
