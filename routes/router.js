const express = require('express')      //imports express
const userController = require('../controller/userController')  //import controller into a  variable
const projectController = require('../controller/projectController') //imports projectController 
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')


const router = new express.Router()         // an object is made of class Router()

// register : post request to http://localhost:3000/register
router.post('/register', userController.registerController)           // post method is used and path is defined, the function(logic) is given in another file (MVC archi)

// login : post request to http://localhost:3000/register
router.post('/login',userController.loginController)

//project : post request to http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single("projectImg"),projectController.addProjectController)

//homeprojects : get request to http://localhost:3000/home-projects
router.get('/home-projects',projectController.getHomeProjectsController)

//allprojects : get request to http://localhost:3000/all-projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

//userprojects : get request to http://localhost:3000/user-projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)

//remove project : delete request to  http://localhost:3000/pid/remove-project
router.delete('/:pid/remove-project',jwtMiddleware,projectController.removeProjectController)

//edit profile : put request to http://localhost:3000/user/edit
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.profileUpdationController)


module.exports = router

