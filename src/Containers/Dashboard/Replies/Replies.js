import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { RiImageAddLine } from 'react-icons/ri';
import styles from './Replies.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const Replies = (props) => {

    const[showReplySection, setShowReplySection] = useState(false);
    const[reply, setReply] = useState('');
    const[image, setImage] = useState('');
    const[pageNo, setPageNo] = useState(2);

    const {
        replies,
        fetchReplies,
        userID
    } = props;

    useEffect(()=>fetchReplies(props.commentID), [props.commentID, fetchReplies])
    
    

    const addReply = ( event ) => {

        event.preventDefault();

        const replyData = new FormData();
        replyData.append('reply',reply);
        replyData.append('image',image[0]);
        replyData.append('userID',userID);

        const config = {
        headers: {
            'content-type': 'multipart/form-data'
            }
        }

        axios.post(`http://localhost:5000/commentReply/${props.buzzID}/${props.commentID}`, replyData, config)
            .then(res=>{
                setReply('');
                props.fetchReplies(props.commentID);
                props.fetchBuzz('');
            });
    } 

    let repliesArray = [];
    let count = 0;
    
        for(let i in replies[props.commentID]){
            repliesArray.push({
                ...replies[props.commentID][i]
            })
        }

        let repliesList = '';
        if(repliesArray.length){
            count= replies[props.commentID].length;
            repliesList = (
                repliesArray.map(reply=>{
                    return (
                    <div key={reply._id}>
                        <div key={reply._id} className={styles.ReplyBox}>
                            <img src={reply.commentedBy.picture} alt='profile-pic'/>
                            <div>
                                <p>{reply.commentedBy.name}</p>
                                <p>{reply.content}</p>
                                {reply.image?<img src={require(`../../../server/${reply.image}`)} alt='pic'/>: ''}
                            </div>
                        </div>
                    </div>)}) 
    
                    
            )
        }

    return(
        <div className={styles.Replies}>
            <p onClick={()=>setShowReplySection(!showReplySection)}>{count} {count>1?'Replies':'Reply'}</p>
            {showReplySection?
            [   
                repliesList,
                <form action="upload" method="post" encType="multipart/form-data" className={styles.NewReply} onSubmit={addReply} key={Date.now}>
                        <div>
                        <input type='text' value={reply} placeholder='Write a reply' onChange={(event)=>setReply(event.target.value)}/>
                            <div>
                                <label htmlFor='replyImage'>
                                    <RiImageAddLine title='Add image' className={styles.ImageButton}/>
                                </label>
                                <input 
                                    id='replyImage' 
                                    name='image' 
                                    type='file' 
                                    accept='image/*'
                                    hidden 
                                    onChange={(event)=>setImage(event.target.files)}
                                />
                            </div>
                            <span>{image&&image[0].name}</span>

                        </div>
                        
                        <button><FaArrowAltCircleRight/></button>
                    </form>
            ]
       : '' }
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
        fetchReplies: (commentID) => dispatch(actions.fetchReplies(commentID)),
        fetchBuzz: (category) => dispatch(actions.fetchBuzz(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Replies);