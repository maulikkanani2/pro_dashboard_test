import gql from 'graphql-tag';

const ORDER_STATUSES = gql`
  query orderStatuses($where: FilterOrderStatusInput!) {
    orderStatuses(where: $where) @connection(key: "orderStatuses") {
      id
      status
    }
  }
`;

const ORDER_STATUS = gql`
  query orderStatus($where: FindOrderStatusInput!) {
    orderStatus(where: $where) {
      id
      status
    }
  }
`;

export { ORDER_STATUSES, ORDER_STATUS };
