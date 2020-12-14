
import axios from 'axios';

const getGists = (successHandler) => {
  axios.get("/gists.json")
  .then(json => {
    let rawFileFetches = json.data.map(gist =>  {
        let firstFile = Object.values(gist.files)[0];
        return axios.get(firstFile.raw_url)
    })

    let forkFileFetches = json.data.map(gist => {
      return axios.get(gist.forks_url);
    })

    Promise
      .all([...rawFileFetches, ...forkFileFetches])
      .then(values => {
        successHandler({data: json.data.map((gist, idx) => {
          return {...gist, firstFileRawContent: values[idx].data, forksCount: values[json.data.length + idx].data.length}
        })});
      })
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
}

export default getGists;

