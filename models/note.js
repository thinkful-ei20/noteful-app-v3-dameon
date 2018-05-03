'use strict';


const mongoose = require('mongoose');

let noteSchema =  mongoose.Schema({

  title:{
    type:String,
    required:true
  },
  content:String,
  timestamps : {
    createdAt: Date,
    updatedAt: Date
  },
  folderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Folder' }
});

noteSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});




const Note = mongoose.model('Note',noteSchema);


module.exports = Note;










