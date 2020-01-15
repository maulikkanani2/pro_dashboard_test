import gql from 'graphql-tag';

const UPDATE_PERSON = gql`
  mutation updatePerson($where: FindPersonInput!, $data: UpdatePersonInput!) {
    updatePerson(where: $where, data: $data) {
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

const DELETE_PERSON = gql`
  mutation deletePerson($where: FindPersonInput!) {
    deletePerson(where: $where) {
      id
    }
  }
`;

const CREATE_PERSON = gql`
  mutation createPerson($data: CreatePersonInput!) {
    createPerson(data: $data) {
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

export { UPDATE_PERSON, DELETE_PERSON, CREATE_PERSON };
