import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DurationIcon from '@material-ui/icons/AccessTime';

import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import { DialogColumn } from '../../dialog';
import RequiredEquipment from './equipment';
import RequiredEquipmentAdd from './equipment/add';
import RequiredPersonnel from './personnel';
import RequiredPersonnelAdd from './personnel/add';
import RequiredMaterials from './materials';
import RequiredMaterialsAdd from './materials/add';
import RoutingDuration from './duration';
import RoutingThroughput from './throughput';
import RoutingThroughputAdd from './throughput/add';
import RoutingDelete from './delete';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    border: '1px solid #c4c4c4',
    '&:before': {
      height: 0,
    },
  },
});

const Routing = (props) => {
  const {
    operationsSegmentEquipmentSpecifications,
    operationsSegmentPersonnelSpecifications,
    operationsSegmentMaterialSpecifications,
    calendarisedThroughputSet
  } = props.routing.operationsSegments[0]

  return (
    <ExpansionPanel className={props.classes.root}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subheading">{props.routing.externalId}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box fit justifyContent="space-between">
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel variant="body2" label="Required Equipment" />
              <VBox>
                {operationsSegmentEquipmentSpecifications.map((requiredEquipment) =>
                  <RequiredEquipment
                    key={requiredEquipment.id}
                    requiredEquipment={requiredEquipment}
                    excludedEquipments={operationsSegmentEquipmentSpecifications}
                    routing={props.routing}
                    operation={props.operation}
                  />
                )}
                <RequiredEquipmentAdd routing={props.routing} operation={props.operation} excludedEquipments={operationsSegmentEquipmentSpecifications} />
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel variant="body2" label="Required Personnel" />
              <VBox>
                {operationsSegmentPersonnelSpecifications.map((requiredPersonnel) =>
                  <RequiredPersonnel key={requiredPersonnel.id} requiredPersonnel={requiredPersonnel} routing={props.routing} operation={props.operation} />
                )}
                <RequiredPersonnelAdd routing={props.routing} operation={props.operation} />
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel variant="body2" label="Required Materials" />
              <VBox>
                {operationsSegmentMaterialSpecifications.map((requiredMaterials) =>
                  <RequiredMaterials key={requiredMaterials.id} requiredMaterials={requiredMaterials} routing={props.routing} operation={props.operation} />
                )}
                <RequiredMaterialsAdd routing={props.routing} operation={props.operation} />
              </VBox>
            </FieldControl>
          </DialogColumn>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel variant="body2" label="Duration" />
              <Field>
                <RoutingDuration operation={props.operation} routing={props.routing} />
                <FieldIcon><DurationIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel variant="body2" label="Throughput" />
              <VBox>
                {calendarisedThroughputSet.calendarisedThroughputSetItems.map((throughput) =>
                  <RoutingThroughput key={throughput.id} throughput={throughput} routing={props.routing} operation={props.operation} />
                )}
                <RoutingThroughputAdd routing={props.routing} operation={props.operation} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </Box>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <RoutingDelete routing={props.routing} operation={props.operation} />
      </ExpansionPanelActions>
    </ExpansionPanel>
  )
}

Routing.propTypes = {
  operation: PropTypes.object.isRequired,
};

export default withStyles(styles)(Routing);

