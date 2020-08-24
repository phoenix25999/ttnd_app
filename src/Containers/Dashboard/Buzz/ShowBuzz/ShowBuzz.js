import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import styles from './ShowBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import BuzzView from '../../../../Components/UI/BuzzView/BuzzView';
import { FaFilter } from 'react-icons/fa';
import BuzzFilter from '../BuzzFilter.js/BuzzFilter';
import ErrorHandler from '../../../../Components/UI/ErrorHandler/ErrorHandler';

const ShowBuzz = ( props ) => {

    const [showBuzzFilters, setShowBuzzFilters] =useState(false);
    const [pageNo, setPageNo] = useState(2);
    const [showToaster, setShowToaster] = useState(false);

    const observer = useRef(
        new IntersectionObserver((entries)=>{
            const first = entries[0];
            if(first.isIntersecting){
                props.fetchMoreBuzz(pageNo);
                loader.current(pageNo+1);
                console.log(pageNo);
            }
        }, { threshold: 0.5 })
    )

    const loader = React.useRef(setPageNo);

    const [element, setElement] = useState(null);
    useEffect(()=>props.fetchBuzz(''), []);

    useEffect(()=>{
        
        const currentElement = element;
        const currentObserver = observer.current;
        console.log(currentElement);
        if(currentElement){
            currentObserver.observe(currentElement);
        }

        return ( ) => {
            if(currentElement){
                currentObserver.unobserve(currentElement);
            }
        };

    },[element]);

    useEffect(()=>{
        loader.current = setPageNo;
    }, [pageNo]);
    

        const likeHandler = async (id, dislikedBy)=>{
                let likeInfo = {
                    id: id,
                    likes: props.userID,
                    alreadyDisliked: false
                };
                if(dislikedBy.includes(props.userID)){
                    likeInfo.alreadyDisliked=true;
                }
                axios.put('http://localhost:5000/buzz/like', likeInfo)
                    .then(res=>console.log(res));
                props.fetchBuzz('');
        }

        const dislikeHandler = async (id, likedBy)=>{

            let dislikeInfo = {
                id: id,
                dislikes: props.userID,
                alreadyLiked: false
            };
            if(likedBy.includes(props.userID)){
                dislikeInfo.alreadyLiked=true;
            }
            axios.put('http://localhost:5000/buzz/dislike', dislikeInfo)
                .then(res=>console.log(res));
            props.fetchBuzz('');
            
        }

        // const loadMoreBuzz = ( ) => {
        //     props.fetchMoreBuzz(pageNo);
        //     setPageNo(pageNo+1);
        // }

        let buzzData = [];
        if(props.buzzData){
          buzzData = props.buzzData.map(buzz=>{
            return(
                <BuzzView 
                    key={buzz._id}
                    buzz={buzz} 
                    userID={props.userID}
                    likeHandler={()=>likeHandler(buzz._id, buzz.dislikes)}
                    dislikeHandler={()=>dislikeHandler(buzz._id,buzz.likes)}
                    showToaster={showToaster}
                />
            );
        });
        }

        

        return(
            <>
            <div  className={styles.ShowBuzz} >
                <div className={styles.Header}>
                    <h4>Recent Buzz</h4>
                    <button onClick={()=>setShowBuzzFilters(true)}><FaFilter  /></button>
                    {showBuzzFilters?<BuzzFilter show={showBuzzFilters} clicked={()=>setShowBuzzFilters(false)} />:''}
                </div>
                <div ref={setElement}>
                    {buzzData}    
                </div>
            </div>
            {props.error?<ErrorHandler/>:''}
            {props.message?<p className={styles.Message}>{props.message}</p>:''}
            </>
        );
};

const mapStateToProps = ({buzz, user}) => {
    return{
        buzzData: buzz.buzzData,
        error: buzz.error,
        message: buzz.message,
        email: user.userData.email,
        userID: user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: ( category ) => dispatch( actions.fetchBuzz( category ) ),
        fetchMoreBuzz: ( pageNo ) => dispatch( actions.fetchMoreBuzz( pageNo )),
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowBuzz );