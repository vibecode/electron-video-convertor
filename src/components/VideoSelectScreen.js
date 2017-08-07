import _ from 'lodash';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import './VideoSelectScreen.css';

class VideoSelectScreen extends Component {
  onDrop = (files) => {
    const videos = _.map(files, ({ name, path, size, type }) => {
      return { name, path, size, type };
    });

    if (videos.length) {
      this.props.addVideos(videos);

      if (!this.props.small) {
        this.props.history.push('/convert');
      }
    }
  };

  renderChildren({ isDragReject }) {
    return isDragReject ?
           <h4 className="drop-message">Oops, I don't know how to deal with that type of file!</h4> :
           <h4 className="drop-message">Drag and drop some files here, or just click to select.</h4>;
  };

  render() {
    return (
        <div className={this.props.small ? "video-select-screen-small" : "video-select-screen"}>
          <Dropzone
              onDrop={this.onDrop}
              multiple
              accept="video/*"
              className="dropzone"
              activeClassName="dropzone-active"
              rejectClassName="dropzone-reject">
            {this.renderChildren}
          </Dropzone>
        </div>
    );
  }
}

export default connect(null, actions)(VideoSelectScreen);
