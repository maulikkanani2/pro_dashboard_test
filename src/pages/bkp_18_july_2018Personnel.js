import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Group';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { PERSONNEL } from '../graphql/queries/personnel';
import PersonCard from '../components/personnel/card';
import PersonDialog from '../components/personnel/dialog';
import Box from '../components/layout/Box';
import PersonForm from '../components/personnel/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Personnel = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.persons.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.persons.refetch();
    });
  }

  const personnel = props.persons.data ? props.persons.data : [];

  return (
    <Page>
      <PageTitle title="Personnel" />
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
      <PageBody isLoading={props.persons.loading}>
        {props.isAdding && <PersonForm onCancel={props.toggleAdding(false)} />}
        {!personnel.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Person"
          description="This allows you to assign personnel to your operations." />
        }
        <WindowScroller scrollElement={window.document.getElementById('dashboardBody')}>
          {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  autoHeight
                  width={width}
                  ref={registerChild}
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  overscanRowCount={2}
                  rowCount={personnel.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <PersonCard person={personnel[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <PersonDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        person={props.dialog}
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
        name_like: `%${query}%`,
      },{
        hierarchyScope: {
          externalId_like: `%${query}%`,
        },
      }],
    }
  }

  return where;
};

Personnel.propTypes = {
  scenario: PropTypes.object.isRequired,
  persons: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Personnel.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: PERSONNEL,
  propName: 'persons',
})(withDialog('personnel')(withAdd(Personnel))));
