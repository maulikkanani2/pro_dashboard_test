export const eventToValue = (event) => { return event.target.value };
export const checkToValue = (event) => { return event.target.checked };
export const dateToValue = (date) => { return date; };
export const selectToValue = (findFn) => { return (event) => { return findFn(event); } };
export const colourToValue = (colour) => { return colour; };
