'use strict';

const mongoose = require('mongoose');

let folderSchema = mongoose.Schema({

  name:String,
  timestamps:{
    createdAt:Date,
    updatedAt:Date
  }
});
folderSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Folder = mongoose.model('Folder',folderSchema);


module.exports = Folder;




