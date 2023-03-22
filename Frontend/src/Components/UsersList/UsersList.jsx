import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";


const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users/getusers`;
const UserList = () => {

  const [users, setUsers] = useState([]);


 useEffect(() => {
  axios.get(API_URL)
  .then((response)=>{
    setUsers(response.data.users)
  })
 }, []);



  return (
    <div className="product-list">
      <hr />
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
                         <button className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                    ))}
              </tbody>
            </table>
        </div>

      </div>
    </div>
  );
};

export default UserList;
