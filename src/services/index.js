
import axios from 'axios';

const getGists = (successHandler) => {
  axios.get("/gists.json")
  .then(json => {
    successHandler(json)
  })
  .catch(err => console.error(err))
}

export default getGists;

