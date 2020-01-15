import React from 'react';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import PersonExternalId from './externalId';
import PersonName from './name';
import Menu from '../menu';
import PersonDeleteMenuItem from './menu/delete';
import PersonEditMenuItem from './menu/edit';
import Card, {CardAvatar, CardChip} from '../card';
import { auto } from 'async';

const generateClassChips = (person, personnnelClasses) => {
  return personnnelClasses.reduce ((acc, klass, currentIndex) => {
    if (klass.externalId === person.externalId) {
      return acc;
    }
    if(currentIndex > 2) return acc;
    return [...acc, <CardChip key={klass.id} label={klass.externalId} />];
  }, []);
};

const generatePositionChips = person => {
  return person.personnelPositions.reduce (
    (acc, position) => [
      ...acc,
      <CardChip key={position.id} label={position.externalId} />,
    ],
    []
  );
};

const PersonCard = ({person, classes}) => {
  const personnnelClasses = person.personnelClasses.filter(klass => {return klass.externalId !== person.externalId})
  return (
  <Card>
    <Box flex="2" alignItems="center">
      <CardAvatar>{person.name.substring (0, 2).toUpperCase ()}</CardAvatar>
      <VBox justifyContent="center">
        <PersonExternalId person={person} variant="subheading" />
        <PersonName person={person} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
    {personnnelClasses.length > 3 &&
      <Tooltip
        id="tooltip-icon"
        title={personnnelClasses.map ((klass, index) => {
          if(index < 3 ) return ''
          return <CardChip key={`tool-${index}`} label={klass.externalId} style={{color: 'white'}} />;
        })}
      >
        <IconButton aria-label="Delete">
          <MoreIcon />
        </IconButton>
      </Tooltip>
      }
      {generateClassChips (person, personnnelClasses)}
      {generatePositionChips (person)}
      <CardChip
        label={
          person.hierarchyScope
            ? person.hierarchyScope.externalId
            : 'No Location Set'
        }
      />
      <Menu>
        <PersonEditMenuItem person={person} />
        <PersonDeleteMenuItem person={person} />
      </Menu>
    </Box>
  </Card>
)};

export default PersonCard;
