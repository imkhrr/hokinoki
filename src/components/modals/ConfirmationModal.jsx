import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'rsuite';

function ConfirmationModal(props) {

    const [size, setSize] = useState('xs');
    const [show, setShow] = useState(false);

    const modalClose = (e) => {
        props.onClose(false)
        setShow(false);
    }

    const modalShow = (e) => {
        setShow(e)
    }

    useEffect(() => {
        modalShow(props.show)
        if (props.size) {
            setSize(props.size)
        }
    }, [props.show, props.size])


    return (
        <Modal backdrop="static" size={size} show={show} onHide={modalClose}>
            <Modal.Header>
                <Modal.Title>
                    {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.save} appearance="primary" color="red"> Konfirmasi </Button>
                <Button onClick={modalClose} > Batal </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;