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
        height: 40,
    },
    button: {
        margin: theme.spacing.unit,
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
        const { handleEditInput, editName, editDestination, editClose } = this.props
        const { classes } = this.props;
        return(

            <MuiThemeProvider theme={theme}>
                <TextField
                    label="Smart route name"
                    id="mui-theme-provider-standard-input"
                    style={style.input}
                    autoComplete="off"
                    name='name'
                    value={editName}
                    onChange={handleEditInput}
                    InputProps={{
                        classes: {
                            input: classes.inputColor
                        }
                    }}
                />

                <TextField
                    label="Destination"
                    id="mui-theme-provider-standard-input"
                    style={style.input}
                    autoComplete="off"
                    name='destination'
                    value={editDestination}
                    onChange={handleEditInput}
                    InputProps={{
                        classes: {
                            input: classes.inputColor
                        }
                    }}
                />

                <Button onClick={editClose}
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
