import { findByText, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store';
import { Header } from '../Header';

import '@testing-library/jest-dom';

test('header component with undefined props', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header currentWebhookId={undefined} webhooks={undefined} />
      </MemoryRouter>
    </Provider>
  );

  // Logo should be visible irrespective of undefined props
  const logo = screen.getByTestId('logo');
  expect(await findByText(logo, 'Neo')).toBeVisible();

  // Dropdown shouldn't be visible when currentWebhookId and webhooks are undefined
  const webhooksDropdown = screen.queryByTestId('webhooks-dropdown');
  if (webhooksDropdown) throw Error("dropdown shouldn't be displayed if props are undefined");

  // Check if change color mode button is visible
  screen.getByTestId('change-color-mode-btn');
  // Check if view github repo button is visible
  screen.getByRole('button', { name: /GitHub/i });
});
