import GeoJsonFormat from 'ol/format/geojson';


/** Utility functions for SDK.
 *
 *  This is the grab bag of universally useful functions.
 */

/** Compare two objects, uses JSON.stringify.
 */
export function jsonEquals(objectA, objectB) {
  return (JSON.stringify(objectA) === JSON.stringify(objectB));
}


/** Get a layer by it's id
 *
 *  @param layers - Array of GL layer objects.
 *  @param id     - The layer's ID.
 *
 *  @returns The layer or null if not found.
 */
export function getLayerById(layers, id) {
  for (let i = 0, ii = layers.length; i < ii; i++) {
    if (layers[i].id === id) {
      return layers[i];
    }
  }
  return null;
}

/** Get the max or min number in a given set of numbers
  * that may contain non-numbers
 */
function getNumericValues(values) {
  const arr = [];
  for (let i = 0, ii = values.length; i < ii; i++) {
    if (!isNaN(values[i])) {
      arr.push(values[i]);
    }
  }
  return arr;
}

export function getMin(...args) {
  const numbers = getNumericValues(args);
  if (numbers.length === 0) { return undefined; }
  if (numbers.length === 1) { return numbers[0]; }
  return Math.min.apply(this, getNumericValues(args));
}

export function getMax(...args) {
  const numbers = getNumericValues(args);
  if (numbers.length === 0) { return undefined; }
  if (numbers.length === 1) { return numbers[0]; }
  return Math.max.apply(this, getNumericValues(args));
}

/** Reproject GeoJSON to mapbox gl style spec EPSG:4326
  * @param data - array of geoJSON features
  * @param projection - string from geoJSON crs (coordinate referance system)
  *
  * @return array of geoJSON feature in EPSG:4326
 */
export function reprojectGeoJson(data, projection){
  const GEOJSON_FORMAT = new GeoJsonFormat();

  let crsName;
  if (projection && projection.properties && projection.properties.name) {
    crsName = projection.properties.name;
  }

  const readFeatureOptions = {
    featureProjection: 'EPSG:4326',
    dataProjection: crsName
  };

  const writeFeatureOptions = {
    featureProjection: 'EPSG:4326',
    dataProjection: 'EPSG:4326'
  };

  const new_data = {
    type: 'FeatureCollection',
    features: data,
  };
  // const features = GEOJSON_FORMAT.readFeatures(new_data, readFeatureOptions);
  const features = GEOJSON_FORMAT.writeFeaturesObject(GEOJSON_FORMAT.readFeatures(new_data, readFeatureOptions), writeFeatureOptions);
  return features.features;
}
