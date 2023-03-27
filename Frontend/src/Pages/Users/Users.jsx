import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "react-confirm-alert/src/react-confirm-alert.css";
import './user.scss';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users`;

function Users() {

  const [users, setUsers] = useState([]);


  useEffect(() => {
   axios.get(`${API_URL}/getusers`)
   .then((response)=>{
     setUsers(response.data.users)
   })
  }, []);


 const deleteCollection = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};


const handleDelete = async (id) => {
  try {
    await deleteCollection(id);
    setUsers(users.filter((user) => user._id !== id));
  } catch (error) {
    console.error('Error deleting collection:', error);
  }
};

  return (
    <div className="table">
    <div className="--flex-between --flex-dir-column">
      <span>
        <h3>All Users </h3>
      </span>
    </div>

    <div className="table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Member ID</th>
              <th>Role</th>
              <th>Action</th>
              

            </tr>
          </thead>

          <tbody>
           {users.map((user, index)=>(
                <tr key={index + 1}>
                  <td>{user.name}</td>
                  <td>
                    {user.email}
                  </td>
                  <td>
                    {user.memberId}
                  </td>
                  <td>
                    {user.role}
                  </td>
                  <td className="icons">
                     <button onClick={() => handleDelete(user._id)} className="btn btn-danger">Delete</button>
                  </td>
                </tr>
                ))}
          </tbody>
        </table>
    </div>

  </div>
  )
}

export default Users