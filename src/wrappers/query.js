import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import withFiltering from './filter';

const defaultSkip = () => { return false; };
const defaultFilter = () => ({});
const defaultPagination = { enabled: false };

const withQuery = ({
  skip = defaultSkip,
  query,
  orderBy,
  mapToFilter = defaultFilter,
  pagination = defaultPagination,
  propName = 'data'
}) => WrappedComponent => {
  const wrapper = graphql(query, {
    options(props) {
      if (pagination.enabled) {
        let after = props.endCursor || "";
        return { variables: { where: props.getFilter(), orderBy, first: pagination.limit, after } };
      }
      return { variables: { where: props.getFilter(), orderBy } };
    },
    skip(props) { return skip(props); },
    props({ ownProps, data }) {
      if (pagination.enabled) {
        const { loading, [propName]: query, fetchMore } = data;

        const loadMoreRows = () => {
          return fetchMore({
            variables: {
              after: query.pageInfo.endCursor,
            },
            updateQuery(previousResult, { fetchMoreResult }) {
              const totalCount = fetchMoreResult.data[propName].totalCount;
              const newEdges = fetchMoreResult.data[propName].edges;
              const pageInfo = fetchMoreResult.data[propName].pageInfo;

              return {
                data: {
                  totalCount,
                  edges: [...previousResult[propName].edges, ...newEdges],
                  pageInfo,
                }
              };
            }
          });
        }

        return {
          data: {
            loading,
            [propName]: query,
            loadMoreRows,
          }
        }
      }
      return { data };
    }
  });

  class Query extends Component {
    constructor(props) {
      super(props);

      const defaultState = { loading: false, data: null };

      if (skip(props)) {
        this.state = { timeout: null, [propName]: { ...defaultState } };
      } else if (props.data.loading || !props.data[propName]) {
        this.state = { timeout: null, [propName]: { ...defaultState, loading: true } };
      } else {
        this.state = { timeout: null, [propName]: { ...defaultState, data: props.data[propName] } };
      }

      this.refetch = this.refetch.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const data = { ...this.state[propName] };

      if (skip(nextProps)) {
        this.setState({ [propName]: { ...data, loading: false, data: null } });
      } else if (nextProps.data.loading || !nextProps.data[propName]) {
        this.setState({ [propName]: { ...data, loading: true } });
      } else {
        this.setState({ [propName]: { ...data, loading: false, data: nextProps.data[propName] } });
      }
    }

    refetch() {
      const previousText = this.props.queryText;

      const recheck = () => {
        if (previousText !== this.props.queryText) { this.refetch(); }
        this.setState({ timeout: null });
      }

      if (!this.state[propName].loading && !this.state.timeout) {
        let options = { where: this.props.getFilter(), orderBy };
        if (pagination.enabled) {
          options = { ...options, first: pagination.limit };
        }

        this.props.data.refetch(options).then(() => {
          this.setState({ timeout: setTimeout(recheck, 200) });
        });
      }
    }

    render() {
      let props = { ...this.state[propName], refetch: this.refetch };

      if (pagination.enabled) {
        props = { ...props, loadMoreRows: this.props.data.loadMoreRows };
      }

      return (
        <WrappedComponent {...this.props} {...{ [propName]: props }} />
      )
    }
  }

  return withFiltering(mapToFilter, { skip })(wrapper(Query));
};

export default withQuery;
