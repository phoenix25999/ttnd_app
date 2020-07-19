import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { FaArrowAltCircleRight } from 'react-icons/fa';
import * as actions from '../../../store/actions/index';

import styles from './Comments.module.css';



class Comments extends Component{

    state = {
        comment: ''
    }

    componentDidMount(){
        console.log('comment');
        this.props.fetchComments(this.props.buzzID);
    }
    
    commentHandler = (event) => {
        this.setState({comment: event.target.value});
    } 
    
    addComment = () => {
        let commentData = {
            comment: this.state.comment,
            userID: this.props.userID
        }
        axios.post(`http://localhost:5000/comment/${this.props.buzzID}`, commentData)
            .then(res=>console.log(res));
        this.props.fetchComments(this.props.buzzID);
    }

    render(){

        
        // let commentsList = 
        //     this.props.comments.map(comment=>{
        //         console.log(comment);
        //         return <div key={comment._id} className={styles.CommentBox}>
        //             <img src={comment.commentedBy.picture} alt='profile-pic'/>
        //             <div>
        //                 <p>{comment.commentedBy.name}</p>
        //                 <p>{comment.content}</p>
        //             </div>
        //         </div>})    

        return(
            <div>
                {this.props.comments.map(comment=>{
                return (<div key={comment._id} className={styles.CommentBox}>
                    <img src={comment.commentedBy.picture} alt='profile-pic'/>
                    <div>
                        <p>{comment.commentedBy.name}</p>
                        <p>{comment.content}</p>
                    </div>
                </div>)}) } 

                <div className={styles.NewComment}>
                    <input type='text' placeholder='Write a comment' className={styles.Comment} onChange={this.commentHandler}/>
                    <button onClick={this.addComment}><FaArrowAltCircleRight/></button>
                </div>

            </div>
        );  
    }
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id,
        comments: state.comments.commentsData
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( Comments );