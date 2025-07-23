import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import apiClient from '../../../services/apiClient';
import './PrepModal.css';

function PrepModal({ show, handleClose, editMode, log }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timespend, setTimespend] = useState('');

    useEffect(() => {
        if (editMode && log) {
            setTitle(log.title);
            setDescription(log.description);
            setTimespend(log.timespend);
        } else {
            setTitle('');
            setDescription('');
            setTimespend('');
        }
    }, [editMode, log]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { title, description, timespend };

        try {
            if (editMode) {
                await apiClient.updatePrepLog(log._id, formData);
                console.log("Log updated successfully");
            } else {
                await apiClient.createPrepLog(formData);
                console.log("Log created successfully");
            }
            handleClose();
        } catch (error) {
            console.error("Error saving prep log:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="prep-modal">
            <Modal.Header closeButton className="prep-modal-header">
                <Modal.Title className="prep-modal-title">
                    {editMode ? "Edit Prep Log" : "Add New Prep Log"}
                </Modal.Title>
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
                            required
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
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="prep-form-label">Time Spent (mins)</Form.Label>
                        <Form.Control 
                            type="number"
                            value={timespend}
                            onChange={(e) => setTimespend(e.target.value)}
                            placeholder="Time spent"
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="prep-submit-button w-100">
                        {editMode ? "Update Log" : "Add Log"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PrepModal;
