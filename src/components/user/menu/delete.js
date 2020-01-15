import React from 'react';

import DeleteMenuItem from '../../menu/delete';
import withDialog from '../../../wrappers/dialog';
import Swal from 'sweetalert2';
const UserDeleteMenuItem = ({ closeMenu, user, updateDialog, ...rest }) => {
  const handler = () => {
    Swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      showCancelButton: true,
      confirmButtonColor: '#0079FF',
      cancelButtonColor: '#c4c4c4',
      confirmButtonText: 'YES',
      cancelButtonText: 'CANCEL',
    }).then((result) => {
      if (result.value) {
        rest.delete({username: user.Username}).then( rest.refresh() );
      } else {
      }
    });
    closeMenu();
  };

  return (
    <DeleteMenuItem
    handler={handler}
    closeMenu={closeMenu} />
  );
};

export default withDialog('user')(UserDeleteMenuItem);
