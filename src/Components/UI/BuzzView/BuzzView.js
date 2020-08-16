import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Comments from '../../../Containers/Dashboard/Comments/Comments';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import * as actions from '../../../store/actions/index';

import styles from './BuzzView.module.css';
import EditBuzz from '../../../Containers/Dashboard/Buzz/EditBuzz/EditBuzz';
import axios from 'axios';

const BuzzView = (props) => {

    const {
        userID,
        fetchComments,
        comments,
        buzz
    } = props;

    useEffect(()=>{fetchComments(buzz._id)}, [buzz._id, fetchComments]);

    const deleteBuzz = ( buzzId ) => {
        axios.delete(`http://localhost:5000/buzz/${buzzId}`)
            .then(res=>{
                props.fetchBuzz();
            })
    }

    return(
        <div key={buzz._id} style={{borderBottom: '1px solid #ccc', marginBottom:'50px'}}>
            <div className={styles.BuzzDetails}>
                <div className={styles.Date}>
                    <p><em>{buzz.createdOn.slice(8,10)}/</em></p>
                    <p><em>{buzz.createdOn.slice(5,7)}</em></p>
                </div>
                <div className={styles.BuzzContent}>
                    <div>
                        <p>{buzz.createdBy.email}</p>
                        {props.userID===buzz.createdBy._id?
                        <div>
                            <EditBuzz buzz={buzz} />
                            <button onClick={()=>deleteBuzz(buzz._id)}>Delete</button>
                        </div>
                        :''}
                    </div>
                    <div>
                        <div className={styles.ImageBox}>{buzz.image.map(image=><div key={image}className={styles.Image}>
                            <img src={image} alt='buzz'/>
                        </div>)}</div>   
                        <p className={styles.BuzzDescription}>{buzz.description}</p>
                    </div>
                </div>
            </div>
            <div className={styles.Action}>
                <button>{buzz.comments} Comments</button>

                <div className={styles.LikeDislike}>
                <button onClick={props.likeHandler}
                    disabled={buzz.likes.includes(userID)?true:false}
                    style={{color:`${buzz.likes.includes(userID)?`#ff0019`:`#808080`}`}}
                >
                    <span>{buzz.likes.length}</span>
                    <FaThumbsUp/>
                </button>
                <button onClick={props.dislikeHandler}
                    disabled={buzz.dislikes.includes(userID)?true:false}
                    style={{color:`${buzz.dislikes.includes(userID)?`#ff0019`:`#808080`}`}}
                >

                    <span>{buzz.dislikes.length}</span>
                    <FaThumbsDown/>
                </button>
                </div>
            </div>    
                        
                <Comments comments={comments} 
                    buzzID={buzz._id}
                />
        </div>
    )
}

const mapStateToProps = state => {
    return{
        userID: state.user.userData._id,
        comments: state.comments.commentsData
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: ( ) => dispatch( actions.fetchBuzz() ),
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( BuzzView );