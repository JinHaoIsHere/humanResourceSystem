
const jwt = require('jsonwebtoken');

const privateKEY = "helloworld";

const sign = (user)=>{
    return jwt.sign(user, privateKEY, {expiresIn: '2d'})
    //return jwt.sign(user, privateKEY, {expiresIn: '2d'})
}

module.exports={
    sign,
}