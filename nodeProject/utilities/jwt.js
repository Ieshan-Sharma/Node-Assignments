const jwt = require("jsonwebtoken");
require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const logger = require('./logger')
const Message = require('../utilities/statusCode')


const jwtSign = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.sendStatus(Message.BAD_REQUEST);
		}
		const user = await User.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.JWT_KEY,
				{
					expiresIn: "2h",
				}
			);

			user.token = token;
			res.status(Message.SUCCESS).json(token);
		}
	} catch (err) {
		res.sendStatus(Message.INTERNAL_ERROR)

	} logger.userLogger.log('error', "There is an error in signin")
};

const jwtVerify = (req, res, next) => {
	if (req.headers && req.headers.authorization) {
		let authParts = req.headers.authorization.split(" ");
		if (authParts.length === 2) {
			if (/^Bearer$/i.test(authParts[0])) {
				const token = authParts[1];
				try {
					const decoded = jwt.verify(token, process.env.JWT_KEY)
					req.user = decoded;
					next()
				} catch (err) {
					res.send({
						message: "error occured"
					});
					logger.userLogger.log('error', "There is an error in authorization")

				}


			}
		}
	} else {
		return res.sendStatus(Message.UNAUTHORIZED);
	}
};


module.exports = {
	jwtSign,
	jwtVerify
}