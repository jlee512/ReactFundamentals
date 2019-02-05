var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Switch = ReactRouter.Switch;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

// Components have 3 parts:
//  -> state
//  -> lifecycle events (hook events into the lifecycle)
//  -> UI (only real required part of the 3)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} ></Route>
            <Route exact path='/battle' component={Battle} ></Route>
            <Route path='/popular' component={Popular} ></Route>
            <Route render={() => {
              return <p>Not Found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;