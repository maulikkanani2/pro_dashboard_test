import React, { Component } from 'react';

import Page, { PageBody, PageTitle } from '../components/page';

import Box from '../components/layout/Box';
import VBox from '../components/layout/VBox';

class About extends Component {
  state = {
    loading: true,
    revision: {}
  };

  componentDidMount() {
    fetch('/revision.json')
        .then(response => response.json())
        .then(revision => this.setState({ revision, loading: false }));
  }

  render() {
    const revision = this.state.revision.stageStates && this.state.revision.stageStates[0].actionStates[0].currentRevision || null;

    return (
        <Page>
          <PageTitle title="About" />
          <PageBody isLoading={this.state.loading}>
            <VBox alignItems="center">
              <Box>
                Revision: {revision && revision.revisionId || 'unknown'}
              </Box>
              <Box>
                Created: {revision && new Date(revision.created * 1000).toISOString() || 'unknown'}
              </Box>
            </VBox>
          </PageBody>
        </Page>
    );
  }
}

export default About;
