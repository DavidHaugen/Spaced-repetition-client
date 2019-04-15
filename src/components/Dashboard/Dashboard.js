import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import config from '../../config';
import './Dashboard.css'

class Dashboard extends Component{
  state = {
    error: null,
  }

  static contextType = UserContext

  componentDidMount(){
    return fetch(`${config.API_ENDPOINT}/language`,
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
    // let result = [<li key={-1}><h4>English/{this.context.language.name}</h4><h4>Correct tries/Incorrect tries</h4></li>];
    let result = []
    words.forEach((word, key) => {
      // result.push(<li key={key}><h4>{word.translation}/{word.original}</h4><h4>{word.correct_count}/{word.incorrect_count}</h4></li>)
      result.push(<li key={key}><h4>{word.original}</h4><span>correct answer count: {word.correct_count}</span> <span>incorrect answer count: {word.incorrect_count}</span></li>)
    })
    return <ul className="word-list">{result}</ul>
  }

  render(){
    return (
    <div>
      <h2>{this.context.language ? this.context.language.name : null}</h2>
      <Link to='/learn' >
        <Button className="btn">
          Start practicing
        </Button>
      </Link>
      <h3>Words to practice</h3>
      <div>
        {this.context.words ? this.generateList(this.context.words) : null}
      </div>
      <section>
        <h4>{this.context.language ? `Total correct answers: ${this.context.language.total_score}` : null }</h4>
      </section>
    </div>
  )}
}

export default Dashboard