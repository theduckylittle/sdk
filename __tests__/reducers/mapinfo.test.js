/* global it, beforeEach, describe, expect */

import deepFreeze from 'deep-freeze';

import {MAPINFO} from '@boundlessgeo/sdk/action-types';
import reducer from '@boundlessgeo/sdk/reducers/mapinfo';

describe('mapinfo reducer', () => {

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      size: null,
      mouseposition: {
        lngLat: null,
        coordinate: null,
      },
      requestedRedraws: 0,
      extent: null,
      projection: 'EPSG:3857',
      resolution: null,
      sourceErrors: {},
    });
  });

  it('should set the map extent', () => {
    let state = {};
    deepFreeze(state);
    const extent = [-90, -45, 90, 45];
    const action = {
      type: MAPINFO.SET_EXTENT,
      extent,
    };
    deepFreeze(action);
    expect(reducer(state, action)).toEqual({
      extent: [-90, -45, 90, 45],
    });
  });

  it('should set the map size', () => {
    let state = {};
    deepFreeze(state);
    const size = [1000, 500];
    const action = {
      type: MAPINFO.SET_SIZE,
      size,
    };
    deepFreeze(action);
    expect(reducer(state, action)).toEqual({
      size: [1000, 500],
    });
  });

  it('should set the mouse position', () => {
    let state = {};
    deepFreeze(state);
    const coordinate = [100000, 80000];
    const lngLat = {lng: 50, lat: 45};
    const action = {
      type: MAPINFO.SET_MOUSE_POSITION,
      lngLat,
      coordinate,
    };
    deepFreeze(action);
    expect(reducer(state, action)).toEqual({
      mouseposition: {
        lngLat: {lng: 50, lat: 45},
        coordinate: [100000, 80000],
      },
    });
  });

  it('should increment the requested redraws', () => {
    let state = {
      requestedRedraws: 0,
    };
    deepFreeze(state);

    const action = {
      type: MAPINFO.REQUEST_REDRAW,
    };

    expect(reducer(state, action)).toEqual({
      requestedRedraws: 1,
    });
  });

  it('should set an errored source', () => {
    let state = {
      sourceErrors: {},
    };
    deepFreeze(state);

    const action = {
      type: MAPINFO.SET_SOURCE_ERROR,
      srcName: 'test',
    };

    expect(reducer(state, action)).toEqual({
      sourceErrors: {
        test: true,
      },
    });
  });

  it('should clear errored sources', () => {
    let state = {
      sourceErrors: {
        test: true,
      },
    };
    deepFreeze(state);

    const action = {
      type: MAPINFO.CLEAR_SOURCE_ERRORS,
    };

    expect(reducer(state, action)).toEqual({
      sourceErrors: {},
    });
  });
});
