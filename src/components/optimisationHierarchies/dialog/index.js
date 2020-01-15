import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { OPTIMISATION_HIERARCHY } from '../../../graphql/queries/optimisationHierarchies';
import OptimisationHierarchyExternalId from '../externalId';
import OptimisationHierarchyDescription from '../description';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import OptimisationHierarchyDeleteMenuItem from '../menu/delete';
import OptimisationHierarchyPriority from '../priorities';
import OptimisationHierarchyPriorityAdd from '../priorities/add';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import { FieldControl, FieldLabel } from '../../field';
import withQuery from '../../../wrappers/query';

class OptimisationHierarchyDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, optimisationHierarchy: { data: optimisationHierarchy, loading } } = this.props;

    if (!optimisationHierarchy) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{optimisationHierarchy.externalId.substring(0, 1).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <OptimisationHierarchyExternalId variant="title" optimisationHierarchy={optimisationHierarchy} />
              <OptimisationHierarchyDescription variant="body1" optimisationHierarchy={optimisationHierarchy} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <OptimisationHierarchyDeleteMenuItem optimisationHierarchy={optimisationHierarchy} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <FieldLabel label="Priorities" />
              <VBox>
                {optimisationHierarchy.optimisationHierarchyAttributes.map((priority) => <OptimisationHierarchyPriority key={priority.id} priority={priority} optimisationHierarchy={optimisationHierarchy} />)}
                <OptimisationHierarchyPriorityAdd optimisationHierarchy={optimisationHierarchy} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.optimisationHierarchy.id,
});

const mapPropsToSkip = props => !props.optimisationHierarchy;

OptimisationHierarchyDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: OPTIMISATION_HIERARCHY,
  propName: 'optimisationHierarchy'
})(OptimisationHierarchyDialog);
