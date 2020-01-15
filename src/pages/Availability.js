import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/DateRange';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { AVAILABILITY_TEMPLATES } from '../graphql/queries/availabilityTemplates';
import AvailabilityCard from '../components/availability/card';
import AvailabilityDialog from '../components/availability/dialog';
import Box from '../components/layout/Box';
import AvailabilityForm from '../components/availability/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Availability = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.availabilityTemplates.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.availabilityTemplates.refetch();
    });
  }

  const availabilities = props.availabilityTemplates.data ? props.availabilityTemplates.data : [];

  return (
    <Page>
      <PageTitle title="Availability" />
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
      <PageBody isLoading={props.availabilityTemplates.loading}>
        {props.isAdding && <AvailabilityForm onCancel={props.toggleAdding(false)} />}
        {!availabilities.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Availability"
          description="This allows you to assign availability patterns to your resources" />
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
                  rowCount={availabilities.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <AvailabilityCard availability={availabilities[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <AvailabilityDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        availability={props.dialog}
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
        name_like: `%${query}%`,
      }, {
        description_like: `%${query}%`,
      }],
    }
  }

  return where;
};

Availability.propTypes = {
  scenario: PropTypes.object.isRequired,
  availabilityTemplates: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Availability.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: AVAILABILITY_TEMPLATES,
  propName: 'availabilityTemplates',
})(withDialog('availability')(withAdd(Availability))));
