import { useState } from "react";
import PrepModal from '../Sections/PrepModal.jsx'
import Button from 'react-bootstrap/Button';
import './PrepLogs.css';
function PrepLogs() {
        const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="prep-contactsbox col-10 mx-auto">
                <p className="display-6 fw-bolder yellowtext ">📝 Prep Logs</p>
                <p className="Recruiter-text">Track your preparation journey, monitor progress, and never lose sight of your learning goals.</p>

                <div className="dashboard " >
                    <div className="dashboard-heading d-flex justify-content-between mt-3">
                        <div className="heading-text ">
                            <p>📊 Your Preparation Dashboard</p>
                            <p>Keep track of your daily prep sessions</p>
                        </div>
                        <div className="heading-button">
                           
                             <Button variant="primary" className="custonbutton" onClick={handleShow}>
                            + Add New Log 
                           </Button>

                        <PrepModal show={show} handleClose={handleClose} />
                        </div>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>System Design - Load Balancers</p>
                        </div>
                        <div className="card">
                            <p>System Design - Load Balancers</p>
                        </div>
                        <div className="card">
                            <p>System Design - Load Balancers</p>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}


export default PrepLogs;