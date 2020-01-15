import gql from 'graphql-tag';

const UPDATE_LOCATION = gql`
  mutation updateLocation($where: FindHierarchyScopeInput!, $data: UpdateHierarchyScopeInput!) {
    updateHierarchyScope(where: $where, data: $data) {
      id
      externalId
      parent {
        id
        externalId
      }
    }
  }
`;

const DELETE_LOCATION = gql`
  mutation deleteLocation($where: FindHierarchyScopeInput!) {
    deleteHierarchyScope(where: $where) {
      id
    }
  }
`;

const CREATE_LOCATION = gql`
  mutation createLocation($data: CreateHierarchyScopeInput!) {
    createHierarchyScope(data: $data) {
      id
      externalId
      parent {
        id
        externalId
      }
    }
  }
`;

export { UPDATE_LOCATION, DELETE_LOCATION, CREATE_LOCATION };
