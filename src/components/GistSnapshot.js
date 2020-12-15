import 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import 'highlight.js/styles/a11y-light.css';
import Highlight from "react-highlight-updated";

import './GistSnapshot.css'
import moment from 'moment';

const createdAtTimeDisplay = (createdAt) => {
  return moment(createdAt).fromNow();
}

const fileCount = (gist) => {
  return Object.values(gist.files).length;
}

const commentCount = (gist) => {
  return gist.comments;
}

const GistSnapshot = ({ item }) => {
  let firstFile = Object.values(item.files)[0];

  return (
    <>
      <div className="container py-1 mb-4">
        <div className="row">
          <div className="col-md-8">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img className="img-thumbnail rounded-circle user-avatar" src={item.owner.avatar_url} alt={item.owner.login} />
                </div>
                <div className="col">
                  <div className="wrapper">
                    <div>
                      <a href={item.owner.url}>{item.owner.login}</a>
                      <span> / </span>
                      <a href={firstFile.raw_url}>{firstFile.filename}</a>
                    </div>

                    <div>
                      <span> Created {createdAtTimeDisplay(item.created_at)}</span>
                    </div>

                    <div>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex flex-row">
              <div className="px-2">
                <CIcon content={freeSet.cilFile} size="lg" className="pr-1" />
                <span> {fileCount(item)} files</span>
              </div>
              <div className="px-2">
                <CIcon content={freeSet.cilFork} size="lg" className="pr-1" />
                <span> {item.forksCount} forks</span>
              </div>
              <div className="px-2">
                <CIcon content={freeSet.cilCommentSquare} size="lg" className="pr-1" />
                <span> {commentCount(item)} comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="border rounded-sm border-primary p-2 m-2">
              <Highlight language={firstFile.language} className="max-height-300">
                {item.firstFileRawContent}
              </Highlight>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GistSnapshot;