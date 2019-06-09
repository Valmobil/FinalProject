import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";

const AddingCar = ({ userCarName, userCarColour, handleChange, submitNewCar, rejectNewCar, classes }) => {
    return(
        <MuiThemeProvider theme={theme}>
            < span className='carlist-header'>Your new car is:</span>
            <TextField
                fullWidth
                InputProps={{
                    classes: {
                        input: classes.inputColor,
                    },
                }}
                label='Car name'
                name='userCarName'
                value={ userCarName }
                onChange={handleChange}
            />
            <TextField
                fullWidth
                InputProps={{
                    classes: {
                        input: classes.inputColor,
                    },
                }}
                label='Car color'
                name='userCarColour'
                value={ userCarColour }
                onChange={handleChange}

            />
            <div className='newcar-buttons-container'>
                <Button
                    onClick={ submitNewCar }
                    disabled={ userCarName.length === 0 || userCarColour.length === 0 }
                    classes={{
                        root: classes.submitButton,
                        label: classes.label
                    }}
                >
                    Submit
                </Button>
                <Button
                    onClick={ rejectNewCar }
                    classes={{
                        root: classes.rejectButton,
                        label: classes.label
                    }}
                >
                    Reject
                </Button>
            </div>
        </MuiThemeProvider>
    )
}


const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})

const styles = theme => ({
    inputColor: {
        color: '#fff',
        width: '100%',
    },
    label: {
        textTransform: 'capitalize'
    },
    submitButton: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: 'green',
        height: 25,
        padding: '0 10px',
        marginLeft: 10,
        marginTop: 20,
        '&:focus':{
            background: '#fff',
            outline: 'none',
            color: '#008000',
        }
    },
    rejectButton: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: 'red',
        height: 25,
        padding: '0 10px',
        marginLeft: 10,
        marginTop: 20,
        '&:focus':{
            background: '#fff',
            outline: 'none',
            color: '#008000',
        }
    },
})


AddingCar.propTypes = {
    userCarName: PropTypes.string,
    userCarColour: PropTypes.string,
    handleChange: PropTypes.func,
    submitNewCar: PropTypes.func,
    rejectNewCar: PropTypes.func,
    classes: PropTypes.object,
}

export default withStyles(styles)(AddingCar)