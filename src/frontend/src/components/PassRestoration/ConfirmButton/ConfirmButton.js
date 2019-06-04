import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Popup from '../../Popup/Popup'



const ConfirmButton = ({classes, confirmEmail}) => {

    const [alertOpen, setAlertOpen] = useState(false)

    const confirmation = () => {
        confirmEmail()
        handleAlertClose(true)
    }

    const handleAlertClose = (value) => {
        setAlertOpen(value)
    }

    return(
        <>
        <Button
            onClick={confirmation}
            classes={{
                root: classes.confirmButton,
                label: classes.label
            }}
        >
            Confirm
        </Button>
            <Popup
                handleAlertClose={() => handleAlertClose(false)}
                popupOkButtonClick={() => handleAlertClose(false)}
                popupOpen={alertOpen}
                errorMessage={'You were sent an email with confirmation link on specified address. Please use it to confirm the email.'}
             />
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