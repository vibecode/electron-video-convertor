import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import ConvertPanel from './ConvertPanel';
import VideoSelectScreen from './VideoSelectScreen';
import { setFormat, removeVideo, showInFolder } from '../actions/index';
import './ConvertScreen.css';

class ConvertScreen extends Component {
  render() {
    return (
        <div className="container">
          <VideoSelectScreen small />
          <VideoList
              videos={this.props.videos}
              onFormatChange={this.props.setFormat}
              onFolderOpen={this.props.showInFolder}
              removeVideo={this.props.removeVideo} />
          <ConvertPanel />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return { videos: state.videos };
}

export default connect(mapStateToProps, { setFormat, removeVideo, showInFolder })(ConvertScreen);
