import React, { useState } from "react";
import { Modal, Form, Button, Container, Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function FieldEntry(props) {
  let { id, name, label, typeName, choices } = props.entry;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <React.Fragment>
      <tr>
        <td>{name}</td>
        <td>{label}</td>
        <td>{typeName}</td>
        <td>
          {choices.length > 0 ? (
            <button className="btn btn-info" onClick={(e) => setShow(!show)}>
              Valeurs
            </button>
          ) : (
            <span className="text-info">Aucun choix</span>
          )}
        </td>
      </tr>

      {show && (
        <>
          <ValuesDetails handleClose={handleClose} choices={choices} />
        </>
      )}
    </React.Fragment>
  );
}

const ValuesDetails = (props) => {
  const { handleClose, choices } = props;

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Valeurs du paramétre </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Valeur</th>
              </tr>
            </thead>
            <tbody>
              {choices.map((choice) => (
                <tr key={uuidv4()}>
                  <td>{choice.label}</td>
                  <td>{choice.valueItem}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="fas fa-times mr-2"></i>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FieldEntry;
