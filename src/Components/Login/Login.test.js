import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
import { screen } from '@testing-library/react';

jest.mock('./Login', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Login component', () => {
  it('renders without crashing', () => {
    render(<Login />);
  });

  it('displays the login form', () => {
    render(<Login />);
    screen.getByLabelText('Email');
    screen.getByLabelText('Password');
    screen.getByText('Submit');
  });

  it('calls the onSubmit function when the form is submitted', () => {
    const onSubmit = jest.fn();
    render(<Login onSubmit={onSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    const submitButton = screen.getByText('Submit');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
