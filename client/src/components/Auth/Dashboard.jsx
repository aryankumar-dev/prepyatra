import { useState } from "react";
import Nav from '../Navbar/Nav.jsx';
import Footer from '../Footer/Footer.jsx';
import './Dashboard.css';

function Dashboard() {
    return (
        <>
         <Nav />
              <div className="dashboard">
            <h1>Welcome to the Dashboard</h1>
            {/* Add more dashboard content here */}
        </div>
        <Footer />
        </>
      
    );
}

export default Dashboard;