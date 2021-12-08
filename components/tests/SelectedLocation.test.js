/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react-native';
import SelectedLocation from '../SelectedLocation';

const fakeProps = {
  type: 'Meeting',
  location: '(-67.1686461, 18.1825037)',
};

it('shows type of location', () => {
  const { getAllByText } = render(<SelectedLocation {...fakeProps} />);
  const locationType = getAllByText(fakeProps.type);
  expect(locationType).toBeTruthy();
});

it('shows location coordinates', () => {
  const { getAllByText } = render(<SelectedLocation {...fakeProps} />);
  const locationCoordinates = getAllByText(fakeProps.location);
  expect(locationCoordinates).toBeTruthy();
});
