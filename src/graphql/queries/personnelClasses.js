import gql from 'graphql-tag';

const PERSONNEL_CLASSES = gql`
  query personnelClasses($where: FilterPersonnelClassInput!) {
    personnelClasses(where: $where) @connection(key: "personnelClasses") {
      id
      externalId
    }
  }
`;

const PERSONNEL_CLASS = gql`
  query personnelClass($where: FindPersonnelClassInput!) {
    personnelClass(where: $where) {
      id
      externalId
    }
  }
`;

export { PERSONNEL_CLASSES, PERSONNEL_CLASS };
