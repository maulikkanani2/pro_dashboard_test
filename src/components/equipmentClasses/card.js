import React from 'react';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import ExternalId from './externalId';
import Menu from '../menu';
import DeleteMenuItem from './menu/delete';
import Card, { CardAvatar } from '../card';

const EquipmentClassCard = ({ equipmentClass }) => (
  <Card>
    <Box flex="2" alignItems="center">
      <CardAvatar>
        {equipmentClass.externalId.substring(0, 2).toUpperCase()}
      </CardAvatar>
      <ExternalId equipmentClass={equipmentClass} variant="subheading" />
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      <Menu>
        <DeleteMenuItem equipmentClass={equipmentClass} />
      </Menu>
    </Box>
  </Card>
);

export default EquipmentClassCard;
