import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
import ErrorSnackbar from "../ErrorSnackbar/ErrorSnackbar";


const ConfirmButton = ({classes, confirmEmail}) => {
    return (
        <>
            <Button
                onClick={confirmEmail}
                classes={{
                    root: classes.confirmButton,
                    label: classes.label
                }}
            >
                Confirm
            </Button>

        </>
    )
}

const styles = theme => ({
    confirmButton: {
        right: 0,
        background: '#fff',
        color: '#f57c00',
        padding: 0,
        '&:focus': {
            background: '#fff',
            outline: 'none'
        }
    },
    label: {
        textTransform: 'capitalize'
    },
})

ErrorSnackbar.propTypes = {
    confirmEmail: PropTypes.func,
    classes: PropTypes.object,
}


export default withStyles(styles)(ConfirmButton)