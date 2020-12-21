import './App.css';
import Show from './components/Show';
import Home from './components/Home';
import Loading from './components/Loading';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
      <Loading />
      <Router>
        <Switch>
          <Route path='/show/:id'>
            <Show />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
