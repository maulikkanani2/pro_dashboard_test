import React from 'react';
import { format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import ScenarioName from '../name';
import Menu from '../../menu';
import ScenarioSelectMenuItem from '../menu/select';
import ScenarioEditMenuItem from '../menu/edit';
import ScenarioDeleteMenuItem from '../menu/delete';
import ScenarioCloneMenuItem from '../menu/clone';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
    border: '1px solid #E5EAF4',
  },
  rootDragging: {
    opacity: 0,
  },
  chartRoot: {
    height: 120,
    margin: theme.spacing.unit,
  },
  detailsRoot: {
    padding: theme.spacing.unit * 2,
  },
  menuRoot: {
    width: 20,
    color: '#E5EAF4',
  },
});

const ScenarioCard = ({ classes, isDragging, card }) => {
  const rootClassName = classnames(classes.root, { [classes.rootDragging]: isDragging });

  return (
    <VBox className={rootClassName}>
      <Box className={classes.detailsRoot}>
        <VBox flex="1">
          <ScenarioName variant="subheading" scenario={card} />
          <Typography variant="caption">{format(new Date(card.updatedAt), 'DD MMM YY HH:mm A')}</Typography>
        </VBox>
        <Box center className={classes.menuRoot}>
          <Menu>
            <ScenarioSelectMenuItem scenario={card} />
            <ScenarioCloneMenuItem scenario={card} />
            <ScenarioEditMenuItem scenario={card} />
            <ScenarioDeleteMenuItem scenario={card} />
          </Menu>
        </Box>
      </Box>
    </VBox>
  );
};

export default withStyles(styles)(ScenarioCard);
