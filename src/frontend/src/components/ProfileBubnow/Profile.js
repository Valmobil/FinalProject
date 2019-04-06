import React, {Component} from 'react'
import './Profile.css'
import {connect} from 'react-redux'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import {withStyles} from '@material-ui/core'
import Car from '../Car/Car'
import Button from '@material-ui/core/Button'
import {addNewCar} from '../../actions/userCreators'

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: { useNextVariants: true }
})

const style = {
  input: {
    width: '100%',
    height: '50px',
    color: '#fff'
  },
  button: {
    color: '#ff9800',
    marginTop: '20px'
  }
}

const styles = theme => ({
  inputColor: {
    color: '#fff',
    width: '100%',
    height: '50px'
  }
})
class Profile extends Component {
  state={
    newCar: ''
  }

    handleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    addCar = (cars, car) => {
      this.setState({newCar: ''})
      this.props.addNewCar(cars, car)
    }

    render () {
      const { classes } = this.props
      const { cars } = this.props.users
      const { newCar } = this.state
      const carList = cars.map((item) => {
        return (
          <Car key={item} model={item}/>
        )
      })
      return (
            <>
             <div className="profile-container">
               <h1>UserProfile</h1>
               <span className="welcome-user">you can change your car list here</span>
               <div className="car-list">{carList}</div>
               <MuiThemeProvider theme={theme}>
                 <TextField
                   label="New car"
                   id="mui-theme-provider-standard-input"
                   style={style.input}
                   name='newCar'
                   value={this.state.newCar}
                   onChange={this.handleInput}
                   InputProps={{
                     classes: {
                       input: classes.inputColor
                     }
                   }}
                 />
                 <Button onClick={() => this.addCar(cars, newCar)} style={style.button}>Submit changes</Button>
               </MuiThemeProvider>
             </div>
            </>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCar: (cars, car) => dispatch(addNewCar(cars, car))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))
