import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setUserPoints, setTrip, setProfile, setCar} from '../../actions/userCreators'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import './AddCar.css'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import EditSmart from './EditSmart/EditSmart'
import TextField from '@material-ui/core/TextField';


const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380




const styles = theme => ({
    smartRoute: {
        background: '#ff5722',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: 0,
        marginLeft: (window.innerWidth - 200) / 2,
        marginTop: 20,
        width: 200
    },
    typeButtons: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: '#fff',
        height: 30,
        padding: 0,
        width: '47%'
    },
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '47%'
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '47%'
    },
    label: {
        textTransform: 'capitalize'
    },
    root: {
        height: 250,
        flexGrow: 1,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        width: windowWidth * 0.9
    },
    inputColor: {
        color: '#fff',
        width: '100%'
    },
    inputLabel: {
        // color: '#fff',
        textAlign: 'center'
    },
    iconButton: {
        padding: 0,
        color: '#fff',
        '&:focus': {
            outline: 'none'
        }
    },
    container: {
        position: 'relative',
        width: '90%',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
        color: '#red'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    submit: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: '#f57c00',
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
/*const style = {
    input: {
        width: '100%'
    },
    radio: {
        display: 'flex',
        justifyContent: 'center'
    }
}*/

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})


class AddCar extends Component {
    state = {
        user: {
            userName:     this.props.users.user.userName,
            userPhoto:    this.props.users.user.userPhoto,
            userPhone:    this.props.users.user.userPhone,
            userMail:     this.props.users.user.userMail,
        },
        // car:[],
        newCar: {
            carName: '',
            carColour: '',
            carPhoto: '/CarsPhotos/n_1.jpg',
        },
        selectedId: 1,
        // car: '',
        name: '',
        color: '',
        editing: '',
        adding: false,

    }

    handleInput = ({target: {name, value}}) => {
            this.setState({[name]: value})
    }

    handleEdit = (item) => {
        console.log("hi")
        this.setState({editing: item.carId, carName: item.carName, carColour: item.carColour, adding: false})
    }

    handleEditInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    editSubmit = (carId) => {
        console.log("HELLO")
        let id = this.props.users.cars.length > 0 ?
            this.props.users.cars.find(item => item.carName === '<no point>').carId : 1
        if (carId) id = carId

        let newUserPoints = this.props.users.cars.map(item => {
            if (item.carId === id) {
                return {...item, carName: this.state.name, carColour: this.props.users.searchedLocation}
            } else {
                return item
            }
        })
        this.props.setProfile(newUserPoints)
        this.setState({editing: '', name: '', color: '', adding: false})
    }

    addNewPoint = () => {
        this.setState({adding: true, editing: '', carName: '', carColour: ''})
    }

    handleDelete = (id) => {
        console.log(this.props)
        let newCarsArr = this.props.users.cars.map(item => {
            if (item.carId === id) {
                return {...item, carName: '<no point>', carColour: ''}
            } else {
                return item
            }
        })
        this.props.setCar(newCarsArr)
    }





    render () {
        // console.log(this.props.users)
        const { classes } = this.props
        const {  name, destination, editing, adding} = this.state
        const { cars , userPoints } = this.props.users;
        console.log(cars)
        // let currentCar = cars.length === 1 ? cars[0] : car
        const firstEmptyUserPoint = userPoints.find(item => item.userPointName === '<no point>')
        let adDisable = userPoints.indexOf(firstEmptyUserPoint) === -1






        const placesList = cars.map((item) => {
            let output = null
            if (item.carId === editing) {
                output = (
                    <EditSmart key = {item.carId}
                               handleEditInput={this.handleEditInput}
                               editName={name}
                               editDestination={destination}
                               editSubmit={() => this.editSubmit(item.carId)}
                    />
                )
            } else {
                output = (
                    item.carName !== '<no point>' &&
                    <div key = {item.carId} style={{display: 'flex', width: '100%'}}>
                        <Button
                                variant="contained"
                                color="primary"
                                className={classes.smartRoute}
                                classes={{ label: classes.label }}
                        >
                            {item.carName}
                        </Button>
                        <div className="icon-container">
                            <IconButton
                                onClick={() => this.handleEdit(item)}
                                className={classes.iconButton}
                                aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleDelete(item.carId)}
                                className={classes.iconButton}
                                aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                )
            }
            return output
        })


        let dependentButton = null
         if ( !adding ){
            dependentButton = (
                <Button onClick={this.addNewPoint}
                        type="raised"
                        color="primary"
                        disabled={adDisable}
                        classes={{
                            root: classes.typeButtons,
                            label: classes.label
                        }}
                        style={{
                            marginTop: 30
                        }}
                >
                    Add new car
                </Button>
            )
        }
        return (
            <>

                <div className="welcome-user">
                    <span className="welcome-span role-question">Edit or set your car</span>
                    <MuiThemeProvider theme={theme}>

                        {placesList}
                        {dependentButton}

                        {adding &&
                        <>
                            <TextField
                                fullWidth
                                InputProps={{
                                    classes: {
                                        input: classes.inputColor,
                                    },
                                }}
                                label='Car name'
                                name='name'
                                value={this.state.name}
                                onChange={this.handleInput}
                            />
                            <TextField
                                fullWidth
                                InputProps={{
                                    classes: {
                                        input: classes.inputColor,
                                    },
                                }}
                                label='Car color'
                                name='color'
                                value={this.state.color}
                                onChange={this.handleInput}

                            />

                            <Button
                                onClick={() => this.editSubmit(null)}
                                classes={{
                                    root: classes.submit,
                                    label: classes.label
                                }}
                            >
                                Submit
                            </Button>
                        </>
                        }

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
        setUserPoints: (payload) => dispatch(setUserPoints(payload)),
        setTrip: (trip) => dispatch(setTrip(trip)),
        setProfile: (state) => dispatch(setProfile(state)),
        setCar: (cars) => dispatch(setCar(cars))
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddCar))