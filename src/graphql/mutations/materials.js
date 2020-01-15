import gql from 'graphql-tag';

const UPDATE_MATERIAL = gql`
  mutation updateMaterial($where: FindMaterialDefinitionInput!, $data: UpdateMaterialDefinitionInput!) {
    updateMaterialDefinition(where: $where, data: $data) {
      id
      externalId
      description
      materialLots {
        id
        quantity
        date
      }
      materialProperties {
        id
        value
        externalId
      }
      operationsSegmentMaterialSpecifications(where: { materialUse: "PRODUCED" }) {
        id
        operationsSegment {
          id
          operationsSegmentMaterialSpecifications(where: { materialUse: "CONSUMED" }) {
            id
            materialDefinition {
              id
              description
              materialLots {
                id
                quantity
                date
              }
            }
          }
        }
      }
      hierarchyScope {
        id
        externalId
      }
    }
  }
`;

const DELETE_MATERIAL = gql`
  mutation deleteMaterial($where: FindMaterialDefinitionInput!) {
    deleteMaterialDefinition(where: $where) {
      id
    }
  }
`;

const CREATE_MATERIAL = gql`
  mutation createMaterial($data: CreateMaterialDefinitionInput!) {
    createMaterialDefinition(data: $data) {
      id
      externalId
      description
      materialLots {
        id
        quantity
        date
      }
      materialProperties {
        id
        value
        externalId
      }
      operationsSegmentMaterialSpecifications(where: { materialUse: "PRODUCED" }) {
        id
        operationsSegment {
          id
          operationsSegmentMaterialSpecifications(where: { materialUse: "CONSUMED" }) {
            id
            materialDefinition {
              id
              description
              materialLots {
                id
                quantity
                date
              }
            }
          }
        }
      }
      hierarchyScope {
        id
        externalId
      }
    }
  }
`;

export { UPDATE_MATERIAL, DELETE_MATERIAL, CREATE_MATERIAL };
