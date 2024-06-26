//import React, { Component } from 'react'
import React, { useState } from 'react';
import axios from 'axios';


const CreateCategory = () => {
  const [formData, setFormData] = useState({
    topic: '',
    judgesCount: '',
    rules: '',
    registrationOpen: '',
  });
  //formData represents the current state value
  //setFormData is a function used to update the state

  const HandleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    axios.post('/cat/save', formData)
      .then((res) => {
        if (res.data.success) {
          setFormData({
            topic: '',
            judgesCount: '',
            rules: '',
            registrationOpen: '',
          });
          window.location.href = '/e';
        }

      })
      .catch((error) => {
        console.error('Error occurred while creating event:', error);
      });
  };

  const containerStyle = {
    border: '2px solid black',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'gray',
    color: 'white',
    maxWidth: '600px',
    margin: 'auto', // Center the container
  };

  return(
    <div className="container mt-5" style={containerStyle}>
    <h2 style={{ color: 'black' }}>Add Main Event Category</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="topic" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name of the event"
          value={formData.topic}
          onChange={HandleInputChange}
          id="topic"
          name="topic"
        />
      </div>

      {/* <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter description"
          value={formData.description}
          onChange={HandleInputChange}
          id="description"
          name="description"
        />
      </div> */}

      <div className="mb-3">
        <label htmlFor="judgesCount" className="form-label">
          Judges count
        </label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter Judges"
          value={formData.judgesCount}
          onChange={HandleInputChange}
          id="judgesCount"
          name="judgesCount"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rules" className="form-label">
          Rules
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Rules"
          value={formData.rules}
          onChange={HandleInputChange}
          id="rules"
          name="rules"
        />
      </div>

      <div className="mb-3">
          <label htmlFor="registrationOpen" className="form-label">
            Is registration open?
          </label>
          <select
            className="form-select"
            value={formData.registrationOpen}
            onChange={HandleInputChange}
            id="registrationOpen"
            name="registrationOpen"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>


    

      <button type="submit" className="btn btn-danger" onClick={onSubmit}>
        Submit
      </button>
    </form>
  </div>
  );
};

export default CreateCategory;
