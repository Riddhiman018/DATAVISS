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
    console.log(req.cookies['token-cookie'])
    res.clearCookie('token-cookie')
    res.status(200).send({
        Message:'Logged Out'
    })
}

async function allusers(req,res){
    try{
        const fields = req.body.fields.join(" ")
        let allUsers
        if(fields.length==0){
            allusers = await usrmodel.find({ROLE:'User'}).select('FIRST_NAME MIDDLE_NAME LAST_NAME EMAIL CREATED_AT UPDATED_AT')
        }
        else{
            allusers = await usrmodel.find({ROLE:'User'}).select(`${fields}`)
        }
        if(allusers){
            res.status(200).send({
                allusers:allusers
            })
        }
    }catch(e){
        console.log(e)
        res.status(404).send({
            Message:'Error'
        })
    }
}

async function alladmins(req,res){
    try{
        const fields = req.body.fields.join(" ")
        let alladmins;
        if(fields.length==0){
            alladmins = await usrmodel.find({
                ROLE:'Admin'
            }).select('FIRST_NAME MIDDLE_NAME LAST_NAME EMAIL CREATED_AT UPDATED_AT')
    
        }
        else{
            alladmins = await usrmodel.find({
                ROLE:'Admin'
            }).select(`${fields}`)
        }
        if(alladmins){
            res.status(200).send({
                alladmins:alladmins
            })
        }
    }catch(e){
        console.log(e)
        res.status(404).send({
            Message:'Error'
        })
    }
}

async function updateUser(req,res){
    try{
        const usr_to_be_updated = await usrmodel.find({
            EMAIL:req.body.EMAIL,
            ROLE:'User'
        })
        if(usr_to_be_updated){
            const updt = await usrmodel.updateOne({
                EMAIL:req.body.EMAIL
            },{
                FIRST_NAME:req.body.FIRST_NAME||usr_to_be_updated.FIRST_NAME,
                MIDDLE_NAME:req.body.MIDDLE_NAME||usr_to_be_updated.MIDDLE_NAME||'',
                UPDATED_AT:new Date().toISOString()
            })

            if(updt){
                res.status(200).send({
                    Message:'Updated'
                })
            }
            else{
                res.status(200).send({
                    Message:'Failure'
                })
            }
        }else{
            res.status(200).send({
                Message:'Invalid User'
            })
        }
    }catch(e){
        console.log(e)
        res.status(404).send({
            Message:'Failed'
        })
    }
}
async function updateAdmin(req,res){
    try{
        const usr_to_be_updated = await usrmodel.find({
            EMAIL:req.body.EMAIL,
            ROLE:'Admin'
        })
        if(usr_to_be_updated){
            const updt = await usrmodel.updateOne({
                EMAIL:req.body.EMAIL
            },{
                FIRST_NAME:req.body.FIRST_NAME||usr_to_be_updated.FIRST_NAME,
                MIDDLE_NAME:req.body.MIDDLE_NAME||usr_to_be_updated.MIDDLE_NAME||'',
                UPDATED_AT:new Date().toISOString()
            })

            if(updt){
                res.status(200).send({
                    Message:'Updated'
                })
            }
            else{
                res.status(200).send({
                    Message:'Failure'
                })
            }
        }else{
            res.status(200).send({
                Message:'Invalid User'
            })
        }
    }catch(e){
        console.log(e)
        res.status(404).send({
            Message:'Failed'
        })
    }
}
module.exports = {
    register,login,logout,allusers,alladmins,updateUser,updateAdmin
}