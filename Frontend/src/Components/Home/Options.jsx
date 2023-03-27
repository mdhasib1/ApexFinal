import React from "react";
import Form from 'react-bootstrap/Form';
const OptionInput = ({ option, handleOptionChange, index }) => {
  return (
    <div className="add-options p-2">
      <label htmlFor={`option-${index}`}>Logo {index + 1}:</label>
      <Form.Control  type="file" id={`option-${index}`} value={option} onChange={event => handleOptionChange(event, index)} placeholder="Enter your options" />
     
    </div>
  );
};

export default OptionInput;