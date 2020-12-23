
import axios from 'axios';

const productionMode = () => process.env.REACT_APP_ENV === "production";

const getGists = (successHandler) => {
  let gistsEndpoint;

  if (productionMode()) {
    axios.defaults.baseURL = "https://api.github.com";
    gistsEndpoint = "gists/public";
  } else {
    gistsEndpoint = "gists.json";
  }

  axios.get(gistsEndpoint, { params: { per_page: 5 }})
    .then(json => {
      let rawFileFetches = json.data.map(gist => {
        let firstFile = Object.values(gist.files)[0];
        return axios.get(firstFile.raw_url)
      })

      let forkFileFetches = json.data.map(gist => {
        return axios.get(gist.forks_url);
      })

      Promise
        .all([...rawFileFetches, ...forkFileFetches])
        .then(values => {
          successHandler({
            data: json.data.map((gist, idx) => {
              return { ...gist, firstFileRawContent: values[idx].data, forksCount: values[json.data.length + idx].data.length }
            })
          });
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const getGistFiles = (gist, handleFn) => {
  let rawContentRequests = Object.values(gist.files).map(file => axios.get(file.raw_url));

  Promise
    .all(rawContentRequests)
    .then(values => {
      handleFn(values.map(v => v.data));
    }).catch(err => console.error(err));
}

export { getGists, getGistFiles };

