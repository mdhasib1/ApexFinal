import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/course/`;

// Create New Product
const createCourse = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all products
const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Product
const deleteCourse = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a Product
const getCourse = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update Product
const updateCourse = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const CourseService = {
  createCourse,
  getCourses,
  getCourse,
  deleteCourse,
  updateCourse,
};

export default CourseService;
