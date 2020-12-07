import './Loading.css'
import React from 'react';
import { connect } from 'react-redux';

const Loading = ({isLoading}) => {
  return (
     isLoading && <div className="loading--fullscreen">App is loading...</div>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.load.loading
  }
}

export default connect(
  mapStateToProps
)(Loading);