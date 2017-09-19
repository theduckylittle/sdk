/* global it, describe, expect, beforeEach */

import React from 'react';
import { mount } from 'enzyme';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MapReducer from '../../src/reducers/map';

import SdkLayerList, { SdkLayerListItem } from '../../src/components/layer-list';


class TestLayerListItem extends SdkLayerListItem {
  render() {
    return (
      <div>
        <button className="btn-up" onClick={() => { this.moveLayerUp(); }}></button>
        <button className="btn-down" onClick={() => { this.moveLayerDown(); }}></button>
        <button className="btn-remove" onClick={() => { this.removeLayer(); }}></button>
      </div>
    );
  }
}

describe('test the LayerList component', () => {
  let store = null;

  // this is the same setup as used in legends but intead
  //  of listing layers this lists the layers in a list.
  beforeEach(() => {
    store = createStore(combineReducers({
      map: MapReducer,
    }), {
      map: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tileSize: 256,
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
          },
          wms: {
            type: 'raster',
            tiles: [
              '/wms?SERVICE=WMS&LAYERS=x,y,z&FORMAT=image/png&EXCEPTIONS=image/png&BBOX={bbox-epsg-3857}',
            ],
          },
          other: {
            type: 'geojson',
            data: { },
          },
        },
        layers: [
          {
            id: 'osm',
            source: 'osm',
          },
          {
            id: 'wms-test',
            source: 'wms',
          },
          {
            id: 'html-test',
            source: 'other',
          },
          {
            id: 'href-test',
            source: 'other',
          },
          {
            id: 'image-test',
            ref: 'href-test',
          },
          {
            id: 'null-test',
            source: 'other',
          },
          {
            id: 'bad-type-test',
            source: 'other',
          },
        ],
      },
    });
  });

  it('should render the layer list without error', () => {
    mount(<Provider store={store}><SdkLayerList layerClass={TestLayerListItem} /></Provider>);
  });

  it('should render with a custom layer list class', () => {
  });
});
