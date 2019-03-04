import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './Login.css'


class Login extends Component{
    state = {
        toggleLogin: 0,
        radio: 'passenger',
        login: '',
        password: '',
        confirmPassword: '',
    };

    handleLoginChange = (event, toggleLogin) => {
        this.setState({ toggleLogin });
    };

    handleRadio = event => {
        this.setState({ radio: event.target.value });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        const { login, password, confirmPassword, toggleLogin, radio } = this.state;
        console.log(radio);
        return (
            <div className="login-container">
                <MuiThemeProvider theme={theme}>
                    <Tabs
                        value={toggleLogin}
                        onChange={this.handleLoginChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Log in"/>
                        <Tab label="Register"/>
                    </Tabs>


                    <RadioGroup
                        aria-label="position"
                        name="position"
                        value={this.state.radio}
                        onChange={this.handleRadio}
                        row
                    >
                        <FormControlLabel
                            value="passenger"
                            control={<Radio color="primary" />}
                            label="passenger"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="driver"
                            control={<Radio color="primary" />}
                            label="driver"
                            labelPlacement="top" color="primary"
                        />
                    </RadioGroup>
                    <Button style={style.button} onClick={this.props.auth.login}>Log in with Google</Button>
                    <span>or</span>
                    <TextField
                        label="Login"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='login'
                        value={login}
                        onChange={this.handleInput}
                    />
                    <TextField
                        label="Password"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='password'
                        value={password}
                        onChange={this.handleInput}
                    />
                    {this.state.toggleLogin === 1 &&
                    <TextField
                        label="Confirm password"
                        id="mui-theme-provider-standard-input"
                        style={style.input}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleInput}
                    />
                    }
                    {((toggleLogin === 0 && login !== '' && password !== '') || (toggleLogin === 1 && login !== '' && password !== '' && password === confirmPassword))
                    && <Button style={style.button}>Submit</Button>
                    }
                </MuiThemeProvider>
            </div>
        )
    }
}
const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: purple,
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
    }
}
export default Login
