import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tree from 'tintree';
import EmptyStateIcon from '@material-ui/icons/EditLocation';

import { LOCATIONS } from '../graphql/queries/locations';
import { UPDATE_LOCATION } from '../graphql/mutations/locations';
import LocationNode from '../components/locations/tree/node';
import TreeView from '../components/locations/tree/tree';
import ChildContainer from '../components/locations/tree/childContainer';
import Box from '../components/layout/Box';
import LocationForm from '../components/locations/tree/form';
import withScenario from '../wrappers/scenario';
import withQuery from '../wrappers/query';
import withMutation from '../wrappers/mutation';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import withAdd from '../wrappers/add';
import Search from '../components/fields/search';
import EmptyState from '../components/emptyState';

const generateTree = (locations, node, tree) => {
  const nodeId = node.id ? node.id : null;
  let children = [];

  if (nodeId) {
    children = locations.filter(location => location.parent && location.parent.id === nodeId)
      .map(location => ({ ...location }));
  } else {
    children = locations.filter(location => location.parent === null)
      .map(location => ({ ...location }));
  }

  // eslint-disable-next-line no-param-reassign
  node.children = children;

  // eslint-disable-next-line no-param-reassign
  if (nodeId === null) { tree = node; }

  children.forEach(child => generateTree(locations, child, tree));

  return tree;
};

const Locations = (props) => {
  const onMoveHandler = (itemId, fromNodeId, toNodeId) => {
    const where = { id: itemId };
    let data = {};

    if (toNodeId === undefined) {
      data = { ...data, parent: null };
    } else {
      data = { ...data, parent: { connect: { id: toNodeId } } };
    }

    props.update.execute({ where, data });
  }

  const updateFilter = (event) => {
    props.updateFilter(event.target.value).then(() => {
      props.hierarchyScopes.refetch();
    });
  }

  const clearFilter = () => {
    props.updateFilter('').then(() => {
      props.hierarchyScopes.refetch();
    });
  }

  const locations = props.hierarchyScopes.data ? props.hierarchyScopes.data : [];

  const tree = generateTree(locations, {});

  return (
    <Page>
      <PageTitle title="Locations" />
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
      <PageBody isLoading={props.hierarchyScopes.loading}>
        {props.isAdding && <LocationForm onCancel={props.toggleAdding(false)} />}
        {!locations.length && <EmptyState
          icon={EmptyStateIcon}
          title="Create your first Location"
          description="This allows you to assign your resources and operations to a location" />
        }
        <Tree
          treeComponent={TreeView}
          nodeComponent={LocationNode}
          childContainerComponent={ChildContainer}
          rootNode={tree}
          onMoveNode={onMoveHandler}
        />
      </PageBody>
    </Page>
  );
}

const mapToFilter = (props, query) => {
  let where = { scenario: { id: props.scenario.id } };

  if (query) {
    where = {
      ...where,
      or: [{
        externalId_like: `%${query}%`
      }]
    }
  }

  return where;
};

Locations.propTypes = {
  scenario: PropTypes.object.isRequired,
  hierarchyScopes: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  toggleAdding: PropTypes.func.isRequired,
};

export default withScenario(withQuery({
  mapToFilter,
  query: LOCATIONS,
  propName: 'hierarchyScopes',
})(withMutation(null, {
  mutation: UPDATE_LOCATION,
  propName: 'update',
})(withAdd(Locations))));
