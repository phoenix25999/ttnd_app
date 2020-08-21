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
        showBuzzFilters: false,
        pageNo: 2,
        buzzMessage: ''
    }

    componentDidMount(){
        this.props.fetchBuzz('');
        // this.scrollListener = window.addEventListener("scroll", e => {
        //     this.handleScroll(e);
        //   });
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

        loadMoreBuzz = ( ) => {
            this.props.fetchMoreBuzz(this.state.pageNo);
            this.setState({pageNo: this.state.pageNo+1});
        }

        handleScroll = () => { 
            var lastLi = document.querySelector("div.BuzzView > div:last-child");
            var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
            var pageOffset = window.pageYOffset + window.innerHeight;
          if (pageOffset > lastLiOffset) {
                 this.loadMoreBuzz();
            }
          };


    render(){
        console.log(document.querySelector("div.ShowBuzz"))
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
                <div className={styles.BuzzView}>
                    {buzzData}    
                </div>
            </div>
            {this.props.error?<ErrorHandler/>:''}
            {/* {this.props.message?<p className={styles.Message}>{this.props.message}</p>:<button className={styles.LoadMoreButton} onClick={this.loadMoreBuzz}>Load more</button>} */}
            </>
        );
    };
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