import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/DateRange';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import OptimisationHierarchiesCard from '../../components/optimisationHierarchies/card';
import OptimisationHierarchyDialog from '../../components/optimisationHierarchies/dialog';
import Box from '../../components/layout/Box';
import OptimisationHierarchiesForm from '../../components/optimisationHierarchies/form';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import { PageActions, PageBody } from '../../components/page';
import withAdd from '../../wrappers/add';
import Search from '../../components/fields/search';
import withDialog from '../../wrappers/dialog';
import EmptyState from '../../components/emptyState';
import { OPTIMISATION_HIERARCHIES } from '../../graphql/queries/optimisationHierarchies';

const OptimisationHierarchies = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.optimisationHierarchies.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.optimisationHierarchies.refetch();
    });
  }

  const optimisationHierarchies = props.optimisationHierarchies.data ? props.optimisationHierarchies.data : [];

  return (
    <React.Fragment>
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
      <PageBody isLoading={props.optimisationHierarchies.loading}>
        {props.isAdding && <OptimisationHierarchiesForm onCancel={props.toggleAdding(false)} />}
        {!optimisationHierarchies.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Optimisation Hierarchy"
          description="This allows you to assign your order your preference of sequencing" />
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
                  rowCount={optimisationHierarchies.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <OptimisationHierarchiesCard optimisationHierarchy={optimisationHierarchies[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <OptimisationHierarchyDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        optimisationHierarchy={props.dialog}
      />
    </React.Fragment>
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
      }],
    }
  }

  return where;
};

OptimisationHierarchies.propTypes = {
  scenario: PropTypes.object.isRequired,
  optimisationHierarchies: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

OptimisationHierarchies.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: OPTIMISATION_HIERARCHIES,
  propName: 'optimisationHierarchies',
})(withDialog('optimisationHierarchies')(withAdd(OptimisationHierarchies))));
