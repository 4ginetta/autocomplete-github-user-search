import * as actionTypes from '../actionTypes'

const initialState = {
  loading: false,
  users: [],
  error: '',
}

const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING:
      return {...state, loading: action.payload}
    case actionTypes.FETCH_USERS_SUCCESS:
      return {...state, users: action.payload, error: ''}
    case actionTypes.FETCH_USERS_ERROR:
      return {...state, users: [], error: action.payload}
    default:
      return state
  }
}

export default SearchReducer
