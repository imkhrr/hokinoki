import React from "react";
import { Modal, Button } from "rsuite";

const AddModal = (props) => {
  return (
    <Modal
      backdrop="static"
      size={props.size}
      show={props.show}
      onHide={props.onHide}
    >
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.content}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.yes} appearance="primary" block>
          Simpan
        </Button>
        <Button onClick={props.no} appearance="default" block>
          Batal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
