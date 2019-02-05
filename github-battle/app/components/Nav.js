var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;


//Stateless functional component
function Nav () {
  // Note /battle and /popular will also active the home link (because the contain '/')
  // Need to add the 'exact' property for any subroutes!
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle' >
          Battle
        </NavLink>
      </li>
      <li><NavLink activeClassName='active' to='/popular' >
          Popular
        </NavLink></li>
    </ul>
  )
}

module.exports = Nav;