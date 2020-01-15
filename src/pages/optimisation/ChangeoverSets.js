import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/DateRange';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import ChangeoverSetCard from '../../components/changeoverSets/card';
import ChangeoverSetsDialog from '../../components/changeoverSets/dialog';
import Box from '../../components/layout/Box';
import ChangeoverSetForm from '../../components/changeoverSets/form';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import { PageActions, PageBody } from '../../components/page';
import withAdd from '../../wrappers/add';
import Search from '../../components/fields/search';
import withDialog from '../../wrappers/dialog';
import EmptyState from '../../components/emptyState';
import { CHANGEOVER_SETS } from '../../graphql/queries/changeoverSets';

const ChangeoverSets = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.changeoverSets.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.changeoverSets.refetch();
    });
  }

  const changeoverSets = props.changeoverSets.data ? props.changeoverSets.data : [];

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
      <PageBody isLoading={props.changeoverSets.loading}>
        {props.isAdding && <ChangeoverSetForm onCancel={props.toggleAdding(false)} />}
        {!changeoverSets.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Changeover Set"
          description="This allows you to assign your create changeovers between producing properties" />
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
                  rowCount={changeoverSets.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <ChangeoverSetCard changeoverSet={changeoverSets[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <ChangeoverSetsDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        changeoverSet={props.dialog}
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
      }, {
        description_like: `%${query}%`,
      }],
    }
  }

  return where;
};

ChangeoverSets.propTypes = {
  scenario: PropTypes.object.isRequired,
  changeoverSets: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

ChangeoverSets.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["name ASC"],
  query: CHANGEOVER_SETS,
  propName: 'changeoverSets',
})(withDialog('changeoverSets')(withAdd(ChangeoverSets))));
