const usrmodel = require('../model/user.mongo')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

async function createToken(id){
    try{
        const token = await jwt.sign({_id:id},config.secret_key)
        return token
    }catch(e){
        res.status(404).send({
            Message:'Error'
        })
    }
}

async function register(req,res){
    const CREATED_AT = new Date().toISOString()
    const UPDATED_AT = new Date().toISOString()
    var objToBeCreated = req.body
    console.log(req.body)
    var pwd='';
    objToBeCreated.CREATED_AT = CREATED_AT
    objToBeCreated.UPDATED_AT = UPDATED_AT
    try{
        const salt = await bcrypt.genSalt(10)
        if(salt){
            console.log(req.body)
            pwd = await bcrypt.hash(req.body.PASSWORD,salt)
        }
        if(pwd){
            objToBeCreated.PASSWORD = pwd
        }
        const user = new usrmodel(objToBeCreated)
        const result = await user.save()
        if(result){
            res.status(200).send({
                Message:'Success'
            })
        }
        else{
            res.status(200).send({
                Message:'Failed'
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).send({
            Message:'Server Error'  
        })
    }
}

async function login(req,res){
    //loginid//password
    console.log(req.body)
    try{
        const usr = await usrmodel.findOne({
            EMAIL:req.body.EMAIL
        })
        if(usr){
            const pwd_verify = await bcrypt.compare(req.body.PASSWORD,usr.PASSWORD)
            if(pwd_verify){
                const token = await createToken(usr._id)
                res.cookie('token-cookie',token,{
                    maxAge:600*1000,
                    httpOnly:true,
                    secure:false
                })
                res.status(200).send({
                    Message:'Verified',
                    USERNAME:usr.EMAIL,
                    NAME:usr.FIRST_NAME,
                    NAME_:usr.LAST_NAME
                })
            }
            else{
                res.status(200).send({
                    Message:'Unauthorized'
                })
            }
        }else{
            res.status(200).send({
                Message:'Invalid'
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).send({
            Message:'Error'
        })
    }
}

async function logout(req,res){
    res.clearCookie('token-cookie')
    res.status(200).send({
        Message:'Logged Out'
    })
}

module.exports = {
    register,login,logout
}