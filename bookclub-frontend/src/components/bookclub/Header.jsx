import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Login from '../sessions/Login.jsx';
import SignOut from '../sessions/SignOut.jsx';
import Logo from '../../pages/landingComponents/assets/bookSquid.svg';
import { searchByCategory } from '../../services/bookclubServices.js';
import Grid from '@material-ui/core/Grid';
// import Squid from './assets/Squid-Logo.png';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    fontSize: '16pt'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
    },
  },
  dropdown: {
    width: '5vw',
  },
  profileIcon: {
    fontSize: '50px',
    margin: '20px'
  },
  signOut: {
    display: 'flex-end'
  }
}));


const Header = (props) => {

  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('')
  const [searchCategory, setSearchCategory] = useState('');


  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput)
  }
  const handleCategorySelect = (e) => {
    setSearchCategory(e.target.value);

  }
  const handleSearchSubmit = (e) => {
    if (searchInput) {
      searchByCategory(null, searchInput)
        .then((results) => {
          props.setSearchResults(results)
        })
    }
  }



  return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>

          <Grid container>

            <Grid item>
              <Link to='/'>
                <ButtonBase >
                  <Typography className={classes.title} variant="h6" noWrap>
                    <img alt='' src={Logo} className="logo" />
                  </Typography>
                </ButtonBase>
              </Link>
            </Grid>

            <Grid item>
              {props.searchIsTrue
                ? null
                : <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    onChange={handleSearchInput}
                    placeholder="Search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                  <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select default="title" className={classes.dropdown} value='' variant="filled" label="Category" onChange={handleCategorySelect}>
                      <MenuItem disabled>Category</MenuItem>
                      <MenuItem value='title'>Title</MenuItem>
                      <MenuItem value='author'>Author</MenuItem>
                      <MenuItem value='genre'>Genre</MenuItem>
                    </Select>
                  </FormControl>
                  <Link to={'/search'}>
                    <Button variant="contained" onClick={handleSearchSubmit}>Search</Button>
                  </Link>
                </div>
              }
            </Grid>

            <Grid item>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                {!props.isLoggedIn
                  ? <Login
                    setIsLoggedIn={props.setIsLoggedIn}
                    setUidCookie={props.setUidCookie}
                    setEmailCookie={props.setEmailCookie} />

                  : <div>
                    <Grid container>
                      <Grid item>
                        <Link to='/profile'>
                          <ButtonBase >
                            <AccountCircle className={classes.profileIcon} />
                          </ButtonBase>
                        </Link>
                      </Grid>

                      <Grid item className={classes.signOut}>
                        <SignOut
                          removeEmailCookie={props.removeEmailCookie}
                          removeUidCookie={props.removeUidCookie}
                          setIsLoggedIn={props.setIsLoggedIn}
                        />

                      </Grid>

                    </Grid>
                  </div>
                }
              </div>
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </div >
  );
}

export default Header;
