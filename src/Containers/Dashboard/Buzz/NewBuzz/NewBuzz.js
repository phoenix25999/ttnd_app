import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';
import axios from 'axios';
import * as actions from '../../../../store/actions/index';

class NewBuzz extends Component{

  state = {
    buzzForm: {
      desc:'',
      category:'',
      image:''
    },
    imageName:''
  }

  changeHandler = (event, inputIdentifier)=>{
    const updatedBuzzForm = {
      ...this.state.buzzForm
    }

    if(inputIdentifier!=='image'){
    updatedBuzzForm[inputIdentifier] = event.target.value;
    }

    else{
      let fileData = new FileReader();
      fileData.onloadend = (e) => {
        let content = e.target.result;
        updatedBuzzForm[inputIdentifier] = content;
      };
      fileData.readAsDataURL(event.target.files[0]);
      this.setState({imageName: event.target.files[0].name})
    }
    this.setState({buzzForm: updatedBuzzForm});
  }

  createBuzz = (event) => {
    event.preventDefault();
    const buzzData = {
      ...this.state.buzzForm,
      email: this.props.email
    }
    axios.post('http://localhost:5000/buzz', buzzData)
      .then(res=>{
        this.setState({buzzForm: {}, imageName:''});
        this.props.fetchBuzz();
      }); 
  }

  render() {
    return (
      <div className={classes.NewBuzz}>
          <div className={classes.Header}>
            <FaPencilAlt style={{ margin: "0 0.3rem" }} />
            Create Buzz
          </div>
          <form onSubmit={this.createBuzz}>
          <div>
            <textarea
              id='desc'
              className={classes.Form}
              placeholder="Share your thoughts...."
              onChange={(e)=>this.changeHandler(e,'desc')}
              value={this.state.buzzForm.desc || ''}
            ></textarea>
          </div>
          <div className={classes.FormFooter}>
            <div className={classes.FormOptions}>
              <div>
                <select className={classes.Category} onChange={(e)=>this.changeHandler(e,'category')} value={this.state.buzzForm.category || 'Category'}>
                  <option defaultValue="DEFAULT" disabled >
                    Category
                  </option>
                  <option value="Activity">Activity Buzz</option>
                  <option value="Lost & Found">Lost & Found Buzz</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center'}}>
                <label htmlFor="image" >
                  <RiImageAddLine className={classes.ImageButton}
                  title="Add Image" />
                </label>
                <input
                  id="image"
                  type="file"
                  className={classes.ImageInput}
                  accept="image/*"
                  hidden
                  onChange={(e)=>this.changeHandler(e,'image')}
                />
                <p className={classes.ImageName}>{this.state.imageName}</p>
              </div>
            </div>
            <button className={classes.SubmitButton} title='Create Buzz'>
              <TiLocationArrow /> 
            </button>
          </div>
          </form>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
      fetchBuzz: () => dispatch( actions.fetchBuzz() )
  };
}

export default connect( null, mapDispatchToProps )( NewBuzz );