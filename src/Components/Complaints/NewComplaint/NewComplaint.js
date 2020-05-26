import React, { useState } from "react";
import classes from "./NewComplaint.module.css";
import Input from "../../UI/Input/Input";
import { RiImageAddLine } from "react-icons/ri";

const NewComplaint = () => {
  const [imageName, setImageName] = useState("");

  const options = [
    { value: "IT", displayValue: "IT" },
    { value: "Admin", displayValue: "Admin" },
    { value: "HR", displayValue: "HR" },
    { value: "Infra", displayValue: "Infra" },
  ];

  const imageSelectHandler = (e) => {
    setImageName(e.target.files[0].name);
  };

  const formSubmitHandler = (e) => {
    // e.preventDefault(); 
    // above line not letting add image
  }
  return (
    <div className={classes.NewComplaint}>
      <div className={classes.Header}>Complaint Box</div>

      <form onClick={(e) => formSubmitHandler(e)}>
        <div className={classes.ComplaintBox}>
          <div className={classes.FormRow}>
            <Input
              elementType="select"
              options={options}
              label="Select Department"
            />
            <Input elementType="input" label="Issue Title" />
          </div>
          <div className={classes.FormRow}>
            <Input elementType="input" label="Your Name" />
            <Input elementType="input" label="Email ID" />
          </div>
          <div className={classes.TextAreaRow}>
            <Input elementType="textarea" label="Your Concern" />
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
              onChange={(e) => imageSelectHandler(e)}
            />
            <p className={classes.ImageName}>
              {!imageName ? "Attachment" : imageName}
            </p>
          </div>
          <div className={classes.SubmitRow}>
            <button className={classes.SubmitButton}>Submit</button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default NewComplaint;
