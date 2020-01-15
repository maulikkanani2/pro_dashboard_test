import React from 'react';

import Uppy from 'uppy/lib/core';
import XHRUpload from 'uppy/lib/plugins/XHRUpload';

import { DragDrop } from 'uppy/lib/react';
import Swal from 'sweetalert2';

import loader from '../../assets/img/icons/import/loader.svg';
import documentIcon from '../../assets/img/icons/import/document.svg';
import { cache } from '../../graphql/client';

const Loader = () => {
  return (
    <div className="file-preview">
      <img src={loader} alt="" />
    </div>
  );
};

const UploadFilePreview = props => {
  const file = props.uppy.getFile(props.fileId);

  return (
    <div className="file-preview">
      <img src={documentIcon} alt="" />
      <span>{file.name}</span>
    </div>
  );
};

const UploadSuccessPreview = () => {
  return (
    <div className="file-preview">
      <h6>SUCCESS</h6>
    </div>
  );
};

const UploadErrorPreview = props => {
  return (
    <div className="file-preview">
      <h6>FAILURE</h6>
      <span>Please check the import log</span>
    </div>
  );
};

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderShow: false,
      fileId: null,
      isUploading: false,
      isUploadComplete: false,
      uploadError: null,
      activeType: this.props.type.name,
    };

    this.uploadAction = this.uploadAction.bind(this);
  }

  componentWillMount() {
    this.uppy = new Uppy({ autoProceed: false,  restrictions: {
      //allowedFileTypes: ['text/csv'],
      maxFileSize: 1992294.4   
    } })
      .use(XHRUpload, {
        endpoint: `${window.config.importEndpoint}/upload`,
        headers: {
          authorization: `${localStorage.getItem('ApiToken')}`,
        },
        fieldName: 'importFile',
        formData: true,
      })
      .run()
      .on('file-added', file => {
        this.setState({ fileId: file.id });
        this.uppy.setFileMeta(file.id, {
          type: this.props.type, //The import file type
          scenarioId: this.props.scenario.id,
        });
      })
      .on('upload-success', (file, body) => {
        const res = this.uppy.getFile(file.id).response;
        this.props.getFilesList();
        console.log(res); //TODO
      })
      .on('upload', data => {
        this.setState({ isUploading: true });
      })
      .on('complete', result => {
        cache.reset();
        this.setState({
          isUploading: false,
	        isUploadComplete: true,
	        fileId: null
        });
      })
      .on('upload-error', (file, error) => {
        this.setState({
          isUploading: false,
	        uploadError: error,
	        fileId: null
        });
      })
      .on('error', (file, error) => {
        this.setState({
          isUploading: false ,
	        uploadError: error,
	        fileId: null
        });
      })
      .on('info-visible', () => {
        const info = this.uppy.getState().info
        Swal ({
          position: 'top',
          title: 'Error',
          text: `${info.message}`,
          toast: true,
          showConfirmationButton: false,
          confirmButtonColor: '#0079FF',
          timer: 5000,
        });
      });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  changeType = newType => {
    this.uppy.setMeta({ type: newType.key });
    this.setState({ activeType: newType.key });
  };

  uploadAction() {
    this.uppy.setMeta({ type: this.state.activeType });
    this.uppy.upload();
    this.setState({ isOrderShow: !this.state.isOrderShow });
  }

  renderPreview = () => {
    if (this.state.isUploading) {
      return <Loader />;
    }

    if (this.state.uploadError) {
      return <UploadErrorPreview error={this.state.uploadError} />;
    }

    if (this.state.isUploadComplete) {
      return <UploadSuccessPreview />;
    }

    if (this.state.fileId) {
      return <UploadFilePreview uppy={this.uppy} fileId={this.state.fileId} />;
    }
    return (
      <div className="drag-drop-holder">
        <DragDrop uppy={this.uppy} />
      </div>
    );
  };

  renderButtons = () => {
    if (this.state.fileId) {
      return (
        <div className="btn-control">
          <button
            type="button"
            className="btn btn-clear"
            onClick={this.props.toggleUpload}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-clear"
            onClick={this.uploadAction}>
            Upload
          </button>
        </div>
      );
    }

    return (
      <div className="btn-control">
        <button
          type="button"
          className="btn btn-clear"
          onClick={this.props.toggleUpload}>
          Close
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="modal-container">
        <div className="modal">
          <div className="import">
            <div className="import__holder">
              <h3>Upload File</h3>
              {this.renderPreview()}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
