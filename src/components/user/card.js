import React from 'react';

import Box from '../layout/Box';
import VBox from '../layout/VBox';
import Menu from '../menu';
import UserEditMenuItem from './menu/edit';
import UserDeleteMenuItem from './menu/delete';
import UserDisableMenuItem from './menu/disable';
import UserActivateMenuItem from './menu/activate';
import UserResetMenuItem from "./menu/reset";
import Card, {CardChip, CardAvatar} from '../card';

const UsersCard = ({user, userApi, refresh}) => {
  return (
    <Card>
      <Box flex="2" alignItems="center">
        <CardAvatar>{user.Username.substring (0, 2).toUpperCase ()}</CardAvatar>
        <VBox justifyContent="center">
          <h3>{user.Username}</h3>
        </VBox>
      </Box>
      <Box flex="2" justifyContent="flex-end" alignItems="center">
        <Menu>
          <UserEditMenuItem
            user={user}
            update={userApi.updateUser}
            refresh={refresh}
          />
          <UserDeleteMenuItem
            user={user}
            delete={data => {
              return userApi.deleteUser (data);
            }}
            refresh={refresh}
          />
          {user.Enabled
            ? <UserDisableMenuItem
                user={user}
                disable={data => {
                  return userApi.disableUser (data);
                }}
                refresh={refresh}
              />
            : <UserActivateMenuItem
                user={user}
                activate={data => {
                  return userApi.activateUser (data);
                }}
                refresh={refresh}
              />}
             <UserResetMenuItem
                user={user}
                reset={data => {
                    return userApi.resetPassword(data);
                }}
                refresh={refresh}
            />
        </Menu>
      </Box>
    </Card>
  );
};

export default UsersCard;
