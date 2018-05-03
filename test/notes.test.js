'use strict';


let app = require('../server');
let chai =require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
let { TEST_MONGODB_URI} = require('../config');
let Note = require('../models/note');
let seedNotes =require('../db/seed/notes');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Noteful api resources',function(){
  before(function () {
    return mongoose.connect(TEST_MONGODB_URI);
  }); 
    
  beforeEach(function () {
    return Note.insertMany(seedNotes)
      .then(() => Note.createIndexes());
  });
    
  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });
    
  after(function () {
    return mongoose.disconnect();
  });




  describe('POST /api/notes', function () {
    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'title': 'The best article about cats ever!',
        'content': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...',
        'tags': []
      };
      let body;
      // 1) First, call the API
      return chai.request(app)
        .post('/api/notes')
        .send(newItem)
        .then(function (res) {
          body = res.body;
          expect(res).to.have.status(201);
          expect(res).to.have.header('location');
          expect(res).to.be.json;
          expect(body).to.be.a('object');
          expect(body).to.include.keys('id', 'title', 'content','folderId');
          // 2) **then** call the database
          return Note.findById(body.id);
        })
      // 3) **then** compare
        .then(data => {
          expect(body.title).to.equal(data.title);
          expect(body.content).to.equal(data.content);
        });
    });
  });

  describe('PUT api/notes/:id',function(){

    it ('should update a dnote at given id',function(){
      const updateData = {
        title:'Something goes here',
        content:'There is stuff here'
      };
      return Note.findOne()
        .then(function(note){
          updateData.id = note.id;
          return chai.request(app)
            .put(`/api/notes/${note.id}`)
            .send(updateData);
        }).then(function(res) {
          expect(res).to.have.status(200);

          return Note.findById(updateData.id);
        })
        .then(function(note){
          expect(note.title).to.equal(updateData.title);
          expect(note.content).to.equal(updateData.content);
        });
    });
  });
  


  






  describe('GET /api/notes/:id', function () {
    it('should return correct notes', function () {
      let data;
      // 1) First, call the database
      return Note.findOne().select('id title content')
        .then(_data => {
          data = _data;
          // 2) **then** call the API
          return chai.request(app).get(`/api/notes/${data.id}`);
        })
        .then((res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;

          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('id', 'title', 'content');

          // 3) **then** compare
          expect(res.body.id).to.equal(data.id);
          expect(res.body.title).to.equal(data.title);
          expect(res.body.content).to.equal(data.content);
        });
    });
  });




  describe('GET /api/notes', function () {
    it('should return the correct number of Notes', function () {
    // 1) Call the database and the API
      const dbPromise = Note.find();
      const apiPromise = chai.request(app).get('/api/notes');
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


















  describe('DELETE api/notes/:id', function(){
    it('should remove note from database',function(){
     
      let note;

      return Note
        .findOne()
        .then(function(_note) {
          note = _note;
          return chai.request(app).delete(`/api/notes/${note.id}`);
        })
        .then(function(res) {
          expect(res).to.have.status(204);
          return Note.findById(note.id);
        })
        .then(function(_note) {
          expect(_note).to.be.null;
        });







    });
  });




});