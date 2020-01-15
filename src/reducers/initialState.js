export default {
  scenarios: {
    current: JSON.parse(localStorage.getItem('Scenario')),
  },
  dialog: {
    orders: null,
    equipment: null,
    scenarios: null,
    availability: null,
    materials: null,
    personnel: null,
    operations: null,
    routing: null,
    optimisationProperties: null,
    optimisationHierarchies: null,
    changeoverSets: null,
  }
};
