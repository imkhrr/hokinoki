import React from "react";
import { Modal, Button } from "rsuite";

const AddModal = (props) => {

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
        <Modal backdrop="static" size={size} show={show} onHide={props.onHide} >
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.content}</Modal.Body>
            <Modal.Footer>
                <div className="flex jc-sb">
                    <div>
                    </div>
                    <div>
                        <Button onClick={props.yes} appearance="primary" block> Simpan </Button>
                        <Button onClick={props.no} appearance="default" block> Batal </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;
