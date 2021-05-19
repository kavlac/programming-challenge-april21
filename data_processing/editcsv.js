/**
  *  by : Marco Antonio Cavalcante
  *  editcsv.js
  *  
  */

 let fileUtils = require("./fileUtils");
 const newLine = /\r?\n/;
 const defaultFieldDelimiter = ",";
 let genres = ["Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","Film-Noir","Horror","Musical","Mystery","Romance","Sci-Fi","Thriller","War","Western"];
 class EditCsv {
 
       // delimit field
     fieldDelimiter(delimieter) {
         this.delimiter = delimieter;
         return this;
       }
     
     encoding(encoding){
         this.encoding = encoding;
         return this;
       }
        // Receive the file for editing and a new file with edited data
       generateNewFileCsv(fileInputName, fileOutputName) {
         let newFile = this.getEditCsv(fileInputName);
         fileUtils.writeFile(newFile, fileOutputName);
       }
         // read data from file
       getEditCsv(fileInputName) {
         let parsedCsv = fileUtils.readFile(fileInputName, this.encoding);
         return this.editCsv(parsedCsv);
       }
        // edit header and insert year field
       editCsv(parsedCsv) {
         let lines = parsedCsv.split(newLine);
         console.log(lines[0]);
         let fieldDelimiter = this.getFieldDelimiter();
         let headers = lines[0].split(fieldDelimiter);
         let Result = [];
 
         headers.splice(2,1,"year");
         headers = this.buildHeaders(headers);
         headers = headers.join(fieldDelimiter);
         console.log("headers",headers);
         
         for (let i = 1; i < lines.length; i++) {
           let currentLine = lines[i].split(fieldDelimiter);
           if (this.hasContent(currentLine)) {
             Result.push(this.buildResult(currentLine));
           }
         }
         return Result.join('\n');
       }
         // edit header
       buildHeaders(headers){
         for(let i= 0; i < genres.length;i++){
             headers.push(genres[i]);
         }
             return headers;        
       }
       // edit year and gender field
       buildResult(currentLine) {
           let file;
           let colGenres = currentLine[currentLine.length -1];
        if(currentLine.length > 3){
         let title = currentLine.slice(1,currentLine.length -1);
         title = title.join(",");
         let year = title.slice(title.length - 6, title.length - 2);
         currentLine.splice(currentLine.length -1,1,year);
             
        }else {
         let title = currentLine[1].split(" ");
         let year = this.getValueFormatNumber(title);
         currentLine.splice(2,1,year);
        }
 
        file = this.buildGenres(colGenres,currentLine).join(",");
         return file;
       }
       // edit genre field
       buildGenres(colGenres,currentLine){
           let value = colGenres.split("|");
         for(let i=0; i< genres.length;i++)
             currentLine.push("0");
 
           for(let i= 0; i < genres.length;i++){
               for (let j = 0; j < value.length; j++){
                 if(genres[i] == value[j])
                     currentLine[currentLine.length - (genres.length - i)] = "1";
               }
              
           }
             return currentLine;
       }
 
       getValueFormatNumber(value){
           let title = value;
         for(let j = 0; j < title.length; j++){
             if(title[j] === "")
                 title.splice(j,1);
         }
         let isNumber = !isNaN(title[title.length - 1].slice(1,5));
         if (isNumber) {
             return Number(title[title.length - 1].slice(1,5));
         }
         return "";
 
       }
         // delimit field
       getFieldDelimiter() {
         
         return defaultFieldDelimiter;
       }
 
       // check if there is information in the position
       hasContent(values) {
         if (values.length > 0) {
             for (let i = 0; i < values.length; i++) {
                 if (values[i]) {
                     return true;
                 }
             }
         }
         return false;
     }
 }
 
 module.exports = new EditCsv();