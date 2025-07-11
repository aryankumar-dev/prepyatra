import { useState } from 'react'
import apiClient from '../../../services/apiClient';



function Registration() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");

    return (
        <>
            <div className="container">
                <div className="registration-container">
                    <div className="registration-image"></div>
                    <div className="registration-form">
                      <h2>Registration</h2>
                    </div>

                  

                </div>
            </div>

        </>
    )
}

export default Registration
