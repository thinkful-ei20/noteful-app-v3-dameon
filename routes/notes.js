'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');
mongoose.Promise = global.Promise;

/* ========== GET/READ ALL ITEM ========== */

router.get('/notes', (req, res, next) => {
  let searchTerm;
  let filterArr = [];
  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filterArr.push({content: {$regex:re }},{title : { $regex: re }});
  } 
  return Note.find(searchTerm ?{$or :filterArr}:{})
    .sort('created')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

 
/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/notes/:id', (req, res, next) => {
  let {id} = req.params;
       
  Note.findById(id)
    .then(results => {
      res.json(results);
    }).catch(err => {
      next(err);
    });
});
 

/* ========== POST/CREATE AN ITEM ========== */
router.post('/notes', (req, res, next) => {
  let {title,content} = req.body;
  let newNote={
    title,
    content
  };
  return Note.create(newNote)
    .then((results) => {
      res.location(`${req.originalUrl}/${res.id}`).status(201).json(results);
    })
    .catch(err=>next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res, next) => {
  let {id} = req.params;
    
    
  let upObj = {};
  if(req.body.title){upObj.title = req.body.title;}
  if(req.body.content){upObj.content = req.body.content;}
  return Note.findByIdAndUpdate(id,{$set:upObj},{upsert:true, new:true})
    .then(results=>{
      res.status(200).json(results);
    }).catch(err => next(err));
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res) => {
  let {id} = req.params;
  Note.deleteOne({_id:id})
    .then(()=>{
      res.status(204).end();
    });
});
module.exports = router;