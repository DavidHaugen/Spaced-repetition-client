import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import config from '../../config';

class Learn extends Component{
  state = {
    error: null,
    response: {},
  }

  static contextType = UserContext

  componentDidMount(){
    return fetch(`${config.API_ENDPOINT}/language/head`,
    {headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.context.setNextWord(res)
    })
    .catch(err => this.setState({error: err}));
  }

  submitForm(e) {
    e.preventDefault();

    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({guess: e.target.userinput.value})
    })
      .then(res => res.json())
      .then(json => {
        this.context.setNextWord(json.nextWord);
        this.setState({response: json});
      });
  }

  render(){
    return (
    <div>
      <h2>Translate the word:</h2><span>{this.context.nextWord ? this.context.nextWord.nextWord : null}</span>
      <p>Your total score is: {this.context.nextWord ? this.context.nextWord.totalScore : null}</p>
      <main>
      <form onSubmit={this.submitForm}>
        <label htmlFor="learn-guess-input">What's the translation for this word?</label>
        <input id="learn-guess-input" name="userinput" type="text" required ></input>
        <button type="submit">Submit your answer</button>
      </form>
      <p>You have answered this word correctly {this.context.nextWord ? this.context.nextWord.wordCorrectCount : null} times.</p>
      <p>You have answered this word incorrectly {this.context.nextWord ? this.context.nextWord.wordIncorrectCount : null} times.</p>
    </main>
    </div>
   

  )}
}

export default Learn