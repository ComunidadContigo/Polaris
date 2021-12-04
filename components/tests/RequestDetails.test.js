/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react-native';
import { RequestDetails } from '../RequestDetails';
import { AuthContext, NotificationContext } from '../context';

jest.useFakeTimers();
const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

it('renders search bar', () => {
  const fakeRequestData = {
    request_date: '2021-12-03T19:22:33.370Z',
    request_meeting_point: '(-67.1686461, 18.1825037)',
    request_destination: '(-67.13636989999999, 18.2292876)',
    r_id: 3,
    b_id: null,
    rq_id: 95,
    stat: 'UNFULFILLED',
  };

  const { getAllByText } = render(
    <AuthContext.Provider
      value={{
        accessToken: 'fakeAccessToken',
        setAccessToken: jest.fn(),
        uid: 1,
        setUid: jest.fn(),
      }}
    >
      <NotificationContext.Provider
        value={{
          requestData: fakeRequestData,
          activeRequestId: 95,
        }}
      >
        <RequestDetails />
      </NotificationContext.Provider>
    </AuthContext.Provider>,
  );
  const requestStatus = getAllByText('Trip Status: UNFULFILLED');
  expect(requestStatus).toBeTruthy();
});
