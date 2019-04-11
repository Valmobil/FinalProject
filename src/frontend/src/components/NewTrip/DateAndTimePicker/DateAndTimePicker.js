import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

function DateAndTimePickers(props) {
    const { classes } = props;
    const time = new Date();
    let currentTime = time.getHours() +':' + time.getMinutes();
    const date = new Date();
    let currentDate = date.getDay() + '.' + date.getMonth() +'.'+date.getFullYear();


    console.log(date);
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Next trip"
                type="datetime-local"
                defaultValue={date + time}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
    );
}

DateAndTimePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);