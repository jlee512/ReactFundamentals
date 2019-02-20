var axios = require('axios');

var id = "70455c10fcd45323992b";
var sec = "56139f283a4d0e8bcb03e3b6971c5ad8f893c330";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username) {
  // Returns a promise!
  return axios.get('https://api.github.com/users/' + username + params)
      .then(function(user) {
        return user.data;
      });
}

function getRepos(username) {
  // Also returns a Promise!
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo) {
    return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError(error) {
  console.warn(error);
  return null;
}

function getUserData(player) {
  // axios.all takes an array of promises and once resolved, runs a particular function
  //  -> Returns an array which corresponds to the promise ordering in axios.all
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  });
}

function sortPlayers(players) {
  return players.sort(function(a, b) {
    return b.score - a.score;
  })
}

module.exports = {
  battle: function (players) {
    return axios.all(players.map(getUserData))
          .then(sortPlayers)
          .catch(handleError);
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language +
      '&sort=stars&order=desc&typetype=Repositories');

    return axios.get(encodedURI)
      .then((res) => {
        return res.data.items;
      });
  }
}