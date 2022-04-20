const Book = require('../models/books');
const Message = require('../utilities/statusCode')
const fs = require('fs')
const logger = require('../utilities/logger')

//POST
const saveBook = async (req, res, next) => {
    try {
        const book = new Book({
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            price: req.body.price,
            image: req.file.filename,
        });
        await book.save()
        res.send(book);
    } catch (err) {
        logger.userLogger.log('error', "There is an error in saving book")

    }
};

//GET
const getBook = async (req, res, next) => {
    try {
        const books = await Book.find()
        res.send(books)
    } catch (err) {
        logger.userLogger.log('error', "There is an error in get request")

    }

};

//PATCH
const updateBook = (req, res, next) => {
    let id = req.params.id;
    let new_image = '';

    if (req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image)
        } catch (err) {
            logger.userLogger.log('error', "There is an error in updating book")

        }
    } else {
        new_image = req.body.old_image;
    }
    Book.findByIdAndUpdate(id, {
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        price: req.body.price,
        image: new_image,
    },
        function (err) {
            if (!err) {
                res.send("Successfully updated Book.");
            } else {
                res.send("failed");
            }
        });
};
//DELETE
const deleteBook = (req, res) => {
    let id = req.params.id;
    Book.findByIdAndRemove(id, function (err, result) {
        if (result.image != "") {
            try {
                fs.unlinkSync("./uploads/" + result.image);
            } catch (err) {
                logger.userLogger.log('error', "There is an error in deleting book")

            }
        }
        if (err) {
            res.sendStatus(Message.INTERNAL_ERROR);
        } else {
            res.sendStatus(Message.SUCCESS);
        }
    });
};

module.exports = {
    saveBook,
    getBook,
    updateBook,
    deleteBook
}





