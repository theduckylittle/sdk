/** Show some sprites on the map
 *
 *  Duck, duck, GOOSE!
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as mapActions from '@boundlessgeo/sdk/actions/map';

// This will have webpack include all of the SDK styles.
import '@boundlessgeo/sdk/stylesheet/sdk.css';

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({
  map: SdkMapReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunkMiddleware));

function main() {
  // Start with a reasonable global view of the map.
  store.dispatch(mapActions.setView([0, 0], 3));

  // setup the map sprites.
  store.dispatch(mapActions.setSprites('./sprites'));

  // add the OSM source
  store.dispatch(mapActions.addSource('osm', {
    type: 'raster',
    tileSize: 256,
    tiles: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ],
  }));

  // and an OSM layer.
  // Raster layers need not have any paint styles.
  store.dispatch(mapActions.addLayer({
    id: 'osm',
    source: 'osm',
  }));

  // 'geojson' sources allow rendering a vector layer
  // with all the features stored as GeoJSON. "data" can
  // be an individual Feature or a FeatureCollection.
  store.dispatch(mapActions.addSource('points', {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-45, 0],
      },
    },
  }));

  // Define a layer to render the features from
  // the points source as icons.
  store.dispatch(mapActions.addLayer({
    id: 'symbols',
    source: 'points',
    type: 'symbol',
    layout: {
      'icon-image': 'duck',
    },
  }));

  const updateSprite = () => {
    let icon;
    if (store.getState().map.layers[1].layout['icon-image'] === 'duck') {
      icon = 'goose';
    } else {
      icon = 'duck';
    }
    store.dispatch(mapActions.updateLayer('symbols', {
      layout: {
        'icon-image': icon,
      },
    }));
  };

  // place the map on the page.
  ReactDOM.render(<SdkMap store={store} />, document.getElementById('map'));

  ReactDOM.render((
    <div>
      <button className="sdk-btn" onClick={updateSprite}>Duck, Duck, Goose</button>
    </div>
  ), document.getElementById('controls'));
}

main();
