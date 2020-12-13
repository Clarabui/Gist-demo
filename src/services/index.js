
import axios from 'axios';

const getGists = (successHandler) => {
  axios.get("/gists.json")
  .then(json => {
    console.log("Do something with response first (like download short Content)", json);

    let rawFileFetches = json.data.map(gist =>  {
        let firstFile = Object.values(gist.files)[0];
        return axios.get(firstFile.raw_url)
    })

    Promise
      .all(rawFileFetches)
      .then(rawContentResp => {
        successHandler({data: json.data.map((gist, idx) => {
          return {...gist, firstFileRawContent: rawContentResp[idx].data}
        })});
      })
      .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
}

export default getGists;

