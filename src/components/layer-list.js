/** SDK Example Layerlist Component
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { isLayerVisible } from '../util';

import * as mapActions from '../actions/map';

export class LayerListItem extends React.Component {

  getLayerIndexById(id) {
    const layers = this.props.layers;
    for (let i = layers.length - 1, ii = 0; i >= ii; i--) {
      if (layers[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  moveLayer(layerId, targetId) {
    this.props.dispatch(mapActions.orderLayer(layerId, targetId));
  }

  moveLayerUp() {
    const layer_id = this.props.layer.id;
    const index = this.getLayerIndexById(layer_id);
    if (index < this.props.layers.length - 1) {
      this.moveLayer(this.props.layers[index + 1].id, layer_id);
    }
  }

  moveLayerDown() {
    const layer_id = this.props.layer.id;
    const index = this.getLayerIndexById(layer_id);
    if (index > 0) {
      this.moveLayer(layer_id, this.props.layers[index - 1].id);
    }
  }

  removeLayer() {
    this.props.dispatch(mapActions.removeLayer(this.props.layer.id));
  }

  toggleVisibility() {
    const shown = isLayerVisible(this.props.layer);
    this.props.dispatch(mapActions.setLayerVisibility(this.props.layer.id, shown ? 'none' : 'visible'));
  }

  getVisibilityControl(layer) {
    const is_checked = isLayerVisible(layer);
    return (
      <input
        type="checkbox"
        onChange={() => { this.toggleVisibility(layer.id, is_checked); }}
        checked={is_checked}
      />
    );
  }

  render() {
    const layer = this.props.layer;
    const checkbox = this.getVisibilityControl(layer);
    return (
      <li className="layer" key={layer.id}>
        <span className="checkbox">{checkbox}</span>
        <span className="name">{layer.id}</span>
      </li>
    );
  }
}

LayerListItem.PropTypes = {
  layer: PropTypes.shape({
    id: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
};

class LayerList extends React.Component {
  constructor(props) {
    super(props);

    this.layerClass = connect()(this.props.layerClass);
  }

  render() {
    const layers = [];
    for (let i = this.props.layers.length - 1; i >= 0; i--) {
      layers.push(<this.layerClass key={i} layers={this.props.layers} layer={this.props.layers[i]} />);
    }
    return (
      <ul>
        { layers }
      </ul>
    );
  }
}

LayerList.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
  removeLayer: PropTypes.func.isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    source: PropTypes.string,
  })).isRequired,
};

LayerList.defaultProps = {
  layerClass: LayerListItem,
};

function mapStateToProps(state) {
  return {
    layers: state.map.layers,
  };
}

export default connect(mapStateToProps)(LayerList);
