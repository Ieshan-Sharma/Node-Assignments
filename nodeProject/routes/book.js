const express = require('express');
const router = express.Router();
const auth = require('../authentication/auth')
const upload = require('../utilities/storage')
const bookController = require('../controller/bookController')

//creating new book

router.post("/book", auth, upload, bookController.saveBook);

// Get all books

router.get("/book", auth, bookController.getBook);

//updating book

router.patch("/book/:id", auth, upload, bookController.updateBook);

//deleting book

router.delete("/book/:id", auth, bookController.deleteBook)

module.exports = router;