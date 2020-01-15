import gql from 'graphql-tag';

const UPDATE_AVAILABILITY_TEMPLATE = gql`
  mutation updateAvailabilityTemplate($where: FindAvailabilityTemplateInput!, $data: UpdateAvailabilityTemplateInput!) {
    updateAvailabilityTemplate(where: $where, data: $data) {
      id
      name
      description
      availabilityTemplateItems {
        id
        dayOfTheWeek
        startTime
        endTime
      }
    }
  }
`;

const DELETE_AVAILABILITY_TEMPLATE = gql`
  mutation deleteAvailabilityTemplate($where: FindAvailabilityTemplateInput!) {
    deleteAvailabilityTemplate(where: $where) {
      id
    }
  }
`;

const CREATE_AVAILABILITY_TEMPLATE = gql`
  mutation createAvailabilityTemplate($data: CreateAvailabilityTemplateInput!) {
    createAvailabilityTemplate(data: $data) {
      id
      name
      description
      availabilityTemplateItems {
        id
        dayOfTheWeek
        startTime
        endTime
      }
    }
  }
`;

export { UPDATE_AVAILABILITY_TEMPLATE, DELETE_AVAILABILITY_TEMPLATE, CREATE_AVAILABILITY_TEMPLATE };
