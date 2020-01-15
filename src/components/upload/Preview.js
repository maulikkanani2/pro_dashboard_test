import React from 'react';

import { IconCross } from '../importIcons/icons';

import { IconSearch } from '../importIcons/icons';
import { IconFilter } from '../importIcons/icons';
import {
  searchInArrayOfObjects,
  sortInArrayOfObjects,
  csvSortingMenu,
} from '../../utils/import';
import { utcToLocalDate } from '../../utils/date';

import { format } from 'date-fns';
import { DATE_DETAILED_TIME_FORMAT } from '../../constants';

export default class Preview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchShow: false,
      isInputChange: false,
      isTableShow: false,
      inputValue: '',
      data: this.props.data || [],
      searchedDataList: [],
    };
  }

  renderRow(row, header, i) {
    return (
      <div className="table__row" key={i}>
        {header.map((item, i) => (
          <span key={i}>
            {'time' === item
              ? format(utcToLocalDate(row[item]), DATE_DETAILED_TIME_FORMAT)
              : row[item]}
          </span>
        ))}
      </div>
    );
  }

  searchShow = () => {
    this.setState({ isSearchShow: !this.state.isSearchShow });
  };

  inputChange = event => {
    this.setState({
      isInputChange: true,
      inputValue: event.target.value,
    });
  };

  showResults = event => {
    this.setState({
      ifSearch: true,
      isSearchShow: !this.state.isSearchShow,
      isInputChange: !this.state.isInputChange,
      searchedDataList: searchInArrayOfObjects(
        this.state.inputValue,
        this.state.data
      ),
    });
  };

  toggleFilterMenu = () => {
    this.setState({ isFilterMenuShow: !this.state.isFilterMenuShow });
  };

  toggleTable = () => {
    this.setState({ isTableShow: !this.state.isTableShow });
  };

  sortFields = item => {
    this.setState({
      isFilterMenuShow: false,
      data: sortInArrayOfObjects(item.key, this.state.data, item.type),
    });
  };

  clearInputValue = () => {
    this.setState({
      inputValue: '',
      searchedDataList: [],
      ifSearch: false,
    });
  };

  listItems = csvSortingMenu.map(item => (
    <li key={item.id}>
      <span className="sort-item" onClick={() => this.sortFields(item)}>
        {item.title}
      </span>
    </li>
  ));

  render() {
    const data =
      this.state.searchedDataList.length !== 0
        ? this.state.searchedDataList
        : this.state.data;
    const header = Object.keys(this.state.data[0]);
    return (
      <div className="table-container">
        <header>
          <h2>Import Entries</h2>
          <button
            type="button"
            className="btn"
            onClick={this.props.closePreview}>
            <IconCross />
          </button>
        </header>
        <div className="panel">
          <div className="panel__left">
            <ul className="panel__list">
              <li>
                <strong>Import Date: </strong>
                <span> {this.props.fileInfo.date}</span>
              </li>
              <li>
                <strong>Type: </strong>
                <span>{this.props.fileInfo.type}</span>
              </li>
              <li>
                <strong>File size: </strong>
                <span>{this.props.fileInfo.size}</span>
              </li>
            </ul>
          </div>
          <div className="panel__right">
            <div className="panel__right">
              <div
                className={
                  this.state.isSearchShow
                    ? 'container-search open'
                    : 'container-search'
                }>
                {this.state.isSearchShow ? (
                  <div className="search">
                    <input
                      type="text"
                      value={this.state.inputValue}
                      onChange={this.inputChange}
                    />
                  </div>
                ) : null}

                {!this.state.isInputChange ? (
                  <button
                    type="button"
                    className="btn"
                    onClick={this.searchShow}>
                    <IconSearch />
                  </button>
                ) : (
                    <button
                      type="button"
                      className="btn btn-active"
                      onClick={this.showResults}>
                      GO
                  </button>
                  )}

                {this.state.ifSearch ? (
                  <div className="search-res">
                    <span>{this.state.inputValue}</span>
                    <button
                      type="button"
                      className="btn"
                      onClick={this.clearInputValue}
                    />
                  </div>
                ) : null}
              </div>
              <div className="filter">
                <button
                  type="button"
                  className="btn"
                  onClick={this.toggleFilterMenu}>
                  <IconFilter />
                </button>
                {this.state.isFilterMenuShow ? (
                  <div className="filter__menu">
                    <ul> {this.listItems}</ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="order-preview" style={{ overflowX: 'scroll' }}>
          <div className="table">
            <div className="table__content">
              <div className="table__row table__header">
                {header.map((item, i) => (
                  <span key={i}>{item.toUpperCase()}</span>
                ))}
              </div>
              {data.map((row, i) => this.renderRow(row, header, i))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
