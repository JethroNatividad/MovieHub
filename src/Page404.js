import React, { Component } from 'react'
import {Grid, Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import './Page404.css'
class Page404 extends Component {
    render() {
        return (
            <Grid className='Page404'
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{height: '100vh'}}
                >
                    <h1>404 Page Not Found</h1>
                    <Link style={{textDecoration: 'none'}} to="/"><Button variant='contained' color='primary'>Go to home</Button></Link>
                </Grid>
        )
    }
}
export default Page404;