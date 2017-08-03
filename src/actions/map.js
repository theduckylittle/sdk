import fetch from 'isomorphic-fetch';

/** Action Defintions for the map.
 */

import { MAP } from '../action-types';
import { TITLE_KEY } from '../constants';

export function setView(center, zoom) {
  return {
    type: MAP.SET_VIEW,
    view: { center, zoom },
  };
}

export function setMapName(name) {
  return {
    type: MAP.SET_NAME,
    name,
  };
}

export function addLayer(layerDef, layerTitle, positionId) {
  return {
    type: MAP.ADD_LAYER,
    layerDef,
    layerTitle,
    positionId,
  };
}

export function addSource(sourceName, sourceDef) {
  return {
    type: MAP.ADD_SOURCE,
    sourceName,
    sourceDef,
  };
}

export function removeLayer(layerId) {
  return {
    type: MAP.REMOVE_LAYER,
    layerId,
  };
}

export function removeSource(sourceName) {
  return {
    type: MAP.REMOVE_SOURCE,
    sourceName,
  };
}

export function updateLayer(layerId, layerDef) {
  return {
    type: MAP.UPDATE_LAYER,
    layerId,
    layerDef,
  };
}

export function clusterPoints(sourceName, isClustered) {
  return {
    type: MAP.CLUSTER_POINTS,
    sourceName,
    cluster: isClustered,
  };
}

/** Set the radius of a clustering layer.
 *
 *  When set to a layer without clustering this will
 *  have no effect.
 *
 */
export function setClusterRadius(sourceName, radius) {
  return {
    type: MAP.SET_CLUSTER_RADIUS,
    sourceName,
    radius,
  };
}

export function addFeatures(sourceName, features) {
  return {
    type: MAP.ADD_FEATURES,
    sourceName,
    features,
  };
}

export function removeFeatures(sourceName, filter) {
  return {
    type: MAP.REMOVE_FEATURES,
    sourceName,
    filter,
  };
}

export function setLayerVisibility(layerId, visibility) {
  return {
    type: MAP.SET_LAYER_VISIBILITY,
    layerId,
    visibility,
  };
}

export function setLayerMetadata(layerId, itemName, itemValue) {
  return {
    type: MAP.SET_LAYER_METADATA,
    layerId,
    key: itemName,
    value: itemValue,
  };
}

export function setLayerTitle(layerId, title) {
  return setLayerMetadata(layerId, TITLE_KEY, title);
}

export function receiveContext(context) {
  return {
    type: MAP.RECEIVE_CONTEXT,
    context,
  };
}

// thunk action creator
export function setContext(options) {
  return (dispatch) => {
    if (options.url) {
      return fetch(options.url)
        .then(
          response => response.json(),
          error => console.error('An error occured.', error),
        )
        .then(json =>
          dispatch(receiveContext(json)),
        );
    } else if (options.json) {
      return new Promise((resolve) => {
        dispatch(receiveContext(options.json));
        resolve();
      });
    }
    return new Promise((resolve, reject) => {
      reject('Invalid option for setContext. Specify either json or url.');
    });
  };
}

/** Rearrange a layer in the list.
 *
 *  @param layerId the layer to move.
 *  @param targetLayerId The ID of the layer id to move the layerId BEFORE.
 *                       When null or undefined, moves the layer to the end
 *                       of the list.
 *
 * @returns action object.
 */
export function orderLayer(layerId, targetLayerId) {
  return {
    type: MAP.ORDER_LAYER,
    layerId,
    targetId: targetLayerId,
  };
}

/** Set the sprites for hte map
 *
 *  @param spriteRoot - The URI to the sprite data without the .json/.png suffix.
 *
 * @returns action object.
 */
export function setSprites(spriteRoot) {
  return {
    type: MAP.SET_SPRITES,
    sprites: spriteRoot,
  };
}

/** Update the map's metadata.
 *
 *  @param metadata - An object containing new/updated metadata.
 *
 * @returns action object.
 */
export function updateMetadata(metadata) {
  return {
    type: MAP.UPDATE_METADATA,
    metadata,
  };
}
