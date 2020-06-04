import React, { Component } from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import styles from './ShowBuzz.module.css';
import axios from 'axios';


class ShowBuzz extends Component{
    state = {
        buzz: [],
        likes: 0
    }

    likeHandler = () => {
        this.setState({likes:1});
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
                        <button onClick={this.likeHandler}><span>{this.state.likes}</span><FaThumbsUp/></button>
                        <button onClick={this.likeHandler}><span>{this.state.likes}</span><FaThumbsDown/></button>
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