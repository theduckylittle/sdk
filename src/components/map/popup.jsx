/** SDK Popup Component
 */

import React from 'react';
import PropTypes from 'prop-types';

class Popup extends React.PureComponent {
  render() {
    return (
      <div className="sdk-popup">
        { this.props.children }
      </div>
    );
  }
}

Popup.propTypes = {
  // this unused prop warning is ignored becasue the cooredinate is
  //  a required prop to rightly render the popup on the map.
  // eslint-disable-next-line
  coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.arrayOf(PropTypes.element),
};

Popup.defaultProps = {
  children: [],
};

export default Popup;
