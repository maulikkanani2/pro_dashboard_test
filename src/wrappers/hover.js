import React, { Component } from 'react';

const withHover = WrappedComponent => class Hover extends Component {
  constructor(props) {
    super(props);

    this.state = { hovered: false };

    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(hovered) {
    return () => {
      this.setState({ hovered })
    }
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        isHovered={this.state.hovered}
        toggleHovered={this.toggleState} />
    );
  }
};

export default withHover;
