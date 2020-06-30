import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ShowBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import BuzzView from '../../../../Components/UI/BuzzView/BuzzView';

class ShowBuzz extends Component{

    state = {
        comment: ''
    }

    componentDidMount(){
        this.props.fetchBuzz();
    }

        likeHandler = async (id, dislikedBy)=>{
                let likeInfo = {
                    id: id,
                    likes: this.props.userID,
                    alreadyDisliked: false
                };
                if(dislikedBy.includes(this.props.userID)){
                    likeInfo.alreadyDisliked=true;
                }
                axios.put('http://localhost:5000/buzz/like', likeInfo)
                    .then(res=>console.log(res));
                this.props.fetchBuzz();
        }

        dislikeHandler = async (id, likedBy)=>{

            let dislikeInfo = {
                id: id,
                dislikes: this.props.userID,
                alreadyLiked: false
            };
            if(likedBy.includes(this.props.userID)){
                dislikeInfo.alreadyLiked=true;
            }
            axios.put('http://localhost:5000/buzz/dislike', dislikeInfo)
                .then(res=>console.log(res));
            this.props.fetchBuzz();
            
        }

        commentHandler = (event) => {
            this.setState({comment: event.target.value});
        } 

        addComment = (buzzID) => {
            let commentData = {
                comment: this.state.comment,
                userID: this.props.userID
            }
            axios.post(`http://localhost:5000/comment/${buzzID}`, commentData)
                .then(res=>console.log(res));
        }



    render(){
        let buzzData = [];
        if(this.props.buzzData){
          buzzData = this.props.buzzData.map(buzz=>{
            return(
                <BuzzView 
                    key={buzz._id}
                    buzz={buzz} 
                    userID={this.props.userID}
                    likeHandler={()=>this.likeHandler(buzz._id, buzz.dislikes)}
                    dislikeHandler={()=>this.dislikeHandler(buzz._id,buzz.likes)}
                    changed={this.commentHandler}
                    addComment={()=>this.addComment(buzz._id)} />
            );
        });
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
        email: state.user.userData.email,
        userID: state.user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: () => dispatch( actions.fetchBuzz() ),
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowBuzz );