import gql from 'graphql-tag';

const AVAILABILITY_TEMPLATES = gql`
  query availabilityTemplates($where: FilterAvailabilityTemplateInput!, $orderBy: [String], $limit: Int) {
    availabilityTemplates(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "availabilityTemplates") {
      id
      name
      description
    }
  }
`;

const AVAILABILITY_TEMPLATE = gql`
  query availabilityTemplate($where: FindAvailabilityTemplateInput!) {
    availabilityTemplate(where: $where) {
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

export { AVAILABILITY_TEMPLATES, AVAILABILITY_TEMPLATE };
