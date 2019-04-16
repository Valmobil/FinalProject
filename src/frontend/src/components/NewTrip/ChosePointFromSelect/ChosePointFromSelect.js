import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import axios from "axios/index";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'

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

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: { useNextVariants: true }
})

const style={
    input:{
      width: '70%',
    }
}

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
              <TextField
                label="Search for location From"
                id="mui-theme-provider-standard-input"
                autoComplete="off"
                name='search'
                // value={this.state.search}
                onChange={this.handleInput}
                style={style.input}
                InputProps={{
                  classes: {
                    input: classes.inputColor
                  }
                }}
              />
              <TextField
                label="Search for location To"
                id="mui-theme-provider-standard-input"
                autoComplete="off"
                name='search'
                // value={this.state.search}
                onChange={this.handleInput}
                style={style.input}
                InputProps={{
                  classes: {
                    input: classes.inputColor
                  }
                }}
              />
                    {/*<div className={classes.root}>*/}
                        {/*<FormControl className={classes.formControl}>*/}
                            {/*<NativeSelect*/}
                                {/*className={classes.selectEmpty}*/}
                                {/*value={this.state.from}*/}
                                {/*style = {style.input}*/}
                                {/*name="from"*/}
                                {/*onChange={this.handleChange('from')}*/}
                            {/*>*/}
                                {/*<option value="" disabled>*/}
                                    {/*Input Point*/}
                                {/*</option>*/}
                                {/*<option>{setLocation}</option>*/}
                            {/*</NativeSelect>*/}
                            {/*<FormHelperText>From</FormHelperText>*/}
                        {/*</FormControl>*/}
                    {/*</div>*/}
                    {/*<div className={classes.root}>*/}
                        {/*<FormControl className={classes.formControl}>*/}
                            {/*<NativeSelect*/}
                                {/*className={classes.selectEmpty}*/}
                                {/*value={this.state.to}*/}
                                {/*style={style.input}*/}
                                {/*name="to"*/}
                                {/*onChange={this.handleChange('to')}*/}
                            {/*>*/}
                                {/*<option value="" disabled>*/}
                                    {/*Input Point*/}
                                {/*</option>*/}
                                {/*<option>{setLocation}</option>*/}

                            {/*</NativeSelect>*/}
                            {/*<FormHelperText>To</FormHelperText>*/}
                        {/*</FormControl>*/}
                    {/*</div>*/}
            </div>
        );
    }
}

ChosePointFromSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChosePointFromSelect);