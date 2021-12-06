import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@pages/login';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('it renders', () => {
  const queryClient = new QueryClient();
  const RQWrapper: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

  beforeEach(() => {
    render(
      <RQWrapper>
        <Login />
      </RQWrapper>
    );
  });

  it('renders the login page', () => {
    const formInputs = screen.getAllByTestId('form-input');
    expect(formInputs).toHaveLength(2);
  });

  it('handles input', async () => {
    const usernameOrEmailInput = screen.getByRole('usernameOrEmail');
    const passwordInput = screen.getByRole('password');
    const submitButton = screen.getByRole('submit');
    const logSpy = jest.spyOn(global.console, 'log');

    userEvent.type(usernameOrEmailInput, 'test');
    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(logSpy).toHaveBeenCalledWith({
        usernameOrEmail: 'test',
        password: 'test',
      })
    );
  });
});
