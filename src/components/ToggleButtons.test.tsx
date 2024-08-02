import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleButtons from './ToggleButtons';

test('renders ToggleButtons with given options', () => {
  const options = ['posts', 'comments'];
  const selected = 'posts';
  const onSelect = jest.fn();

  const { getByText } = render(<ToggleButtons options={options} selected={selected} onSelect={onSelect} />);
  
  // Check if all options are rendered
  expect(getByText('posts')).toBeInTheDocument();
  expect(getByText('comments')).toBeInTheDocument();
});

test('calls onSelect with the correct option when a button is clicked', () => {
  const options = ['posts', 'comments'];
  const selected = 'posts';
  const onSelect = jest.fn();

  const { getByText } = render(<ToggleButtons options={options} selected={selected} onSelect={onSelect} />);
  const button = getByText('comments');

  fireEvent.click(button);

  expect(onSelect).toHaveBeenCalledWith('comments');
});
