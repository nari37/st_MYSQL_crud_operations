

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
  const { id } = useParams();

  // Initialize the state with default values
  const [editstudent, seteditStudent] = useState({
    email: '',
    username: '',
    phonenumber: '',
  });

 
  // Fetch student data from the server when the component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/Read/${id}`)
      .then((res) => seteditStudent(res.data[0]))// Ensure that res.data is an array and select the first item
      .catch((err) => console.log(err));
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seteditStudent({ ...editstudent, [name]: value });
  };
     const navigate = useNavigate()
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated editedstudent data to the server 
    // use axios.post or axios.put to update the data on the server...
       axios.put(`${process.env.REACT_APP_URL}/update/${id}`,editstudent)
       .then(res=>console.log(res))
       
       .catch(err=>console.log(err))
       navigate('/')
  };

  return (
    <div className="container mt-5">
      <h2>Update</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={editstudent.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">User Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            placeholder="Enter name"
            value={editstudent.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="number"
            className="form-control"
            id="phone"
            name="phonenumber"
            min={0}
            max={9999999999}
            placeholder="Enter phone number"
            onKeyPress={(e) => {
              // Prevent input if the current length is already 10 digits
              if (e.target.value.length >= 10) {
                e.preventDefault();
              }
            }}
            value={editstudent.phonenumber}
            onChange={handleInputChange}
          />
         
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}

