import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CommentLikes from './CommentLikes';
import axios from 'axios';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            newComment: '',
            user: '',
            showAddModal: false,
            showDeleteModal: false
        };
        this.handleOpenAddModal = this.handleOpenAddModal.bind(this);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleOpenDeleteModal = this.handleOpenDeleteModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
    }

    handleOpenAddModal() {
        this.setState({ showAddModal: true });
    }

    handleCloseAddModal() {
        this.setState({ showAddModal: false });
    }

    handleOpenDeleteModal() {
        this.setState({ showDeleteModal: true });
    }

    handleCloseDeleteModal() {
        this.setState({ showDeleteModal: false });
    }

    handleDeleteSubmit(id) {
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.delete('/api/comments/' + id + '/', config, {
        }).then(res => {
            this.setState({ showDeleteModal: false });
            this.componentDidMount();
        })
    }

    handleAddSubmit() {
        let author = this.props.userId
        let content = this.props.contentId
        event.preventDefault()
        let config = {
            headers: {
                Authorization: `Token ${localStorage.getItem("access_key")}`
            }
        }
        axios.post('/api/comments/', {
            comment: this.state.newComment,
            author: author,
            content: content
        }, config
        ).then(res => {
            this.setState({showAddModal: false})
            this.componentDidMount();
        })
    }

      componentDidMount() {
        let id = this.props.contentId
        let config = {
            headers: {
                Authorization: localStorage.getItem("access_key")
            }
        }
        axios.get('/api/comments-by-content/', {
            params: {
                contentId: id
            }
        }, config
        ).then(res => {
            let comments = res.data
            this.setState({ comments: comments })
        })
        axios.get('/api/user/', config, {
        }).then(res => {
          this.setState({user: res.data})
        })
    }

    render() {
        return (
            <div className="comments">
                {this.state.comments.map(comment =>
                    <div className="comment" key={comment.id}>
                        {this.state.user.avatar != null &&
                            <img className='profile-pic' src={this.state.user.avatar}></img>
                            }
                            <div >
                                <p> "{comment.comment}"</p>
                                <p>created at: {comment.created_at}</p>
                            </div>
                            <CommentLikes likes={comment.likes.length} commentId={comment.id} userId={this.props.userId}/>
                            {comment.author == this.props.userId &&
                                <button className="deleter" onClick={(e) => this.handleOpenDeleteModal()}>Delete Comment</button>
                            }
                            <ReactModal isOpen={this.state.showDeleteModal} style={customStyles}>
                            <button className="delete" onClick={(e) => this.handleCloseAddModal()}>X</button>
                                <h3 className="delete-message">Delete: </h3>
                                <button className="delete" onClick={(e) => this.handleDeleteSubmit(comment.id)}>Yes</button>
                                <button className="delete" onClick={(e) => this.handleCloseDeleteModal()}>No</button>
            </ReactModal>
                    </div>
            )}
            <button className="add-comment" onClick={(e) => this.handleOpenAddModal()}>Add Comment</button>
            <ReactModal isOpen={this.state.showAddModal} style={customStyles}>
                <button className="add" onClick={(e) => this.handleCloseAddModal()}>X</button>
                    <h3 className="add-comment-message">Comment: </h3>
                        <div className="delete">
                            <form>
                                <input className="new-comment-input" type='text' value={this.state.newComment} onChange={(e) => this.setState({ newComment: e.target.value })} />
                            </form>
                            <button className="add-comment" onClick={(e) => this.handleAddSubmit()}>Comment</button>
                        </div>
            </ReactModal>
            </div>
        );
    }
}

export default withRouter(Comments);