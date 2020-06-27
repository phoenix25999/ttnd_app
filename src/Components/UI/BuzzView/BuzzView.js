import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

import styles from './BuzzView.module.css';

const BuzzView = (props) => {
    return(
        <div key={props.buzz._id} style={{borderBottom: '1px solid #ccc'}}>
            <div className={styles.BuzzDetails}>
                <div className={styles.Date}>
                    <p><em>{props.buzz.createdOn.slice(8,10)}/</em></p>
                    <p><em>{props.buzz.createdOn.slice(5,7)}</em></p>
                </div>
                <div className={styles.BuzzContent}>
                    <p>{props.buzz.createdBy}</p>
                            
                    {props.buzz.image.length?<div className={styles.ImageBox}>{props.buzz.image.map(image=><div key={image}className={styles.Image}>
                        <img src={require(`../../../server/${image}`)} alt='buzz'/>
                    </div>)}</div>:''}
        
                            
                    <p className={styles.BuzzDescription}>{props.buzz.description}</p>
                </div>
            </div>
            <div className={styles.Action}>
                <button onClick={props.likeHandler}
                    disabled={props.buzz.likes.includes(props.email)?true:false}
                    style={{color:`${props.buzz.likes.includes(props.email)?`#ff0019`:`#808080`}`}}
                >
                    <span>{props.buzz.likes.length}</span>
                    <FaThumbsUp/>
                </button>
                <button onClick={props.dislikeHandler}
                    disabled={props.buzz.dislikes.includes(props.email)?true:false}
                    style={{color:`${props.buzz.dislikes.includes(props.email)?`#ff0019`:`#808080`}`}}
                >

                    <span>{props.buzz.dislikes.length}</span>
                    <FaThumbsDown/>
                </button>
            </div>
        </div>
    )
}

export default BuzzView;