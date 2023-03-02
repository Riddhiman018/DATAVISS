const jsonwebtoken = require('jsonwebtoken')
const config = require('../config')

async function verifyJwt(req,res,next){
    try{
        const token = req.cookies['token-cookie']
        if(!token){
            res.status(200).send({
                Message:'Token Missing'
            })
        }
        else{
            const usr = jsonwebtoken.verify(token,config.secret_key)
            req.user = usr
            next()
        }
    }catch(e){
        console.log(e)
        res.status(404).send({
            Message:'Error'
        })
    }
}
module.exports = {verifyJwt }