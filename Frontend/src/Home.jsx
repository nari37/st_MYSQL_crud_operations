



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_URL);
                setData(res.data);             
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once

    const deleteItem = (id) => {
        const confirmed = window.confirm('Are you sure you want to delete?');

        if (confirmed) {
            axios.delete(`${process.env.REACT_APP_URL}/delete/${id}`)
                .then((res) => {
                    console.log("Deleted successfully:", res);
                    setData(data.filter(item => item.id !== id)); // Update the state after deletion
                })
                .catch((err) => console.error("Error deleting item:", err));
        } else {
            console.log('Deletion canceled by the user.');
        }
    };

    return (
        <div className='d-flex h-100 bg-primary justify-content-center align-items-center'>
            <div className='mw-50 bg-white rounded p-3 mt-3 mb-3'>
                <h2>Student List:</h2>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-sm btn-success'>Create +</Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone no</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((st, index) => (
                            <tr key={index}>
                                <td>{st.id}</td>
                                <td>{st.username}</td>
                                <td>{st.email}</td>
                                <td>{st.phonenumber}</td>
                                <td className='d-flex gap-1 justify-content-spacebetween'>
                                    <Link to={`/Read/${st.id}`} className='btn btn-sm btn-success'>Read</Link>
                                    <Link to={`/edit/${st.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                    <button className='btn btn-sm btn-danger' onClick={() => deleteItem(st.id)}>Delete</button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className='text-center'>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
