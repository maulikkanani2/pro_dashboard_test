import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LocationIcon from '@material-ui/icons/LocationOn';

import Box from '../../layout/Box';
import VBox from '../../layout/VBox';
import UserUsername from '../username';
import UserAttribute from '../attribute';
import Dialog, {
  DialogHeader,
  DialogAvatar,
  DialogBody,
  DialogColumn,
} from '../../dialog';
import Field, {FieldControl, FieldLabel, FieldIcon} from '../../field';

class UserDialog extends Component {
  constructor (props) {
    super (props);
    this.onCloseHandler = this.onCloseHandler.bind (this);
  }

  onCloseHandler () {
    this.props.handleClose ();
  }

  render () {
    const {open, user, refresh, userApi} = this.props;
    const loading = false;
    if (!user) {
      return null;
    }
    return (
      <Dialog isLoading={loading} open={open} onClose={this.onCloseHandler}>
        <DialogHeader>
          <Box flex="1" alignItems="center" height="100%">
            <DialogAvatar>
              {user.Username.substring (0, 2).toUpperCase ()}
            </DialogAvatar>
            <VBox flex="1" justifyContent="space-between">
              <UserUsername variant="title" user={user} />
            </VBox>
          </Box>
          <Box flex="1" justifyContent="flex-end">
            <IconButton onClick={this.onCloseHandler}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogHeader>
        <DialogBody>
          {user.Attributes.map (attribute => {
            if (attribute.Name === 'sub' || attribute.Name === 'email_verified')
              return null;
            return (
              <DialogColumn key={attribute.Name} width="47.5%">
                <FieldControl>
                  <FieldLabel label={attribute.Name} />
                  <Field>
                    <UserAttribute
                      attribute={attribute.Name}
                      value={attribute.Value}
                      user={user}
                      onReload={() => {
                        return refresh ();
                      }}
                      onUpdate={data => {
                        return userApi.updateUser (data);
                      }}
                    />
                  </Field>
                </FieldControl>
              </DialogColumn>
            );
          })}
        </DialogBody>
      </Dialog>
    );
  }
}

export default UserDialog;
