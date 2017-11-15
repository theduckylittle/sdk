/* global it, describe, expect, beforeEach */

import {createStore, combineReducers} from 'redux';

import reducer from '../../src/reducers/map';
import * as MapActions from '../../src/actions/map';
import {addLayer, addSource} from '../../src/actions/map';

describe('test reordering groups in the map', () => {

  let store;

  function createLayer(layerId, group) {
    const metadata = {};
    if (group) {
      metadata['mapbox:group'] = group;
    }

    store.dispatch(addLayer({
      id: layerId,
      source: 'test',
      metadata
    }));
  }

  beforeEach(() => {
    store = createStore(combineReducers({
      map: reducer
    }));

    // create a dummy root source
    store.dispatch(addSource('test', {type: 'geojson'}));
  });

  function testOrder(expectedOrder) {
    const layers = store.getState().map.layers;
    const layer_ids = [];
    for (let i = 0, ii = layers.length; i < ii; i++) {
      layer_ids.push(layers[i].id);
    }

    expect(layer_ids).toEqual(expectedOrder);
  }

  function createDefaultLayers() {
    createLayer('A');
    createLayer('B', 'x');
    createLayer('C', 'x');
    createLayer('D');
    createLayer('E', 'y');
    createLayer('F');
  }

  it('test the identity property of moving a group onto itself', () => {
    createDefaultLayers();
    store.dispatch(MapActions.moveGroup('x', 'B'));
    testOrder(['A', 'B', 'C', 'D', 'E', 'F']);
  });

  it('moves a group before a layer', () => {
    createDefaultLayers();
    store.dispatch(MapActions.moveGroup('x', 'A'));
    testOrder(['B', 'C', 'A', 'D', 'E', 'F']);
  });

  it('moves a group before a group (with last index)', () => {
    createDefaultLayers();
    store.dispatch(MapActions.moveGroup('y', 'B'));
    testOrder(['A', 'E', 'B', 'C', 'D', 'F']);
  });

  it('moves a group before a group (with first index)', () => {
    createDefaultLayers();
    store.dispatch(MapActions.moveGroup('y', 'C'));
    testOrder(['A', 'E', 'B', 'C', 'D', 'F']);
  });

  it('moves a group to the end', () => {
    createDefaultLayers();
    store.dispatch(MapActions.moveGroup('x', 'F'));
    testOrder(['A', 'D', 'E', 'F', 'B', 'C']);
  });

});
