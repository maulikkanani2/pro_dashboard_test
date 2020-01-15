import gql from 'graphql-tag';

const UPDATE_EQUIPMENT = gql`
  mutation updateEquipment($where: FindEquipmentInput!, $data: UpdateEquipmentInput!) {
    updateEquipment(where: $where, data: $data) {
      id
      externalId
      description
      hierarchyScope {
        id
        externalId
      }
      changeoverSet {
        id
        name
      }
      calendarisedAvailabilityTemplateSet {
        id
        name
        calendarisedAvailabilityTemplateSetItems {
          id
          startTime
          endTime
          availabilityTemplate {
            id
            name
          }
        }
      }
      optimisationHierarchy {
        id
        externalId
      }
      equipmentClasses {
        id
        externalId
      }
      downtimePeriods {
        id
        startTime
        endTime
      }
    }
  }
`;

const DELETE_EQUIPMENT = gql`
  mutation deleteEquipment($where: FindEquipmentInput!) {
    deleteEquipment(where: $where) {
      id
    }
  }
`;

const CREATE_EQUIPMENT = gql`
  mutation createEquipment($data: CreateEquipmentInput!) {
    createEquipment(data: $data) {
      id
      externalId
      description
      hierarchyScope {
        id
        externalId
      }
      changeoverSet {
        id
        name
      }
      calendarisedAvailabilityTemplateSet {
        id
        name
        calendarisedAvailabilityTemplateSetItems {
          id
          startTime
          endTime
          availabilityTemplate {
            id
            name
          }
        }
      }
      optimisationHierarchy {
        id
        externalId
      }
      equipmentClasses {
        id
        externalId
      }
      downtimePeriods {
        id
        startTime
        endTime
      }
    }
  }
`;

export { UPDATE_EQUIPMENT, DELETE_EQUIPMENT, CREATE_EQUIPMENT };
