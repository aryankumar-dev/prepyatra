import { useState } from "react";
import apiClient from "../../../service/apiClient.js";
import "./Signup.css";

function Signup() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");


    return (
        <div className="container">


            <div className="signup-container">
            <h2>Signup</h2>
  
            </div>


        </div>
    )


}

export default Signup;