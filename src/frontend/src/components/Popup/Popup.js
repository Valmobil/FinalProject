import React from 'react'
import {connect} from "react-redux";
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import { setErrorPopupOpen } from "../../actions/userCreators";



const Transition = React.forwardRef((props, ref) => {
    return <Slide ref={ref} direction="up" {...props} />
})

const Popup = (props) => {
    const { popupOpen, errorMessage } = props
    return(
        <Dialog
            open={ popupOpen }
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props.setErrorPopupOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{textAlign: 'center'}}>
                    { errorMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setErrorPopupOpen(false)} style={{color: "#f57c00"}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}



const mapStateToProps = (state) => {
    return {
        popupOpen: state.users.errorPopupOpen,
        errorMessage: state.users.errorMessage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setErrorPopupOpen: (payload) => dispatch(setErrorPopupOpen(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup)