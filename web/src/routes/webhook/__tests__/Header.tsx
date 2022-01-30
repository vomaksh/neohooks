import { findByText, render, screen } from '@testing-library/react';
import { wrapComponent } from '../../../utils';
import { Header } from '../Header';

const webhooksList = [
  'a88bace2-b0e3-43cc-9cca-a9713ec02bcf',
  '9b9f705b-3731-433e-bb6f-59426451a997',
];
const currentWebhookId = webhooksList[0];

test('header component with undefined props', async () => {
  render(wrapComponent(<Header currentWebhookId={undefined} webhooks={undefined} />));

  // Logo should be visible irrespective of undefined props
  const logo = screen.getByTestId('logo');
  expect(await findByText(logo, 'Neo')).toBeVisible();

  // Dropdown shouldn't be visible when currentWebhookId and webhooks are undefined
  const webhooksDropdown = screen.queryByRole('button', {
    expanded: false,
  });
  if (webhooksDropdown) throw Error("dropdown shouldn't be displayed if props are undefined");

  // Check if change color mode button is visible
  screen.getByTestId('change-color-mode-btn');
  // Check if view github repo button is visible
  screen.getByRole('button', { name: /GitHub/i });
});

test('header component with webhookId and webhooks list', async () => {
  render(wrapComponent(<Header currentWebhookId={currentWebhookId} webhooks={webhooksList} />));

  // Logo, color mode switcher and github repo link should be visible
  const logo = screen.getByTestId('logo');
  expect(await findByText(logo, 'Neo')).toBeVisible();
  screen.getByTestId('change-color-mode-btn');
  screen.getByRole('button', { name: /GitHub/i });

  // Dropdown should be visible and required webhook should be selected
  const webhooksDropdown = screen.getByRole('button', {
    expanded: false,
  });
  expect(webhooksDropdown.textContent).toBe(`Webhook #${currentWebhookId.split('-')[0]}`);
});
