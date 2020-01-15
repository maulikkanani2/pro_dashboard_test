import gql from 'graphql-tag';

const UPDATE_SCENARIO = gql`
  mutation updateScenario($where: FindScenarioInput!, $data: UpdateScenarioInput!) {
    updateScenario(where: $where, data: $data) {
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

const DELETE_SCENARIO = gql`
  mutation deleteScenario($where: FindScenarioInput!) {
    deleteScenario(where: $where) {
      id
    }
  }
`;

const CREATE_SCENARIO = gql`
  mutation createScenario($data: CreateScenarioInput!) {
    createScenario(data: $data) {
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

export { UPDATE_SCENARIO, DELETE_SCENARIO, CREATE_SCENARIO };
