import { connect } from "react-redux";
import Repeat from './Repeat.js';
import { useEffect } from 'react';
import { getGists } from '../services';
import GistSnapshot from './GistSnapshot';

const Home = (props) => {
  useEffect(() => {
    props.startFetchGists()
    getGists((json) => {
      props.setGists(json.data);
      props.finishFetchGists();
    })
  }, [])

  return (
    <Repeat
      items={props.items}
      renderedItem={ item => <GistSnapshot item={item} key={item.id} /> }
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