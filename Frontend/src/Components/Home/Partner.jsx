import axios from "axios";
import React, { useState } from "react";
import { AiFillPlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import OptionInput from "./Options";

import { toast } from "react-toastify";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api`;

const Partners = ({ props }) => {
  const [options, setOptions] = useState([{value: ""}]);

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);



  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].value = event.target.value;
    setOptions(newOptions);
  };


  const handleAddOption = () => {
    setOptions([...options, { value: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/partner`, {
        options: options.map(option => option.value),
      });

      if (response.data.error) {
        toast.error('There is something wrong');
        return;
      }

      toast.success('logo add successfully');
      setIsLoading(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error('logo add Failed');
      setIsLoading(false);
    }

  };

  return (
    <form onSubmit={handleSubmit} className="add-options">


      <div className="op">
      {options.map((option, index) => (
        <OptionInput key={index} option={option.value} handleOptionChange={handleOptionChange} index={index} />
      ))}
      <button type="button" className="btn btn-primary w-25 mb-5 mt-5 p-2" onClick={handleAddOption}>
        <AiFillPlusCircle/>
      </button>
      </div>
      <button disabled={isLoading} className="btn btn-primary w-25 p-2" type="submit">Save</button>

    </form>
  );
};

export default Partners;