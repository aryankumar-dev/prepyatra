import { useState } from "react";
import Button from 'react-bootstrap/Button';
import RecruiterModal from '../Sections/RecruiterModal.jsx'

import './Recruiter.css';
function Recruiter() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="Recruiter-contactsbox col-10 mx-auto mb-5">
                <p className="display-6 fw-bolder yellowtext">📞 Recruiter Contacts</p>
                <p className="Recruiter-text">Never lose track of your valuable recruiter connections. Organize, manage, and follow up with ease.</p>
                <div className="table-container">

                    <p> 🔥 Your Recruiter Network Dashboard</p>

                    <div className="d-flex justify-content-between mb-2">
                        <p>3 Active Contacts</p>

                        <Button variant="primary" className="custonbutton" onClick={handleShow}>
                            + Add New Contact
                        </Button>

                        <RecruiterModal show={show} handleClose={handleClose} />


                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Contact</th>
                                <th>Last Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Aryan Kumar</td>
                                <td>Google</td>
                                <td>Frontend Developer</td>
                                <td>aryan@gmail.com</td>
                                <td>2 days ago</td>
                                <td><span className="badge bg-success">Contacted</span></td>
                                <td><button className="btn btn-primary btn-sm">Email</button>
                                    <button className="btn btn-primary btn-sm">Phone</button>
                                </td>
                            </tr>
                            {/* Map your dynamic rows here */}
                        </tbody>
                    </table>


                </div>
            </div>
        </>
    );
}


export default Recruiter;