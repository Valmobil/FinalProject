import React, { Component} from 'react';
// const { createStore, bindActionCreators, applyMiddleware } = Redux;
// const { Provider, connect } = ReactRedux;

export default class FeedbackForms extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const data = [{'name': 'test1'}, {'name': 'test2'}]
    const listItems = data.map((d) => <li key={d.name}>{d.name}</li>)

    return (
      <div>
        {listItems }
      </div>
    )
  }
}
