import React from "react";
import { Modal } from "rsuite";

const ConfirmationModal = (props) => {
    return (
        <Modal
            backdrop="static"
            size={props.size}
            show={props.show}
            onHide={props.onHide}
        >
            <Modal.Header>
                <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>Apakah kamu yakin ?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.yes} appearance="primary" block>
                    Ya
                </Button>
                <Button onClick={props.no} appearance="default" block>
                    Tidak
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
