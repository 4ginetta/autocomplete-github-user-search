const GITHUB_API_KEY = process.env.REACT_APP_GITHUB_API_KEY
module.exports = {
  SEARCH_API_URL: `https://api.github.com/search/users?access_token=${GITHUB_API_KEY}`,  // &q={query}
}
