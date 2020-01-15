import gql from 'graphql-tag';

const EQUIPMENT_CLASSES = gql`
  query equipmentClasses($where: FilterEquipmentClassInput!) {
    equipmentClasses(where: $where) @connection(key: "equipmentClasses") {
      id
      externalId
    }
  }
`;

const EQUIPMENT_CLASS = gql`
  query equipmentClass($where: FindEquipmentClassInput!) {
    equipmentClass(where: $where) {
      id
      externalId
    }
  }
`;

export { EQUIPMENT_CLASSES, EQUIPMENT_CLASS };
