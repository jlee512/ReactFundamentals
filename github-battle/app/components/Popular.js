var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map((lang) => {
        //  Need to bind the specific list item to the onClick handler
        // -> We can also use .bind() in this case
        // -> We already know what the 'this' keyword refers to but we can pass in a second argument which is the function argument
        return (
          <li
            style={lang === props.selectedLanguage ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map((repo, index) => {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        );
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

// state
// lifecycle events
// UI

// Want state to keep track of which tab is active
class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    // Binds the component instance to this component
    //  We use the 'this'  keyword in this function and we want to be always bound to this component
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  // Invoked by React whenever the component is mounted to the screen (i.e. is visible)
  // --> This is where we want to make AJAX requests
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  //  Method to update the state when a different language is selected
  // Need to connect this function to a particular list item (so that we can update the correct language)
  updateLanguage(lang) {
    // We use the this keyword -> we don't know what this is bound to until we invoke the function
    // If we have the wrong context, setState may be undefined...
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(() => {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
          {!this.state.repos 
            ? <p>LOADING</p>
            : <RepoGrid repos={this.state.repos} />}        
      </div>
    )
  }
}



module.exports = Popular