'use strict';

let cl = function(x){console.log(x);};


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

mongoose.connect(MONGODB_URI)
  .then(() => {
    //const searchTerm = 'lady gaga';
    let searchTerm;
    let filter = {};
    //cl(searchTerm);
    if (searchTerm) {
      const re = new RegExp(searchTerm, 'i');
      filter.title = { $regex: re };
    }

    return Note.find(filter)
      .sort('created')
      .then(results => {
        console.log(results);
      })
      .catch(console.error);
  })
  .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });



// mongoose.connect(MONGODB_URI)
//   .then(()=>{
//     //let id =req.body.id
//     let id = '000000000000000000000000';
//     return Note.findById(id)
//       .then(results => {
//         console.log(results);
//       }).catch(console.error);
//   }) .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });

// mongoose.connect(MONGODB_URI)
//   .then(()=>{
//     //let newNote = req.body??
//     let newNote={
//       title:'something',
//       content:'else'
//     };
//     return Note.create(newNote)
//       .then((results) => {
//         console.log(results);
//       }).catch(console.error);
//   }) .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });
        


// mongoose.connect(MONGODB_URI)
//   .then(()=>{
//     //let id =req.body.id??
//     let id = '5ae8a1353f0fc247f4ff5f04';
//     //let updatedInfo =req.body??
//     let updatedInfo = {
//       content:'Weird',
//       title:'Science'
//     };
//     return Note.findByIdAndUpdate(id,updatedInfo,{upsert:true, new:true});})
//   .then((results)=>{
//     console.log(results);
//   }) .then(() => {
//     return mongoose.disconnect()
//       .then(() => {
//         console.info('Disconnected');
//       });
//   })
//   .catch(err => {
//     console.error(`ERROR: ${err.message}`);
//     console.error(err);
//   });
  
  






















