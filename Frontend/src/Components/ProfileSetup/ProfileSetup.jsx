import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useAuth from "../Auth/useAuth";

const ProfileSetupModal = ({ show, address, handleClose }) => {
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");


  const { register, error, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, address, bio, password);
      handleClose();
      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      alert("Failed to set up the profile.");
    }
  };

  return (
    <Modal show={show}    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
            <Modal.Header>
            <Modal.Title className="text-light">Setup Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className="m-auto w-100 p-5" >
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light fs-5">Email:</Form.Label>
              <Form.Control type="file" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light fs-5">Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" >
              <Form.Label className="text-light fs-5">Bio:</Form.Label>
              <Form.Control as="textarea" rows={3} value={bio} onChange={(e) => setBio(e.target.value)}  />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="text-light fs-5">Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  value={password}
        onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit} disabled={loading}>
      Complete
      </Button>
      </Form>
      {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
    </Modal>
  );
};

export default ProfileSetupModal;
