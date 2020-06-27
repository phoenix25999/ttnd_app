import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ShowBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import BuzzView from '../../../../Components/UI/BuzzView/BuzzView';

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
                <BuzzView 
                    buzz={buzz} 
                    email={this.props.email}
                    likeHandler={()=>this.likeHandler(buzz._id, buzz.dislikes)}
                    dislikeHandler={()=>this.dislikeHandler(buzz._id,buzz.likes)} />
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
        email: state.user.email
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: () => dispatch( actions.fetchBuzz() )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowBuzz );