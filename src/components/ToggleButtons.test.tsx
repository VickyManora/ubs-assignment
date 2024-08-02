import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleButtons from './ToggleButtons';

test('ToggleButtons component', () => {
  const options = ['posts', 'comments'];
  const selected = 'posts';
  const onSelect = jest.fn();

  const { getByText } = render(<ToggleButtons options={options} selected={selected} onSelect={onSelect} />);
  const button = getByText('comments');
  fireEvent.click(button);

  expect(onSelect).toHaveBeenCalledWith('comments');
});