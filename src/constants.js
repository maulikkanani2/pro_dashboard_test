export const SCENARIO_STATUS_COLORS = {
  Draft: '#00BCD4',
  Proposed: '#FF9800',
  Published: '#673AB7',
  Complete: '#4CAF50',
};

export const DATE_FORMAT = 'DD MMM YY';
export const DATE_TIME_FORMAT = 'DD MMM YY, h:mmA';
export const DATE_DETAILED_TIME_FORMAT = 'DD MMM YY, h:mm:ssA';
export const TIME_FORMAT = 'h:mmA';

export const DAYS_OF_THE_WEEK = [
  { id: 0, name: 'Sunday' },
  { id: 1, name: 'Monday' },
  { id: 2, name: 'Tuesday' },
  { id: 3, name: 'Wednesday' },
  { id: 4, name: 'Thursday' },
  { id: 5, name: 'Friday' },
  { id: 6, name: 'Saturday' },
];

export const ORDER_PRIORITIES = {
  1: 'High',
  2: 'Medium',
  3: 'Low',
};

export const OPERATIONS_TYPES = [
  { id: 'PRODUCTION', name: 'Production' },
  { id: 'WORK', name: 'Work' },
];

export const MATERIAL_USES = [
  { id: 'PRODUCED', name: 'Produced' },
  { id: 'CONSUMED', name: 'Consumed' },
  { id: 'WIP', name: 'Work In Progress' },
];
