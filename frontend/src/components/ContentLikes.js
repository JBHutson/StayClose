import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Star from './Star';
import { timingSafeEqual } from 'crypto';



class ContentLikes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0,
      likers: [],
      userHasLiked: "",
    };
    this.handleLikeSubmit = this.handleLikeSubmit.bind(this);
    this.changeStar = this.changeStar.bind(this);
  }

  handleLikeSubmit() {
    let user = this.props.userId;
    let content = this.props.contentId;
    event.preventDefault()
    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/add-or-delete-like-content/', {
      params: {
        userId: user,
        contentId: content
      }
    }, config
    ).then(res => {
      this.setState({ likes: res.data['likes'].length })
      this.changeStar()
    })
  }

  changeStar() {
    if (this.state.userHasLiked == false) {
      this.setState({ userHasLiked: true })
    } else {
      this.setState({ userHasLiked: false })
    }
  }

  componentDidMount() {
    this.setState({ likes: this.props.likes })

    let config = {
      headers: {
        Authorization: `Token ${localStorage.getItem("access_key")}`
      }
    }
    axios.get('/api/content/' + this.props.contentId + "/", {
    }, config).then(res => {
      let likes = res.data.likes
      for (let like of likes) {
        if (like == this.props.userId) {
          this.setState({ userHasLiked: true })
        }
      }
      console.log(this.state.userHasLiked)


    })


  }

  render() {

    return (
      <div className="likes" >
        <div onClick={this.handleLikeSubmit} >
          <div className="star-outline">
            <Star userHasLiked={this.state.userHasLiked} />{this.state.likes}
          </div>
        </div>
      </div>
    )

  }
}

export default withRouter(ContentLikes);