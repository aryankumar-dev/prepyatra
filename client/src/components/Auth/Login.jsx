import { useState } from 'react'
import './Login.css'
import { useNavigate } from "react-router-dom";
import apiClient from '../../../services/apiClient';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");

        apiClient.login(email, password)
            .then((response) => {
                setLoading(false);
                setMessage(response.message);
                setEmail("");
                setPassword("");
                e.target.reset();
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                if (err.response && err.response.data) {
                    setError(err.response.data.message || "An error occurred");
                } else {
                    setError("An unexpected error occurred");
                }
            });
    }

    return (
        <>
            <div className="container">
                <div className="login-container">

                    <div className="login-form">
                        <h2>Login</h2>

                        <form className="login-form" onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="error-message">{error}</p>}
                            {message && <p className="success-message">{message}</p>}

                            <button type="submit" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>


                        <p className="regi-link">
                            Don’t have an account?{" "}
                            <span className="link-text" onClick={() => navigate('/registration')}>
                                Create account
                            </span>
                        </p>



                    </div>
                    <div className="login-image">
                        {/* insert an image */}
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login