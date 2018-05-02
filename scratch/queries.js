'use strict';

let cl = function(x){console.log(x);};


const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

mongoose.connect(MONGODB_URI)
  .then(() => {
    const searchTerm = 'new';
    //let searchTerm;
    let filterArr = [];
    if (searchTerm) {
      const re = new RegExp(searchTerm, 'i');
      filterArr.push({content: {$regex:re }},{title : { $regex: re }});
     
    }

    return Note.find({$or :filterArr})
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



mongoose.connect(MONGODB_URI)
  .then(()=>{
    //let id =req.body.id
    let id = '000000000000000000000000';
    return Note.findById(id)
      .then(results => {
        console.log(results);
      }).catch(console.error);
  }) .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

mongoose.connect(MONGODB_URI)
  .then(()=>{
    //let newNote = req.body??
    let newNote={
      title:'something',
      content:'else'
    };
    return Note.create(newNote)
      .then((results) => {
        console.log(results);
      }).catch(console.error);
  }) .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
   

mongoose.connect(MONGODB_URI)
  .then(()=>{
    let newItem = {
      title:'newNew',
      content:'oldOld'
    };
    return Note.create(newItem)
      .then((results)=>{
      
        console.log(results);
      }) .then(() => {
        return mongoose.disconnect()
          .then(() => {
            console.info('Disconnected');
          });
      })
      .catch(err => {
        console.error(`ERROR: ${err.message}`);
        console.error(err);
      });
  });
 









mongoose.connect(MONGODB_URI)
  .then(()=>{
    //let id =req.body.id??
    let id = '5ae8a1353f0fc247f4ff5f04';
    //let updatedInfo =req.body??
    let updatedInfo = {
      content:'Weird',
      title:'Science'
    };
    return Note.findByIdAndUpdate(id,updatedInfo,{upsert:true, new:true});})
  .then((results)=>{
    console.log(results);
  }) .then(() => {
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
  
  



mongoose.connect(MONGODB_URI)
  .then(()=> {
    //let itemToDelete = req.params
    let id = '5ae8a1353f0fc247f4ff5f04';
    return Note.deleteOne({_id:id});})
  .then((results)=>{
    console.log(results);
  }).then(()=>{
    return mongoose.disconnect()
      .then(() => {
        console.info('Disconnected');
      });
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });


















