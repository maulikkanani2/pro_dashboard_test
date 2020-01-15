import gql from 'graphql-tag';

const PERSONNEL = gql`
  query personnel($where: FilterPersonInput!, $orderBy: [String], $limit: Int) {
    persons(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "persons") {
      id
      externalId
      name
      hierarchyScope {
        id
        externalId
      }
      personnelClasses {
        id
        externalId
      }
      personnelPositions {
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

const PERSON = gql`
  query person($where: FindPersonInput!) {
    person(where: $where) {
      id
      externalId
      name
      hierarchyScope {
        id
        externalId
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
      personnelClasses {
        id
        externalId
      }
      personnelPositions {
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

export { PERSONNEL, PERSON };
