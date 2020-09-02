import React, { Component } from 'react';
import { Grid, Container, GridListTile, GridListTileBar, CircularProgress} from '@material-ui/core'
import { MobileStepper, Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './MovieList.css'
import noPoster from './noPoster.jpeg'

//api endpoint
const API_URL = 'https://www.omdbapi.com/?apikey=thewdb&'
class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            error: null,
            loading: true,
            currPage: 1
        }
        //the max page
        this.maxPages = null
        //the search term in the params
        this.search = this.props.match.params.search
        this.handleClick = this.handleClick.bind(this)
        this.FetchMovies = this.FetchMovies.bind(this)
        this.changePage = this.changePage.bind(this)
    }

    async FetchMovies() {
        //request to the api endpoint
        const res = await axios.get(`${API_URL}s=${this.search}`)
        if (res.data.Response === 'True') {
            const movies = res.data.Search
            //calculates the number of pages
            //get the total results from the api, ex: totalResults = 104
            //divide the total results to the number of movies displayed each page.
            //on the API, we get 10 movies per page so 104(Total Movies) divided by 10(Movies Per Page)
            //the result of 104 / 10 is 10.4 , we add 1 if the result has decimal for total pages. 
            const pages = res.data.totalResults / 10
            const maxPages = pages % 1 !== 0 ? Math.floor(pages) + 1 : pages
            this.maxPages = maxPages
            this.setState(st => ({ ...st, movies: movies, error: null, loading: false }))
        } else {
            this.setState(st => ({ ...st, movies: [], error: res.data.Error, loading: false }))
        }
    }
    //on clicking a movie
    handleClick(imdbID) {
        //redirect it to /movie/imdbID
        this.props.history.push(`/movie/${imdbID}`)
    }
    //fetch movies on load
    componentDidMount() {
        this.FetchMovies()
    }
    //this handles page changing
    changePage(eq) {
        //sets loading to true
        this.setState(st => ({ ...st, loading: true }))
        //fetch movies from the api with the page parameter
        axios.get(`${API_URL}s=${this.search}&page=${this.state.currPage + eq}`).then(res => {
            this.setState(st => ({ ...st, movies: res.data.Search, currPage: st.currPage + eq, loading: false }))
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
                        direction="column"
                        justify="center"
                        alignItems="center"
                        style={{ height: '100vh' }}
                    >
                        <h1>
                            Couldn't find any movie. Please search again using
                            another search criteria.
                    </h1>
                        <Link style={{ textDecoration: 'none' }} to="/"><Button variant='contained' color='primary'>Search Again</Button></Link>
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