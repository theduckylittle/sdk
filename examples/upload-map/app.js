/* global saveAs */
/** Demo adding a map through mapbox style and exporting the map's endpoints to a file.
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkZoomControl from '@boundlessgeo/sdk/components/map/zoom-control';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as mapActions from '@boundlessgeo/sdk/actions/map';

// This will have webpack include all of the SDK styles.
import '@boundlessgeo/sdk/stylesheet/sdk.scss';

import ContextSelector from './context-selector';

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({
  map: SdkMapReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunkMiddleware));

function main() {
  // add a background layer
  store.dispatch(mapActions.addLayer({
    id: 'background',
    type: 'background',
    paint: {
      'background-color': '#eee',
    },
  }));

  const exportMapSpec = () => {
    const map_spec = store.getState().map;
    const text = JSON.stringify(map_spec);
    const file = new File([text], 'my_map', {type: "application/json"});
    saveAs(file, 'my_map.json');
  };

  // place the map on the page.
  ReactDOM.render(<Provider store={store}>
    <SdkMap style={{position: 'relative'}}>
      <SdkZoomControl style={{position: 'absolute', top: 20, left: 20}} />
    </SdkMap>
  </Provider>, document.getElementById('map'));

  // add a button to demo the action.
  ReactDOM.render((
    <div>
      <h3>Try it out</h3>
      <ContextSelector store={store} />
      <h1>Save a Map</h1>
      <h2>To <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/">Mapbox Style Specification</a></h2>
      <button className="sdk-btn" onClick={exportMapSpec}>Save Map</button>
    </div>
  ), document.getElementById('controls'));
}

main();
