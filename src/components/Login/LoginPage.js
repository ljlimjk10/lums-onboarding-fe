import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "./LoginContext";
import authService from "../../services/auth-service";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ReactComponent as AppLogo } from "../../assets/lylo-logo.svg";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const { setLoggedIn } = useContext(LoginContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            if (username === "" || password === "") {
                setError("Please provide both username and password");
                return;
            }
            await authService.login(username, password).then(
                () => {
                    setLoggedIn(true);
                    navigate("/");
                    // window.location.reload();
                },
                (error)=>{
                    console.log(error);
                }
            )
            // const response = await axios.post(
            //     "http://13.215.50.140:3002/api/auth/admin/login",
            //     { username, password }
            // );
            // console.log("Login successful", response.data.access_token);

        } catch (error) {
            setError("Invalid username or password");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>

            <Form className="col-md-2 mx-auto text-center" onSubmit={handleLogin}>
                <AppLogo />
                <h3 className="py-3">Please sign in</h3>
                <Form.Group controlId="formGroupUsername">
                    <Form.Control
                        type="text"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Control
                        type="password"
                        style={{ borderRadius: 0 }}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="py-3">
                    <Button type="submit" variant="primary">
                        Sign In
                    </Button>
                    {error && <p>{error}</p>}
                </div>
            </Form>
        </div>
    );
}

export default LoginPage;
