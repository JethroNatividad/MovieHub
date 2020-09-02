import React, { Component } from 'react';
import Movie from './Movie';
import MovieList from './MovieList';
import SearchMovies from './SearchMovies';
import {Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './Navbar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/search'/>}/>
          <Route exact path='/search' component={SearchMovies}/>
          <Route exact path='/search/:search/' component={MovieList}/>
          <Route exact path='/movie/:imdbID' component={Movie}/>
        </Switch>
      </div>
    )
  }
}

export default App;