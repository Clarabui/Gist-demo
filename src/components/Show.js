import { highlight } from "highlight.js";
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import 'highlight.js/styles/a11y-light.css';
import Highlight from "react-highlight-updated";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import axios from "axios";
import { useEffect } from "react";
import { getGistFiles } from '../services'


const Show = ({ setViewItem, item }) => {
  let { id } = useParams();

  useEffect(() => {
    console.log("Reach here");
    getGistFiles(item, (rawContents) => {
      let filesWithRawContents = {}

      Object
        .entries(item.files)
        .forEach(([fileName, fileData], idx) => {
          filesWithRawContents[fileName] = {...fileData, rawContent: rawContents[idx]}
        });

       setViewItem({...item, files: filesWithRawContents});
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {item.description}
        </div>

        {Object.values(item.files).map( file => {
          return (
            <div className="row border rounded-sm border-primary py-2 my-4" key={file.filename}>
              <div className="col">
                <div className="container">
                  <div className="row d-flex justify-content-between">
                    <div>
                     <CIcon content={freeSet.cilFile} size="lg" />
                      <a href={file.raw_url}>{file.filename}</a>
                    </div>
                    <button>Raw</button>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Highlight languagle={file.language}>
                        {file.rawContent}
                      </Highlight>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

const mapsStatesToProps = (state) => {
  return {
    item: state.viewGist.viewItem
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    setViewItem: (item) => dispatch({type: "setViewItem", data: {item: item}})
  }
}

export default connect(mapsStatesToProps, mapActionsToProps)(Show)