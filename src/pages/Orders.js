import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Assignment';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { ORDERS } from '../graphql/queries/orders';
import OrderCard from '../components/orders/card';
import OrderDialog from '../components/orders/dialog';
import Box from '../components/layout/Box';
import OrderForm from '../components/orders/form';
import { ORDER_PRIORITIES } from '../constants';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import Search from '../components/fields/search';
import withAdd from '../wrappers/add';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Orders = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.orders.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.orders.refetch();
    });
  }

  const orders = props.orders.data ? props.orders.data : [];

  return (
    <Page>
      <PageTitle title="Orders" />
      <PageActions>
        <Box alignItems="center">
          <Search onChange={updateFilter} onClear={clearFilter} value={props.queryText} />
        </Box>
        <Box flex="1" justifyContent="flex-end" alignItems="center">
          <Button variant="fab" color="primary" onClick={props.toggleAdding(true)}>
            <AddIcon />
          </Button>
        </Box>
      </PageActions>
      <PageBody isLoading={props.orders.loading}>
        {props.isAdding && <OrderForm onCancel={props.toggleAdding(false)} />}
        {!orders.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Order"
          description="Hook it up to an operation and being scheduling" />
        }
        <WindowScroller scrollElement={window.document.getElementById('dashboardBody')}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  autoHeight
                  ref={registerChild}
                  width={width}
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  overscanRowCount={2}
                  rowCount={orders.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <OrderCard order={orders[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <OrderDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        order={props.dialog}
      />
    </Page>
  );
};

const mapToFilter = (props, query) => {
  let where = { scenario: { id: props.scenario.id } };

  if (query) {
    const priorities = Object.keys(ORDER_PRIORITIES).filter(key =>
      ORDER_PRIORITIES[key].search(query) > -1);

    const filters = [{
      externalId_like: `%${query}%`,
    }, {
      orderItems_some: {
        operationsDefinitionClass: {
          externalId_like: `%${query}%`,
        },
      },
    }, {
      status: {
        status_like: `%${query}%`,
      },
    }];

    if (priorities.length) {
      filters.push({ priority_in: priorities });
    }

    where = { ...where, or: filters };
  }

  return where;
};

Orders.propTypes = {
  scenario: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  editing: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Orders.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  query: ORDERS,
  propName: 'orders',
  mapToFilter,
  orderBy: ["date ASC"],
})(withDialog('orders')(withAdd(Orders))));
