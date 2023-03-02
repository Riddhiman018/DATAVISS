const express = require('express')
const router = express.Router()
const controllers = require('../controller/usercontroller')
const middleWares = require('../middleware/checkRegistered')
const verifymiddleware = require('../middleware/verifyJWT')
const checkadmin = require('../middleware/admincheck')
router.post('/register',middleWares.check,controllers.register)
router.post('/login',controllers.login)
router.post('/logout',controllers.logout)
router.get('/allusers',verifymiddleware.verifyJwt,controllers.allusers)
router.get('/alladmins',checkadmin.checkadmin,controllers.alladmins)
module.exports=router 