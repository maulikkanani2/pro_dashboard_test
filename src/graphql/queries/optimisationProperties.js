import gql from 'graphql-tag';

const OPTIMISATION_PROPERTIES = gql`
  query optimisationProperties($where: FilterOptimisationPropertyInput!) {
    optimisationProperties(where: $where) @connection(key: "optimisationProperties") {
      id
      name
      optimisationPropertyValues {
        id
        value
        colourSchemeItem {
          id
          red
          green
          blue
        }
      }
    }
  }
`;

const OPTIMISATION_PROPERTY = gql`
  query optimisationProperty($where: FindOptimisationPropertyInput!) {
    optimisationProperty(where: $where) {
      id
      name
      optimisationPropertyValues {
        id
        value
        colourSchemeItem {
          id
          red
          green
          blue
        }
      }
    }
  }
`;

export { OPTIMISATION_PROPERTIES, OPTIMISATION_PROPERTY };
