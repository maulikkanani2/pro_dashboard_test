import gql from 'graphql-tag';

const ORDERS = gql`
  query orders($where: FilterOrderInput!, $orderBy: [String], $limit: Int) {
    orders(where: $where, orderBy: $orderBy, limit: $limit) @connection(key: "orders") {
      id
      date
      externalId
      priority
      orderProperties {
        id
        value
        externalId
      }
      status {
        id
        status
      }
    }
  }
`;

const ORDER = gql`
  query order($where: FindOrderInput!) {
    order(where: $where) {
      id
      date
      earliestStartDate
      externalId
      priority
      status {
        id
        status
      }
      orderProperties {
        id
        value
        externalId
      }
      orderItems {
        id
        quantity
        quantityUnitOfMeasure
        operationsDefinitionClass {
          id
          externalId
          operationsType
        }
      }
    }
  }
`;

export { ORDERS, ORDER };
