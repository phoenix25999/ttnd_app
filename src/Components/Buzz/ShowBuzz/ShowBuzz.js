import React, { Component } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import styles from './ShowBuzz.module.css';
import Pic from '../../../assets/ttn-ofiice.jpg';
import axios from 'axios';

class ShowBuzz extends Component{
    state = {
        likes: 0
    }

    likeHandler = () => {
        this.setState({likes:1});
    }

    componentDidMount(){
        axios.get('http://localhost:5000/buzz')
            .then(res=>console.log(res.data));
        }

    render(){
        return(
            <div className={styles.ShowBuzz}>
                <h4>Recent Buzz</h4>
                <div className={styles.BuzzDetails}>
                    <div className={styles.Date}>
                        <p>15/</p>
                        <p>02</p>
                    </div>
                    <div className={styles.BuzzContent}>
                        <p>vishesh.srivastava@tothenew.com</p>
                        <h3>Practice makes perfect</h3>
                        <div className={styles.Image}>
                        <img src={Pic} alt='buzz'/>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                           consequat elit dapibus, finibus lacus vitae, tincidunt nibh.
                           Vivamus semper leo non cursus scelerisque. Vestibulum volutpat
                           dolor vel placerat cursus.
                        </p>
                    </div>
                
                </div>
                <button onClick={this.likeHandler}><FaThumbsUp/> {this.state.likes} </button>
            </div>
        );
    };
};

export default ShowBuzz;