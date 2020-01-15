import moment from 'moment';

import {
  IconMenuFirst,
  IconMenuSecond,
  IconMenuThird,
} from '../components/importIcons/icons';

export const uploadTypes = [
  // { id: 1, key: 'OPERATIONS', name: 'OPERATIONS', icon: IconMenuFirst },
  // { id: 2, key: 'EQUIPMENT', name: 'EQUIPMENT', icon: IconMenuSecond },
  { id: 3, key: 'ORDERS', name: 'ORDERS', icon: IconMenuThird },
];

export const filesSortingMenu = [
  { id: '1', title: 'A-Z', type: 'asc', key: 'Key' },
  // { id: '2', title: 'Z-A', type: 'desc', key: 'Key' },
  // { id: '3', title: 'Newest first', type: 'asc', key: 'LastModified' },
  { id: '4', title: 'Latest first', type: 'desc', key: 'LastModified' },
];

export const csvSortingMenu = [
  { id: '1', title: 'Priority', type: 'asc', key: 'priority' },
  { id: '2', title: 'Quantity', type: 'asc', key: 'quantity' },
  { id: '3', title: 'Newest first', type: 'desc', key: 'earliest_start_date' },
  { id: '4', title: 'Oldest first', type: 'asc', key: 'earliest_start_date' },
];

export const getFileInfo = path => {
  const splittedPath = path.split('/');
	return {
	  name: splittedPath[splittedPath.length - 1],
	  type: splittedPath[splittedPath.length - 2].toUpperCase(),
	  status: splittedPath[splittedPath.length - 3],
	  scenarioId: splittedPath[splittedPath.length - 4]
  };
};

export const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

export const searchInArrayOfObjects = (inputValue, data) =>
  data.filter(obj =>
    Object.values(obj)
      .map(str =>
        str
          .toString()
          .toLowerCase()
          .includes(inputValue)
      )
      .includes(true)
  );

export const sortInArrayOfObjects = (key, data, type) => {
  return data.sort((a, b) => {
    if (key === 'earliest_start_date') {
      if (type === 'asc')
        return (
          moment(a[key], 'DD-MM-YYYY').toDate() -
          moment(b[key], 'DD-MM-YYYY').toDate()
        );
      return (
        moment(b[key], 'DD-MM-YYYY').toDate() -
        moment(a[key], 'DD-MM-YYYY').toDate()
      );
    }

    if (key === 'LastModified') {
      if (type === 'asc') return new Date(b[key]) - new Date(a[key]);
      return new Date(a[key]) - new Date(b[key]);
    } else if (isNumeric(a[key])) {
      if (type === 'asc') return parseInt(a[key]) - parseInt(b[key]);
      return parseInt(b[key]) - parseInt(a[key]);
    } else if (typeof a[key] === 'string') {
      if (type === 'asc') return a[key].localeCompare(b[key]);
      return b[key].localeCompare(a[key]);
    }
  });
};
