
import axios from 'axios';

const getGists = (successHandler) => {
  axios.get("https://api.github.com/gists/public")
  .then(json => {
    successHandler(json)
  })
  .catch(err => console.error(err))
}

export default getGists;

