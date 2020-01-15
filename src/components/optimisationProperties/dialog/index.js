import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { OPTIMISATION_PROPERTY } from '../../../graphql/queries/optimisationProperties';
import OptimisationPropertyName from '../name';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import OptimisationPropertyDeleteMenuItem from '../menu/delete';
import OptimisationPropertyValue from '../values';
import OptimisationPropertyValueAdd from '../values/add';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import { FieldControl, FieldLabel } from '../../field';
import withQuery from '../../../wrappers/query';

class OptimisationPropertyDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, optimisationProperty: { data: optimisationProperty, loading } } = this.props;

    if (!optimisationProperty) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{optimisationProperty.name.substring(0, 1).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <OptimisationPropertyName variant="title" optimisationProperty={optimisationProperty} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <OptimisationPropertyDeleteMenuItem optimisationProperty={optimisationProperty} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <FieldLabel label="Values" />
              <VBox>
                {optimisationProperty.optimisationPropertyValues.map((value) => <OptimisationPropertyValue key={value.id} value={value} optimisationProperty={optimisationProperty} />)}
                <OptimisationPropertyValueAdd optimisationProperty={optimisationProperty} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.optimisationProperty.id,
});

const mapPropsToSkip = props => !props.optimisationProperty;

OptimisationPropertyDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: OPTIMISATION_PROPERTY,
  propName: 'optimisationProperty'
})(OptimisationPropertyDialog);
