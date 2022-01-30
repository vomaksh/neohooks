/* Construct webhook request tabs data */

import { RequestInfoTab, WebhookRequest } from '../types';

function getRequestInfoTabs(method: string) {
  switch (method.toUpperCase()) {
    case 'GET':
      return [RequestInfoTab.DETAILS, RequestInfoTab.HEADERS, RequestInfoTab.QUERY_STRINGS];
    default:
      return [
        RequestInfoTab.DETAILS,
        RequestInfoTab.HEADERS,
        RequestInfoTab.QUERY_STRINGS,
        RequestInfoTab.BODY,
      ];
  }
}

function detailsTabData(request: WebhookRequest) {
  return {
    URL: request.url,
    Method: request.method,
    Host: request.host,
    Date: request.createdAt,
    Size: request.size,
    ID: request.id,
  };
}

function bodyTabData(request: WebhookRequest) {
  return {
    body: request.body,
  };
}

function createRequestTabData(tab: RequestInfoTab, request: WebhookRequest) {
  switch (tab) {
    case RequestInfoTab.DETAILS:
      return detailsTabData(request);
    case RequestInfoTab.HEADERS:
      return request.headers;
    case RequestInfoTab.QUERY_STRINGS:
      return request.queryStrings;
    case RequestInfoTab.BODY:
      return bodyTabData(request);
    default:
      return {};
  }
}

export default {
  getRequestInfoTabs,
  createRequestTabData,
};
