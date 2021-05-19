/**
  *  by : Marco Antonio Cavalcante
  *  db.js
  *  
  */


 const exporter = require('./csv-to-mysql');

 // enter your database credentials.
const db = { 
     host: 'localhost',
     user: 'root',
     password: 'marco',
     database: 'teste',
   };


exporter(db.host,db.database,db.user,db.password);
