import gql from 'graphql-tag';

const UPDATE_EQUIPMENT_CLASS = gql`
  mutation updatePersonnelClass($where: FindEquipmentClassInput!, $data: UpdateEquipmentClassInput!) {
    updateEquipmentClass(where: $where, data: $data) {
      id
      externalId
    }
  }
`;

const DELETE_EQUIPMENT_CLASS = gql`
  mutation deleteEquipmentClass($where: FindEquipmentClassInput!) {
    deleteEquipmentClass(where: $where) {
      id
    }
  }
`;

const CREATE_EQUIPMENT_CLASS = gql`
  mutation createEquipmentClass($data: CreateEquipmentClassInput!) {
    createEquipmentClass(data: $data) {
      id
      externalId
    }
  }
`;

export {UPDATE_EQUIPMENT_CLASS, DELETE_EQUIPMENT_CLASS, CREATE_EQUIPMENT_CLASS};
