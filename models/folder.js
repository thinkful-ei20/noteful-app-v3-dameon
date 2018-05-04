'use strict';

const mongoose = require('mongoose');

let folderSchema = mongoose.Schema({

  name:String,

  timestamps:{
    createdAt:Date,
    updatedAt:Date
  }

});


const Folder = mongoose.model('Folder',folderSchema);


module.exports = Folder;




