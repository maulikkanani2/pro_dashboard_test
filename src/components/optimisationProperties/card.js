import React from 'react';
import PropTypes from 'prop-types';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import OptimisationPropertyName from './name';
import Menu from '../menu';
import OptimisationPropertyDeleteMenuItem from './menu/delete';
import OptimisationPropertyEditMenuItem from './menu/edit';
import Card, { CardAvatar } from '../card';

const OptimisationPropertyCard = ({ optimisationProperty, classes }) => (
  <Card>
    <Box flex="2" justifyContent="flex-start" alignItems="center">
      <CardAvatar>{optimisationProperty.name.substring(0, 1).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <OptimisationPropertyName optimisationProperty={optimisationProperty} variant="subheading" />
      </VBox>
    </Box>
    <Box flex="2" alignItems="center">
      <div />
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      <Menu>
        <OptimisationPropertyEditMenuItem optimisationProperty={optimisationProperty} />
        <OptimisationPropertyDeleteMenuItem optimisationProperty={optimisationProperty} />
      </Menu>
    </Box>
  </Card>
);

OptimisationPropertyCard.propTypes = {
  optimisationProperty: PropTypes.object.isRequired,
}

export default OptimisationPropertyCard;
