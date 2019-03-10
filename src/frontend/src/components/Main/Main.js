import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut } from '../../actions/userCreators'
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";
import TextField from '@material-ui/core/TextField';
import './Main.css'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380;

const styles = theme => ({
    root: {
        width: windowWidth,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
    },
    root1: {
        width: windowWidth,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 45,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        width: windowWidth * .9,
    },
    inputColor: {
        color:'#fff',
        width: '100%',
      },
    inputLabel: {
        color: '#fff',
    }
});
const style={
    input:{
        width: '100%',
    },
    radio: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center'
    },
    button: {
        color: '#ff9800',
        marginTop: '30px'
    },
}

const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
    typography: { useNextVariants: true },
});


class Main extends Component{
    state = {
        role: 'passenger',
        selectedIndex: 1,
        from: '',
        to: '',
        places: ['Home', 'Job', 'Parents', 'Sports', 'DAN IT'],
        // cars: ['RangeRover Supercharged'],
        newCar: '',
        car: '',
    };

    handlePlacesListClick = (event, index, item) => {
        this.setState({ selectedIndex: index });
        if (this.state.from === '') this.setState({from: item})
        else if (this.state.to === '') this.setState({to: item})
    };

    handleRadio = event => {
        this.setState({ role: event.target.value });
    };

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleRoute = () => {
        const { places, from, to } = this.state
        let array = [...places]
        if (!places.includes(from)) array.push(from)
        if (!places.includes(to)) array.push(to)
        this.setState({places: array})
    }


    signOut = (auth) => {
        if (auth) auth.signOut();
        this.props.logOut()
    }

    componentDidMount() {
        if (this.props.users.cars.length === 1) this.setState({car: this.props.users.cars[0]})
    }

    render() {
        const { classes } = this.props;
        const { role, from, to, car } = this.state;
        const { auth, cars } = this.props.users;
        let currentCar = cars.length === 1 ? cars[0] : car;
        let submitChecks = false;
        let submitButtonText = '';
        if (role === 'passenger') {
            submitChecks = from && to;
            submitButtonText = 'Submit route'
        }
        else {
            submitChecks = from && to && car;
            submitButtonText = 'Submit route and car'
        }

        const placesList = this.state.places.map((item, index) => {
            return (
                <div key = {index}>
                <ListItem
                    button
                    selected={this.state.selectedIndex === index}
                    onClick={event => this.handlePlacesListClick(event, index, item)}
                >
                    <ListItemText primary={item} />
                </ListItem>
                </div>
            )
        })

        const carList = cars.map((item, index) => {
            return  <MenuItem value={item} key = {index}>{item}</MenuItem>
        })

        return (
            <>

            <div className="welcome-user">
            <span className="welcome-span role-question">what is your today's role?</span>
              <MuiThemeProvider theme={theme}>

                <RadioGroup
                aria-label="position"
                name="position"
                value={role}
                onChange={this.handleRadio}
                row
                style={style.radio}
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
                  <span className="welcome-span">Enter your route:</span>
                  <TextField
                      label="From:"
                      id="mui-theme-provider-standard-input"
                      style={style.input}
                      name='from'
                      value={from}
                      onChange={this.handleInput}
                      InputProps={{
                          classes: {
                              input: classes.inputColor
                          }
                      }}
                  />
                  <TextField
                      label="To:"
                      id="mui-theme-provider-standard-input"
                      style={style.input}
                      name='to'
                      value={to}
                      onChange={this.handleInput}
                      InputProps={{
                          classes: {
                              input: classes.inputColor
                          }
                      }}
                  />
                  <span className="welcome-span">Or choose from last routes:</span>
            <div className={classes.root}>
                {placesList}
            </div>
                  {this.state.role === 'driver' &&
                  <FormControl required className={classes.formControl}>
                      <InputLabel FormLabelClasses={{
                          root: classes.inputLabel,
                      }} htmlFor="age-required">Your car</InputLabel>
                      <Select
                          value={currentCar}
                          onChange={this.handleInput}
                          name="car"
                          inputProps={{
                              classes: {
                                  root: classes.inputColor
                              }
                          }}
                          className={classes.selectEmpty}
                      >
                          {carList}

                      </Select>
                  </FormControl>

                  }
                  {submitChecks &&
                  <Button onClick={this.handleRoute} style={style.button}>{submitButtonText}</Button>
                  }

                  <button className="logout-button" onClick={() => this.signOut(auth)}>Log out</button>
              </MuiThemeProvider>
            </div>
            </>
        );
      }
    }


    const mapStateToProps = (state) => {
        return {
            users: state.users,
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            logOut: () => dispatch(logOut()),
        }
    }



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main))
