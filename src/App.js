import React, { Component } from 'react'
import Table from './Table'
import Form from './Form';
import axios from 'axios';

class App extends Component {
  state = {
    characters: []
  }

  removeCharacter = index => {
    const { characters } = this.state

    this.makeDeleteCall(characters[index]).then(callResult => {
      if (callResult === true) {
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index;
          }),
        })
      }
    });

  }
  render() {
    const { characters } = this.state

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleSubmit = character => {
    this.makePostCall(character).then(callResult => {
      if (callResult.status === 201) {
        this.setState({ characters: [...this.state.characters, callResult.data] });
      }
    });
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        this.setState({ characters });
      })
      .catch(function (error) {
        //Not handling the error. Just logging into the console.
        console.log(error);
      });
  }

  makePostCall(character) {
    return axios.post('http://localhost:5000/users', character)
      .then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

  makeDeleteCall(character) {
    return axios.delete('http://localhost:5000/users', { data: character })
      .then(function (response) {
        console.log(response);
        return (response.status === 200);
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
  }

}

export default App
