import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationIcon from '@material-ui/icons/LocationOn';

import { PERSON } from '../../../graphql/queries/personnel';
import PersonExternalId from '../externalId';
import PersonName from '../name';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import PersonLocation from '../location';
import DowntimePeriod from '../downtime_periods';
import DowntimePeriodAdd from '../downtime_periods/add';
import PersonnelClass from '../personnel_classes';
import PersonnelClassAdd from '../personnel_classes/add';
import PersonnelPosition from '../personnel_positions';
import PersonnelPositionAdd from '../personnel_positions/add';
import AvailabilityItem from '../availability';
import AvailabilityItemAdd from '../availability/add';
import Menu from '../../menu';
import PersonDeleteMenuItem from '../menu/delete';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';

class PersonDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, person: { data: person, loading } } = this.props;

    if (!person) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{person.name.substring(0, 2).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <PersonExternalId variant="title" person={person} />
              <PersonName variant="body1" person={person} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <PersonDeleteMenuItem person={person} />
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
                <PersonLocation person={person} variant="body1" />
                <FieldIcon><LocationIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Classes" />
              <VBox>
                {person.personnelClasses.map((klass) => <PersonnelClass key={klass.id} personnelClass={klass} person={person} />)}
                <PersonnelClassAdd person={person} />
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Positions" />
              <VBox>
                {person.personnelPositions.map((position) => <PersonnelPosition key={position.id} personnelPosition={position} person={person} />)}
                <PersonnelPositionAdd person={person} />
              </VBox>
            </FieldControl>
          </DialogColumn>
          <DialogColumn width="47.5%">
            <FieldControl>
              <FieldLabel label="Shifts" />
              <VBox>
                {person.calendarisedAvailabilityTemplateSet.calendarisedAvailabilityTemplateSetItems.map((availability) => <AvailabilityItem key={availability.id} availability={availability} person={person} />)}
                <AvailabilityItemAdd person={person} />
              </VBox>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Leave" />
              <VBox>
                {person.downtimePeriods.map((downtimePeriod) => <DowntimePeriod key={downtimePeriod.id} downtimePeriod={downtimePeriod} person={person} />)}
                <DowntimePeriodAdd person={person} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.person.id,
});

const mapPropsToSkip = props => !props.person;

PersonDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
  person: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: PERSON,
  propName: 'person'
})(PersonDialog);
