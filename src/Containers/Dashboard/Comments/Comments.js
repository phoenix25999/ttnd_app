import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FaArrowAltCircleRight, FaThinkPeaks } from 'react-icons/fa';
import * as actions from '../../../store/actions/index';

import Replies from '../Replies/Replies';

import styles from './Comments.module.css';



class Comments extends Component{

    state = {
        comment: '',
        showReplySection: false
    }

    replyHandler = () => {
        this.setState({showReplySection: true});
    }

    commentHandler = (event) => {
        this.setState({comment: event.target.value});
    }
    
    addComment = ( ) => {
        let commentData = {
            comment: this.state.comment,
            userID: this.props.userID
        }
        axios.post(`http://localhost:5000/comment/${this.props.buzzID}`, commentData)
            .then(res=>this.props.fetchComments(this.props.buzzID));
        
    }

    render(){
        
        let commentsArray = [];
        for(let i in this.props.comments[this.props.buzzID]){
            commentsArray.push({
                ...this.props.comments[this.props.buzzID][i]
            })
        }

        let commentsList = '';
        if(commentsArray.length){
            commentsList = (
                commentsArray.map(comment=>{
                    return (
                    <div key={comment._id}>
                        <div key={comment._id} className={styles.CommentBox}>
                            <img src={comment.commentedBy.picture} alt='profile-pic'/>
                            <div>
                                <p>{comment.commentedBy.name}</p>
                                <p>{comment.content}</p>
                            </div>
                        </div>
                        <div className={styles.ReplySection}>
                            <p onClick={this.replyHandler}>Reply</p>
                            {this.state.showReplySection?
                                <Replies 
                                    userID= {this.props.userID}
                                    buzzID= {this.props.buzzID}
                                    commentID = {comment._id}
                                />: ''
                            }
                        </div>
                    </div>)}) 
    
                    
            )
        }

        return(
            <div>
                
            {commentsList}

                <div className={styles.NewComment}>
                    <input type='text' placeholder='Write a comment' className={styles.Comment} onChange={this.commentHandler}/>
                    <button onClick={()=>this.addComment('comment')}><FaArrowAltCircleRight/></button>
                </div>  
            </div>
        );  
    }
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id,
        //comments: state.comments.commentsData
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);