import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut } from '../../actions/userCreators'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";
import './Main.css'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';




const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380;

const styles = theme => ({
    smartRoute: {
        background: '#ff9800',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: 0,
        marginTop: '20px',
        width: '80%'
    },
    typeButtons: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: 'white',
        height: 30,
        padding: 0,
        width: '47%'
    },
    label: {
        textTransform: 'capitalize',
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
        display: 'flex',
        justifyContent: 'center'
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

    setRoute = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('latitude = ', position.coords.latitude)
            console.log('longitude = ', position.coords.longitude)
        });
    }


    signOut = (auth) => {
        if (auth) auth.signOut();
        this.props.logOut()
    }

    componentDidMount() {
        if (this.props.users.cars.length === 1) this.setState({car: this.props.users.cars[0]})
    }

    render() {
    console.log(this.props.users)
        const { classes } = this.props;
        const { role, car } = this.state;
        const { cars } = this.props.users;
        let currentCar = cars.length === 1 ? cars[0] : car;


        const placesList = this.props.users.userPoints.map((item) => {

            return (
            item.userPointName !== '<no point>' &&
                    <Button onClick={this.setRoute}
                        key = {item.userPointId}
                        variant="contained"
                        color="primary"
                        className={classes.smartRoute}
                        classes={{ label: classes.label }}
                    >
                        {item.userPointName}
                    </Button>

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
                <div className="type-button-container">
                    <Button type="raised"
                            color="primary"
                            style={style.button}
                            classes={{
                                root: classes.typeButtons,
                                label: classes.label,
                            }}
                    >
                        Plan new trip
                    </Button>
                    <Button type="raised"
                            color="primary"
                            style={style.button}
                            classes={{
                                root: classes.typeButtons,
                                label: classes.label,
                            }}
                    >
                        Trip history
                    </Button>
                </div>
                  <span className="welcome-span">Choose from quick trips:</span>

                {placesList}

                  <Button type="raised"
                          color="primary"
                          classes={{
                              root: classes.typeButtons,
                              label: classes.label,
                          }}
                          style={{
                              marginTop: 30,
                          }}
                  >
                      New quick trip
                  </Button>

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

                  {/*<button className="logout-button" onClick={() => this.signOut(auth)}>Log out</button>*/}
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
