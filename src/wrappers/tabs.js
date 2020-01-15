import React, { Component } from 'react';

const withTabs = WrappedComponent => class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = { value: 0 };

    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(event, value) {
    this.setState({ value });
  }

  render() {
    return (
      <WrappedComponent currentTab={this.state.value} changeTab={this.changeTab} />
    )
  }
}

export default withTabs;
