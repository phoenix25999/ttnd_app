import React, { Component } from 'react';
//import { connect } from 'react-redux';
//import axios from 'axios';

import { FaArrowAltCircleRight } from 'react-icons/fa';
//import * as actions from '../../../store/actions/index';

import styles from './Comments.module.css';



class Comments extends Component{

    state = {
        comment: '',
        showReplySection: false
    }

    replyHandler = () => {
        this.setState({showReplySection: true});
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
                            <div className={styles.NewComment}>
                                <input type='text' placeholder='Write a reply' className={styles.Comment} onChange={this.props.changed}/>
                                <button onClick={this.props.addComment}><FaArrowAltCircleRight/></button>
                            </div>: ''
                        }
                        </div>
                    </div>)}) 
    
                    
            )
        }

        return(
            <div>
                
            {commentsList}

                <div className={styles.NewComment}>
                    <input type='text' placeholder='Write a comment' className={styles.Comment} onChange={this.props.changed}/>
                    <button onClick={this.props.addComment}><FaArrowAltCircleRight/></button>
                </div>  
            </div>
        );  
    }
}

// const mapStateToProps = state => {
//     return{
//         userID: state.user.userData._id,
//         //comments: state.comments.commentsData
//     };
// }

// const mapDispatchToProps = dispatch => {
//     return{
//         fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
//     };
// }

export default  Comments;