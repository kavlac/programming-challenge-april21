const express = require('express');
const router = express.Router();

const Controller = require('../Controller/controller');



//Routes
router.get('/', (req, res) => {
    res.json({'message': 'ok'});
  })
router.get('/findmovies',Controller.findMovies);
router.get('/findbyratings',Controller.findRatings);



module.exports = router;