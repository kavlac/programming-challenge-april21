'use strict';
let fileUtils = require("./fileUtils");
const newLine = /\r?\n/;
const defaultFieldDelimiter = ",";

class EditRatings {

    fieldDelimiter(delimieter) {
        this.delimiter = delimieter;
        return this;
      }
    
    encoding(encoding){
        this.encoding = encoding;
        return this;
      }

      generateNewRatingsCsv(fileInputName, fileOutputName) {
        let newFile = this.getEditCsv(fileInputName);
        fileUtils.writeFile(newFile, fileOutputName);
      }

      getEditCsv(fileInputName) {
        let parsedCsv = fileUtils.readFile(fileInputName, this.encoding);
        return this.editCsv(parsedCsv);
      }

      editCsv(parsedCsv) {
        let lines = parsedCsv.split(newLine);
        lines.splice(0,1);
        // console.log(lines[0]);
        // let fieldDelimiter = defaultFieldDelimiter;
        // let headers = lines[0].split(fieldDelimiter);
        // let Result = [];
        // headers.splice(3,1);
        // headers.splice(0,1);
        // headers = headers.join(fieldDelimiter);
        // console.log("headers",headers);
        // Result.push(headers);
        
        // for (let i = 1; i < lines.length; i++) {
        //   let some = [];
        //   let currentLine = lines[i].split(fieldDelimiter);
        //   if (this.hasContent(currentLine)) {
        //       some.push(currentLine[0]);
        //       some.push(currentLine[1]);
        //       some.push(Number(currentLine[2]));
        //       // console.log("some: ", some.toString());
        //     Result.push(this.buildResult(some,lines));
        //   }
        // }
        return lines.join('\n');
      }

      buildResult(some,lines) {
       let file = [];
       let count = 1;
       for(let i= 1; i < lines.length; i++){
        let currentLine = lines[i].split(",");
           if(some[0] != currentLine[0] && some[1] == currentLine[1]){
               count++;
               some[2] += Number(currentLine[2]);
           }  
       }

       file.push(some[1]);
       file.push((some[2]/count).toFixed(1));
      // console.log("linhas: ", file.toString());
       return file.join(","); 
      }

      //verifica se existe informação na posição
      hasContent(values) {
        if (values.length > 0) {
            for (let i = 0; i < values.length; i++) {
                if (values[i]) {
                    return true;
                }
            }
        }
    }

}
module.exports = new EditRatings();
