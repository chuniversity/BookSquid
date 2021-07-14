import React from 'react';
import fire from '../fire';
import Login from '../components/sessions/Login';
import SignOut from '../components/sessions/SignOut';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LandingPage from './landingComponents/LandingPage.jsx'
import makeStyles from '@material-ui/core/styles/makeStyles'

const Landing = (props) => {




  return (
    <div>
      <LandingPage
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
        uidCookie={props.uidCookie}
        setUidCookie={props.setUidCookie}
        removeUidCookie={props.removeUidCookie}
        emailCookie={props.emailCookie}
        setEmailCookie={props.setEmailCookie}
        removeEmailCookie={props.removeEmailCookie}
        setSearchResults={props.setSearchResults}
        setBook={props.setBook}
      />
    </div>);
}

export default Landing;
