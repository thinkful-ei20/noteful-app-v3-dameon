
'use strict';

let app = require('../server');
let chai =require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let { TEST_MONGODB_URI} = require('../config');
let Note = require('../models/note');
let Folder = require('../models/folder');
let seedFolders = require('../db/seed/folders');
let expect = chai.expect;
chai.use(chaiHttp);

describe('noteful api resources',function(){
  
  before(function () {
    return mongoose.connect(TEST_MONGODB_URI);
  }); 
    
  beforeEach(function () {
    return   mongoose.connection.db.dropDatabase().then(()=> { 
      return Folder.insertMany(seedFolders)
        .then(() => Folder.createIndexes());});
  
   
  });
    
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
    
  after(function () {
    return mongoose.disconnect();
  });

  

  describe('GET /folder', function () {
    it('should return the correct number of folders', function () {
    // 1) Call the database and the API
      const dbPromise = Folder.find();
      const apiPromise = chai.request(app).get('/api/folders');
      // 2) Wait for both promises to resolve using `Promise.all`
      return Promise.all([dbPromise, apiPromise])
      // 3) **then** compare database results to API response
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(data.length);
        });
    });
  });


  describe('GET /folder/:id', function () {
    it('should return the correct folders', function () {
      let folder = seedFolders[0];
      
      // 1) Call the database and the API
      const dbPromise = Folder.findById(folder._id);
      const apiPromise = chai.request(app).get(`/api/folders/${folder._id}`);
      // 2) Wait for both promises to resolve using `Promise.all`
      return Promise.all([dbPromise, apiPromise])
      // 3) **then** compare database results to API response
        .then(([data, res]) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          //expect(res.body).to.be.a('array');
          //expect(data.name).to.equal(folder.name);
          //expect(res.body).to.have.length(data.length);
        });
    });
  });



  describe('POST /api/folders', function () {
    it('should create and return a new folder when provided valid data', function () {
      const newItem = {
        name:'newFolder',
       
      };
      let body;
      // 1) First, call the API
      return chai.request(app)
        .post('/api/folders')
        .send(newItem)
        .then(function (res) {
          body = res.body;
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.json;
          expect(body).to.be.a('object');
          expect(body).to.include.keys('name');
          // 2) **then** call the database
          return Folder.findById(body._id);
        })
      // 3) **then** compare
        .then(data => {
          //expect(body.name).to.equal(data.name);
          expect(data).to.be.a('object');
        });
    });
  });
  describe('PUT api/folders/:id',function(){

    it ('should update a folder at given id',function(){
      const updateData = {
        name : 'Something'
      };
      return Folder.findOne()
        .then(function(folder){
          updateData.id = folder.id;
          return chai.request(app)
            .put(`/api/folders/${folder.id}`)
            .send(updateData);
        }).then(function(res) {
          expect(res).to.have.status(200);

          return Folder.findById(updateData.id);
        })
        .then(function(folder){
          expect(folder.name).to.equal(updateData.name);
          
        });
    });
  });
  describe('DELETE api/folders/:id', function(){
    it('should remove folder from database',function(){
     
      let folder;

      return Folder
        .findOne()
        .then(function(response){ 
          folder = response;
          
          return chai.request(app)
            .delete(`/api/folders/${response.id}`);
        })
        .then(function(res) {
          
          expect(res).to.have.status(204);
          return Folder.findById(folder.id);
        })
        .then(function(_folder) {
          expect(_folder).to.be.null;
        });
    });
  });
});
