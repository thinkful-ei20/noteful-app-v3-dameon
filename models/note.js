'use strict';


const mongoose = require('mongoose');

let noteSchema =  mongoose.Schema({

  title:{
    type:String,
    required:true
  },
  content:String,
  created: Date

});

const Note = mongoose.model('Note',noteSchema);


module.exports = Note;










