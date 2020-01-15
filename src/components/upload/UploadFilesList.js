import React from 'react';
import SortIcons from '@material-ui/icons/Sort';
import { withStyles } from "@material-ui/core/styles";

import {format} from 'date-fns';
import {DATE_TIME_FORMAT} from '../../constants';
import imgHolder from '../../assets/img/icons/import/img-holder.svg';
import {getFileInfo, uploadTypes} from '../../utils/import';
import Preview from './Preview';

class UploadFile extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      isPreviewLoading: false,
      showPreview: false,
    };
  }

  getIcon = fileType => {
    const type = uploadTypes.filter (item => item.key === fileType)[0];
    if (type) {
      return type.icon ();
    } else {
      return <img src={imgHolder} alt="" />;
    }
  };

  togglePreview = () => {
    this.setState ({showPreview: !this.state.showPreview});
    if (!this.state.fileData) {
      this.loadContent ();
    }
  };

  async loadContent () {
    this.setState ({isPreviewLoading: true});
    try {
      const fileInfo = getFileInfo (this.props.file.Key);
      const token = localStorage.getItem ('ApiToken');
      const res = await fetch (
        `${window.config.importEndpoint}/${fileInfo.scenarioId}/${fileInfo.type}/${fileInfo.status}/${fileInfo.name}`,
        {
          headers: new Headers ({
            authorization: token ? token : '',
          }),
        }
      );
      const fileContent = await res.json ();
      this.setState ({
        isPreviewLoading: false,
        fileData: fileContent.data,
      });
    } catch (err) {
      this.setState ({isPreviewLoading: false});
      throw err; //TODO
    }
  }

  renderPreview (fileInfo) {
    if (this.state.isPreviewLoading) {
      return <div className="order-preview-label">Loading...</div>;
    }

    if (!this.state.fileData) {
      return <div className="order-preview-label">Error reading file.</div>;
    }

    return (
      <Preview
        fileInfo={fileInfo}
        data={this.state.fileData}
        closePreview={this.togglePreview.bind (this)}
      />
    );
  }

  render () {
    const item = this.props.file;
    const fileInfo = getFileInfo (item.Key);
    const date = format (item.LastModified, DATE_TIME_FORMAT);
    const icon = this.getIcon (fileInfo.type);
    const type = fileInfo.type ? fileInfo.type : 'UNKNOWN';
    return (
      <div className="order-container">
        <div
          className="order"
          key={item.Key}
          onClick={this.togglePreview.bind (this)}
        >
          <div className="left">
            <span className="image">{icon}</span>
            <span className="type"> {type} </span>
            <h6>{fileInfo.name}</h6>
          </div>
          <div className="right">
            <span className="date">{date}</span>
            <span className="count">{item.Size}</span>
            <span>
              <button type="button" className="btn btn-icon" />
            </span>
          </div>
        </div>
        {this.state.showPreview
          ? this.renderPreview ({type, date, size: item.Size})
          : null}
      </div>
    );
  }
}

const styles = {
  icon: {
    display: 'inline-block',
    cursor: 'pointer',
    verticalAlign: 'middle'
  },
  sortDesc: {
    color: '#0079FF'
  },
  sortAsc: {
    transform: 'rotate(180deg)',
    color: '#0079FF'
  }
};

class UploadFilesList extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      isShow: false,
      files: this.props.files,
    };
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.files !== nextProps.files){
      this.setState ({files: nextProps.files});
    }
  }

  render () {
    return (
      <div className="orders-list">
        <div className="orders-header">
          <div className="left">
            <span className="image" />
            <span className="type">Type</span>
            <span className="empty">Name</span>
          </div>
          <div className="right">
            <span className="date">
              Date <span
                title={this.props.sorting}
                className={this.props.classes.icon}
                onClick={() => this.props.onsort(this.props.sorting)}
              >
                <SortIcons className={this.props.classes[this.props.sortClass]} />
              </span>
            </span>
            <span className="size">File size</span>
            <span />
          </div>
        </div>
        {this.props.files.map (item => {
          return <UploadFile file={item} key={item.Key} />;
        })}
      </div>
    );
  }
}

export default withStyles(styles)(UploadFilesList);