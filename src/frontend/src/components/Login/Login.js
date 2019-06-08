import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import {connect} from 'react-redux'
import { setAuthorization, setSocialAuth, setAuthByToken } from '../../actions/userCreators'
import { setMainTripIdFromStorage } from '../../actions/tripCreators'
import {withStyles} from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';
import './Login.css'


firebase.initializeApp({
    apiKey: 'AIzaSyDx0_JsSsE45hOx_XKwpVptROViTneTVbA',
    authDomain: 'social-auth-7.firebaseapp.com'
})

const phoneNumber = /^\+?[0-9]{10}/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


class Login extends Component {

    state = {
        user: {
            login: '',
            password: '',
            token: '',
            confirmPassword: ''
        },
        isSigned: false,
        signType: 'log-in',
        passwordIsHidden: true,
        error: {
            login: '',
            password: '',
            confirmPassword: '',
        }
    };
    loginInput = React.createRef();


    uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    onBlur = ({target: {name}}) => {
        this.validate(name)
    }

    onFocus = ({target: {name}}) => {
        this.setState({error: {...this.state.error, [name]: ''}})
    }

    validate = (name) => {
        const {login, password, confirmPassword} = this.state.user
        if (name === 'login') {
            if (!(phoneNumber.test(login.split('-').join('')) || email.test(login.toLowerCase()))) {
                this.setState({error: {...this.state.error, login: 'Please enter valid email or phone number'}})
            }
        }
        if (name === 'password' && password.length < 5) {
            this.setState({error: {...this.state.error, password: 'Password has to be 5 characters at least'}})
        }
        if (name === 'confirmPassword' && password !== confirmPassword) {
            this.setState({error: {...this.state.error, password: 'Passwords do not match'}})
        }
    }

    handleRadio = event => {
        this.setState({signType: event.target.value})
        this.loginInput.current.focus();
    };

    handleInput = ({target: {name, value}}) => {
        this.setState({user: {...this.state.user, [name]: value}})
    }

    componentDidMount() {
        this.props.setAuthByToken();
        if (localStorage.getItem('tripId') && localStorage.getItem('iTripper_page') === '/main'){
            this.props.setMainTripIdFromStorage()
        }

        firebase.auth().onAuthStateChanged(authenticated => {
            if (authenticated) {
                let token = null
                firebase.auth().currentUser.getIdToken()
                    .then(result => token = result)
                    .catch(console.log)
                authenticated.getIdToken()
                    .then(res => {
                        const user = {login: firebase.auth().currentUser.email, token}
                        this.setAuth(user)
                    })
                // console.log("authenticated", authenticated)
            }
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.users.isAuthenticated !== prevProps.users.isAuthenticated && this.props.users.isAuthenticated) {
            let path = null
            if (this.state.signType === 'log-in') {
                if (localStorage.getItem('iTripper_page')) {
                    path = localStorage.getItem('iTripper_page')
                } else {
                    path = '/smart'
                }
            } else path = '/profile'
            this.props.history.push({pathname: path})
        }
    }

    setAuth = (user) => {
        this.props.setAuthorization(user, this.state.signType)
        if (firebase.auth()) this.props.setSocialAuth(firebase.auth())
    }

    togglePasswordMask = () => {
        this.setState(prevState => ({
            passwordIsHidden: !prevState.passwordIsHidden,
        }));
    }


    render() {
        const {classes} = this.props
        const {signType, passwordIsHidden, user: {login, password, confirmPassword}} = this.state
        const allChecks = (phoneNumber.test(login.split('-').join('')) || email.test(login.toLowerCase())) &&
            ((signType === 'log-in' && login !== '' && password.length >= 5) ||
                (signType === 'register' && login !== '' && password.length >= 5 && password === confirmPassword))
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
                            control={<Radio color="primary"/>}
                            label="Log in"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="register"
                            control={<Radio color="primary"/>}
                            label="Register"
                            labelPlacement="top" color="primary"
                        />
                    </RadioGroup>

                    <StyledFirebaseAuth
                        uiConfig={this.uiConfig}
                        firebaseAuth={firebase.auth()}
                    />

                    {signType === 'log-in' && <span>or</span>}
                    <TextField
                        label="Phone or email"
                        autoFocus={true}
                        style={style.input}
                        autoComplete="off"
                        name='login'
                        value={login}
                        onChange={this.handleInput}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        error={this.state.error.login.length > 0}
                        helperText={this.state.error.login}
                        inputRef={this.loginInput}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            }
                        }}
                    />
                    <TextField
                        label="Password"
                        type={passwordIsHidden ? 'password' : 'text'}
                        style={style.input}
                        autoComplete="off"
                        name='password'
                        value={password}
                        onChange={this.handleInput}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        error={this.state.error.password.length > 0}
                        helperText={this.state.error.password}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        className={classes.eye}
                                        onClick={this.togglePasswordMask}
                                    >
                                        {this.state.passwordIsHidden ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {signType === 'register' &&
                    <TextField
                        label="Confirm password"
                        type={passwordIsHidden ? 'password' : 'text'}
                        style={style.input}
                        autoComplete="off"
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleInput}
                        onBlur={this.onBlur}
                        onFocus={this.onFocus}
                        error={this.state.error.confirmPassword.length > 0}
                        helperText={this.state.error.confirmPassword}
                        InputProps={{
                            classes: {
                                input: classes.inputColor
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        className={classes.eye}
                                        onClick={this.togglePasswordMask}
                                    >
                                        {this.state.passwordIsHidden ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    }
                    {signType === 'log-in' &&
                    <Link href={'/restore_password'} className={classes.link}>
                        forgot password?
                    </Link>
                    }
                    <Button onClick={() => this.setAuth(this.state.user)}
                            disabled={!allChecks}
                            style={style.button}
                            classes={{
                                root: classes.root,
                                label: classes.label
                            }}
                    >
                        Submit
                    </Button>
                </MuiThemeProvider>
            </div>
        )
    }
}

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: {useNextVariants: true}
})

const style = {
    input: {
        width: '100%',
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '30px'
    },
    radio: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center'
    }
}

const styles = theme => ({
    inputColor: {
        color: '#fff',
        width: '100%',
    },
    root: {
        background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: '0 30px'
    },
    label: {
        textTransform: 'capitalize'
    },
    eye: {
        cursor: 'pointer',
        color: '#3E4566',
        '&:focus': {
            outline: 'none',
        }
    },
    link: {
        marginTop: 30,
        color: '#262626',
    },
})

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthorization: (state, signType) => dispatch(setAuthorization(state, signType)),
        setSocialAuth: (auth) => dispatch(setSocialAuth(auth)),
        setAuthByToken: () => dispatch(setAuthByToken()),
        setMainTripIdFromStorage: () => dispatch(setMainTripIdFromStorage())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login))
