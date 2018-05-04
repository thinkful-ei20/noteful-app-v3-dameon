'use strict';


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Folder = require('../models/folder');
let Note = require('../models/note');
let Tag = require('../models/tag');
mongoose.Promise = global.Promise;

router.get('/',(req,res,next) => {
  let {searchTerm} = req.query;
  let query;
  let regSearch;
  console.log('I just looked for something');
  console.log(searchTerm);
  if (searchTerm) {
    regSearch = { $regex: new RegExp(searchTerm, 'i') };
    query =  {name: regSearch};
  }

  return Tag.find(query)
    .sort('name')
    .then(list => {
      res.json(list);
    })
    .catch(err => {
      next(err);
    });
});
 
/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  let {id} = req.params;
     console.log(id);  
  Tag.findById(id)
    .then(results => {
      res.json(results);
    }).catch(err => {
      next(err);
    });
});


/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  
  let newTag={};
  const fields = ['name'];
  for (const field of fields) {
    if (field in req.body) newTag[field] = req.body[field];
  }
  if (!newTag.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  if (newTag.tagId && !mongoose.Types.ObjectId(newTag.tagId)) {
    const err = new Error('Invalid `TagId` in request body');
    err.status = 400;
    return next(err);
  }
  return Tag.create(newTag)
    .then((results) => {
      res.location(`${req.originalUrl}/${res.id}`).status(201).json(results);
    })
    .catch(err=>next(err));
});


/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  const updateObj = {};
  const updatableFields = ['name'];

  for (const field of updatableFields) {
    if (field in req.body) updateObj[field] = req.body[field];
  }

  if (updateObj.folderId && !mongoose.Types.ObjectId(newItem.folderId)) {
    const err = new Error('Invalid `folderId` in request body');
    err.status = 400;
    return next(err);
  }

  Tag.findByIdAndUpdate(id, { $set: updateObj }, { new: true })
    .then(tag => {
      res.json(tag);
    })
    .catch(next);
});


























/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res) => {
  let {id} = req.params;
  

  Tag.findByIdAndRemove(id)
    .then(()=>{
      res.status(204).end();
    });
});

























module.exports = router;