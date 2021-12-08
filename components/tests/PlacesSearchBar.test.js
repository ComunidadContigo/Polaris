/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react-native';
import PlacesSearchBar from '../PlacesSearchBar';

jest.useFakeTimers();

it('renders search bar', () => {
  const props = {
    currentPin: { latitude: 10.12, longitude: 12.1 },
    setCurrentPin: jest.fn(),
    type: 'meeting',
    // eslint-disable-next-line no-unused-vars
    setExpandedSearchBar: jest.fn(),
  };
  const { getAllByPlaceholderText } = render(
    <PlacesSearchBar {...props} />,
  );
  const searchBar = getAllByPlaceholderText('Search');
  expect(searchBar).toBeTruthy();
});
