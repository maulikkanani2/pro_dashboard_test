import React from 'react';
import PropTypes from 'prop-types';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import OptimisationHierarchyExternalId from './externalId';
import OptimisationHierarchyDescription from './description';
import Menu from '../menu';
import OptimisationHierarchyDeleteMenuItem from './menu/delete';
import OptimisationHierarchyEditMenuItem from './menu/edit';
import Card, { CardAvatar } from '../card';

const OptimisationHierarchyCard = ({ optimisationHierarchy, classes }) => (
  <Card>
    <Box flex="2" justifyContent="flex-start" alignItems="center">
      <CardAvatar>{optimisationHierarchy.externalId.substring(0, 1).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <OptimisationHierarchyExternalId optimisationHierarchy={optimisationHierarchy} variant="subheading" />
        <OptimisationHierarchyDescription optimisationHierarchy={optimisationHierarchy} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" alignItems="center">
      <div />
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      <Menu>
        <OptimisationHierarchyEditMenuItem optimisationHierarchy={optimisationHierarchy} />
        <OptimisationHierarchyDeleteMenuItem optimisationHierarchy={optimisationHierarchy} />
      </Menu>
    </Box>
  </Card>
);

OptimisationHierarchyCard.propTypes = {
  optimisationHierarchy: PropTypes.object.isRequired,
}

export default OptimisationHierarchyCard;
