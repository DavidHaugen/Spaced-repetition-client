import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import config from '../../config';
import {Loader} from '../Utils/Utils';
import './Learn.css';

class Learn extends Component{
  state = {
    error: null,
    onResults: false,
    loading: true,
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
      this.setState({loading: false});
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
    this.setState({onResults: !this.state.onResults, loading: true})

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
        this.showFeedback();
        this.setState({loading: false});
        document.getElementById('learn-guess-input').value = '';
      });
    }
  }

  showFeedback() {
    const el = document.getElementById('feedback-overlay');
    el.classList.remove('hidden');

    setTimeout(() => {el.classList.add('hidden')}, 2500);
  }

  clearFeedback() {
    document.getElementById('feedback-overlay').classList.add('hidden');
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
      <div className="learn-page">
        {this.state.loading ? <div id="loading-overlay"><Loader /></div> : ''}
        <h3 id="feedback-overlay" className="hidden" onClick={this.clearFeedback}>{this.getResponseText()}</h3>
        <h2>Translate the word:</h2><span>{this.context.nextWord ?  this.state.onResults ? this.context.currWord.nextWord : this.context.nextWord.nextWord : null}</span>
        {/* <h2>Translate the word:</h2><span>{this.generateCurrentWord()}</span> */}
        <div className="DisplayScore">
          <p>Your total score is: {this.context.nextWord ? this.context.nextWord.totalScore : null}</p>
        </div>
        <div className="DisplayFeedback">
          <p className={this.state.onResults ? '' : 'hidden'}>{this.getResponseFeedback()}</p>
        </div>
        <form onSubmit={this.submitForm}>
          <label htmlFor="learn-guess-input" className={this.state.onResults ? 'hidden' : ''}>What's the translation for this word?</label>
          <input id="learn-guess-input" name="userinput" type="text" required={this.state.onResults ? false : true} className={this.state.onResults ? 'hidden' : ''} maxLength="25"></input>
          <button className="btn" type="submit">{this.getButtonText()}</button>
          {/* {this.generateButton()} */}
        </form>
        <p className="word-count">You have answered this word correctly {this.context.nextWord ? this.context.nextWord.wordCorrectCount : null} times.</p>
        <p className="word-count">You have answered this word incorrectly {this.context.nextWord ? this.context.nextWord.wordIncorrectCount : null} times.</p>
      </div>
    );
  }
}

export default Learn