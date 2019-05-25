import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'



const ConfirmButton = ({classes, confirmEmail}) => {
    return(
        <>
        <Button
            onClick={ confirmEmail }
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


export default withStyles(styles)(ConfirmButton)