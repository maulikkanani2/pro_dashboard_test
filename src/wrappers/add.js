import React, { Component } from 'react';

const withAdd = WrappedComponent => class Add extends Component {
  constructor(props) {
    super(props);

    this.state = { active: false };

    this.setActive = this.setActive.bind(this);
  }

  setActive(active) {
    return () => {
      this.setState({ active });
    }
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        isAdding={this.state.active}
        toggleAdding={this.setActive} />
    )
  }
}

export default withAdd;
