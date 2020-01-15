
import React from 'react';
import Swal from 'sweetalert2';

import withMutation from './mutation';

const withDelete = (mapPropsToVariables, options) => WrappedComponent => {
  const component = ({ remove, ...props }) => {
    const func = () => {
      return new Promise((resolve) => {
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
            remove.execute().then((data) => {
              return resolve(data);
            });
          } else {
            resolve(null);
          }
        });
      })
    }


    return (
      <WrappedComponent {...props} remove={{ execute: func, loading: remove.loading }} />
    );
  }

  return withMutation(mapPropsToVariables, { ...options, propName: 'remove' })(component);
};

export default withDelete;
