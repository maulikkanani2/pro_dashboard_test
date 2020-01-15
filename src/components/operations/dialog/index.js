import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationIcon from '@material-ui/icons/LocationOn';

import { OPERATION } from '../../../graphql/queries/operations';
import OperationExternalId from '../externalId';
import OperationDescription from '../description';
import OperationLocation from '../location';
import OperationType from '../type';
import OperationRouting from '../routing';
import OperationRoutingAdd from '../routing/add';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import OperationDeleteMenuItem from '../menu/delete';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldControl, FieldLabel, FieldIcon } from '../../field';
import withQuery from '../../../wrappers/query';

class OperationDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, operationsDefinitionClass: { data: operation, loading } } = this.props;

    if (!operation) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{operation.externalId.substring(0, 2).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <OperationExternalId variant="title" operation={operation} />
              <OperationDescription operation={operation} variant="caption" />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <OperationDeleteMenuItem operation={operation} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <VBox fit>
            <Box justifyContent="space-between">
              <DialogColumn width="47.5%">
                <FieldControl>
                  <FieldLabel label="Location" />
                  <Field>
                    <OperationLocation operation={operation} variant="body1" />
                    <FieldIcon><LocationIcon /></FieldIcon>
                  </Field>
                </FieldControl>
              </DialogColumn>
              <DialogColumn width="47.5%">
                <FieldControl>
                  <FieldLabel label="Type" />
                  <Field>
                    <OperationType operation={operation} variant="body1" />
                    <FieldIcon><LocationIcon /></FieldIcon>
                  </Field>
                </FieldControl>
              </DialogColumn>
            </Box>
            <DialogColumn width="100%">
              <FieldControl>
                <FieldLabel label="Routings" />
                {operation.operationsDefinitions.map((routing) => {
                  return <OperationRouting routing={routing} operation={operation} />
                })}
              </FieldControl>
              <OperationRoutingAdd operation={operation} />
            </DialogColumn>
          </VBox>
        </DialogBody>
      </Dialog>
    );
  }
}
const mapToFilter = props => ({
  id: props.operation.id
});

const mapPropsToSkip = props => !props.operation;

OperationDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: OPERATION,
  propName: 'operationsDefinitionClass'
})(OperationDialog);
