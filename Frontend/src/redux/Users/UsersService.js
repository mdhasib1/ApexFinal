import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/users/getUsers`;

// Create New Product
const createUsers = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteUser = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getUser = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateUser = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const UsersService = {
  createUsers,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
};

export default UsersService;
