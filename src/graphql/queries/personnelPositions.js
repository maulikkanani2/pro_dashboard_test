import gql from 'graphql-tag';

const PERSONNEL_POSITIONS = gql`
  query personnelPositions($where: FilterPersonnelPositionInput!) {
    personnelPositions(where: $where) @connection(key: "personnelPositions") {
      id
      externalId
    }
  }
`;

const PERSONNEL_POSITION = gql`
  query personnelPosition($where: FindPersonnelPositionInput!) {
    personnelPosition(where: $where) {
      id
      externalId
    }
  }
`;

export { PERSONNEL_POSITIONS, PERSONNEL_POSITION };
