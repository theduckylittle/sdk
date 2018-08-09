// __mocks__/fetch-jsonp.js
'use strict';

import fetch from 'isomorphic-fetch';

const fetchjsonp = jest.genMockFromModule('fetch-jsonp');

module.exports = function(url) {
  return fetch(url);
};
