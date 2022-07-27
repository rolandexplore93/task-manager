const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {

    try {
        // get token from client-side request and verify it using jwt
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'rollyJS')  // this return specific user id value from the authorization header
        const user = await User.findOne({ _id: decoded, 'tokens.token': token})

        if (!user) throw new Error()
        req.token = token
        req.user = user
        next()
    } catch(e){
        res.status(401).send({ error: "Please, authenticate!"})
    }
}

module.exports = auth