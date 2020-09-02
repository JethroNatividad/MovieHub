import React, { Component } from 'react';
import { Grid, Container, GridListTile, GridListTileBar, CircularProgress } from '@material-ui/core'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import axios from 'axios'
import './MovieList.css'
import noPoster from './noPoster.jpeg'

const API_URL = 'http://www.omdbapi.com/?apikey=thewdb&'
class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            error: null,
            loading: true,
            currPage: 1
        }
        this.maxPages = null
        this.search = this.props.match.params.search
        this.handleClick = this.handleClick.bind(this)
        this.FetchMovies = this.FetchMovies.bind(this)
        this.changePage = this.changePage.bind(this)
    }

async FetchMovies(){
    const res = await axios.get(`${API_URL}s=${this.search}`)
    if (res.data.Response === 'True') {
        const movies = res.data.Search
        const pages = res.data.totalResults / 10
        const maxPages = pages % 1 !== 0 ? Math.floor(pages) + 1 : pages
        this.maxPages = maxPages
        this.setState(st => ({ ...st, movies: movies, error: null, loading: false}))
    } else {
        this.setState(st => ({ ...st, movies: [], error: res.data.Error, loading: false }))
    }
}
handleClick(imdbID) {
    this.props.history.push(`/movie/${imdbID}`)
}
componentDidMount() {
    this.FetchMovies()
}
changePage(eq){
    this.setState(st => ({...st, loading: true}))
    axios.get(`${API_URL}s=${this.search}&page=${this.state.currPage + eq}`).then(res => {
            this.setState(st => ({...st, movies: res.data.Search, currPage: st.currPage + eq, loading: false}))
        })
}
render() {
    if (this.state.loading) {
        return (
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <CircularProgress />
            </Grid>
        )
    } else if (this.state.error) {
        return (
                <div className='MovieList-bg'>
                    <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ height: '100vh' }}
                >
                    <h1>
                        {this.state.error}
                    </h1>
                    </Grid>
                </div>
        )
    } else {
        return (
            <div className='MovieList-bg'>
                <Container className='MovieList'>
                    <Grid className='MovieListGrid' justify='center' spacing={3} container>
                        {this.state.movies.map(m => (
                            <Grid key={m.imdbID} className='MovieList-Movie' onClick={() => this.handleClick(m.imdbID)} item xs={6} sm={4} lg={3}>
                                <GridListTile className='GridListTile'>
                                    <img className='Poster' src={m.Poster !== 'N/A' ? m.Poster : noPoster} alt={m.Title} />
                                    <GridListTileBar title={m.Title} />
                                </GridListTile>
                            </Grid>
                        ))}
                    </Grid>
                    <MobileStepper
                        steps={this.maxPages}
                        activeStep={this.state.currPage - 1}
                        variant='text'
                        nextButton={
                            <Button size="small" onClick={() => this.changePage(+1)} disabled={this.state.currPage - 1 === this.maxPages - 1}>
                                Next
                                    <KeyboardArrowRight />
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={() => this.changePage(-1)} disabled={this.state.currPage === 1}>
                                Prev
                                    <KeyboardArrowLeft />
                            </Button>
                        }
                        >
                    </MobileStepper>
                </Container>
            </div>
        )
    }
}
}
export default MovieList;