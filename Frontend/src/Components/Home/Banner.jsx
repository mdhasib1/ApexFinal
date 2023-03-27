import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



function Banner() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
      <FloatingLabel
        controlId="floatingTextarea"
        label="First text"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingTextarea"
        label="Title"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Description here">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Banner Icon</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

    <button variant="primary" onClick={handleShow} className='btn btn-primary'>Add Guide</button>


    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title  className='text-light'>ADD GUIDE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className='text-light'>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="Guide title"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className='text-light'>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Banner;