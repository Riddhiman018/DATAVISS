const usrmodel = require('../model/user.mongo')
 async function check(req,res,next){
    try{
        const usr = await usrmodel.findOne({
            EMAIL:req.body.EMAIL
        })
        if(usr){
            res.status(200).send({
                Message:'User Exists'
            })
        }
        else{
            next()
        }
    }catch(e){
        res.status(404).send({
            Message:'Error',
        })
    }
 }

 module.exports = {
    check
 }