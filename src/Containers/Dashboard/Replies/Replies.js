import React, { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import styles from './Replies.module.css';
import axios from 'axios';

const Replies = (props) => {

    const[reply, setReply] = useState('');

    const addReply = () => {
        let replyData = {
            reply: reply,
            userID: props.userID
        }

        axios.post(`http://localhost:5000/commentReply/${props.buzzID}/${props.commentID}`, replyData)
            .then(res=>console.log(res));
    } 

    return(
        <div className={styles.NewReply}>
            <input type='text' placeholder='Write a reply' onChange={(event)=>setReply(event.target.value)}/>
            <button onClick={addReply}><FaArrowAltCircleRight/></button>
        </div>
    );
}

export default Replies;