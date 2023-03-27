const jwt = require("jsonwebtoken")

const auth = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]  //bearer
    // console.log(token)
    if (token) {
        const decoded = jwt.verify(token, 'masai');
        if (decoded) {
            req.body.userID = decoded.userID
            // console.log(req.body)
            next()
        } else {
            res.status(400).json({ "msg": "Please Login First" })
        }
    } else {
        res.status(400).json({ "msg": "Please Login First" })
    }
}

module.exports = {
    auth
}