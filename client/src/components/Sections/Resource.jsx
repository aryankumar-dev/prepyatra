import { useState } from "react";
import './PrepLogs.css';
function Resource() {
    return (
        <>
            <div className="resource-contactsbox col-10 mx-auto my-5">
                <p className="display-6 fw-bolder yellowtext">🔄 Resource Sharing Feed</p>
                <p className="">Discover and share valuable resources with the community. Learn from others' experiences and contribute your own insights.</p>


                 <div className="dashboard " >
                    <div className="dashboard-heading d-flex justify-content-between mt-3">
                        <div className="heading-text ">
                            <p>📊 Your Preparation Dashboard</p>
                            <p>Keep track of your daily prep sessions</p>
                        </div>
                        <div className="heading-button">
                            <button className="custonbutton">+ Add New Log</button>
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


export default Resource;