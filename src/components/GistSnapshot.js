import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './GistSnapshot.css'

const GistSnapshot = ({ item }) => {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <span class="col">
              <img class="img-thumbnail rounded-circle user-avatar" src={item.owner.avatar_url} />
            </span>
            <span class="col">
              <a href="item.owner.url">{item.owner.login}</a>
              <p>{item.created_at}</p>
            </span>
          </div>
          <div class="col-md-6">
            right
          </div>
        </div>
      </div>
      <h1>{item.id}</h1>
      <h5>{item.description}</h5>
      <h5>{Object.entries(item.files)[0][1].raw_url}</h5>
    </>
  )
}

export default GistSnapshot;