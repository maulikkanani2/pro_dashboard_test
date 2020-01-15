
import gql from 'graphql-tag';

const UPDATE_OPERATION = gql`
  mutation updateOperation($where: FindOperationsDefinitionClassInput!, $data: UpdateOperationsDefinitionClassInput!) {
    updateOperationsDefinitionClass(where: $where, data: $data) {
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

const DELETE_OPERATION = gql`
  mutation deleteOperation($where: FindOperationsDefinitionClassInput!) {
    deleteOperationsDefinitionClass(where: $where) {
      id
    }
  }
`;

const CREATE_OPERATION = gql`
  mutation createOperation($data: CreateOperationsDefinitionClassInput!) {
    createOperationsDefinitionClass(data: $data) {
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

export { UPDATE_OPERATION, DELETE_OPERATION, CREATE_OPERATION };
