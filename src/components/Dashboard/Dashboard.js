import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'
import './Dashboard.css'

class Dashboard extends Component{
  state = {
    error: null,
  }

  static contextType = UserContext

  componentDidMount(){
    return fetch('http://localhost:8000/api/language',
    {headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
    .then(res => {
      this.context.setLanguage(res.language)
      this.context.setWords(res.words)
    })
    .catch(err => this.setState({error: err}));
  }

  generateList(words){
    let result = [<li key={-1}><span>English/{this.context.language.name}</span><span>Correct tries/Incorrect tries</span></li>];
    words.forEach((word, key) => {
      result.push(<li key={key}><span>{word.translation}/{word.original}</span><span>{word.correct_count}/{word.incorrect_count}</span></li>)
    })
    return <ul className="word-list">{result}</ul>
  }

  render(){
    return (
    <div>
      <h2>{this.context.language ? this.context.language.name : null}</h2>
      <Button className="btn">
        Start practicing
      </Button>
      <h3>Words to practice: </h3>
      <div>
        {this.context.words ? this.generateList(this.context.words) : null}
      </div>
    </div>
  )}
}

export default Dashboard