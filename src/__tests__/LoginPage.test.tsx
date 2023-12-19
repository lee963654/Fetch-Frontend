import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from '../components/LoginPage';
import configureStore from '../store';
import configureMockStore from "redux-mock-store"
import {createStore} from "redux"
import {createMemoryHistory} from "history"
import '@testing-library/jest-dom';


const mockStore = configureMockStore([]);
const store = mockStore({});


describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  test('renders login page', () => {

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
            <LoginPage />
      </Provider>
    );

    // Checking if all the parts of the login page are present
    expect(getByText('Fetch')).toBeInTheDocument();
    expect(getByText('Welcome to Fetch! We love dogs, and hope you do too! We are here to help you bring a lucky dog home. Please enter your name and email to get started.')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByText('Log In')).toBeInTheDocument();
  });


  test('displays error message for unsuccessful login', async () => {

    const { getByText, getByLabelText } = render(
      <Provider store={store}>
            <LoginPage />
      </Provider>
    );

    // Mock fetch for an unsuccessful login
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    // Changing the email to a non email and submitting
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid-email' } });
    fireEvent.submit(getByText('Log In'));

    // Wait for the error to show
    await waitFor(() => {
      expect(getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });




});
