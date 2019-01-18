var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');

// Components have 3 parts:
//  -> state
//  -> lifecycle events (hook events into the lifecycle)
//  -> UI (only real required part of the 3)

class App extends React.Component {  
  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)