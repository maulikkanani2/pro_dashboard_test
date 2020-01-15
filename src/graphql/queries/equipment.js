import gql from 'graphql-tag';

const EQUIPMENTS = gql`
  query equipments($where: FilterEquipmentInput!, $orderBy: [String], $limit: Int) {
    equipments(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "equipments") {
      id
      externalId
      description
      hierarchyScope {
        id
        externalId
      }
      equipmentClasses {
        id
        externalId
      }
      calendarisedAvailabilityTemplateSet{
        id
        name
      }
    }
  }
`;

const EQUIPMENT = gql`
  query equipment($where: FindEquipmentInput!) {
    equipment(where: $where) {
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

export { EQUIPMENTS, EQUIPMENT };
