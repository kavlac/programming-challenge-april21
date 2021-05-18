 /**
  *  by : Marco Antonio Cavalcante
  *  csv-to-mysql.js
  *  
  */

var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var date_patt = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/) ;
var connection;
var name_table = ["movies","ratings","genres"];
var name_files = ["fileMovies.csv","ratings.csv",""];
var genres = ["Action","Adventure","Animation","Children","Comedy","Crime","Documentary","Drama","Fantasy","FilmNoir","Horror","Musical","Mystery","Romance","SciFi","Thriller","War","Western"];


function connect(host,db,user,pwd)
{
    var host = host;
    var db = db;
    var user = user;
    var pwd = pwd;

    if(!db&&!user&&!pwd)
    {
        console.log('please enter all parameters');
        return;
    }
    else
    {
           connection = mysql.createConnection({
                host     : host,
                user     : user,
                password : pwd,
                localInfile : 1,
                flags : 'LOCAL_FILES'
            });
            //.connection.connect();
            
            connection.query(' CREATE DATABASE IF NOT EXISTS '+db+";",function(err){
                 if(err)
                 {
                     console.log(err);
                   
                     return;
                 }
                else
                {
                    connection.query('use '+db+';');
                    for(let i = 0; i < name_table.length; i++)
                        IfExsists(name_table[i],name_files[i]);
                    
                }
            });
            
   
    }
}

    function CreateTable(table_name,file_name)
{
    
    let str="Create Table "+table_name+"(";
        if(table_name == "movies"){
            str += "moviesId int, title varchar(255), year int";
            for(let i=0; i < genres.length; i++)
                str += ", "+genres[i]+" int";
                str += ", ratings float";
                       
        }else if(table_name == "ratings") {
            str += "userId int, movieId int, ratings float, timestamp int";
        }else{
            str += "genres varchar(255)";
        }
    str+=",  id int primary key AUTO_INCREMENT);"
    console.log(str);
       connection.query(str); 
       insert_file(table_name,file_name);
}

function insert_file(table_name,file_name){
    if(table_name == "genres") {
        insert_table(table_name);
    }else{
        completed = `FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '/n'`;
        str = `LOAD DATA LOCAL INFILE ? INTO TABLE ?? FIELDS TERMINATED BY ',' ENCLOSED BY '\"'`;
        connection.query(str, 
        [file_name,table_name],
        function(err,result) {
            console.log(err);
            console.log(result);
            console.log('table  insert ... await!');
            if(table_name == "ratings" && !result == false )
            console.log('Tables Added Succesfully!!');
        });

    }
       
      // connection.end(); 
}

function IfExsists(table_name,file_name)
{
    str = "select * from "+table_name+";";
    connection.query(str,function(err){
       if(!err)
        {
            console.log("Table already exsists!!!!");
            connection.end();
            return;
        }
        else
        {
           CreateTable(table_name,file_name);    
        }
    });
}

function insert_table(table_name)
{

        for(let i =0; i < genres.length;i++){
            let str="Insert into "+table_name+" ("+table_name+") values (";
            str += "'"+genres[i]+"'"; 
            str+=");"
            console.log(str);
            connection.query(str);
            str="";
            
    }
       
        connection.end();
    
}

module.exports = connect;