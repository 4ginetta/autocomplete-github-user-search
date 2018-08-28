import axios from 'axios'
export const request = (url, method='get') => {
  return axios({
    method: method,
    url: url,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  })
}
