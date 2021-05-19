/**
  *  by : Marco Antonio Cavalcante
  *  editRaings.js
  *  
  */

 'use strict';
 let fileUtils = require("./fileUtils");
 const newLine = /\r?\n/;
 
 class EditRatings {
 
     
     encoding(encoding){
         this.encoding = encoding;
         return this;
       }
         // receive file for editing and rewrite file
       generateNewRatingsCsv(fileInputName, fileOutputName) {
         let newFile = this.getEditCsv(fileInputName);
         fileUtils.writeFile(newFile, fileOutputName);
       }
         // lê dados do arquivo
       getEditCsv(fileInputName) {
         let parsedCsv = fileUtils.readFile(fileInputName, this.encoding);
         return this.editCsv(parsedCsv);
       }
         // read data from file
       editCsv(parsedCsv) {
         let lines = parsedCsv.split(newLine);
         lines.splice(0,1);
         return lines.join('\n');
       }
 
 }
 module.exports = new EditRatings();
 