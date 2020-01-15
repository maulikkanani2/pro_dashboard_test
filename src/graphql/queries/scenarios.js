import gql from 'graphql-tag';

const SCENARIOS = gql`
  query scenarios($where: FilterScenarioInput!, $orderBy: [String]) {
    scenarios(where: $where, orderBy: $orderBy) @connection(key: "scenarios") {
      id
      name
      description
      status
      startDate
      createdAt
      updatedAt
      scenarioAttribute {
        changeoverTime
        changeoverCount
        waitingTime
        inventoryShortage
        overdueCount
        conflictCount
      }
    }
  }
`;

const SCENARIO = gql`
  query scenario($where: FindScenarioInput!) {
    scenario(where: $where) {
      id
      name
      description
      status
      startDate
      createdAt
      updatedAt
      scenarioAttribute {
        changeoverTime
        changeoverCount
        waitingTime
        inventoryShortage
        overdueCount
        conflictCount
      }
      timePeriods {
        id
        startTime
        endTime
      }
    }
  }
`;

export { SCENARIOS, SCENARIO };
