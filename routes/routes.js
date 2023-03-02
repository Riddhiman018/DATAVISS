const express = require('express')
const router = express.Router()
const controllers = require('../controller/usercontroller')
const middleWares = require('../middleware/checkRegistered')
const verifymiddleware = require('../middleware/verifyJWT')
const checkadmin = require('../middleware/admincheck')
router.post('/register',middleWares.check,controllers.register)
router.post('/login',controllers.login)
router.post('/logout',controllers.logout)
router.post('/allusers',verifymiddleware.verifyJwt,controllers.allusers)
router.post('/alladmins',checkadmin.checkadmin,verifymiddleware.verifyJwt,controllers.alladmins)
router.post('/edituser',verifymiddleware.verifyJwt,controllers.updateuser)
router.post('/editadmin',checkadmin.checkadmin,verifymiddleware.verifymiddleware,controllers.updateadmin)
module.exports=router 