import React from 'react';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import OperationExternalId from './externalId';
import OperationDescription from './description';
import Menu from '../menu';
import OperationDeleteMenuItem from './menu/delete';
import OperationEditMenuItem from './menu/edit';
import Card, { CardAvatar, CardChip } from '../card';
import { OPERATIONS_TYPES } from '../../constants';

const OperationCard = ({ operation, classes }) => {
  const operationsType = OPERATIONS_TYPES.find((type) => type.id === operation.operationsType);

  return (
    <Card>
      <Box flex="2" justifyContent="flex-start" alignItems="center">
        <CardAvatar>{operation.externalId.substring(0, 2).toUpperCase()}</CardAvatar>
        <VBox justifyContent="center">
          <OperationExternalId operation={operation} variant="subheading" />
          <OperationDescription operation={operation} variant="caption" />
        </VBox>
      </Box>
      <Box flex="2" justifyContent="flex-end" alignItems="center">
        <CardChip label={operationsType ? operationsType.name : 'No Operations Type Set'} />
        <CardChip label={operation.hierarchyScope ? operation.hierarchyScope.externalId : 'No Location Set'} />
        {!Boolean(operation.operationsDefinitions.length) && <CardChip label="No Route" style={{ borderColor: '#f44336', color: '#f44336' }} />}
        <Menu>
          <OperationEditMenuItem operation={operation} />
          <OperationDeleteMenuItem operation={operation} />
        </Menu>
      </Box>
    </Card>
  );
}

export default OperationCard;
