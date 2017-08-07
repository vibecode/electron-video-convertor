import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import './ConvertPanel.css';

class ConvertPanel extends Component {
  onConvertClick = () => {
    this.props.convertVideos(this.props.videos);
  };

  onCancelClicked = () => {
    this.props.removeAllVideos();
    this.props.history.push('/');
  };

  render() {
    return (
        <div className="convert-panel">
          <button className="btn red" onClick={this.onCancelClicked}>
            Cancel
          </button>
          <button className="btn" onClick={this.onConvertClick}>
            Convert!
          </button>
        </div>
    );
  };
}

function mapStateToProps(state) {
  const videos = _.map(state.videos);
  return { videos };
}

export default connect(mapStateToProps, actions)(ConvertPanel);
