import { connect } from "react-redux";
import Repeat from './Repeat.js';
import { useEffect } from 'react';
import getGists from '../services';

const Home = (props) => {
  useEffect(() => {
    props.startFetchGists()
    getGists((json) => {
      props.setGists(json.data);
      props.finishFetchGists();
    })
  }, [])

  return (
    <Repeat items={props.items} renderedItem={(item) => {
      return (
        <div key={item.id}>
          <h1>{item.id}</h1>
          <img src={item.owner.avatar_url} />
          <h5>{item.owner.login}</h5>
          <h5>{item.created_at}</h5>
          <h5>{item.description}</h5>
          <h5>{Object.entries(item.files)[0][1].raw_url}</h5>
        </div>
      )
    }}
    />
  )
}

const mapStatesToProps = (state) => {
  return {
    items: state.gists.items
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    startFetchGists: () => dispatch({ type: 'load' }),
    finishFetchGists: () => dispatch({ type: 'finishLoad' }),
    setGists: (gists) => dispatch({ type: 'setGists', data: { items: gists } })
  }
}

export default connect(mapStatesToProps, mapActionsToProps)(Home)