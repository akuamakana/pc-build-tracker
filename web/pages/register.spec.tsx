import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '@pages/register';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('it renders', () => {
  const queryClient = new QueryClient();
  const RQWrapper: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  beforeEach(() => {
    render(
      <RQWrapper>
        <Register />
      </RQWrapper>
    );
  });

  it('renders the register page', () => {
    const formInputs = screen.getAllByTestId('form-input');
    expect(formInputs).toHaveLength(4);
  });

  it('handles input', async () => {
    const usernameInput = screen.getByRole('username');
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const confirmPasswordInput = screen.getByRole('confirm-password');
    const submitButton = screen.getByRole('submit');
    const logSpy = jest.spyOn(global.console, 'log');

    userEvent.type(usernameInput, 'test');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'test');
    userEvent.type(confirmPasswordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(logSpy).toHaveBeenCalledWith({
        username: 'test',
        password: 'test',
        confirmPassword: 'test',
        email: 'test@gmail.com',
      })
    );
  });

  it('handles input and renders error message', async () => {
    const usernameInput = screen.getByRole('username');
    const emailInput = screen.getByRole('email');
    const passwordInput = screen.getByRole('password');
    const confirmPasswordInput = screen.getByRole('confirm-password');
    const submitButton = screen.getByRole('submit');
    const logSpy = jest.spyOn(global.console, 'log');

    userEvent.type(usernameInput, 'test');
    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'test');
    userEvent.type(confirmPasswordInput, 'test2');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(logSpy).toHaveBeenCalledWith({
        username: 'test',
        password: 'test',
        confirmPassword: 'test2',
        email: 'test@gmail.com',
      })
    );
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
