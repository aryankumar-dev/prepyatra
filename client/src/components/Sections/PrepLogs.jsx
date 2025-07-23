import { useEffect, useState } from "react";
import PrepModal from '../Sections/PrepModal.jsx';
import Button from 'react-bootstrap/Button';
import apiClient from '../../../services/apiClient';
import './PrepLogs.css';

function PrepLogs() {
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [logs, setLogs] = useState([]);

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setSelectedLog(null);
    };

    const handleShow = () => {
        setEditMode(false);
        setSelectedLog(null);
        setShow(true);
    };

    const handleEditShow = (log) => {
        setSelectedLog(log);
        setEditMode(true);
        setShow(true);
    };

    const fetchLogs = async () => {
        try {
            const response = await apiClient.getMyPrepLogs();
            setLogs(response.data);
        } catch (error) {
            console.error("Error fetching prep logs:", error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiClient.deletePrepLog(id);
            console.log("Deleted log:", id);
            fetchLogs();
        } catch (error) {
            console.error("Error deleting prep log:", error);
        }
    };

    return (
        <div className="prep-contactsbox col-10 mx-auto">
            <p className="display-6 fw-bolder yellowtext">📝 Prep Logs</p>
            <p className="Recruiter-text">Track your preparation journey, monitor progress, and never lose sight of your learning goals.</p>

            <div className="dashboard">
                <div className="dashboard-heading d-flex justify-content-between mt-4 mb-4 mx-3">
                    <div className="heading-text text-start">
                        <p className="p-0 m-0 heading-textOne fw-bolder">📊 Your Preparation Dashboard</p>
                        <p className="p-0 m-0 heading-textTwo">Keep track of your daily prep sessions</p>
                    </div>
                    <div className="heading-button">
                        <Button variant="warning" className="fw-bolder" onClick={handleShow}>
                            + Add New Log
                        </Button>
                    </div>
                </div>

                <div className="cards">
                    {logs.map(log => (
                        <div className="card prep-card p-4 mb-4 rounded" key={log._id}>
                            <h5 className="fw-bold mb-2 text-start">{log.title}</h5>
                            <p className="mb-3 text-start text-white">{log.description}</p>
                            <div className="d-flex flex-column mb-3 text-start">
                                <span className="mb-1">⏱️ <strong>{log.timespend} mins</strong></span>
                                <span>📅 <strong>{new Date(log.createdAt).toLocaleDateString()}</strong></span>
                            </div>
                            <div className="d-flex gap-2">
                                <Button size="sm" variant="outline-warning" className="fw-bold w-100"
                                    onClick={() => handleEditShow(log)}>✏️ Edit</Button>
                                <Button size="sm" variant="outline-danger" className="fw-bold w-100"
                                    onClick={() => handleDelete(log._id)}>🗑️ Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <PrepModal
                show={show}
                handleClose={() => { handleClose(); fetchLogs(); }}
                editMode={editMode}
                log={selectedLog}
            />
        </div>
    );
}

export default PrepLogs;
