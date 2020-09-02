import React, { Component } from 'react';
import Movie from './Movie';
import Page404 from './Page404'
import MovieList from './MovieList';
import SearchMovies from './SearchMovies';
import {Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './Navbar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* //here is the navbar */}
        <Navbar/>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/search'/>}/>
          <Route exact path='/search' component={SearchMovies}/>
          <Route exact path='/search/:search/' component={MovieList}/>
          <Route exact path='/movie/:imdbID' component={Movie}/>
          <Route component={Page404}/>
        </Switch>
      </div>
    )
  }
}

export default App;