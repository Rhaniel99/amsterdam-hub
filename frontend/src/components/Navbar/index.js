import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Button, Modal, Form } from 'react-bootstrap'; //Navbar from 'react-bootstrap;

export function NavBar() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
    
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Rosy System</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button variant="primary" onClick={handleShow}>
          Adicionar aluno
        </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <Form.Control type="text" placeholder="Readonly input here..." />
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>

        </Modal.Footer>
      </Modal>
    </div>

  );
}
