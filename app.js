const express = require('express');
//const res = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname,'public')));

// Add the route handlers here:

app.get('/', (req, res) =>  res.render('index'));

// Route for getting all the beers and it's rendered on "/BEERS"

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeer()
    .then(responseFromDB => { 
    res.render('beers/beers.hbs', {beers: responseFromDB });
})
.catch((error) => console.log(error));

});

// Route for getting a random beer and it's rendered on "/random-beer"

app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('beers/random-beer.hbs', {beers: responseFromAPI}); 
  })
  .catch((error) => console.log(error));
});


// Route for getting details of a specific beer and it is rendered on "/beers/someBeerIdGoesHere"

app.get('/beers/:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then((beerPick) => {
      res.render('beer-details', {beerPick});
    })
    .catch((err) => console.log(err));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
