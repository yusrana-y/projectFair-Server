const projects = require('../models/projectModel')

// add project logic

exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
    console.log(req.userId);
    const {title,language,overview,github,website} = req.body
    console.log(title,language,overview,github,website);
    console.log(req.file.filename);
    
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject)
        {
            res.status(406).json("Project already exist. Please add another")
        }
        else
        {
            const newProject = new projects({
                title,language,overview,github,website,projectImg:req.file.filename,userId:req.userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    // res.status(200).json("Add project req received")
    
}

//home Project

exports.getHomeProjectsController = async (req,res)=> {
    console.log("inside home project controller")
    try
    {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

//all Projects - authentication Required
exports.getAllProjectsController = async(req,res)=> {
    console.log("inside all project controller");
    //get query parameter of url
    const searchKey = req.query.search
    const query = {
        language:{
            $regex:searchKey,$options:"i"
        }
    }
    try
    {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

//user Project - authentication required
exports.getUserProjectsController = async(req,res)=>{
    console.log("inside get user project controller");
    const userId = req.userId
    try
    {
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

//remove project - authentication required

exports.removeProjectController = async(req,res)=>{
    console.log("inside remove project controller");
    const {pid} = req.params
    try
    {
        const removeProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removeProject)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}