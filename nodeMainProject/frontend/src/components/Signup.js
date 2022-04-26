import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import React, { useState } from "react"

export const Signup = () => {
    let navigate = useNavigate();

    const [sent, setSent] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSend = async (e) => {
        try {
            e.preventDefault()
            await axios.post('http://localhost:5000/signup', { name, email, password }
            ).then(() => {
                setSent(true)
                alert("You have successfully registered!")
            })
        } catch (error) {
            console.log(error)
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
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
                    <Form.Group className="mb-3" controlId="formBasicName" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" value={name} placeholder="Enter your name"
                            onChange={nameHandler} />
                    </Form.Group>
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
                navigate("/")
            )}
        </div>
    )
}

