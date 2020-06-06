import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import styles from './ShowBuzz.module.css';
import axios from 'axios';


class ShowBuzz extends Component{
    state = {
        buzz: [],
        likes: 0
    }

    componentDidMount(){
        axios.get('http://localhost:5000/buzz')
            .then(res=>{
                let buzzArray = [];
                for(let i in res.data){
                    buzzArray.push({
                        ...res.data[i]
                    });
                }
                this.setState({buzz: buzzArray});
                console.log(this.state.buzz);
            });
        }

        setStateAsync(state) {
            return new Promise((resolve) => {
              this.setState(state, resolve)
            });
        }

        likeHandler = async (id)=>{
            this.state.likes===0? await this.setStateAsync({likes:1}): await this.setStateAsync({likes:0});
            let likeInfo = {
                id: id,
                likes: this.state.likes
            };
            console.log(likeInfo);
            axios.post(`http://localhost:5000/buzz/like`, likeInfo)
                .then(res=>console.log(res));
        }


    render(){

        let buzzData = this.state.buzz.map(buzz=>{
            return(
                <div key={buzz._id}>
                    <div className={styles.BuzzDetails}>
                        <div className={styles.Date}>
                            <p>15/</p>
                            <p>02</p>
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
                        <button onClick={()=>this.likeHandler(buzz._id)}><span>{buzz.likes}</span><FaThumbsUp/></button>
                        <button ><span>0</span><FaThumbsDown/></button>
                    </div>
                </div>
            );
        })

        return(
            <div className={styles.ShowBuzz}>
                <h4>Recent Buzz</h4>
                {buzzData}
                
            </div>
        );
    };
};

export default ShowBuzz;