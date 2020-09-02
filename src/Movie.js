import React, { Component } from 'react'
import axios from 'axios'
import noPoster from './noPoster.jpeg'
import {CircularProgress, Grid, Container} from '@material-ui/core'
import './Movie.css'
const API_URL = 'http://www.omdbapi.com/?apikey=thewdb&'
class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
        this.imdbID = this.props.match.params.imdbID
        this.movie = null
    }
    async componentDidMount(){
        const res = await axios.get(`${API_URL}i=${this.imdbID}&plot=full`)
        this.movie = res.data
        this.setState({loading: false})
        console.log(this.movie)
    }
    render() {
        if(this.state.loading){
            return(
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{height: '100vh'}}
                >
                    <CircularProgress/>
                </Grid>
            )
        } else{
            return (
                <div className='Movie-bg'>
                    <Container className="Movie">
                        <Grid container
                        justify="center"
                        spacing={2}
                    >
                            <Grid item xs={12} sm={4}>
                                <img src={this.movie.Poster !== 'N/A' ? this.movie.Poster : noPoster} alt={this.movie.imdbID} />
                            </Grid>
                            <Grid className='Movie-info' item xs={12} sm={8}>
                                <div>
                                    <h1>{this.movie.Title}</h1>
                                    <h3>{this.movie.Year} <br/> {this.movie.Genre}</h3>
                                    <p><i class="fa fa-globe" aria-hidden="true"></i> - {this.movie.Language}</p>
                                    <p><i class="fa fa-clock-o" aria-hidden="true"></i> - {this.movie.Runtime} </p>
                                    <p><i class="fa fa-star" aria-hidden="true"></i> - {this.movie.imdbRating} </p>
                                </div>
                            </Grid>
                            <Grid className='Bottom a' xs={12} sm={8}>
                                <h2>Plot</h2>
                                <p>{this.movie.Plot}</p>
                            </Grid>
                            <Grid className='Bottom b' xs={12} sm={4}>
                                <p>Director: {this.movie.Director} </p>
                                <p>Writer: {this.movie.Writer} </p>
                                <p>Actors: {this.movie.Actors} </p>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            )
        }
    }
}
export default Movie