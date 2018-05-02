/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();



  Promise.all([
    api.search('/api/notes'),
    // api.search('/api/folders'),
    // api.search('/api/tags')
  ])
    .then(([
      notes,
      folders,
      tags
    ]) => {
      store.notes = notes;
      store.folders = folders;
      store.tags = tags;
      noteful.render();
    });















  // api.search('/api/notes')
  //   .then(response => {
  //     store.notes = response;
  //     noteful.render();
  //   });

  // console.log('Get folders, coming soon...');
  // // api.search('/api/folders')
  // //   .then(response => {
  // //     store.folders = response;
  // //     noteful.render();
  // //   });

  // console.log('Get tags, coming soon...');
  // // api.search('/api/tags')
  // //   .then(response => {
  // //     store.tags = response;
  // //     noteful.render();
  // //   });

});

