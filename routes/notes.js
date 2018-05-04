'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Note = require('../models/note');
mongoose.Promise = global.Promise;

/* ========== GET/READ ALL ITEM ========== */

router.get('/notes', (req, res, next) => {
  const { searchTerm, folderId } = req.query;
  
  let filterArr = [];
  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filterArr.push({content: {$regex:re }},{title : { $regex: re }});
  } 
  if(folderId){filterArr.push({folderId});}
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
  
  let newNote={};
  const fields = ['title', 'content', 'folderId'];
  for (const field of fields) {
    if (field in req.body) newNote[field] = req.body[field];
  }
  if (!newNote.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  if (newNote.folderId && !mongoose.Types.ObjectId(newNote.folderId)) {
    const err = new Error('Invalid `folderId` in request body');
    err.status = 400;
    return next(err);
  }
  return Note.create(newNote)
    .then((results) => {
      res.location(`${req.originalUrl}/${res.id}`).status(201).json(results);
    })
    .catch(err=>next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/notes/:id', (req, res, next) => {
  const { id } = req.params;

  const updateObj = {};
  const updatableFields = ['title', 'content', 'folderId'];

  for (const field of updatableFields) {
    if (field in req.body) updateObj[field] = req.body[field];
  }

  if (updateObj.folderId && !mongoose.Types.ObjectId(newItem.folderId)) {
    const err = new Error('Invalid `folderId` in request body');
    err.status = 400;
    return next(err);
  }

  Note.findByIdAndUpdate(id, { $set: updateObj }, { new: true })
    .then(note => {
      res.json(note);
    })
    .catch(next);
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/notes/:id', (req, res) => {
  let {id} = req.params;
  

  Note.findByIdAndRemove(id)
    .then(()=>{
      res.status(204).end();
    });
});
module.exports = router;