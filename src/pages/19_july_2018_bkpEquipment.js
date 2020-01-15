import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/LocalShipping';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { EQUIPMENTS } from '../graphql/queries/equipment';
import EquipmentCard from '../components/equipment/card';
import EquipmentDialog from '../components/equipment/dialog';
import Box from '../components/layout/Box';
import EquipmentForm from '../components/equipment/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import Search from '../components/fields/search';
import withAdd from '../wrappers/add';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Equipment = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.equipments.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.equipments.refetch();
    });
  }

  const equipments = props.equipments.data ? props.equipments.data : [];

  return (
    <Page>
      <PageTitle title="Equipment" />
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
      <PageBody isLoading={props.equipments.loading}>
        {props.isAdding && <EquipmentForm onCancel={props.toggleAdding(false)} />}
        {!equipments.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Equipment"
          description="This allows you to assign equipment to your operations" />
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
                  rowCount={equipments.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <EquipmentCard equipment={equipments[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <EquipmentDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        equipment={props.dialog}
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

Equipment.propTypes = {
  scenario: PropTypes.object.isRequired,
  equipments: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Equipment.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["externalId ASC"],
  query: EQUIPMENTS,
  propName: 'equipments',
})(withDialog('equipment')(withAdd(Equipment))));
