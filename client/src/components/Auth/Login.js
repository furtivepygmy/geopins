import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Context from '../../context';
import { ME_QUERY } from '../../graphql/queries';
import { BASE_URL } from '../../client';

const Login = ({ classes }) => {
  // Context
  const { dispatch } = useContext(Context);

  // Function #1: onSuccess
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;

      const client = new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
      });
      const { me } = await client.request(ME_QUERY);

      dispatch({
        type: 'SET_ISAUTH',
        payload: googleUser.isSignedIn()
      });

      dispatch({
        type: 'LOGIN_USER',
        payload: me
      });
    } catch (err) {
      onFailure(err);
    }
  };

  // Function #2: onFailure
  const onFailure = err => {
    console.error('Error logging in', err);
    dispatch({
      type: 'SET_ISAUTH',
      payload: false
    });
  };

  // Return statement
  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: 'rgb(66, 133, 244)' }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="167579674906-4g4m12ib0lags021vviic8ojk47v6gnb.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        buttonText="Login with Google"
        theme="dark"
      />
    </div>
  );
};

const styles = {
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

export default withStyles(styles)(Login);
