import gql from 'graphql-tag';

const UPDATE_CHANGEOVER_SET = gql`
  mutation updateChangeoverSet($where: FindChangeoverSetInput!, $data: UpdateChangeoverSetInput!) {
    updateChangeoverSet(where: $where, data: $data) {
      id
      name
      description
      defaultTime
      changeoverSetItems {
        id
        fromValue {
          id
          value
          optimisationProperty {
            id
            name
            optimisationPropertyValues {
              id
              value
            }
          }
        }
        toValue {
          id
          value
        }
        property
        time
        operationsSegment {
          id
          operationsDefinition {
            id
            externalId
            operationsSegments {
              id
            }
            operationsDefinitionClass {
              id
              externalId
              operationsDefinitions {
                id
                externalId
              }
            }
          }
        }
      }
    }
  }
`;

const DELETE_CHANGEOVER_SET = gql`
  mutation deleteChangeoverSet($where: FindChangeoverSetInput!) {
    deleteChangeoverSet(where: $where) {
      id
    }
  }
`;

const CREATE_CHANGEOVER_SET = gql`
  mutation createChangeoverSet($data: CreateChangeoverSetInput!) {
    createChangeoverSet(data: $data) {
      id
      name
      description
      defaultTime
      changeoverSetItems {
        id
        fromValue {
          id
          value
          optimisationProperty {
            id
            name
            optimisationPropertyValues {
              id
              value
            }
          }
        }
        toValue {
          id
          value
        }
        property
        time
        operationsSegment {
          id
          operationsDefinition {
            id
            externalId
            operationsSegments {
              id
            }
            operationsDefinitionClass {
              id
              externalId
              operationsDefinitions {
                id
                externalId
              }
            }
          }
        }
      }
    }
  }
`;

export { UPDATE_CHANGEOVER_SET, DELETE_CHANGEOVER_SET, CREATE_CHANGEOVER_SET };
