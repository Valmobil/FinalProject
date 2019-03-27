// import React, { Component} from 'react'
// // const { createStore, bindActionCreators, applyMiddleware } = Redux;
// // const { Provider, connect } = ReactRedux;
// import './FeedbackForms.scss'
//
// export default class FeedbackForms extends Component {
//
//   constructor (props) {
//     super(props)
//     this.handleClickLike = this.handleClickLike.bind(this)
//     this.handleClickDislike = this.handleClickDislike.bind(this)
//     this.state = {
//       counterLikes: props.likes,
//       counterDislikes: props.dislikes,
//       liked: false,
//       disliked: false,
//       total: props.likes + props.dislikes
//     }
//   }
//
//   handleClickLike = () => {
//     if (!this.state.disliked) {
//       this.setState({
//         liked: !this.state.liked
//       })
//     } else {
//       this.setState({
//         liked: true,
//         disliked: false,
//         counterLikes: this.state.counterLikes + 1,
//         counterDislikes: this.state.counterDislikes - 1,
//         total: this.state.counterLikes + this.state.counterDislikes + 1
//       })
//     }
//   }
//
//   handleClickDislike = () => {
//     if (!this.state.liked) {
//       this.setState({
//         disliked: !this.state.dislike
//       })
//     } else {
//       this.setState({
//         liked: false,
//         disliked: true,
//         counterLikes: this.state.counterLikes - 1,
//         counterDislikes: this.state.counterDislikes + 1,
//         total: this.state.counterLikes + this.state.counterDislikes + 1
//       })
//     }
//   }
//   render () {
//     return (
//
//       <div className="likeDislikeContainer">
//
//         <form>
//
//           <div className="likeDislike">
//
//             <span>
//               {this.state.liked ? this.state.counterLikes : this.state.counterLikes}
//             </span>
//
//             <button
//               type="button"
//               id={this.props.id}
//               onClick={this.handleClickLike}
//               value="likes"
//             ><i className="far fa-thumbs-up"/></button>
//
//           </div>
//
//           <div className="likeDislike">
//
//             <span>
//               {this.state.disliked ? this.state.counterDislikes : this.state.counterDislikes}
//             </span>
//             <button
//               type="button"
//               id={this.props.id}
//               onClick={this.handleClickDislike}
//               value="dislike"
//             ><i className="far fa-thumbs-down"/></button>
//           </div>
//
//         </form>
//
//       </div>
//     )
//   }
// }

import React from 'react'
import ClassNames from 'classnames'
import './FeedbackForms.scss'

class Button extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      // liked: false,
      // disliked: false,
      initLike: 0,
      initDislike: 0
    }

    // this.onLikeClick = this.onLikeClick.bind(this)
    // this.onDisLikeClick = this.onDisLikeClick.bind(this)
  }

  // onLikeClick () {
  //   if (!this.state.disliked) {
  //     this.setState({
  //       liked: !this.state.liked + 1
  //     })
  //   } else {
  //     this.setState({
  //       liked: true,
  //       disliked: false
  //     })
  //   }
  // }
  handleClick () {
    this.setState((prevState) => ({
      initLike: prevState.initLike + 1
    }))
    this.setState((prevStateDis) => ({
      initDislike: prevStateDis.initDislike + 1
    }))
  }

  // onDisLikeClick () {
  //   if (!this.state.liked) {
  //     this.setState({
  //       disliked: !this.state.disliked
  //     })
  //   } else {
  //     this.setState({
  //       liked: false,
  //       disliked: true
  //     })
  //   }
  // }

  render () {
    //   const classLikeButton = ClassNames({
    //     'like-button': true,
    //     'liked': this.state.liked
    //   })
    //
    //   const classDisLikeButton = ClassNames({
    //     'dislike-button': true,
    //     'disliked': this.state.disliked
    //   })

    // console.log(this.state)
    // console.log(classLikeButton)
    // console.log(classDisLikeButton)

    return (
      <div>
        <button onClick={this.handleClick.bind(this)}><i className="fas fa-thumbs-up">|</i> {this.state.initLike}
        </button>

        <button onClick={this.handleClick.bind(this)}><i
          className="fas fa-thumbs-down">|</i> {this.state.initDislike} </button>

      </div>

    // <div>
    //   <span className={classLikeButton}
    //     onClick={this.onLikeClick}>
    //     <i className="fas fa-thumbs-up">|</i>
    //     <span className="likes-counter">
    //       {this.state.initLike + 1 }
    //     </span>
    //   </span>
    //   <span className={classDisLikeButton}
    //     onClick={this.onDisLikeClick}>
    //     <i className="fas fa-thumbs-down">|</i>
    //     <span className="dislikes-counter">
    //       {this.state.disliked ? this.state.initDislike + 1 : this.state.initDislike}
    //     </span>
    //   </span>
    // </div>
    )
  }
}

export default Button
