'use strict';


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');
mongoose.Promise = global.Promise;





router.get('/folder',(req,res,next) => {
  let searchTerm;
  let filterArr = [];
  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filterArr.push({content: {$regex:re }},{title : { $regex: re }});
  } 
  return Folder.find(searchTerm ?{$or :filterArr}:{})
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});


router.get('/folder/:id', (req, res, next) => {
  let {id} = req.params;
       
  Folder.findById(id)
    .then(results => {
      res.json(results);
    }).catch(err => {
      next(err);
    });
});


router.post('/folder', (req, res, next) => {
  let {name} = req.body;
  let newFolder={
    name
  };
  return Folder.create(newFolder)
    .then((results) => {
      res.location(`${req.originalUrl}/${res.id}`).status(201).json(results);
    })
    .catch(err=>next(err));
});

router.put('/folder/:id', (req, res, next) => {
  let {id} = req.params;
    
    
  let upObj = {};
  if(req.body.name){upObj.title = req.body.name;}
  
  return Folder.findByIdAndUpdate(id,{$set:upObj},{upsert:true, new:true})
    .then(results=>{
      res.status(200).json(results);
    }).catch(err => next(err));
});

router.delete('/folder/:id', (req, res) => {
  let {id} = req.params;
  Folder.deleteOne({_id:id})
    .then(()=>{
      res.status(204).end();
    });
});



module.exports=router;










