import React, { Component } from 'react';

const withSearch = mapPropsToFilter => WrappedComponent => class GridSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHovered: false,
      filter: '',
    };

    this.setSearchHover = this.setSearchHover.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);
  }

  setSearchHover(hovered) {
    return () => {
      this.setState({ searchHovered: hovered });
    }
  }

  onSearchChange(event) {
    this.setState({ filter: event.target.value }, () => {
      this.props.data.refetch({ where: mapPropsToFilter({ ...this.props, filter: this.state.filter }) })
    });
  }

  onSearchClear() {
    this.setState({ filter: '', searchHovered: false });
  }

  render() {
    return <WrappedComponent
      onSearchChange={this.onSearchChange}
      onSearchClear={this.onSearchClear}
      setSearchHover={this.setSearchHover}
      searchHovered={this.state.searchHovered}
      filter={this.state.filter}
      {...this.props} />
  }
}

export default withSearch;
