import gql from 'graphql-tag';

const OPERATIONS = gql`
  query operations($where: FilterOperationsDefinitionClassInput!, $orderBy: [String], $limit: Int) {
    operationsDefinitionClasses(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "operationsDefinitionClasses") {
      id
      externalId
      description
      operationsType
      operationsDefinitions {
        id
      }
      hierarchyScope {
        id
        externalId
      }
    }
  }
`;

const CHANGEOVER_OPERATIONS = gql`
  query detailedOperations($where: FilterOperationsDefinitionClassInput!, $orderBy: [String], $limit: Int) {
    operationsDefinitionClasses(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "detailedOperationsDefinitionClasses") {
      id
      externalId
      operationsDefinitions {
        id
        externalId
        operationsSegments {
          id
        }
      }
    }
  }
`;

const OPERATION = gql`
  query operation($where: FindOperationsDefinitionClassInput!) {
    operationsDefinitionClass(where: $where) {
      id
      externalId
      description
      operationsType
      hierarchyScope {
        id
        externalId
      }
      operationsDefinitions {
        id
        externalId
        operationsSegments {
          id
          duration
          calendarisedThroughputSet {
            id
            calendarisedThroughputSetItems {
              id
              startTime
              endTime
              quantity
              materialDefinition {
                id
                externalId
              }
            }
          }
          operationsSegmentEquipmentSpecifications {
            id
            quantity
            ignoreAvailability
            equipmentClass {
              id
              externalId
            }
          }
          operationsSegmentPersonnelSpecifications {
            id
            quantity
            ignoreAvailability
            personnelClass {
              id
              externalId
            }
          }
          operationsSegmentMaterialSpecifications {
            id
            quantity
            materialUse
            materialDefinition {
              id
              externalId
            }
          }
        }
      }
    }
  }
`;

export { OPERATIONS, OPERATION, CHANGEOVER_OPERATIONS };
