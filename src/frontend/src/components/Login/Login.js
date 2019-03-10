import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from '@material-ui/core/colors/orange';
import {connect} from 'react-redux'
import { setAuthorization, setSocialAuth } from '../../actions/userCreators'
import './Login.css'
import { withStyles } from '@material-ui/core/styles';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


firebase.initializeApp({
    apiKey: "AIzaSyDx0_JsSsE45hOx_XKwpVptROViTneTVbA",
    authDomain: "social-auth-7.firebaseapp.com"
})

class Login extends Component{
    state = {
        user: {
            login: '',
            password: '',
            confirmPassword: ''
        },
        toggleLogin: 0,
        isSigned: false,
        signType: 'log-in',
    };

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    handleRadio = event => {
        this.setState({ signType: event.target.value });
    };

    handleLoginChange = (event, toggleLogin) => {
        this.setState({ toggleLogin });
    };

    handleInput = (e) => {
       this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    componentDidMount (){
        firebase.auth().onAuthStateChanged(authenticated => {
            if (authenticated){
            const user = {login: firebase.auth().currentUser.displayName, password: 'signed-in-by-social'}
            this.setState({ user}, () => this.switchToMain())
            // console.log("authenticated", authenticated)
            }
        })
    }

    switchToMain = () => {
        this.props.setAuthorization(this.state.user)
        this.props.history.push({pathname: `/main`})
        if (firebase.auth()) this.props.setSocialAuth(firebase.auth())
    }

    render() {
        const { classes } = this.props;
        const { toggleLogin, signType, user: {login, password, confirmPassword} } = this.state;

        // let allChecks = ((toggleLogin === 0 && login !== '' && password !== '') || (toggleLogin === 1 && login !== '' && password !== '' && password === confirmPassword));
        return (
            <div className="login-container">
                <MuiThemeProvider theme={theme}>
                    <RadioGroup
                        aria-label="position"
                        name="position"
                        value={signType}
                        onChange={this.handleRadio}
                        row
                        style={style.radio}
                    >
                        <FormControlLabel
                            value="log-in"
                            control={<Radio color="primary" />}
                            label="Log in"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="register"
                            control={<Radio color="primary" />}
                            label="Register"
                            labelPlacement="top" color="primary"
                        />
                    </RadioGroup>
                    {!this.state.isSigned &&
                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                    }
                    <span>or</span>
                    <TextField
                        label="Login"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='login'
                        value={login}
                        onChange={this.handleInput}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='password'
                        value={password}
                        onChange={this.handleInput}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            }
                        }}
                    />
                    {signType === 'register' &&
                    <TextField
                        label="Confirm password"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleInput}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            }
                        }}
                    />
                    }
                    <Button onClick={this.switchToMain}
                            style={style.button}
                            disabled
                    >Submit
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    }
}
    const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
    typography: { useNextVariants: true },
    });

    const style={
      input:{
        width: '100%',
        height: '50px',
        color: '#fff',
        },
      button: {
        color: '#ff9800',
        marginTop: '30px'
        },
      submit:{
        height: '30px',
      },
      radio: {
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center'
        },
    }

const styles = theme => ({
    inputColor: {
        color:'#fff',
        width: '100%',
        height: '50px',
    },
});


const mapDispatchToProps = (dispatch) => {
    return {
        setAuthorization: (state) => dispatch(setAuthorization(state)),
        setSocialAuth: (auth) => dispatch(setSocialAuth(auth)),
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(Login))
