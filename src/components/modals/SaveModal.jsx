import React, { useEffect, useState } from "react";
import { Modal, Button, Icon } from "rsuite";

const SaveModal = (props) => {

    const [size, setSize] = useState('xs');
    const [show, setShow] = useState(false);

    const modalShow = (e) => {
        setShow(e)
    }

    const modalClose = (e) => {
        props.onClose(false);
        setShow(false);
    }

    useEffect(() => {
        modalShow(props.show)
        if (props.size) {
            setSize(props.size)
        }
    }, [props.show, props.size])

    return (
        <Modal backdrop="static" size={size} show={show} onHide={modalClose} >
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {props.footerAddOn}
                <Button appearance="primary" onClick={props.save}> <Icon icon="save" style={{ marginRight: "0.25rem" }} /> Simpan </Button>
                <Button onClick={modalClose}> Batal </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SaveModal;
