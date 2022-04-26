import React, { useState } from "react"
import { Table, Container, Button, Modal, Form } from 'react-bootstrap'
import axios from 'axios'



export const Book = ({ data, removeHandler }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const authorize = sessionStorage.getItem("token")
    const [bookById, setbookById] = useState({})
    const getData = (data) => {
        setbookById(data)
    }
    const inputHandler = (e) => {
        setbookById({ ...bookById, [e.target.name]: e.target.value })
    }
    const imageHandler = (e) => {
        setbookById({ ...bookById, [e.target.image]: e.target.files[0] })
    }
    const editBook = async (id) => {
        const formData = new FormData();
        formData.append('image', bookById.image);
        
        await axios.patch(`http://localhost:5000/book/${bookById._id}`, bookById
            , {
                headers: {
                    Authorization: "Bearer " + authorize,
                },
            })
            .then(() => { setShow(false)
            window.location.reload();
      })
            .catch((err) => console.log(err));

    }
    return (

        <Container>
            <Table responsive >
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th> Name</th>
                        <th>Description</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Image</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.author}</td>
                            <td>{item.price}</td>
                            <td><img src={`http://localhost:5000/${item.image}`}
                                alt=""></img></td>
                            <td> <Button variant="primary" type="submit"
                                onClick={() => { handleShow(); getData(item) }}
                            >Edit</Button></td>
                            <td> <Button variant="primary" type="submit"
                                onClick={() => removeHandler(item._id)}
                            >Delete</Button></td>

                        </tr>
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Id: {bookById._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={editBook}encType="multipart/form-data">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label >Name</Form.Label>
                            <Form.Control value={bookById.name} name="name" type="text"
                                placeholder="Enter your name" onChange={inputHandler} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text" name="description"
                                placeholder="Description"
                                value={bookById.description}
                                onChange={inputHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author"
                                placeholder="Enter  author name"
                                value={bookById.author}
                                onChange={inputHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="price"
                                placeholder="Enter price "
                                value={bookById.price}
                                onChange={inputHandler}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" accept=".jpg, .jpeg, .png"
                                name="image" onChange={imageHandler}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={editBook}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    )
}