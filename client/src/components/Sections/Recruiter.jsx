import { useState } from "react";
import './Recruiter.css';
function Recruiter() {
    return (
        <>
            <div className="Recruiter-contactsbox col-10 mx-auto mb-5">
                <p className="display-6 fw-bolder yellowtext">📞 Recruiter Contacts</p>
                <p className="Recruiter-text">Never lose track of your valuable recruiter connections. Organize, manage, and follow up with ease.</p>
               <div className="table-container">

                    <p> 🔥 Your Recruiter Network Dashboard</p>

                    <div className="d-flex justify-content-between mb-2">
                        <p>3 Active Contacts</p>
                        <button className="custonbutton">+ Add New Contact</button>


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