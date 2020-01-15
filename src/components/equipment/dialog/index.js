import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SwapIcon from '@material-ui/icons/SwapHoriz';
import LocationIcon from '@material-ui/icons/LocationOn';
import HierarchyIcon from '@material-ui/icons/FormatListNumbered';

import { EQUIPMENT } from '../../../graphql/queries/equipment';
import EquipmentExternalId from '../externalId';
import EquipmentDescription from '../description';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import EquipmentLocation from '../location';
import EquipmentChangeoverSet from '../changeoverSet';
import EquipmentOptimisationHierarchy from '../optimisationHierarchy';
import DowntimePeriod from '../downtime_periods';
import DowntimePeriodAdd from '../downtime_periods/add';
import EquipmentClass from '../equipment_classes';
import EquipmentClassAdd from '../equipment_classes/add';
import AvailabilityItem from '../availability';
import AvailabilityItemAdd from '../availability/add';
import Menu from '../../menu';
import EquipmentDeleteMenuItem from '../menu/delete';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';

class EquipmentDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, equipment: { data: equipment, loading } } = this.props;

    if (!equipment) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{equipment.externalId.substring(0, 2).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <EquipmentExternalId variant="title" equipment={equipment} />
              <EquipmentDescription variant="body1" equipment={equipment} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <EquipmentDeleteMenuItem equipment={equipment} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel label="Location" />
              <Field>
                <EquipmentLocation equipment={equipment} variant="body1" />
                <FieldIcon><LocationIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Changeover Set" />
              <Field>
                <EquipmentChangeoverSet equipment={equipment} variant="body1" />
                <FieldIcon><SwapIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Optimisation Hierarchy" />
              <Field>
                <EquipmentOptimisationHierarchy equipment={equipment} variant="body1" />
                <FieldIcon><HierarchyIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Classes" />
              <VBox>
                {equipment.equipmentClasses.map((klass) => <EquipmentClass key={klass.id} equipmentClass={klass} equipment={equipment} />)}
                <EquipmentClassAdd equipment={equipment} />
              </VBox>
            </FieldControl>
          </DialogColumn>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel label="Availability" />
              <VBox>
                {equipment.calendarisedAvailabilityTemplateSet.calendarisedAvailabilityTemplateSetItems.map((availability) => <AvailabilityItem key={availability.id} availability={availability} equipment={equipment} />)}
                <AvailabilityItemAdd equipment={equipment} />
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Downtime Periods" />
              <VBox>
                {equipment.downtimePeriods.map((downtimePeriod) => <DowntimePeriod key={downtimePeriod.id} downtimePeriod={downtimePeriod} equipment={equipment} />)}
                <DowntimePeriodAdd equipment={equipment} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.equipment.id,
});

const mapPropsToSkip = props => !props.equipment;

EquipmentDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
  equipment: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: EQUIPMENT,
  propName: 'equipment',
})(EquipmentDialog);
