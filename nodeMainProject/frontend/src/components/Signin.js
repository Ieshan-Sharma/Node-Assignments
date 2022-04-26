import { Button, Form } from 'react-bootstrap';
import { useNavigate,NavLink } from 'react-router-dom';
import axios from "axios"
import React, { useState } from "react"

export const Signin = () => {
    let navigate = useNavigate();

    const [sent, setSent] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSend = async (e) => {
        try {
            e.preventDefault()
            await axios.post('http://localhost:5000/signin', { email, password }
            ).then((res) => {
                setSent(true)
                alert("You are logged In")
                sessionStorage.setItem("token", res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }
    return (

        <div>
            {!sent ? (
                <Form onSubmit={(e) => handleSend(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="Enter email"
                            onChange={emailHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} placeholder="Password"
                            onChange={passwordHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            ) : (
                navigate("/dashboard")
            )}
            <NavLink to="/signup">Back To SignUp..</NavLink>
        </div>
    )
}


