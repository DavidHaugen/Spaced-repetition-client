import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import config from '../../config';

class Learn extends Component{
  state = {
    error: null,
    onResults: false
  }

  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
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
      this.context.setNextWord(res);
    })
    .catch(err => this.setState({error: err}));
  }

  submitForm(e) {
    e.preventDefault();

    if(this.state.onResults){
      this.setState({onResults: !this.state.onResults})
    } else {
    this.context.setCurrWord(this.context.nextWord)
    this.context.setGuess(e.target.userinput.value)
    this.setState({onResults: !this.state.onResults})

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
        this.context.setNextWord(json);
        document.getElementById('learn-guess-input').value = '';
      });
    }
  }

  getResponseText() {
    if(this.context.nextWord)
     if(typeof this.context.nextWord.isCorrect !== 'undefined') {
      if(this.context.nextWord.isCorrect) {
        return 'You were correct! :D';
      } else {
        return 'Good try, but not quite right :(';
      }
    }
  }

  getResponseFeedback(){
    if(this.context.nextWord && typeof this.context.nextWord.isCorrect !== 'undefined'){
        return `The correct translation for ${this.context.currWord.nextWord} was ${this.context.nextWord.answer} and you chose ${this.context.guess}!`
    }
  }

  generateCurrentWord(){
    if(this.state.onResults){
      return this.context.currWord.nextWord
    } else {
      return this.context.nextWord ? this.context.nextWord.nextWord : null
    }
  }

  generateButton(){
    if(this.state.onResults){
      return <button onClick={() => this.moveToNextWord}>{this.getButtonText()}</button>
    } else{
      return <button type="submit">{this.getButtonText()}</button>
    }
  }

  getButtonText(){
    if(this.state.onResults){
      return 'Try another word!'
    } else return 'Submit your answer';
  }

  setRequired() {
    if(this.state.onResults){
      return null
    } else{
      return 'required'
    }
  }

  render(){
    return (
      <div>
        <h3>{this.getResponseText()}</h3>
        <h2>Translate the word:</h2><span>{this.context.nextWord ?  this.state.onResults ? this.context.currWord.nextWord : this.context.nextWord.nextWord : null}</span>
        {/* <h2>Translate the word:</h2><span>{this.generateCurrentWord()}</span> */}
        <div className="DisplayScore">
          <p>Your total score is: {this.context.nextWord ? this.context.nextWord.totalScore : null}</p>
        </div>
        <div className="DisplayFeedback">
          <p>{this.getResponseFeedback()}</p>
        </div>
        <form onSubmit={this.submitForm}>
          <label htmlFor="learn-guess-input">What's the translation for this word?</label>
          <input id="learn-guess-input" name="userinput" type="text" required={this.state.onResults ? false : true} ></input>
          <button type="submit">{this.getButtonText()}</button>
          {/* {this.generateButton()} */}
        </form>
        <p>You have answered this word correctly {this.context.nextWord ? this.context.nextWord.wordCorrectCount : null} times.</p>
        <p>You have answered this word incorrectly {this.context.nextWord ? this.context.nextWord.wordIncorrectCount : null} times.</p>
      </div>
    );
  }
}

export default Learn