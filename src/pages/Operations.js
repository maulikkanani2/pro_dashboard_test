import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Transform';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { OPERATIONS } from '../graphql/queries/operations';
import OperationCard from '../components/operations/card';
import OperationDialog from '../components/operations/dialog';
import Box from '../components/layout/Box';
import OperationForm from '../components/operations/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import Search from '../components/fields/search';
import withAdd from '../wrappers/add';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Operations = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.operationsDefinitionClasses.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.operationsDefinitionClasses.refetch();
    });
  }

  const operations = props.operationsDefinitionClasses.data ? props.operationsDefinitionClasses.data : [];

  return (
    <Page>
      <PageTitle title="Operations" />
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
      <PageBody isLoading={props.operationsDefinitionClasses.loading}>
        {props.isAdding && <OperationForm onCancel={props.toggleAdding(false)} operations={operations} />}
        {!operations.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Operation"
          description="This allows you to define schedulable work and production operations for orders." />
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
                  rowCount={operations.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <OperationCard operation={operations[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <OperationDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        operation={props.dialog}
      />
    </Page>
  );
};

const mapToFilter = (props, query) => {
  let where = { scenario: { id: props.scenario.id } };

  if (query) {
    where = {
      ...where,
      or: [{
        externalId_like: `%${query}%`,
      }, {
        description_like: `%${query}%`,
      }, {
        hierarchyScope: {
          externalId_like: `%${query}%`,
        },
      }],
    }
  }

  return where;
};

Operations.propTypes = {
  scenario: PropTypes.object.isRequired,
  operations: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Operations.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["externalId ASC"],
  query: OPERATIONS,
  propName: 'operationsDefinitionClasses',
})(withDialog('operations')(withAdd(Operations))));

