import gql from 'graphql-tag';

const LOCATIONS = gql`
  query locations($where: FilterHierarchyScopeInput!, $orderBy: [String], $limit: Int) {
    hierarchyScopes(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "hierarchyScopes") {
      id
      externalId
      parent {
        id
        externalId
      }
    }
  }
`;

const LOCATION = gql`
  query location($where: FindHierarchyScopeInput!) {
    hierarchyScope(where: $where) {
      id
      externalId
      parent {
        id
        externalId
      }
    }
  }
`;

export { LOCATIONS, LOCATION };
