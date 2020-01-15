import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Group';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { EQUIPMENT_CLASSES } from '../../graphql/queries/equipmentClasses';
import EquipmentClassCard from '../../components/equipmentClasses/card';
import EquipmentDialog from '../../components/equipment/dialog';
import Box from '../../components/layout/Box';
import EquipmentForm from '../../components/equipmentClasses/form';
import withScenario from '../../wrappers/scenario';
import withQuery from '../../wrappers/query';
import { PageActions, PageBody } from '../../components/page';
import withAdd from '../../wrappers/add';
import Search from '../../components/fields/search';
import withDialog from '../../wrappers/dialog';
import EmptyState from '../../components/emptyState';

const EquipmentClasses = props => {
  const updateFilter = event => {
    props.updateFilter(event.target.value).then(() => {
      props.equipmentClasses.refetch();
    });
  };

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.equipmentClasses.refetch();
    });
  };

  const equipmentClasses = props.equipmentClasses.data
    ? props.equipmentClasses.data
    : [];

  return (
    <React.Fragment>
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
            onClick={props.toggleAdding(true)}
          >
            <AddIcon />
          </Button>
        </Box>
      </PageActions>
      <PageBody isLoading={props.equipmentClasses.loading}>
        {props.isAdding &&
          <EquipmentForm onCancel={props.toggleAdding(false)} />}
        {!equipmentClasses.length &&
          <EmptyState
            icon={EmptyStateIcon}
            title="Create your first equipment class"
            description="This allows you to assign equipment class to your scenario."
          />}
        <WindowScroller
          scrollElement={window.document.getElementById('dashboardBody')}
        >
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
                  rowCount={equipmentClasses.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return (
                      <div style={{ padding: 3, ...style }} key={key}>
                        <EquipmentClassCard
                          equipmentClass={equipmentClasses[index]}
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
      <EquipmentDialog
        handleClose={() => {
          props.updateDialog(null);
        }}
        open={!!props.dialog}
        equipment={props.dialog}
      />
    </React.Fragment>
  );
};

const mapToFilter = (props, query) => {
  let where = { scenario: { id: props.scenario.id } };

  if (query) {
    where = {
      ...where,
      or: [
        {
          externalId_like: `%${query}%`,
        },
      ],
    };
  }
  return where;
};

EquipmentClasses.propTypes = {
  scenario: PropTypes.object.isRequired,
  personnelClasses: PropTypes.object.isRequired,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

export default withScenario(
  withQuery({
    mapToFilter,
    query: EQUIPMENT_CLASSES,
    propName: 'equipmentClasses',
  })(withDialog('equipment')(withAdd(EquipmentClasses)))
);
