import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import EmptyStateIcon from '@material-ui/icons/Widgets';
import { WindowScroller, AutoSizer, List } from 'react-virtualized';

import { MATERIALS } from '../graphql/queries/materials';
import MaterialCard from '../components/materials/card';
import MaterialDialog from '../components/materials/dialog';
import Box from '../components/layout/Box';
import MaterialForm from '../components/materials/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';

const Materials = (props) => {
  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.materialDefinitions.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.materialDefinitions.refetch();
    });
  }

  const materials = props.materialDefinitions.data ? props.materialDefinitions.data : [];

  return (
    <Page>
      <PageTitle title="Materials" />
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
      <PageBody isLoading={props.materialDefinitions.loading}>
        {props.isAdding && <MaterialForm materials={materials} onCancel={props.toggleAdding(false)} />}
        {!materials.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Material"
          description="This allows you to assign your materials to operations" />
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
                  rowCount={materials.length}
                  rowHeight={88}
                  rowRenderer={({ index, key, style }) => {
                    return <div style={{ padding: 3, ...style }} key={key}>
                      <MaterialCard material={materials[index]} />
                    </div>
                  }} />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </PageBody>
      <MaterialDialog
        handleClose={() => { props.updateDialog(null); }}
        open={!!props.dialog}
        material={props.dialog}
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
        materialProperties_some: {
          optimisationPropertyValue: {
            value_like: `%${props.filter}%`,
          },
        },
      }, {
        hierarchyScope: {
          externalId_like: `%${props.filter}%`,
        },
      }],
    }
  }

  return where;
};

Materials.propTypes = {
  scenario: PropTypes.object.isRequired,
  materialDefinitions: PropTypes.object.isRequired,
  dialog: PropTypes.object,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

Materials.defaultProps = {
  dialog: null,
};

export default withScenario(withQuery({
  mapToFilter,
  orderBy: ["externalId ASC"],
  query: MATERIALS,
  propName: 'materialDefinitions',
})(withDialog('materials')(withAdd(Materials))));
