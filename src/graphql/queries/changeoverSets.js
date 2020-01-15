import gql from 'graphql-tag';

const CHANGEOVER_SETS = gql`
  query changeoverSets($where: FilterChangeoverSetInput!) {
    changeoverSets(where: $where) @connection(key: "changeoverSets") {
      id
      name
      description
    }
  }
`;

const CHANGEOVER_SET = gql`
  query changeoverSet($where: FindChangeoverSetInput!) {
    changeoverSet(where: $where) {
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

export { CHANGEOVER_SETS, CHANGEOVER_SET };
