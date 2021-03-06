import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Dropzone from 'react-dropzone';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


class NewContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: '',
            userId: '',
            contentId: '',
            picToUpload: [],
            hasPic: false,
            username: localStorage.getItem('username')
        }
    }

    handleSubmit = (event) => {
        let post_text = this.state.post;
        let member = this.props.match.params.userId;
        let circle = this.props.match.params.circleId;
        event.preventDefault();
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.post('/api/content/', {
            author: this.state.username,
            text_post: post_text,
            img_post: null,
            caption: "",
            likes: [],
            member: member,
            circle: circle,
            tags: null
        }, config
        ).then(res => {
            return res.data
        }).then(datum => {
            if (this.state.hasPic) {
                let profilePicture = this.state.picToUpload[0]
                let data = new FormData()
                data.append('file', profilePicture)
                let config = {
                headers: {
                    Authorization: `Token ${localStorage.getItem("access_key")}`
                }
            }
                axios.put('/api/add-image-to-content/' + datum.id + '/', data, config
                ).then(res => {
                this.props.history.push('/circle/' + this.props.match.params.circleId + '/' + this.props.match.params.circleName + '/' + this.props.match.params.userId)
            }).catch(function (error) {
                alert('username not changed, try again')
            })
            } else {
                this.props.history.push('/circle/' + this.props.match.params.circleId + '/' + this.props.match.params.circleName + '/' + this.props.match.params.userId)
            }
    })
    }

    render() {
        return (
            <div className='postForm'>
                <h2 className="new-post-header">New Post: </h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p className="postmate">Post: </p>
                        <div></div>
                        <input className="posting-input" type='text' value={this.state.post} onChange={(e) => this.setState({ post: e.target.value })} />
                        <div></div>
                    </label>
                    <div></div>
                    <Dropzone className="dropzone" onDrop={acceptedFiles => this.setState({ picToUpload: acceptedFiles, hasPic: true})}>
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <button type='submit' value='create'>Create a Post</button>
                </form>
            </div>
        )
    }
}

export default withRouter(NewContent);