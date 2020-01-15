import React from 'react';
import PropTypes from 'prop-types';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import AvailabilityName from './name';
import AvailabilityDescription from './description';
import Menu from '../menu';
import AvailabilityDeleteMenuItem from './menu/delete';
import AvailabilityEditMenuItem from './menu/edit';
import Card, { CardAvatar } from '../card';

const AvailabilityCard = ({ availability, classes }) => (
  <Card>
    <Box flex="2" justifyContent="flex-start" alignItems="center">
      <CardAvatar>{availability.name.substring(0, 1).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <AvailabilityName availability={availability} variant="subheading" />
        <AvailabilityDescription availability={availability} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" alignItems="center">
      <div />
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      <Menu>
        <AvailabilityEditMenuItem availability={availability} />
        <AvailabilityDeleteMenuItem availability={availability} />
      </Menu>
    </Box>
  </Card>
);

AvailabilityCard.propTypes = {
  availability: PropTypes.object.isRequired,
}

export default AvailabilityCard;
