var React = require('react');
var Popular = require('./Popular')

// Components have 3 parts:
//  -> state
//  -> lifecycle events (hook events into the lifecycle)
//  -> UI (only real required part of the 3)

class App extends React.Component {  
  render() {
    return (
      <div className='container'>
        <Popular />
      </div>
    )
  }
}

module.exports = App;