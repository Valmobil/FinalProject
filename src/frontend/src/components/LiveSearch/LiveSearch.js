import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { singleCallApi } from "../../utils/utils";
import orange from "@material-ui/core/colors/orange";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

import {connect} from "react-redux";

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
        width: '90%',
        margin: 'auto',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    inputColor: {
        color: '#fff',
        width: '100%'
    },
    label: {
        textTransform: 'capitalize'
    },
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '47%'
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '47%'
    },
})

class LiveSearch extends Component {

    state = {
        value: '',
        suggestions: [],
    };

    getSuggestionValue = suggestion => suggestion.pointNameEn ? suggestion.pointNameEn : null;

    renderSuggestion = (suggestion, { query, isHighlighted }) => {
        if (isHighlighted) {
            this.props.setCoordinates({
                latitude: suggestion.pointLatitude.toFixed(6),
                longitude: suggestion.pointLongitude.toFixed(6)
            })
        }
        const matches = match(suggestion.pointNameEn, query);
        const parts = parse(suggestion.pointNameEn, matches);

        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>
                    {parts.map((part, index) =>
                            part.highlight ? (
                                <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
                            ) : (
                                <strong key={String(index)} style={{ fontWeight: 300 }}>
                                    {part.text}
                                </strong>
                            ),
                    )}
                </div>
            </MenuItem>
        );
    }

    onSuggestionsFetchRequested = async ({ value }) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        let suggestionsList = []

        if (inputLength >= 4){
            // let response = await callApi('post', '/api/points/', data)
            let response = await singleCallApi(this.props.method, this.props.url, this.props.data)
            suggestionsList = response.data
        }
        this.setState({
            suggestions: suggestionsList
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
        this.props.setValue(newValue)
    };

    onSuggestionSelected = () => {
        // setTimeout(() => {
        //     this.props.setSearchedLocation(this.state.value)
        //     console.log(this.state.value)
        // }, 50)
    }

    renderInputComponent = (inputProps) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps;
        const visibleFields = this.props.liveSearchShow;
        console.log('from live search', visibleFields);

            if (visibleFields){
                return (
                <MuiThemeProvider theme={theme}>
                <TextField
                    fullWidth
                    InputProps={{
                        classes: {
                            input: classes.inputColor,
                        },
                    }}
                    label='Place name'
                    name='name'
                    value={this.props.name}
                    onChange={this.props.handleInput}
                    autoComplete="off"
                />
                <TextField
                    fullWidth
                    InputProps={{
                        inputRef: node => {
                            ref(node);
                            inputRef(node);
                        },
                        classes: {
                            input: classes.inputColor,
                        },
                    }}
                    {...other}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', width: '80%', margin: '20px auto'}}>
                <Button
                    onClick={this.props.editClose}
                    disabled={this.props.name.length === 0}
                    classes={{
                        root: classes.acceptButton,
                        label: classes.label
                    }}
                >
                    Submit
                </Button>
                <Button
                        onClick={this.props.rejectEdit}
                        classes={{
                            root: classes.rejectButton,
                            label: classes.label
                        }}
                    >
                        Reject
                </Button>
                </div>
                </MuiThemeProvider>
                );
            } else {
                return (
                    <MuiThemeProvider theme={theme}>
                        <TextField
                            fullWidth
                            InputProps={{
                                inputRef: node => {
                                    ref(node);
                                    inputRef(node);
                                },
                                classes: {
                                    input: classes.inputColor,
                                },
                            }}
                            {...other}
                        />
                    </MuiThemeProvider>)
            }


    }

    componentDidMount(){
        this.setState({value: this.props.value})
    }

    componentDidUpdate(prevProps){
        if (this.props.searchedLocation !== prevProps.searchedLocation){
            this.setState({value: this.props.searchedLocation})
        }
    }

    render(){
        const { classes } = this.props


        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue: this.getSuggestionValue,
            renderSuggestion: this.renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected,
        };
        return(
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    label: 'Search',
                    value: this.state.value,
                    onChange: this.onSuggestionChange,
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchedLocation: state.users.searchedLocation,
        liveSearchShow: state.users.liveSearchShow,
    }
}

export default withStyles(styles)(connect(mapStateToProps, null)(LiveSearch))