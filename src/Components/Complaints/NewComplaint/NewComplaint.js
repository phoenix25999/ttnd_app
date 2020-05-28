import React, { Component } from 'react';
import classes from './NewComplaint.module.css';
import Input from '../../UI/Input/Input';
import { RiImageAddLine } from 'react-icons/ri';
import axios from 'axios';

class NewComplaint extends Component{

  state = {
    complaintForm: {
      department: '',
      title:'',
      name: '',
      email: '',
      concern: '',
      image:''
    },
    options: [
      { value: "Hardware", displayValue: "Hardware" },
      { value: "Infra", displayValue: "Infra" },
      { value: "Others", displayValue: "Others" }
    ]
  }

  inputChangeHandler = (event, inputIdentifier)=>{
    const updatedComplaintForm = {
      ...this.state.complaintForm
    }

    if(inputIdentifier!=='image'){
    updatedComplaintForm[inputIdentifier] = event.target.value;
    }

    else{
      updatedComplaintForm[inputIdentifier] = event.target.files[0].name;
    }
    this.setState({complaintForm: updatedComplaintForm});
  }

  reportComplaint = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/complaint', this.state.complaintForm)
      .then(res=>console.log(res));
  }

  render(){
    return (
      <div className={classes.NewComplaint}>
        <div className={classes.Header}>Complaint Box</div>
  
        <form onSubmit={this.reportComplaint}>
          <div className={classes.ComplaintBox}>
            <div className={classes.FormRow}>
              <Input
                elementType="select"
                options={this.state.options}
                label="Select Department"
                changed={(e)=>this.inputChangeHandler(e,'department')}
              />
              <Input elementType="input" label="Issue Title" changed={(e)=>this.inputChangeHandler(e,'title')}/>
            </div>
            <div className={classes.FormRow}>
              <Input elementType="input" label="Your Name" changed={(e)=>this.inputChangeHandler(e,'name')}/>
              <Input elementType="input" label="Email ID" changed={(e)=>this.inputChangeHandler(e,'email')}/>
            </div>
            <div className={classes.TextAreaRow}>
              <Input elementType="textarea" label="Your Concern" changed={(e)=>this.inputChangeHandler(e,'concern')}/>
            </div>
            <div className={classes.ImageUploadRow}>
              <label htmlFor="image">
                <RiImageAddLine
                  className={classes.ImageButton}
                  title="Add Image"
                />
              </label>
              <input
                id="image"
                type="file"
                className={classes.ImageInput}
                accept="image/*"
                hidden
                onChange={(e)=>this.inputChangeHandler(e,'image')}
              />
              <p className={classes.ImageName}>
                {!this.state.complaintForm.image ? "Attachment" : this.state.complaintForm.image}
              </p>
            </div>
            <div className={classes.SubmitRow}>
              <button className={classes.SubmitButton}>Submit</button>
            </div>
          </div>
        </form>
  
      </div>
    );
  } 
};

export default NewComplaint;
