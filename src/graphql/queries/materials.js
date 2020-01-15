import gql from 'graphql-tag';

const MATERIALS = gql`
  query materials($where: FilterMaterialDefinitionInput!, $orderBy: [String], $limit: Int) {
    materialDefinitions(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "materialDefinitions") {
      id
      externalId
      description
      materialProperties {
        id
        value
        externalId
      }
      materialLots(where: { quantity_lt: 0 }) {
        id
      }
      hierarchyScope {
        id
        externalId
      }
    }
  }
`;

const MATERIAL = gql`
  query material($where: FindMaterialDefinitionInput!) {
    materialDefinition(where: $where) {
      id
      externalId
      description
      materialLots {
        id
        quantity
        date
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
      materialProperties {
        id
        value
        externalId
      }
      hierarchyScope {
        id
        externalId
      }
    }
  }
`;

export { MATERIALS, MATERIAL };
