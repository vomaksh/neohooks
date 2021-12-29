/* Webhook Request */

// Get background color by request method
const getColorByRequestMethod = (method: string) => {
  switch (method) {
    case 'GET':
      return 'green.500';
    case 'POST':
      return 'purple.500';
    default:
      return 'gray.500';
  }
};
export const webhookRequest = {
  getColorByRequestMethod,
};
