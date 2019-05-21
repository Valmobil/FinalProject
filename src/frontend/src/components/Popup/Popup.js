import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'

const Transition = React.forwardRef((props, ref) => {
    return <Slide ref={ref} direction="up" {...props} />
})

const Popup = (props) => {
    const { handleAlertClose, popupOkButtonClick, popupOpen, errorMessage } = props
    return(
        <Dialog
            open={popupOpen}
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
                <Button onClick={popupOkButtonClick} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}



export default Popup