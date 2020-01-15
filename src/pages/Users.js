import React, {Component} from 'react';
import EmptyStateIcon from '@material-ui/icons/People';
import {WindowScroller, AutoSizer, List} from 'react-virtualized';

import Page, {PageBody, PageTitle, PageActions} from '../components/page';
import UserCard from '../components/user/card';
import UserDialog from '../components/user/dialog';
import Search from '../components/fields/search';
import Box from '../components/layout/Box';
import withDialog from '../wrappers/dialog';
import EmptyState from '../components/emptyState';
import UserApi from '../utils/users';

class Users extends Component {
  state = {
    loading: true,
    data: [],
    nextToken: '',
    previousToken: '',
    UserApi: new UserApi (),
  };

  getUsers = () => {
    this.state.UserApi
      .listUsers ()
      .then (data =>
        this.setState ({
          data: data.users.Users,
          nextToken: data.users.NextToken,
          loading: false,
        })
      )
      .catch (error => this.setState ({data: [], loading: false}));
  };

  componentDidMount () {
    this.getUsers ();
  }

  onNext = () => {
    this.setState ({isLoading: true});
    let data = {
      nextToken: this.state.nextToken,
    };
    this.state.UserApi.listUsers (data).then (data => {
      this.setState ({
        data: data.users.Users,
        nextToken: data.users.NextToken,
        loading: false,
        previousToken: data.nextToken,
      });
    });
  };

  onPrevious = () => {
    let data = {
      nextToken: this.state.previousToken,
    };
    this.state.UserApi
      .listUsers (data)
      .then (data =>
        this.setState ({
          data: data.users.Users,
          nextToken: data.users.NextToken,
          loading: false,
        })
      );
  };

  render () {
    return (
      <Page>
        <PageTitle title="Users" />
        <PageActions>
          <Box alignItems="center">
            {/* <Search onChange={''} onClear={''} value={''} /> */}
          </Box>
        </PageActions>
        <PageBody isLoading={this.state.loading}>
          {!this.state.data.length &&
            <EmptyState
              icon={EmptyStateIcon}
              title="No Users Found"
              description="No users found"
            />}
          <Box id="dashboardBody" style={{overflowY: 'auto'}}>
            <WindowScroller scrollElement={window}>
              {({
                height,
                isScrolling,
                registerChild,
                onChildScroll,
                scrollTop,
              }) => (
                <AutoSizer disableHeight>
                  {({width}) => (
                    <List
                      autoHeight
                      ref={registerChild}
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      overscanRowCount={2}
                      rowCount={this.state.data.length}
                      rowHeight={88}
                      rowRenderer={({index, key, style}) => {
                        return (
                          <div style={{padding: 3, ...style}} key={key}>
                            <UserCard
                              userApi={this.state.UserApi}
                              user={this.state.data[index]}
                              refresh={this.getUsers}
                            />
                          </div>
                        );
                      }}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          </Box>
          <UserDialog
            handleClose={() => {
              this.props.updateDialog (null);
            }}
            open={!!this.props.dialog}
            user={typeof this.props.dialog != 'undefined' && this.props.dialog != null ? this.state.data.find( user => user.Username === this.props.dialog.Username ) : null}
            refresh={this.getUsers}
            userApi={this.state.UserApi}
          />
          {/* <button onClick={this.onPrevious}>Previous</button>
                    <button onClick={this.onNext}>Next</button> */}
        </PageBody>
      </Page>
    );
  }
}

export default withDialog ('user') (Users);
