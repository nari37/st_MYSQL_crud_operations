import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setdata] = useState();
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}`)
        .then(res => setdata(res.data))
        .catch(err =>console.log(err))
    },[data])

    // delete function...
    const deleteItem = (id) => {
        // Display a confirmation dialog
        const confirmed = window.confirm('Are you sure you want to delete?');
      
        if (confirmed) {
          // User confirmed, proceed with delete
          axios.delete(`http://localhost:8081/delete/${id}`)
            .then((res) => {
              //  successful delete messege..
             console.log(res) // Reload the page,
            })
            .catch((err) => console.log(err));
        } else {  
          console.log('Deletion canceled by the user.');
        }
      };

      
  return (
    <div className='d-flex h-100  bg-primary justify-content-center align-items-center'>
        <div className='mw-50 bg-white rounded p-3 mt-3 mb-3'>
        <h2>Student List :</h2>
        <div className='d-flex justify-content-end'>
            <Link to='/create' className='btn btn-sm btn-success'>Create +</Link>
        </div>
            <table className='table '>  
                <thead>
                    <tr>
                        <th>Id</th> 
                        <th>Uers Name</th>
                        <th>Email</th>
                        <th>Phone no</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                     { data && ( data.map((st,index)=>{
                        return(
                        <tr key={index}>
                        <td>{st.id}</td>
                        <td>{st.username}</td>
                        <td>{st.email}</td>
                        <td>{st.phonenumber}</td>
                        <td className='d-flex gap-1 justify-content-spacebiteween'>
                        <Link to={`/Read/${st.id}`} className='btn btn-sm btn-success'>Read</Link>
                        <Link to={`/edit/${st.id}`} className="btn btn-primary">
                                 Edit
                           </Link>
                            <button className='btn btn-sm btn-danger' onClick={()=>deleteItem(st.id)}>Delete</button>
                        </td>
                        </tr>
                        );
                     }))}
                </tbody>

            </table>
        </div>
    </div>
    
  )
}
