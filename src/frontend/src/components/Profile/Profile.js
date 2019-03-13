import React, {Component} from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
})
const carColor = [
  {
    id: 1,
    label: ''
  },
  {
    id: 2,
    label: 'green'
  },
  {
    id: 3,
    label: 'yellow'
  },
  {
    id: 4,
    label: 'black'
  },
  {
    id: 5,
    label: 'white'
  },
  {
    id: 6,
    label: 'blue'
  }
]
const car = [
  {

    value: 'first',
    label: ''

  },
  {

    value: 'tesla',
    label: 'Tesla'

  },
  {
    value: 'bmw',
    label: 'BMW'
  },
  {
    value: 'mercedes',
    label: 'Mercedes-Benz'
  },
  {
    value: 'nissan',
    label: 'Nissan'
  },
  {
    value: 'toyota',
    label: 'Toyota'
  },
  {
    value: 'honda',
    label: 'Honda'
  },
  {
    value: 'kia',
    label: 'Kia'
  },
  {
    value: 'mazda',
    label: 'Mazda'
  },
  {
    value: 'ford',
    label: 'Ford'
  }
]
class Profile extends Component {
  state = {
    name: '',
    sits: '',
    multiline: 'Controlled',
    carModel: '',
    carColor: '',
    phone: ''

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  render () {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-name"
          label="User Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Phone"
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="filled-select-car"
          select
          label="Car model"
          className={classes.textField}
          value={this.state.carModel}
          onChange={this.handleChange('carModel')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="please select you car"
          margin="normal"
          variant="filled"
        >
          {car.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="filled-select-color-car"
          select
          label="Car color"
          className={classes.textField}
          value={this.state.carColor}
          onChange={this.handleChange('carColor')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="please select you car color"
          margin="normal"
          variant="filled"
        >
          {carColor.map(option => (
            <option key={option.id} value={option.label}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="filled-number"
          label="# of sits"
          value={this.state.sits}
          onChange={this.handleChange('sits')}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="filled"
        />
      </form>
    )
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Profile)