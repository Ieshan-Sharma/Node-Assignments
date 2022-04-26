const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Message = require('../utilities/statusCode')
const logger = require('../utilities/logger');
const sign = require('../utilities/jwt');
const cors = require('cors')

router.use(cors())

router.post("/signup",cors(), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!(email && password && name)) {
            res.sendStatus(Message.BAD_REQUEST);
        }
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.sendStatus(Message.DUPLICATE);
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: encryptedPassword
        });

        res.sendStatus(Message.SUCCESS);
    } catch (err) {
        logger.userLogger.log('error', "There is an error in signup")
    }
});

router.post("/signin", sign.jwtSign);


module.exports = router; 