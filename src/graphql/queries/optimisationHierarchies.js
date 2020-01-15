import gql from 'graphql-tag';

const OPTIMISATION_HIERARCHIES = gql`
  query optimisationHierarchies($where: FilterOptimisationHierarchyInput!) {
    optimisationHierarchies(where: $where) @connection(key: "optimisationHierarchies") {
      id
      externalId
      description
    }
  }
`;

const OPTIMISATION_HIERARCHY = gql`
  query optimisationHierarchy($where: FindOptimisationHierarchyInput!) {
    optimisationHierarchy(where: $where) {
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

export { OPTIMISATION_HIERARCHIES, OPTIMISATION_HIERARCHY };
