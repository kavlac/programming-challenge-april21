

const editCsv = require("./editcsv")
const editRatings = require("./editRatings")
let fileInputName = 'movies.csv'; 
let fileOutputName = 'fileMovies.csv';

editCsv.generateNewFileCsv(fileInputName,fileOutputName);

editRatings.generateNewRatingsCsv('ratings.csv', 'ratings.csv')

//exporter('localhost','teste','root','marco','fileMovies.csv');
