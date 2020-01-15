import React from 'react';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import EquipmentExternalId from './externalId';
import EquipmentDescription from './description';
import Menu from '../menu';
import EquipmentDeleteMenuItem from './menu/delete';
import EquipmentEditMenuItem from './menu/edit';
import Card, { CardChip, CardAvatar } from '../card';

const generateClassChips = (equipment, equipmentClasses) => {
  return equipmentClasses.reduce((acc, klass, currentIndex) => {
    if (klass.externalId === equipment.externalId) { return acc; }
    if(currentIndex > 2) return acc;
    return [...acc, <CardChip key={klass.id} label={klass.externalId} />];
  }, [])
}

const EquipmentCard = ({ equipment, classes }) => {
  const equipmentClasses = equipment.equipmentClasses.filter(klass => {return klass.externalId !== equipment.externalId})
  return (
  <Card>
    <Box flex="2 1 50%" alignItems="center">
      <CardAvatar>{equipment.externalId.substring(0, 2).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <EquipmentExternalId equipment={equipment} variant="subheading" />
        <EquipmentDescription equipment={equipment} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
    {equipmentClasses.length > 3 &&
      <Tooltip
        id="tooltip-icon"
        title={equipmentClasses.map ((klass, index) => {
          if(index < 3 ) return ''
          return <CardChip key={`tool-${index}`} label={klass.externalId} style={{color: 'white'}} />;
        })}
      >
        <IconButton aria-label="Delete">
          <MoreIcon />
        </IconButton>
      </Tooltip>
      }
      {generateClassChips(equipment, equipmentClasses)}
      <CardChip label={equipment.hierarchyScope ? equipment.hierarchyScope.externalId : 'No Location Set'} />
      <Menu>
        <EquipmentEditMenuItem equipment={equipment} />
        <EquipmentDeleteMenuItem equipment={equipment} />
      </Menu>
    </Box>
  </Card>
)};

export default EquipmentCard;
