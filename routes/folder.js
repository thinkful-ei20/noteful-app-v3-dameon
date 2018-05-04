'use strict';


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');
let Note = require('../models/note');
mongoose.Promise = global.Promise;





router.get('/',(req,res,next) => {
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


router.get('/:id', (req, res, next) => {
  
  let {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Invalid \':id\'');
    err.status = 400;
    return next(err);
  }
  
  Folder.findById(id)
    .then(results => {
      if(results){
        res.json(results);}
    }).catch(err => {
      next(err);
    });
});


router.post('/', (req, res, next) => {
  let {name} = req.body;
  if (!name){{
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }}
  let newFolder={
    name
  };
  return Folder.create(newFolder)
    .then((results) => {
      res.location(`${req.originalUrl}/${res.id}`).status(201).json(results);
    })
    .catch(err=>  {
      if (err.code === 11000) {
        err = new Error('The folder name already exists');
        err.status = 400;
      }
      next(err);
    });
});

router.put('/:id', (req, res, next) => {
  let {id} = req.params;
  let {name} = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Invalid \':id\'');
    err.status = 400;
    return next(err);
  }
  /***** Never trust users - validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  let upObj = {name};
  if(req.body.name){upObj.name = req.body.name;}
  
  return Folder.findByIdAndUpdate(id,{$set:upObj},{upsert:true, new:true})
    .then(results=>{
      res.status(200).json(results);
    }).catch(err => next(err));
});

router.delete('/:id', (req, res,next) => {
  let {id} = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('Invalid \':id\'');
    err.status = 400;
    return next(err);
  }
  Note.updateMany({folderId : id},{$unset: {folderId: null}})
    .then(()=>{
      return Folder.deleteOne({_id:id});
    }).then(result => {
      if(result){res.status(204).end();}
      else{next();}
    });
      
});




module.exports=router;










