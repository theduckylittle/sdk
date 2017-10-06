/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as mapActions from '../../actions/map';

class ZoomControl extends React.Component {
  render() {
    let className = 'sdk-zoom-control';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return (
      <div className={className} style={this.props.style}>
        <button className='sdk-zoom-in' onClick={this.props.zoomIn} title={this.props.zoomInTitle}>+</button>
        <button className='sdk-zoom-out' onClick={this.props.zoomOut} title={this.props.zoomOutTitle}>{'\u2212'}</button>
      </div>
    );
  }
}

ZoomControl.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  zoomInTitle: PropTypes.string,
  zoomOutTitle: PropTypes.string,
};

ZoomControl.defaultProps = {
  zoomInTitle: 'Zoom in',
  zoomOutTitle: 'Zoom out',
};

function mapDispatchToProps(dispatch) {
  return {
    zoomIn: () => {
      dispatch(mapActions.zoomIn());
    },
    zoomOut: () => {
      dispatch(mapActions.zoomOut());
    },
  };
};

export default connect(null, mapDispatchToProps)(ZoomControl);
