import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ShowBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';
import BuzzView from '../../../../Components/UI/BuzzView/BuzzView';
import { FaFilter } from 'react-icons/fa';
import BuzzFilter from '../BuzzFilter.js/BuzzFilter';
import ErrorHandler from '../../../../Components/UI/ErrorHandler/ErrorHandler';

class ShowBuzz extends Component{

    state = {
        comment: '',
        showBuzzFilters: false
    }

    componentDidMount(){
        this.props.fetchBuzz('');
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
                />
            );
        });
        }

        return(
            <>
            <div className={styles.ShowBuzz}>
                <div className={styles.Header}>
                    <h4>Recent Buzz</h4>
                    <button onClick={()=>this.setState({showBuzzFilters: true})}><FaFilter  /></button>
                    {this.state.showBuzzFilters?<BuzzFilter show={this.state.showBuzzFilters} clicked={()=>this.setState({showBuzzFilters: false})} />:''}
                </div>
                {buzzData}    
            </div>
            {this.props.error?<ErrorHandler/>:''}
            </>
        );
    };
};

const mapStateToProps = ({buzz, user}) => {
    return{
        buzzData: buzz.buzzData,
        error: buzz.error,
        email: user.userData.email,
        userID: user.userData._id
    };
}

const mapDispatchToProps = dispatch => {
    return{
        fetchBuzz: ( category ) => dispatch( actions.fetchBuzz( category ) ),
        fetchComments: (buzzID) => dispatch( actions.fetchComments(buzzID) )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ShowBuzz );