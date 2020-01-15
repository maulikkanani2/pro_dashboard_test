import React, { Component } from 'react';

const withFiltering = (mapToFilter, { skip }) => WrappedComponent => class WithFiltering extends Component {
  constructor(props) {
    super(props);

    this.state = { query: '', filter: skip(props) ? {} : mapToFilter(props, '') };

    this.getFilter = this.getFilter.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ filter: skip(nextProps) ? {} : mapToFilter(nextProps, this.state.query) });
  }

  getFilter() {
    return this.state.filter;
  }

  updateFilter(query) {
    return new Promise((resolve) => {
      this.setState({ query, filter: mapToFilter(this.props, query) }, () => {
        resolve();
      });
    });
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        queryText={this.state.query}
        updateFilter={this.updateFilter}
        getFilter={this.getFilter} />
    );
  }
}

export default withFiltering;
