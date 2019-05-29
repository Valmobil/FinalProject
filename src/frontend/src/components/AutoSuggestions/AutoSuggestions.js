import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button'
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
    marginTop: theme.spacing(1),
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

class AutoSuggestions extends Component {

  state = {
    value: '',
    suggestions: [],
  };

  getSuggestionValue = suggestion => suggestion.pointNameEn ? suggestion.pointNameEn : null;

  renderSuggestion = (suggestion, { query, isHighlighted }) => {

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

    if (inputLength >= 1){
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

  onSuggestionSelected = (e, {suggestion}) => {
    this.props.setCoordinates({
      latitude: suggestion.pointLatitude.toFixed(6),
      longitude: suggestion.pointLongitude.toFixed(6)
    })
  }

  renderInputComponent = (inputProps) => {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

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
      </MuiThemeProvider>
    );
  }

  componentDidMount(){
    this.setState({value: this.props.value})
  }

  componentDidUpdate(prevProps){
    if (this.props.value !== prevProps.value){
      this.setState({value: this.props.value})
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
          label: this.props.label,
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
  }
}

export default withStyles(styles)(connect(mapStateToProps, null)(AutoSuggestions))