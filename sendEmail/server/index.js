import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'
import cors from 'cors'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.post("/api/v1/send-email", (req, res) => {
    let { text, to } = req.body
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: "ieshansharma456@gmail.com",
            pass: "Ieshan@1221"
        }
    })
    const mailOptions = {
        from: "ieshansharma456@gmail.com",
        to,
        subject: 'Sending Email using Node.js[nodemailer]',
        html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px
    ">
    <h2>Here is your mail!</h2>
    <p> ${text}</p>
    <p>All the best, Ieshan</p>
     </div>`
    };
    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            res.sendStatus(200);
        }
    })
})
app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port 8000");
})
