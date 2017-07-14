/** SDK Popup Component
 */

import React from 'react';
import PropTypes from 'prop-types';

class Popup extends React.Component {
  render() {
    return (
      <div className="sdk-popup">
        { this.props.children }
      </div>
    );
  }
}

Popup.props = {
 coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Popup;
