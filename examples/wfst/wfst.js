
import uuid from 'uuid';

const defaultState = {
  sources: {},
  actions: {},
};

function addSource(state, action) {
  const new_source = {};
  new_source[action.sourceId] = action.sourceDef;

  const new_sources = Object.assign({}, state.sources, new_source);
  return Object.assign({}, state, {
    sources: new_sources
  });
}

function removeSource(state, action) {
  const new_sources = Object.assign({}, state.sources);
  delete new_sources[action.sourceId];
  return Object.assign({}, state, { sources: new_sources });
}

function addAction(state, action) {
    const action_id = uuid.v4();

    const new_action = {};
    new_action[action_id] = action;

    const new_actions = Object.assign({}, state.actions, new_action);
    return Object.assign({}, state, {actions: new_actions});
}

export function WfsReducer(state = defaultState, action) {
  switch(action.type) {
    // add a source to the WFS configuration
    case 'add-source':
      return addSource(state, action);
    // remove a source from the WFS configuration
    case 'remove-source':
      return removeSource(state, action);
    case 'wfs:insert':
    case 'wfs:update':
    case 'wfs:delete':
      console.log('add action', state, action, addAction(state, action));
      return addAction(state, action);
    case 'finished':
      return finishAction(state, action);
    default:
      return state;
  }
};
