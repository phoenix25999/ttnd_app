import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import classes from './NewComplaint.module.css';
import Input from '../../../../Components/UI/Input/Input';
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
      attachment:''
    },
    imageName:'',
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

    if(inputIdentifier!=='attachment'){
    updatedComplaintForm[inputIdentifier] = event.target.value;
    }

    else{
      let fileData = new FileReader();
      fileData.onloadend = (e) => {
        let content = e.target.result;
        updatedComplaintForm[inputIdentifier] = content;
      };
      fileData.readAsDataURL(event.target.files[0]);
      this.setState({imageName: event.target.files[0].name})
    }
    this.setState({complaintForm: updatedComplaintForm});
  }

  reportComplaint = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/complaint', this.state.complaintForm)
      .then(res=>{
        this.setState({complaintForm: {}, imageName: ''});
        this.props.fetchComplaints();
      });
      
  }

  render(){
    return (
      <div className={classes.NewComplaint}>
        <h4>Complaint Box</h4>
  
        <form onSubmit={this.reportComplaint} id='form'>
          <div className={classes.ComplaintBox}>
            <div className={classes.FormRow}>
              <Input
                elementType="select"
                options={this.state.options}
                label="Select Department"
                changed={(e)=>this.inputChangeHandler(e,'department')}
                value={this.state.complaintForm.department || ''}
              />
              <Input elementType="input" label="Issue Title" changed={(e)=>this.inputChangeHandler(e,'title')} value={this.state.complaintForm.title || ''}/>
            </div>
            <div className={classes.FormRow}>
              <Input elementType="input" label="Your Name" changed={(e)=>this.inputChangeHandler(e,'name')} value={this.state.complaintForm.name || ''}/>
              <Input elementType="input" label="Email ID" changed={(e)=>this.inputChangeHandler(e,'email')} value={this.state.complaintForm.email || ''}/>
            </div>
            <div className={classes.TextAreaRow}>
              <Input elementType="textarea" label="Your Concern" changed={(e)=>this.inputChangeHandler(e,'concern')} value={this.state.complaintForm.concern || ''}/>
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
                onChange={(e)=>this.inputChangeHandler(e,'attachment')}
              />
              <p className={classes.ImageName}>
                {!this.state.imageName ? "Attachment" : this.state.imageName}
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

const mapDispatchToProps = dispatch => {
  return{
      fetchComplaints: () => dispatch( actions.fetchComplaints() )
  };
};

export default connect( null, mapDispatchToProps )( NewComplaint );
