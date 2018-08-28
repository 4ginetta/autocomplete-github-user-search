import config from '../config'
import * as actionTypes from '../actionTypes'
import {request} from '../utility/Request'
import notFound from '../assets/not-found.png'

export const fetchUsers = (query) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.LOADING, payload: true })
    try {
      const userRequest = await request(`${config.SEARCH_API_URL}&q=${query}`)
      let payload = userRequest.data.items.map(({login, avatar_url, html_url}) => {
        return {
          login: login,
          avatar_url: avatar_url,
          profile_url: html_url
        }
      // returned results do not always match the query string,
      // therefore a little bit of extra filtering and sorting is implemented for better UX
      }).filter((user) => {
        return user.login.indexOf(query.toLowerCase()) !== -1
      }).sort(function(a, b){
        if(a.login.toLowerCase() < b.login.toLowerCase()) return -1;
        if(a.login.toLowerCase() > b.login.toLowerCase()) return 1;
        return 0;
      })
      payload = payload.length > 0 ? payload : [{login: 'There are no matching users.', profile_url: null, avatar_url: notFound}]
      dispatch({ type: actionTypes.FETCH_USERS_SUCCESS, payload })
      return dispatch({ type: actionTypes.LOADING, payload: false })
    }catch (e) {
      const payload = 'An error occured. Please give it another try.'
      dispatch({ type: actionTypes.FETCH_USERS_ERROR, payload })
      return dispatch({ type: actionTypes.LOADING, payload: false })
    }
  }
}
