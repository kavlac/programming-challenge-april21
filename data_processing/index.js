/**
  *  by : Marco Antonio Cavalcante
  *  index.js
  *  
  */

 const editCsv = require("./editcsv")
 const editRatings = require("./editRatings")
 let fileInputName = 'movies.csv'; 
 let fileOutputName = 'fileMovies.csv';
 
 
 // Modify movies.csv file and save changes to fileMovies.csv
 // Remove the header and modify the gender column and insert the year column.
 editCsv.generateNewFileCsv(fileInputName,fileOutputName);
 
 // Modify ratings.csv file and save changes.
 // Remove the table header.
 editRatings.generateNewRatingsCsv('ratings.csv', 'ratings.csv')
 
 