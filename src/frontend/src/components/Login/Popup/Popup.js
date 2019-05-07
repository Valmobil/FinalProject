import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

function Transition (props) {
    return <Slide direction="up" {...props} />
}

const Popup = (props) => {
    const { handleAlertClose, tryToLoginAgain, loginRejected, errorMessage } = props
    return(
        <Dialog
            open={loginRejected}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleAlertClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{textAlign: 'center'}}>
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={tryToLoginAgain} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}



export default Popup