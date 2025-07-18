import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import RecruiterModal from '../Sections/RecruiterModal.jsx';
import apiClient from '../../../services/apiClient';
import './Recruiter.css';

function Recruiter() {
    const [show, setShow] = useState(false);
    const [contacts, setContacts] = useState([]);

    const fetchContacts = async () => {
        try {
            const response = await apiClient.getMyRecruiterNetwork();
            setContacts(response.data); // ✅ data only
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiClient.deleteRecruiterNetwork(id);
            fetchContacts();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    useEffect(() => { fetchContacts(); }, []);

    return (
        <div className="Recruiter-contactsbox col-10 mx-auto mb-5">
            <p className="display-6 fw-bolder yellowtext">📞 Recruiter Contacts</p>
            <p className="Recruiter-text">Never lose track of your valuable recruiter connections.</p>

            <div className="table-container">
                <p>🔥 Your Recruiter Network Dashboard</p>
                <div className="d-flex justify-content-between mb-2">
                    <p>{contacts.length} Active Contacts</p>
                    <Button variant="warning" className=" fw-bolder" onClick={() => setShow(true)}>
                        + Add New Contact
                    </Button>
                    <RecruiterModal show={show} handleClose={() => { setShow(false); fetchContacts(); }} />
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Position</th>
                            <th>Contact</th>
                            <th>Follow Up</th>
                            <th>Status</th>
                            <th>Contacts</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.company}</td>
                                <td>{contact.appliedFor}</td>
                                <td>{contact.email}</td>
                                <td>{contact.followUpDate || "N/A"}</td>
                                <td><span className="badge bg-info">{contact.status}</span></td>
                                <td>
                                    <a href={`mailto:${contact.email}`} className="btn btn-sm btn-outline-warning me-1 ">Email</a>
                                    {contact.phone ? (
                                        <a href={`tel:${contact.phone}`} className="btn btn-sm btn-outline-warning">Phone</a>
                                    ) : (
                                        <button disabled className="btn btn-sm btn-outline-warning">No Phone</button>
                                    )}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-warning me-1">Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(contact._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Recruiter;
