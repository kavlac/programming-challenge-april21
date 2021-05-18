const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

//Definindo porta para rodar a API.
const porta = process.env.PORT || 7070;

//Permintindo o recebimento de requisições via JSON.
//Using the built-in body-parser middleware to parse JSON we will be using in the next steps.
app.use(bodyParser.json());

//Permissionando acesso aos recursos da API.
app.use(cors());


//Utilizing the bodyParser.urlencoded function to parse the URL encoded body.
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

//   app.use(function(req, res, next){
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-CSRF-Token, X-File-Name");
//     if(req.headers['xkey-token'] != '!siscape@seagi&cicc#ssp-$'){
//         return res.json({
//             erro: true,
//             status: 403,
//             mensagem: "Acesso negado!"
//         }); 
//     }
//     next();
// });


//Associando as rotas à aplicação API.
app.use('/',require('./src/router/router'));

app.listen(porta);
console.log("API na porta: "+porta);