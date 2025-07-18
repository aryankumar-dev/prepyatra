import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import apiClient from '../../../services/apiClient';
import './RecruiterModal.css';

function RecruiterModal({ show, handleClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [appliedFor, setAppliedFor] = useState('');
    const [status, setStatus] = useState('');
    const [followUpDate, setFollowUpDate] = useState('');
    const [lastInterviewDate, setLastInterviewDate] = useState('');
    const [link, setLink] = useState('');
    const [comments, setComments] = useState('');


    const AvailableStatus = [
        "screening",
        "in_progress",
        "interviewing",
        "offer_letter",
        "rejected",
    ];


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            phone,
            company,
            appliedFor,
            status,
            followUpDate,
            lastInterviewDate,
            link,
            comments,

        };

        try {
            const response = await apiClient.createRecruiterNetwork(formData);
            console.log("Recruiter added successfully:", response);
            handleClose();
        } catch (error) {
            console.error("Error adding recruiter:", error);
        }
    };


    return (
        <Modal show={show} onHide={handleClose} className="recruiter-modal">
            <Modal.Header closeButton className="modal-header-custom">
                <Modal.Title className="modal-title-custom">Add Recruiter Contacts</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body-custom">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Phone</Form.Label>
                        <Form.Control value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Company</Form.Label>
                        <Form.Control value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Enter company name" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Applied For</Form.Label>
                        <Form.Control value={appliedFor} onChange={(e) => setAppliedFor(e.target.value)} placeholder="Applied Position" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Status</Form.Label>
                        <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="form-control-custom"
                        >
                            <option value="">Select Status</option>
                            {AvailableStatus.map((item) => (
                                <option key={item} value={item}>
                                    {item.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>



                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Follow Up Date</Form.Label>
                        <Form.Control type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Last Interview Date</Form.Label>
                        <Form.Control type="date" value={lastInterviewDate} onChange={(e) => setLastInterviewDate(e.target.value)} className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Link</Form.Label>
                        <Form.Control value={link} onChange={(e) => setLink(e.target.value)} placeholder="Profile Link" className="form-control-custom" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="form-label-custom">Comments</Form.Label>
                        <Form.Control as="textarea" rows={3} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Comments" className="form-control-custom" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="submit-button">Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RecruiterModal;
