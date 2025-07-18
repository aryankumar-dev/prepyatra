import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import apiClient from '../../../services/apiClient';
import './PrepModal.css';

function PrepModal({ show, handleClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timespend, setTimespend] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        title,
        description,
        timespend
    };

    try {
        const response = await apiClient.createPrepLog(formData);
        console.log("Prep log added successfully:", response);
        handleClose();
    } catch (error) {
        console.error("Error adding prep log:", error);
    }
};


    return (
        <Modal show={show} onHide={handleClose} className="prep-modal">
            <Modal.Header closeButton className="prep-modal-header">
                <Modal.Title className="prep-modal-title">Add New Prep Log</Modal.Title>
            </Modal.Header>
            <Modal.Body className="prep-modal-body">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="prep-form-label">Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Enter title" 
                            className="prep-form-control" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="prep-form-label">Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Enter description" 
                            className="prep-form-control" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="prep-form-label">Time Spent (in minutes)</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={timespend} 
                            onChange={(e) => setTimespend(e.target.value)} 
                            placeholder="Time spent" 
                            className="prep-form-control" 
                        />
                    </Form.Group>

                    <Button type="submit" className="prep-submit-button">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PrepModal;
