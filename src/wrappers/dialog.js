import { connect } from 'react-redux';

import { updateDialog } from '../actions/dialogActions';

const withDialog = (entityName) => WrappedComponent => {
  const mapStateToProps = state => ({
    dialog: state.dialog[entityName]
  });

  const mapDispatchToProps = dispatch => ({
    updateDialog: (object) => { dispatch(updateDialog(entityName, object)) }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}

export default withDialog;
