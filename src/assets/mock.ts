export const flights = {
  forward: [
    {
      id: '1',
      airline: 'Myanmar National Airlines',
      date: 'Thu, 05 Sep 2024',
      time: '07:45 AM',
      from: 'RGN',
      to: 'BKK',
      duration: '1h 25m',
      price: 'USD 4,140,000',
      luggage: '40 kg',
      onlineStatus: 'ONLINE',
    },
    {
      id: '2',
      airline: 'Thai Airways',
      date: 'Thu, 05 Sep 2024',
      time: '11:25 AM',
      from: 'RGN',
      to: 'BKK',
      duration: '1h 30m',
      price: 'USD 2,262,000',
      luggage: '25 kg',
      onlineStatus: 'OFFLINE',
    },
    // Add more flights as needed
  ],
  backward: [
    {
      id: '3',
      airline: 'Myanmar National Airlines',
      date: 'Thu, 05 Sep 2024',
      time: '07:45 AM',
      from: 'BKK',
      to: 'RGN',
      duration: '1h 25m',
      price: 'USD 4,140,000',
      luggage: '40 kg',
      onlineStatus: 'ONLINE',
    },
    {
      id: '4',
      airline: 'Thai Airways',
      date: 'Thu, 05 Sep 2024',
      time: '11:25 AM',
      from: 'BKK',
      to: 'RGN',
      duration: '1h 30m',
      price: 'USD 2,262,000',
      luggage: '25 kg',
      onlineStatus: 'OFFLINE',
    },
    // Add more flights as needed
  ],
};

export const tripTypeValues = [
  { value: '0', label: 'One-way Flight' },
  { value: '1', label: 'Round Trip' },
];

export const titleValues = [
  { value: 'Mr', label: 'Mr.' },
  { value: 'Ms', label: 'Ms.' },
  { value: 'Mrs', label: 'Mrs.' },
  { value: 'other', label: 'Other' },
  // Add more options as needed
];

export const nationalityValues = [
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Singapore', label: 'Singapore' },
  // Add more options as needed
];

export const airportValues = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'tom',
    label: 'Tom',
  },
];
