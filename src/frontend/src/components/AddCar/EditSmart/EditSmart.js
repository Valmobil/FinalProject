import React, { Component } from 'react'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";
import { withStyles } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: orange,
    },
    typography: { useNextVariants: true },
});

const style= {
    input: {
        width: '80%',
    },
    button: {
        margin: theme.spacing,
        marginTop: 10,
    },
}

const styles = theme => ({
    inputColor: {
        color: '#fff',
    },
    root: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: '#ff9800',
        height: 25,
        padding: '0 30px',
    },
    label: {
        textTransform: 'capitalize',
    },
});


class EditSmart extends Component{
    render(){
        const { handleEditInput, editName, editColour, editSubmit } = this.props
        const { classes } = this.props;
        return(

            <MuiThemeProvider theme={theme}>
                <TextField
                    label="Smart route name"
                    id="mui-theme-provider-standard-input"
                    style={style.input}
                    autoComplete="off"
                    name='carName'
                    value={editName}
                    onChange={handleEditInput}
                    InputProps={{
                        classes: {
                            input: classes.inputColor
                        }
                    }}
                />

                <TextField
                    label="Address"
                    id="mui-theme-provider-standard-input"
                    style={style.input}
                    autoComplete="off"
                    name='carColour'
                    value={editColour}
                    onChange={handleEditInput}
                    InputProps={{
                        classes: {
                            input: classes.inputColor
                        }
                    }}
                />

                <Button onClick={editSubmit}
                        style={style.button}
                        classes={{
                            root: classes.root,
                            label: classes.label,
                        }}
                >
                    Submit
                </Button>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(EditSmart)
