import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { AVAILABILITY_TEMPLATE } from '../../../graphql/queries/availabilityTemplates';
import AvailabilityName from '../name';
import AvailabilityDescription from '../description';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import AvailabilityDeleteMenuItem from '../menu/delete';
import AvailabilityItem from '../pattern';
import AvailabilityItemAdd from '../pattern/add';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import { FieldControl, FieldLabel } from '../../field';
import withQuery from '../../../wrappers/query';

class AvailabilityDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, availabilityTemplate: { data: availability, loading } } = this.props;

    if (!availability) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{availability.name.substring(0, 1).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <AvailabilityName variant="title" availability={availability} />
              <AvailabilityDescription variant="body1" availability={availability} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <AvailabilityDeleteMenuItem availability={availability} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <FieldLabel label="Pattern" />
              <VBox>
                {availability.availabilityTemplateItems.map((availabilityItem) => <AvailabilityItem key={availability.id} availability={availability} availabilityItem={availabilityItem} />)}
                <AvailabilityItemAdd availability={availability} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.availability.id,
});

const mapPropsToSkip = props => !props.availability;

AvailabilityDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: AVAILABILITY_TEMPLATE,
  propName: 'availabilityTemplate'
})(AvailabilityDialog);
