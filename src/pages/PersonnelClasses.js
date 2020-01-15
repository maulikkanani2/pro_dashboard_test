import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Group';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { PERSONNEL_CLASSES } from '../graphql/queries/personnelClasses';
import PersonnelClassCard from '../components/personnelClasses/card';
import PersonDialog from '../components/personnel/dialog';
import Box from '../components/layout/Box';
import PersonForm from '../components/personnelClasses/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const PersonnelClasses = props => {
  const updateFilter = event => {
    props.updateFilter(event.target.value).then(() => {
      props.personnelClasses.refetch();
    });
  };

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.personnelClasses.refetch();
    });
  };

  const personnelClasses = props.personnelClasses.data
    ? props.personnelClasses.data
    : [];

  return (
    <Page>
      <PageTitle title="Personnel Classes" />
      <PageActions>
        <Box alignItems="center">
          <Search
            onChange={updateFilter}
            onClear={clearFilter}
            value={props.queryText}
          />
        </Box>
        <Box flex="1" justifyContent="flex-end" alignItems="center">
          <Button
            variant="fab"
            color="primary"
            onClick={props.toggleAdding(true)}>
            <AddIcon />
          </Button>
        </Box>
      </PageActions>
      <PageBody isLoading={props.personnelClasses.loading}>
        {props.isAdding && <PersonForm onCancel={props.toggleAdding(false)} />}
        {!personnelClasses.length && (
          <EmptyState
            icon={EmptyStateIcon}
            title="Create your first personnel class"
            description="This allows you to assign personnel class to your scenario."
          />
        )}
        <WindowScroller
          scrollElement={window.document.getElementById('dashboardBody')}>
          {({
            height,
            isScrolling,
            registerChild,
            onChildScroll,
            scrollTop,
          }) => (
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
                  rowCount={personnelClasses.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return (
                      <div style={{ padding: 3, ...style }} key={key}>
                        <PersonnelClassCard
                          personnelClass={personnelClasses[index]}
                        />
                      </div>
                    );
                  }}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <PersonDialog
        handleClose={() => {
          props.updateDialog(null);
        }}
        open={!!props.dialog}
        person={props.dialog}
      />
    </Page>
  );
};

const mapToFilter = (props, query) => {
  return { scenario: { id: props.scenario.id } };
};

PersonnelClasses.propTypes = {
  scenario: PropTypes.object.isRequired,
  personnelClasses: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

PersonnelClasses.defaultProps = {
  dialog: null,
};

export default withScenario(
  withQuery({
    mapToFilter,
    query: PERSONNEL_CLASSES,
    propName: 'personnelClasses',
  })(withDialog('personnel')(withAdd(PersonnelClasses)))
);