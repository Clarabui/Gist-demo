import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const loadingInitialState = {loading: false}
const loadingReducer = (state = loadingInitialState, action) => {
    switch (action.type) {
      case 'load':
        return {loading: true}
      case 'finishLoad':
        return {loading: false}
      default:
        return state
    }
}

const viewGistInitialState = {viewItem: null}
const viewGistReducer = (state = viewGistInitialState, action) => {
  switch (action.type) {
    case 'startView':
      return {viewItem: action.data.item}
    case 'closeView':
      return {viewItem: null}
    default:
      return state
  }
}

const gistsInitialState = {items: []}
const gistsReducer = (state = gistsInitialState, action) => {
  switch (action.type) {
    case 'setGists':
      return {items: action.data.items}
    default:
      return state
  }

}

const reducer = combineReducers({load: loadingReducer, viewGist: viewGistReducer, gists: gistsReducer})
let store = createStore(reducer, applyMiddleware(thunk))


store.subscribe(() => console.log(store.getState()))

// store.dispatch({ type: 'load', data: { toTest: 'hello' } })
// store.dispatch({ type: 'finishLoad', data: { toTest: 'world' } })

// getGists((res) => store.dispatch({ type: 'setGists', data: { items: res.data } }))

export default store;



