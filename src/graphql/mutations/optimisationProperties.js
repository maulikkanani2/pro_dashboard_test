import gql from 'graphql-tag';

const UPDATE_OPTIMISATION_PROPERTY = gql`
  mutation updateOptimisationProperty($where: FindOptimisationPropertyInput!, $data: UpdateOptimisationPropertyInput!) {
    updateOptimisationProperty(where: $where, data: $data) {
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

const DELETE_OPTIMISATION_PROPERTY = gql`
  mutation deleteOptimisationProperty($where: FindOptimisationPropertyInput!) {
    deleteOptimisationProperty(where: $where) {
      id
    }
  }
`;

const CREATE_OPTIMISATION_PROPERTY = gql`
  mutation createOptimisationProperty($data: CreateOptimisationPropertyInput!) {
    createOptimisationProperty(data: $data) {
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

export { UPDATE_OPTIMISATION_PROPERTY, DELETE_OPTIMISATION_PROPERTY, CREATE_OPTIMISATION_PROPERTY };
