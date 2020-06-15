import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import styles from './ShowBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';


class ShowBuzz extends Component{

    componentDidMount(){
        this.props.fetchBuzz();
    }

        likeHandler = async (id, dislikedBy)=>{
                let likeInfo = {
                    id: id,
                    likes: this.props.email,
                    alreadyDisliked: false
                };
                if(dislikedBy.includes(this.props.email)){
                    likeInfo.alreadyDisliked=true;
                }
                axios.put('http://localhost:5000/buzz/like', likeInfo)
                    .then(res=>console.log(res));
                this.props.fetchBuzz();
        }

        dislikeHandler = async (id, likedBy)=>{

            let dislikeInfo = {
                id: id,
                dislikes: this.props.email,
                alreadyLiked: false
            };
            if(likedBy.includes(this.props.email)){
                dislikeInfo.alreadyLiked=true;
            }
            axios.put('http://localhost:5000/buzz/dislike', dislikeInfo)
                .then(res=>console.log(res));
            this.props.fetchBuzz();
            
        }

    render(){
        let buzzData = [];
        if(this.props.buzzData){
          buzzData = this.props.buzzData.map(buzz=>{
            return(
                <div key={buzz._id} style={{borderBottom: '1px solid #ccc'}}>
                    <div className={styles.BuzzDetails}>
                        <div className={styles.Date}>
                            <p><em>{buzz.createdOn.slice(8,10)}/</em></p>
                            <p><em>{buzz.createdOn.slice(5,7)}</em></p>
                        </div>
                        <div className={styles.BuzzContent}>
                            <p>{buzz.createdBy}</p>
                            {buzz.image?<div className={styles.Image}>
                            <img src={buzz.image} alt='buzz'/>
                            </div>:''}
                            
                            <p>{buzz.description}
                            </p>
                        </div>
                    </div>
                    <div className={styles.Action}>
                        <button onClick={()=>this.likeHandler(buzz._id, buzz.dislikes)}
                         disabled={buzz.likes.includes(this.props.email)?true:false}
                         style={{color:`${buzz.likes.includes(this.props.email)?`#ff0019`:`#808080`}`}}
                         >
                            <span>{buzz.likes.length}</span>
                            <FaThumbsUp/>
                        </button>
                        <button onClick={()=>this.dislikeHandler(buzz._id,buzz.likes)}
                        disabled={buzz.dislikes.includes(this.props.email)?true:false}
                        style={{color:`${buzz.dislikes.includes(this.props.email)?`#ff0019`:`#808080`}`}}>
                            <span>{buzz.dislikes.length}</span>
                            <FaThumbsDown/>
                        </button>
                    </div>
                </div>
            );
        })
        }

        return(
            <div className={styles.ShowBuzz}>
                <h4>Recent Buzz</h4>
                {buzzData}
                
            </div>
        );
    };
};

const mapStateToProps = state => {
    return{
        buzzData: state.buzz.buzzData,
        email: state.user.email
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: () => dispatch( actions.fetchBuzz() )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowBuzz );