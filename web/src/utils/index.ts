import requestUtils from './request';
import testUtils from './test';

/* Webhook */

// Get short webhook id for display
export const getFriendlyWebhookId = (id: string): string => {
  return `Webhook #${id.split('-')[0]}`;
};

/* Webhook Request */

// Get background color by request method
export const getColorByRequestMethod = (method: string) => {
  switch (method) {
    case 'GET':
      return 'green';
    case 'POST':
      return 'cyan';
    case 'PATCH':
      return 'yellow';
    case 'DELETE':
      return 'red';
    case 'PUT':
      return 'orange';
    case 'OPTIONS':
      return 'gray';
    case 'HEAD':
      return 'blue';
    default:
      return 'gray';
  }
};

// Get short webhook request id for display
export const getFriendlyWebhookRequestId = (id: string): string => {
  return `#${id.slice(0, 10)}`;
};

/* Request info methods */
export const { createRequestTabData, getRequestInfoTabs } = requestUtils;
export const { wrapComponent } = testUtils;
