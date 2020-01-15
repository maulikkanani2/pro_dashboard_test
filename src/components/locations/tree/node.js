import React from 'react';

import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import LocationExternalId from '../externalId';
import Menu from '../../menu';
import LocationDeleteMenuItem from '../menu/delete';
import Card, { CardAvatar, CardChip } from '../../card';

const LocationNode = ({
  data, isDragging, isParentDragging, classes,
}) => {
  // TODO: Implement adding extra classNames to card
  return (
    <Card>
      <Box flex="2" alignItems="center">
        <CardAvatar>{data.externalId.substring(0, 2).toUpperCase()}</CardAvatar>
        <VBox justifyContent="center">
          <LocationExternalId location={data} variant="subheading" />
        </VBox>
      </Box>
      <Box flex="2" justifyContent="flex-end" alignItems="center">
        <CardChip label={data.parent ? data.parent.externalId : 'No Parent Location'} />
        <Menu>
          <LocationDeleteMenuItem location={data} />
        </Menu>
      </Box>
    </Card>
  );
};

export default LocationNode;
