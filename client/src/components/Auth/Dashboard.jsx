import { useState } from "react";
import Recruiter  from "../Sections/Recruiter.jsx"
import PrepLogs  from "../Sections/PrepLogs.jsx"
import Resource  from "../Sections/Resource.jsx"
import Progress  from "../Sections/Progress.jsx"
import Nav from '../Navbar/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import './Dashboard.css';

function Dashboard() {
    return (
        <>
            <Nav />
            <div className="dashboard my-5">
                <h1 className="display-4 fw-bolder">Welcome to the Dashboard</h1>
                {/* Add more dashboard content here */}
            </div>
            <Recruiter />
            <PrepLogs />
            <Resource />
            <Progress />
            <Footer />
        </>

    );
}

export default Dashboard;