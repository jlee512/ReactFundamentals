var React = require('react');

// Want state to keep track of which tab is active

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All'
    };

    // Binds the component instance to this component
    //  We use the 'this'  keyword in this function and we want to be always bound to this component
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  //  Method to update the state when a different language is selected
  // Need to connect this function to a particular list item (so that we can update the correct language)
  updateLanguage(lang) {
    // We use the this keyword -> we don't know what this is bound to until we invoke the function
    // If we have the wrong context, setState may be undefined...
    this.setState(() => {
      return {
        selectedLanguage: lang
      }
    })
  }

  render() {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
      <ul className='languages'>
        { languages.map((lang) => {
          //  Need to bind the specific list item to the onClick handler
          // -> We can also use .bind() in this case
          // -> We already know what the 'this' keyword refers to but we can pass in a second argument which is the function argument
          return (
            <li
              style = { lang === this.state.selectedLanguage ? { color: '#d0021b'} : null } 
              onClick={ this.updateLanguage.bind(null, lang) }
              key={ lang }>
              { lang }
            </li>
          )
        })}
      </ul>
    )
  }
}

module.exports = Popular