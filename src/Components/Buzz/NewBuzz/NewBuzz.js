import React, { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { RiImageAddLine } from "react-icons/ri";
import classes from './NewBuzz.module.css';

const NewBuzz = () => {
  const [imageName, setImageName] = useState('');

  const imageSelectHandler = (e) => {
    setImageName(e.target.files[0].name);
  }

  return (
    <div className={classes.NewBuzz}>
        <div className={classes.Header}>
          <FaPencilAlt style={{ margin: "0 0.3rem" }} />
          Create Buzz
        </div>
        <div>
          <textarea
            className={classes.Form}
            placeholder="Share your thoughts...."
          ></textarea>
        </div>
        <div className={classes.FormFooter}>
          <div className={classes.FormOptions}>
            <div>
              <select className={classes.Category} defaultValue={"Category"}>
                <option defaultValue="DEFAULT" disabled hidden>
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
                onChange={(e) => imageSelectHandler(e)}
              />
              <p className={classes.ImageName}>{imageName}</p>
            </div>
          </div>
          <button type="submit" className={classes.SubmitButton} title="Submit Buzz">
            <TiLocationArrow />
          </button>
        </div>
      </div>
  )
}

export default NewBuzz;