const poolConnection = require('../DB/db');
const helper = require('../../helper');
const config = require('../../config')
const mensagemErroNoBanco = "Falha de conexão com o banco de dados.";



module.exports = {

    async findRatings(req, res){ 
        console.log("req:",req.query);
        let ratings = req.query.ratings;
        let page = req.query.page || 1;
        let minRatings = ratings - 0.5;
        let offset = helper.getOffset(page, config.listPerPage);
     poolConnection.getConnection((errorPool,connection)=>{
            
            if(errorPool){
                console.log("Falha ao conectar ao banco de dados via poolConnection.");
                return res.json({
                    error: true,
                    errorCode: "errorDB",
                    mensagem: mensagemErroNoBanco
                });
            }else{
                let str = `select t2.moviesId, t2.title, ROUND(sub.Ratings,2) as rating from movies t2 inner join ( select distinct ratings.movieId, Avg(ratings.ratings) as Ratings from ratings group by ratings.movieId ) sub on sub.movieId = t2.moviesId where sub.Ratings < ${ratings} and sub.Ratings > ${minRatings} order by sub.ratings desc limit ${offset},${config.listPerPage};`;
                connection.query(str, function(error,result){
                    if(error){
                        return res.json({
                            error: true,
                            errorCode: "errorDB",
                            mensagem: error
                        });
                   
                    }else{
                        let data = helper.emptyOrRows(result);
                        let meta = {page};
                        return res.json({
                            error: false,
                            data,
                            meta      
                        });
                    }
                });
            }
        });

        
    },

    async findMovies(req, res){
        console.log("req:",req.query);
        let year = req.query.year;
        let genre = req.query.genre;
        let page = req.query.page || 1;
        console.log("page:",page);
        let offset = helper.getOffset(page, config.listPerPage);
        console.log("offset:",offset);
        
        poolConnection.getConnection((errorPool,connection)=>{
            console.log("erro:", errorPool);
            if(errorPool){
                console.log("Falha ao conectar ao banco de dados via poolConnection.");
                return res.json({
                    error: true,
                    errorCode: "errorDB",
                    mensagem: mensagemErroNoBanco
                });
            }else{
                let str = `select moviesId,title,year from movies where ${genre} = 1 and year = ${year} order by moviesId asc limit ${offset},${config.listPerPage};`;
                connection.query(str, function(error,result){
                    if(error){
                        return res.json({
                            error: true,
                            errorCode: "errorDB",
                            mensagem: error
                        });
                   
                    }else{
                        let data = helper.emptyOrRows(result);
                        let meta = {page};
                        return res.json({
                            error: false,
                            data,
                            meta      
                        });
                    }
                });
            }
        });

        
    }



}