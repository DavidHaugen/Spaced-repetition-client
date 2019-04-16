import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import config from '../../config';
import './Dashboard.css'

function WordListRow(props) {
  return (
    <li>
      <h4>{props.word.original}</h4>
      <div>
        <span>correct answer count: {props.word.correct_count}</span> 
        <span>incorrect answer count: {props.word.incorrect_count}</span>
      </div>
    </li>
  );
}

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
    let result = [];

    words.forEach((word, key) => {
      result.push(<WordListRow key={key} word={word} />);
    })
    return <ul className="word-list">{result}</ul>
  }

  render(){
    return <>
      <h2 className="full-header">{this.context.language ? this.context.language.name : null}</h2>
      <div className="header-stretch"></div>
      <Link to='/learn' >
        <Button className="btn">
          Start practicing
        </Button>
      </Link>
      <h3>Words to practice</h3>
      <div>
        {this.context.words ? this.generateList(this.context.words) : null}
      </div>
      <section className="total-correct">
        <h4>{this.context.language ? `Total correct answers: ${this.context.language.total_score}` : null }</h4>
      </section>
  </>}
}

export default Dashboard