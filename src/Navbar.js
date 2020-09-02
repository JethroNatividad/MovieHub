import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button'
import { Redirect, NavLink } from 'react-router-dom'
const _useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'inline-block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const _classes = _useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(_classes.list, {
        [_classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem text>
          <ListItemText primary='MOVIE HUT' />
        </ListItem>
        <NavLink style={{textDecoration: 'none', color: 'inherit'}} to="/">
          <ListItem button>
            <ListItemIcon><i className='fa fa-home' /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      {state.redirect && <Redirect to={`/search/${state.search}`}/>}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
            {list('left')}
          </Drawer>
          <Typography className={classes.title} variant="h6" noWrap>
            MOVIE HUT
          </Typography>
          <NavLink to='/search/'>
              <Button>
                <SearchIcon style={{color: 'white'}}/>
              </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}