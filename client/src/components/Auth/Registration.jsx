import { useState } from 'react'
import './Registration.css'
import { useNavigate } from "react-router-dom";
import apiClient from '../../../services/apiClient';

function Registration() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        apiClient.signup(fullName, email, password, username)
            .then((response) => {
                setLoading(false);
                setMessage(response.message);
                setFullName("");
                setEmail("");
                setPassword("");
                setUsername("");
                e.target.reset();
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response && err.response.data) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError("An unexpected error occurred");
                }
            }
            );

    }

    return (
        <>
            <div className="container">
                <div className="registration-container">
                    <div className="registration-image">
                        {/* insert and image */}

                    </div>
                    <div className="registration-form">
                        <h2>Registration</h2>

                        <form className="signup-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type='submit' className="btn btn-primary" >

                                {loading ? "Loading..." : "Register"}
                            </button>
                            {error && <p className="error-message">{error}</p>}

                            <p className="login-link">
                                Already have an account?{" "}
                                <span className="link-text" onClick={() => navigate('/login')}>
                                    Login
                                </span>
                            </p>
                        </form>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Registration
