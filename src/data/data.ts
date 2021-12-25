export const webhooks = [
  { id: "webhook#1", value: "Webhook #1" },
  { id: "webhook#2", value: "Webhook #2" },
  { id: "webhook#3", value: "Webhook #3" },
  { id: "webhook#4", value: "Webhook #4" },
]

export const requests = [
  { id: "REQUEST_ID1", isActive: true, time: '1 min ago', method: 'GET' },
  { id: "REQUEST_ID2", isActive: false, time: '2 min ago', method: 'POST' },
  { id: "REQUEST_ID3", isActive: false, time: '3 min ago', method: 'POST' },
  { id: "REQUEST_ID4", isActive: false, time: '4 min ago', method: 'GET' },
  { id: "REQUEST_ID5", isActive: false, time: '5 min ago', method: 'POST' },
]

export const requestInfoTabs = [
    {name: "Details", active: true},
    {name: "Headers", active: false},
    {name: "Query strings", active: false},
    {name: "Body", active: false},
];

export const currentRequest = {
  webhookId: "webhook#1",
  requestId: "#REQUEST_ID1",
  method: "GET",
  time: "1 min ago",
  tab: {
    details: [
      {name: "URL", value: "https://webhook.site/9a07f5bc-04de-4dae-b16a-f4f711cb6c30"},
      {name: "Host", value: "110.235.228.59"},
      {name: "Date", value: "12/20/2021 5:52:23 PM (a few seconds ago)"},
      {name: "Size", value: "0 bytes"},
    ],
  },
}
