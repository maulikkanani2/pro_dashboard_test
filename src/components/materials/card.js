import React from 'react';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import MaterialExternalId from './externalId';
import MaterialDescription from './description';
import Menu from '../menu';
import MaterialDeleteMenuItem from './menu/delete';
import MaterialEditMenuItem from './menu/edit';
import Card, { CardAvatar, CardChip } from '../card';

const generatePropertyChips = (material) => {
  return material.materialProperties.map(property =>
    <CardChip key={property.id} label={property.value} />)
}

const MaterialCard = ({ material, classes }) => (
  <Card>
    <Box flex="2" alignItems="center">
      <CardAvatar>{material.externalId.substring(0, 2).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <MaterialExternalId material={material} variant="subheading" />
        <MaterialDescription material={material} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      {generatePropertyChips(material)}
      <CardChip label={material.hierarchyScope ? material.hierarchyScope.externalId : 'No Location'} />
      {Boolean(material.materialLots.length) && <CardChip label="Low Inventory" style={{ borderColor: '#f44336', color: '#f44336' }} />}
      <Menu>
        <MaterialEditMenuItem material={material} />
        <MaterialDeleteMenuItem material={material} />
      </Menu>
    </Box>
  </Card>
);

export default MaterialCard;
