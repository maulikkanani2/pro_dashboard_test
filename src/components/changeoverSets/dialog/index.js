import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AlarmIcon from '@material-ui/icons/Alarm';

import { CHANGEOVER_SET } from '../../../graphql/queries/changeoverSets';
import ChangeoverSetName from '../name';
import ChangeoverSetDescription from '../description';
import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import Menu from '../../menu';
import ChangeoverSetDeleteMenuItem from '../menu/delete';
import ChangeoverSetItem from '../items';
import ChangeoverSetItemAdd from '../items/add';
import ChangeoverSetDefaultTime from '../defaultTime';
import Dialog, { DialogHeader, DialogAvatar, DialogBody, DialogColumn } from '../../dialog';
import Field, { FieldIcon, FieldControl, FieldLabel } from '../../field';
import withQuery from '../../../wrappers/query';

class ChangeoverSetDialog extends Component {
  constructor(props) {
    super(props);

    this.onCloseHandler = this.onCloseHandler.bind(this);
  }

  onCloseHandler() {
    this.props.handleClose();
  }

  render() {
    const { open, changeoverSet: { data: changeoverSet, loading } } = this.props;

    if (!changeoverSet) { return null; }

    return (
      <Dialog
        isLoading={loading}
        open={open}
        onClose={this.onCloseHandler}
      >
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>{changeoverSet.name.substring(0, 1).toUpperCase()}</DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <ChangeoverSetName variant="title" changeoverSet={changeoverSet} />
              <ChangeoverSetDescription variant="body1" changeoverSet={changeoverSet} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <Menu>
              <ChangeoverSetDeleteMenuItem changeoverSet={changeoverSet} />
            </Menu>
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          <DialogColumn width="100%">
            <FieldControl>
              <FieldLabel label="Default Time" />
              <Field>
                <ChangeoverSetDefaultTime changeoverSet={changeoverSet} variant="body1" />
                <FieldIcon><AlarmIcon /></FieldIcon>
              </Field>
            </FieldControl>
            <FieldControl>
              <FieldLabel label="Items" />
              <VBox>
                {changeoverSet.changeoverSetItems.map((changeoverSetItem) => <ChangeoverSetItem key={changeoverSet.id} changeoverSet={changeoverSet} changeoverSetItem={changeoverSetItem} />)}
                <ChangeoverSetItemAdd changeoverSet={changeoverSet} />
              </VBox>
            </FieldControl>
          </DialogColumn>
        </DialogBody>
      </Dialog>
    );
  }
}

const mapToFilter = props => ({
  id: props.changeoverSet.id,
});

const mapPropsToSkip = props => !props.changeoverSet;

ChangeoverSetDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.object,
};

export default withQuery({
  mapToFilter,
  skip: mapPropsToSkip,
  query: CHANGEOVER_SET,
  propName: 'changeoverSet'
})(ChangeoverSetDialog);
