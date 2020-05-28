import React, { Component } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';
import axios from 'axios';

// const NewBuzz = () => {
//   const [imageName, setImageName] = useState('');

//   const imageSelectHandler = (e) => {
//     setImageName(e.target.files[0].name);
//   }
class NewBuzz extends Component{

  state = {
    buzzForm: {
      desc:'',
      category:'',
      image:''
    }
  }

  changeHandler = (event, inputIdentifier)=>{
    const updatedBuzzForm = {
      ...this.state.buzzForm
    }

    if(inputIdentifier!=='image'){
    updatedBuzzForm[inputIdentifier] = event.target.value;
    }

    else{
      updatedBuzzForm[inputIdentifier] = event.target.files[0].name;
    }
    this.setState({buzzForm: updatedBuzzForm});
  }

  createBuzz = () => {
    axios.post('http://localhost:5000/buzz', this.state.buzzForm)
      .then(res=>console.log(res));
  }

  render() {
    return (
      <div className={classes.NewBuzz}>
          <div className={classes.Header}>
            <FaPencilAlt style={{ margin: "0 0.3rem" }} />
            Create Buzz
          </div>
          <div>
            <textarea
              id='desc'
              className={classes.Form}
              placeholder="Share your thoughts...."
              onChange={(e)=>this.changeHandler(e,'desc')}
            ></textarea>
          </div>
          <div className={classes.FormFooter}>
            <div className={classes.FormOptions}>
              <div>
                <select className={classes.Category} defaultValue={"Category"}onChange={(e)=>this.changeHandler(e,'category')}>
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
                <p className={classes.ImageName}>{this.state.buzzForm.image}</p>
              </div>
            </div>
            <button className={classes.SubmitButton} onClick={this.createBuzz} title='Create Buzz'>
              <TiLocationArrow /> 
            </button>
          </div>
        </div>
    )
  }
}

export default NewBuzz;