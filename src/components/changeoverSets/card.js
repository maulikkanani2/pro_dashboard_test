import React from 'react';
import PropTypes from 'prop-types';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import ChangeoverSetName from './name';
import ChangeoverSetDescription from './description';
import Menu from '../menu';
import ChangeoverSetDeleteMenuItem from './menu/delete';
import ChangeoverSetEditMenuItem from './menu/edit';
import Card, { CardAvatar } from '../card';

const ChangeoverSetCard = ({ changeoverSet, classes }) => (
  <Card>
    <Box flex="2" justifyContent="flex-start" alignItems="center">
      <CardAvatar>{changeoverSet.name.substring(0, 1).toUpperCase()}</CardAvatar>
      <VBox justifyContent="center">
        <ChangeoverSetName changeoverSet={changeoverSet} variant="subheading" />
        <ChangeoverSetDescription changeoverSet={changeoverSet} variant="caption" />
      </VBox>
    </Box>
    <Box flex="2" alignItems="center">
      <div />
    </Box>
    <Box flex="2" justifyContent="flex-end" alignItems="center">
      <Menu>
        <ChangeoverSetEditMenuItem changeoverSet={changeoverSet} />
        <ChangeoverSetDeleteMenuItem changeoverSet={changeoverSet} />
      </Menu>
    </Box>
  </Card>
);

ChangeoverSetCard.propTypes = {
  changeoverSet: PropTypes.object.isRequired,
}

export default ChangeoverSetCard;
