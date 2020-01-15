import gql from 'graphql-tag';

const UPDATE_OPTIMISATION_HIERARCHY = gql`
  mutation updateOptimisationHierarchy($where: FindOptimisationHierarchyInput!, $data: UpdateOptimisationHierarchyInput!) {
    updateOptimisationHierarchy(where: $where, data: $data) {
      id
      externalId
      description
      optimisationHierarchyAttributes {
        id
        optimisationProperty {
          id
          name
        }
        priority
      }
    }
  }
`;

const DELETE_OPTIMISATION_HIERARCHY = gql`
  mutation deleteOptimisationHierarchy($where: FindOptimisationHierarchyInput!) {
    deleteOptimisationHierarchy(where: $where) {
      id
    }
  }
`;

const CREATE_OPTIMISATION_HIERARCHY = gql`
  mutation createOptimisationHierarchy($data: CreateOptimisationHierarchyInput!) {
    createOptimisationHierarchy(data: $data) {
      id
      externalId
      description
      optimisationHierarchyAttributes {
        id
        optimisationProperty {
          id
          name
        }
        priority
      }
    }
  }
`;

export { UPDATE_OPTIMISATION_HIERARCHY, DELETE_OPTIMISATION_HIERARCHY, CREATE_OPTIMISATION_HIERARCHY };
