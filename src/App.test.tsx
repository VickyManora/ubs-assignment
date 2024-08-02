import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/api';
import { AxiosResponse } from 'axios';

// Mock the API fetch function
jest.mock('./services/api', () => ({
  fetchData: jest.fn()
}));

const mockFetchData = api.fetchData as jest.MockedFunction<typeof api.fetchData>;

test('renders App and initial components', async () => {
  // Mock the API response
  const mockResponse: AxiosResponse = {
    data: [{ id: 1, title: 'Test Post' }],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any
  };

  mockFetchData.mockResolvedValue(mockResponse);

  const { getByText, getByPlaceholderText } = render(<App />);

  // Check if the title is rendered
  expect(getByText('React Data Grid with TypeScript')).toBeInTheDocument();

  // Check if the input field is rendered
  expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  
  expect(() => getByText('Failed to fetch data')).toThrow();

  // Simulate selecting a dataset
  fireEvent.click(getByText('Comments'));

  await waitFor(() => {
    expect(mockFetchData).toHaveBeenCalledWith('Comments');
  });


});

test('handles search functionality', async () => {
  // Mock the API response
  const mockResponse: AxiosResponse = {
    data: [{ id: 1, title: 'Test Post' }],
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any
  };

  mockFetchData.mockResolvedValue(mockResponse);

  const { getByText, getByPlaceholderText } = render(<App />);

  // Simulate a search
  fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Post' } });

  // Check if the filtered data is displayed correctly
  await waitFor(() => {
    expect(getByText('Test Post')).toBeInTheDocument();
  });
});
