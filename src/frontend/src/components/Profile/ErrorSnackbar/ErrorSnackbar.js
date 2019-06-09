import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';


const styles1 = theme => ({

    error: {
        backgroundColor: theme.palette.error.dark,
    },
    icon: {
        fontSize: 20,
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});


function MySnackbarContent({ classes, message }) {
    return (
        <SnackbarContent
            className={classes.error}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <ErrorIcon className={classes.icon} />
                        {message}
                </span>
            }
        />
    );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);



const ErrorSnackbar = ({ handleSnackbarClose, open, message }) => {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <MySnackbarContentWrapper
                        message={message}
                    />
                </Snackbar>
            </div>
        );
}


ErrorSnackbar.propTypes = {
    handleSnackbarClose: PropTypes.func,
    message: PropTypes.string,
    open: PropTypes.bool,
}


export default ErrorSnackbar;
