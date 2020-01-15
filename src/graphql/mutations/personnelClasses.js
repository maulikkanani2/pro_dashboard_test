import gql from 'graphql-tag';

const UPDATE_PERSONNEL_CLASS = gql`
  mutation updatePersonnelClass($where: FindPersonnelClassInput!, $data: UpdatePersonnelClassInput!) {
    updatePersonnelClass(where: $where, data: $data) {
      id
      externalId
    }
  }
`;

const DELETE_PERSONNEL_CLASS = gql`
  mutation deletePersonnelClass($where: FindPersonnelClassInput!) {
    deletePersonnelClass(where: $where) {
      id
    }
  }
`;

const CREATE_PERSONNEL_CLASS = gql`
  mutation createPersonnelClass($data: CreatePersonnelClassInput!) {
    createPersonnelClass(data: $data) {
      id
      externalId
    }
  }
`;

export {
  UPDATE_PERSONNEL_CLASS,
  DELETE_PERSONNEL_CLASS,
  CREATE_PERSONNEL_CLASS
};
