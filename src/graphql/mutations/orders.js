import gql from 'graphql-tag';

const UPDATE_ORDER = gql`
  mutation updateOrder($where: FindOrderInput!, $data: UpdateOrderInput!) {
    updateOrder(where: $where, data: $data) {
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

const DELETE_ORDER = gql`
  mutation deleteOrder($where: FindOrderInput!) {
    deleteOrder(where: $where) {
      id
    }
  }
`;

const CREATE_ORDER = gql`
  mutation createOrder($data: CreateOrderInput!) {
    createOrder(data: $data) {
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

export { UPDATE_ORDER, DELETE_ORDER, CREATE_ORDER };
