import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';


export const AddBook = () => {
    let navigate = useNavigate();

    const [sent, setSent] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const data = sessionStorage.getItem("token")




    const handleAdd = async (e) => {
        try {
            e.preventDefault()
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('author', author);
            formData.append('price', price);
            formData.append('image', image);

            console.log(formData);
            await axios.post('http://localhost:5000/book', formData, {
                headers: {
                    // "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + data,
                },
            }

            ).then((res) => {
                setSent(true)
                alert("Added Successfully")
                console.log(res.data);
            })
        } catch (error) {
            console.log(error)
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const desHandler = (e) => {
        setDescription(e.target.value)
    }
    const authorHandler = (e) => {
        setAuthor(e.target.value)
    }
    const priceHandler = (e) => {
        setPrice(e.target.value)
    }
    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }
    return (
        <div>
            {!sent ? (
                <Form onSubmit={(e) => handleAdd(e)} encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} placeholder="Enter your name"
                            onChange={nameHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description} placeholder="Description"
                            onChange={desHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" value={author} placeholder="Enter  author name"
                            onChange={authorHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={price} placeholder="Enter price "
                            onChange={priceHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" accept=".jpg, .jpeg, .png" name="image"
                            placeholder="Add the file" onChange={imageHandler} />
                    </Form.Group>


                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>
            ) : (
                navigate("/dashboard")

            )}
        </div>
    )
}
