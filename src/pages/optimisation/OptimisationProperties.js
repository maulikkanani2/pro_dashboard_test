import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/DateRange';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import OptimisationPropertiesCard from '../../components/optimisationProperties/card';
import OptimisationPropertyDialog from '../../components/optimisationProperties/dialog';
import Box from '../../components/layout/Box';
import OptimisationPropertiesForm from '../../components/optimisationProperties/form';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import { PageActions, PageBody } from '../../components/page';
import withAdd from '../../wrappers/add';
import Search from '../../components/fields/search';
import withDialog from '../../wrappers/dialog';
import EmptyState from '../../components/emptyState';
import { OPTIMISATION_PROPERTIES } from '../../graphql/queries/optimisationProperties';

const OptimisationProperties = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.optimisationProperties.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.optimisationProperties.refetch();
    });
  }

  const optimisationProperties = props.optimisationProperties.data ? props.optimisationProperties.data : [];

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
      <PageBody isLoading={props.optimisationProperties.loading}>
        {props.isAdding && <OptimisationPropertiesForm onCancel={props.toggleAdding(false)} />}
        {!optimisationProperties.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Optimisation Property"
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
                  rowCount={optimisationProperties.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <OptimisationPropertiesCard optimisationProperty={optimisationProperties[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <OptimisationPropertyDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        optimisationProperty={props.dialog}
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
        name_like: `%${query}%`,
      }],
    }
  }

  return where;
};

OptimisationProperties.propTypes = {
  scenario: PropTypes.object.isRequired,
  optimisationProperties: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

OptimisationProperties.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: OPTIMISATION_PROPERTIES,
  propName: 'optimisationProperties',
})(withDialog('optimisationProperties')(withAdd(OptimisationProperties))));
