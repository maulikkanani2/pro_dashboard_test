import React, { Component } from 'react';

const withEditing = WrappedComponent => class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: false };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(editing) {
    return () => {
      this.setState({ editing })
    }
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        isEditing={this.state.editing}
        toggleEditing={this.toggleState} />
    );
  }
};

export default withEditing;
