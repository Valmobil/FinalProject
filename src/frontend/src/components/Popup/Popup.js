import React from 'react'
import {connect} from "react-redux";
import PropTypes from 'prop-types';
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

const Popup = ({ popupOpen, errorMessage, setErrorPopupOpen }) => {
    return(
        <Dialog
            open={ popupOpen }
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setErrorPopupOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" style={{textAlign: 'center'}}>
                    { errorMessage }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setErrorPopupOpen(false)} style={{color: "#f57c00"}}>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

Popup.propTypes = {
    popupOpen: PropTypes.bool,
    errorMessage: PropTypes.string,
    setErrorPopupOpen: PropTypes.func,
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