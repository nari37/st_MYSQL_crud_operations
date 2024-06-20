import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Read() {
  const [student, setStudent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/Read/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>Student Details</h2>
      {student.map((item) => (
        <div key={item.id}>
          <h3>Email: {item.email}</h3>
          <h3>Username: {item.username}</h3>
          <h3>Phone Number: {item.phonenumber}</h3>

          <Link to="/" className="btn btn-primary me-2">
        Back
      </Link>

      <Link to={`/edit/${id}`} className="btn btn-success">
        Edit
      </Link>
        </div>
        
      ))}

      
    </div>
  );
}
