import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import styles from './Replies.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Replies = (props) => {

    const[reply, setReply] = useState('');

    useEffect(()=>props.fetchReplies(props.commentID), [])
    
    

    const addReply = () => {
        let replyData = {
            reply: reply,
            userID: props.userID
        }

        axios.post(`http://localhost:5000/commentReply/${props.buzzID}/${props.commentID}`, replyData)
            .then(res=>console.log(res));
    } 

    let repliesArray = [];
        for(let i in props.replies[props.commentID]){
            repliesArray.push({
                ...props.replies[props.commentID][i]
            })
        }

        let repliesList = '';
        if(repliesArray.length){
            repliesList = (
                repliesArray.map(reply=>{
                    return (
                    <div key={reply._id}>
                        <div key={reply._id} className={styles.CommentBox}>
                            <img src={reply.commentedBy.picture} alt='profile-pic'/>
                            <div>
                                <p>{reply.commentedBy.name}</p>
                                <p>{reply.content}</p>
                            </div>
                        </div>
                    </div>)}) 
    
                    
            )
        }

    return(
        <div>
            {repliesList}
        <div className={styles.NewReply}>
            <input type='text' placeholder='Write a reply' onChange={(event)=>setReply(event.target.value)}/>
            <button onClick={addReply}><FaArrowAltCircleRight/></button>
        </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{
        replies: state.comments.repliesData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchReplies: (commentID) => dispatch(actions.fetchReplies(commentID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);