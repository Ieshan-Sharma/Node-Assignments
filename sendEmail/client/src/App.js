import axios from "axios"
import React, { useState } from "react"
import './App.css';

function App() {
    const [sent, setSent] = useState(false)
    const [text, setText] = useState("")
    const [to, setTo] = useState("")
    console.log(to)
    const handleSend = async (e) => {
        try {
            e.preventDefault()
            await axios.post('http://localhost:8000/api/v1/send-email', { text, to }).then(() => {
                setSent(true)
                alert("sent")
            })
        } catch (error) {
            console.log(error)
        }
    }

    const textHandler = (e) => {
        setText(e.target.value)
    }

    const toHandler = (e) => {
        setTo(e.target.value)
    }
    return (

        <div className="App">
            {!sent ? (
                <form onSubmit={(e) => handleSend(e)}>
                    <input type="email" value={to} placeholder="To" onChange={toHandler} />
                    <input type="text" value={text} placeholder="message" onChange={textHandler} />
                    <button type="submit">Send Email</button>
                </form>
            ) : (
                <h2>Email Sent</h2>
            )}
        </div>
    )
}

export default App;
