import React, { Component } from 'react';
import NavBar from './Navbar';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };
    }

    componentDidMount() {
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('http://127.0.0.1:8000/api/users/', config, {
        }).then(res => {
            console.log(res.data[0].username)
            this.setState({ username: res.data[0].username })
        })
    }

    render() {
        return (
            <NavBar username={this.state.username} />
        );
    }
}

export default ProfilePage;

console.log('hi');








