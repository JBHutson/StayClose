import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { request } from 'http';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class Circles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: [],
      currentUser: localStorage.getItem("userId")
    };

  }

  componentDidMount() {

    console.log(this.state.currentUser)
    let config = {
      headers: {
        Authorization: localStorage.getItem("access_key")
      }
    }

    axios.get('http://127.0.0.1:8000/api/circles/', config, {
    }).then(res => {
      let circles = res.data
      console.log(circles.length)
      let myCircles = [];
      for (let i = 0; i < circles.length; i++) {
        for (let j = 0; j < circles[i].members.length; j++) {
          console.log(circles[i].members[j].toString() === this.state.currentUser)

          if (circles[i].admin.toString() === this.state.currentUser || circles[i].members[j].toString() === this.state.currentUser) {
            myCircles.push(circles[i])
          }
        }

      }


      this.setState({ circles: myCircles })
      console.log(myCircles)

    })
  }

  render() {
    return (
      <React.Fragment>

        <div className="circle-list">
          {this.state.circles.map(circle => <Link className="circle" to={'/circle/' + circle.id + '/' + circle.name} key={circle.id}>{circle.name}</Link>)}
        </div>
      </React.Fragment>
    );
  }
}


export default withRouter(Circles);

