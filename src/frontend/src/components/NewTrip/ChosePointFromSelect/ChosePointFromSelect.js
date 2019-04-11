import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { getLocationFromDB } from '../../../actions/userCreators';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class ChosePointFromSelect extends React.Component {
    state = {
        location:[],
        from:'',
        to:''
    };



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const location = this.state.location.map(item=>{
           return <option>{item.name}</option>
        })
        return (
            <div>
                    <div className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={this.state.from}
                                name="from"
                                onChange={this.handleChange('from')}
                            >
                                <option value="" disabled>
                                    Input Point
                                </option>
                                {location}
                            </NativeSelect>
                            <FormHelperText>From</FormHelperText>
                        </FormControl>
                    </div>
                    <div className={classes.root}>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                className={classes.selectEmpty}
                                value={this.state.to}
                                name="to"
                                onChange={this.handleChange('to')}
                            >
                                <option value="" disabled>
                                    Input Point
                                </option>
                                {location}
                            </NativeSelect>
                            <FormHelperText>To</FormHelperText>
                        </FormControl>
                    </div>
            </div>
        );
    }
}

ChosePointFromSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChosePointFromSelect);