import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import 'uppy/dist/uppy.min.css';

import '../assets/css/index.css';

import Upload from '../components/upload/Upload';
import UploadFilesList from '../components/upload/UploadFilesList';
import UploadType from '../components/upload/UploadType';

import withScenario from '../wrappers/scenario';
import Page, { PageTitle, PageActions, PageBody } from '../components/page';
import Box from '../components/layout/Box';

import {
  searchInArrayOfObjects,
  sortInArrayOfObjects,
  filesSortingMenu,
} from '../utils/import';

class Import extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowUpload: false,
      isOrdersShow: false,
      isSearchShow: false,
      isInputChange: false,
      isShowMenu: false,
      inputValue: '',
      filesList: [],
      searchedFilesList: [],
      isFetching: false,
      sorting: 'DESC',
      sortClass: ''
    };
  }

  async getFilesList() {
    this.setState({ isFetching: true });
    try {
      const token = localStorage.getItem('ApiToken');
      const res = await fetch(
        `${window.config.importEndpoint}/list/${this.props.scenario.id}`,
        {
          headers: new Headers({
            authorization: token ? token : '',
          }),
        }
      );
      const filesList = await res.json();
      this.setState({
        filesList,
        isFetching: false,
      });
      this.fileSorting('DESC');
    } catch (err) {
      this.setState({
        isFetching: false,
      });
      throw err; //TODO
    }
  }

  componentWillMount() {
    this.getFilesList();
  }

  fileSorting = sortType => {
    switch (sortType) {
      case 'DESC':
        const dFiles = this.state.filesList.sort (function (a, b) {
          return new Date (b.LastModified) - new Date (a.LastModified);
        });
        this.setState({filesList: dFiles, sorting:'ASC', sortClass: 'sortDesc'})
        break;
      case 'ASC':
        const aFiles = this.state.filesList.sort (function (a, b) {
          return new Date (a.LastModified) - new Date (b.LastModified);
        });
        this.setState({filesList: aFiles,sorting:'DESC', sortClass: 'sortAsc'})
        break;
    }
  };

  toggleUpload = () => {
    this.setState({ isShowUpload: !this.state.isShowUpload });
  };

  searchShow = () => {
    this.setState({ isSearchShow: !this.state.isSearchShow });
  };

  inputChange = event => {
    this.setState({
      isInputChange: true,
      inputValue: event.target.value,
    });
  };

  showSearchingResults = event => {
    this.setState({
      ifSearch: true,
      isSearchShow: !this.state.isSearchShow,
      isInputChange: !this.state.isInputChange,
      searchedFilesList: searchInArrayOfObjects(
        this.state.inputValue,
        this.state.filesList
      ),
    });
  };

  toggleFilterMenu = () => {
    this.setState({ isFilterMenuShow: !this.state.isFilterMenuShow });
  };

  toggleMenu = () => {
    this.setState({ isShowMenu: !this.state.isShowMenu });
  };

  changeType = type => {
    this.setState({
      type,
      isShowUpload: !this.state.isShowUpload,
      isShowMenu: false,
    });
  };

  clearInputValue = () => {
    this.setState({
      inputValue: '',
      searchedFilesList: [],
      ifSearch: false,
    });
  };

  sortFiles(item) {
    this.setState({
      isFilterMenuShow: false,
      filesList: sortInArrayOfObjects(
        item.key,
        this.state.filesList,
        item.type
      ),
    });
  }

  listItems = filesSortingMenu.map(item => (
    <li key={item.id}>
      <span className="sort-item" onClick={() => this.sortFiles(item)}>
        {item.title}
      </span>
    </li>
  ));

  render() {
    const files =
      this.state.searchedFilesList.length !== 0
        ? this.state.searchedFilesList
        : this.state.filesList;
    return (
      <Page>
        <PageTitle title="Imports" />
        <PageActions>
          <Box alignItems="center" />
          <Box flex="1" justifyContent="flex-end" alignItems="center">
            <Button variant="fab" color="primary" onClick={this.toggleMenu}>
              <AddIcon />
            </Button>
            {this.state.isShowMenu ? (
              <UploadType
                changeType={this.changeType}
                selected={this.state.activeType}
              />
            ) : null}
          </Box>
        </PageActions>
        <PageBody>
          {this.state.isShowUpload ? (
            <Upload
              type={this.state.type}
              toggleUpload={this.toggleUpload}
              scenario={this.props.scenario}
              getFilesList={this.getFilesList.bind(this)}
            />
          ) : null}

          {this.state.filesList.length ? (
            <UploadFilesList files={files} onsort={this.fileSorting} sorting={this.state.sorting} sortClass={this.state.sortClass}/>
          ) : null}
        </PageBody>
      </Page>
    );
  }
}

Import.propTypes = {
  scenario: PropTypes.object.isRequired,
};

export default withScenario(Import);
