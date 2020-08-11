import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchPage from './index';

test('render test', () => {
  const { getByTestId } = render(<SearchPage />);
  expect(getByTestId('search-input')).toBeInTheDocument();
});

test('input box should update the value on UI', () => {
  render(<SearchPage />);
  const inputField = document.querySelector('input');
  fireEvent.change(inputField, { target: { value: 'ABC' } });
  expect(inputField.value).toBe('ABC');
});
