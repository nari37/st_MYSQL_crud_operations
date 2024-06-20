import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
    const [values,setvalues] = useState({
        email:'',
        username:'',
        phone:''
    })

    const [showMessage, setShowMessage] = useState(false); // Initially, don't show the message
 
// regualrn...
    const phonenumber = (e)=>{
         setvalues({...values,phone:e.target.value})
         const phoneValue =  e.target.value.replace(/[^0-9]/g, '')
         
        phoneValue.length <= 9 ? setShowMessage(true) : setShowMessage(false)

        
    };
   


    const navigate = useNavigate();
    const handileSubmit = (event)=>{
        event.preventDefault();
    
         axios.post(`${process.env.REACT_APP_URL}/student`,values)
        .then(res=>console.log(res))
        .catch(err => console.log(err))
        navigate('/')
    }

  return (
    <div className="container mt-5">
      <h2>Add Student</h2>
      <form onSubmit={handileSubmit}>
        <div className="form-group">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" onChange={e=>setvalues({...values,email:e.target.value})} />
        </div>

        <label htmlFor="name">User Name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={e=>setvalues({...values,username:e.target.value})} />
        </div>


        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="number"   className="form-control" id="phone" placeholder="Enter phone number" 
          onChange={phonenumber}
          onFocus={() => setShowMessage(true)} // Show the message on focus
          onBlur={() => setShowMessage(false)} // Hide the message on blur
          max={9999999999}
          min={0}
          onKeyPress= {(e) => {
            // Prevent input if the current length is already 10 digits
            if (e.target.value.length >= 10) {
              e.preventDefault();
            }
          }}
           />

          {showMessage &&  <p style={{color:"red"}}>please enter 10 digits only</p>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
