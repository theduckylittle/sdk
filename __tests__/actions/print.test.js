/* global describe, it, expect */

import * as actions from '@boundlessgeo/sdk/actions/print';
import {PRINT} from '@boundlessgeo/sdk/action-types';

describe('print actions', () => {
  it('should create an action to export image', () => {
    const expectedAction = {
      type: PRINT.EXPORT_IMAGE,
    };
    expect(actions.exportMapImage()).toEqual(expectedAction);
  });

  it('should create an action to finish export image', () => {
    const expectedAction = {
      type: PRINT.RECEIVE_IMAGE,
    };
    expect(actions.receiveMapImage()).toEqual(expectedAction);
  });
});
