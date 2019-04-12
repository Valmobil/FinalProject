import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import axios from "axios/index";

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
        location:'',
        from:'',
        to:''
    };

    componentDidMount() {
        axios.get('api/points/test')
            .then(resp => {
                console.log(resp.data.pointNameEn)
                this.setState({
                    location: resp.data.pointNameEn})
            })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;
        // const location = this.state.location.map(item=>{
        //    return <option>{item.name}</option>
        // })
        const setLocation = this.state.location
        console.log(this.state.location)
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
                                <option>{setLocation}</option>
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
                                <option>{setLocation}</option>

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