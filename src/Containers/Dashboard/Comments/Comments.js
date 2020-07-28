import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import * as actions from '../../../store/actions/index';

import Replies from '../Replies/Replies';

import styles from './Comments.module.css';
import { RiImageAddLine } from 'react-icons/ri';



class Comments extends Component{

    state = {
        comment: '',
        image: ''
    }

    commentHandler = (event, inputIdentifier) => {
        if(inputIdentifier==='image'){
            this.setState({image: event.target.files})
        }
        else{
        this.setState({comment: event.target.value});
        }
    }
    
    addComment = ( event ) => {

        event.preventDefault();

        const commentData = new FormData();
        commentData.append('comment',this.state.comment);
        commentData.append('image',this.state.image[0]);
        commentData.append('userID',this.props.userID);

        console.log('commentData', commentData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
        }
    }

        axios.post(`http://localhost:5000/comment/${this.props.buzzID}`, commentData, config)
            .then(res=>{
                this.setState({comment: ''});
                this.props.fetchComments(this.props.buzzID);
                this.props.fetchBuzz();
            });
        
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
                                {comment.image?<img src={require(`../../../server/${comment.image}`)} alt='pic'/>: ''}
                            </div>
                        </div>
                        <div className={styles.ReplySection}>
                            
                                <Replies 
                                    userID= {this.props.userID}
                                    buzzID= {this.props.buzzID}
                                    commentID = {comment._id}
                                />
                        
                        </div>
                    </div>)}) 
    
                    
            )
        }

        return(
            <div>
                
            {commentsList}

                
                    <form action="upload" method="post" encType="multipart/form-data" className={styles.NewComment} onSubmit={this.addComment}>
                        <div>
                            <input type='text' value={this.state.comment}placeholder='Write a comment' className={styles.Comment} onChange={(e)=>this.commentHandler(e, 'comment')}/>
                            <div>
                                <label htmlFor='commentsImage'>
                                    <RiImageAddLine title='Add image' className={styles.ImageButton}/>
                                </label>
                                <input 
                                    id='commentsImage' 
                                    name='image' 
                                    type='file' 
                                    accept='image/*'
                                    hidden 
                                    onChange={(e)=>this.commentHandler(e, 'image')}
                                />
                            </div>
                            <span>{this.state.image&&this.state.image[0].name}</span>

                        </div>
                        
                        <button><FaArrowAltCircleRight/></button>
                    </form>
                  
            </div>
        );  
    }
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) ),
        fetchBuzz: () => dispatch( actions.fetchBuzz() )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);