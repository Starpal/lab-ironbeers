const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:


// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {

punkAPI.getBeers()
.then(allBeers => {
const someBeers = allBeers.slice(0,25)
//console.log(someBeers)
    res.render('beers',  { someBeers });
})
.catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
    .then(randomBeer => {
        const beer = randomBeer;
        res.render('random-beers', beer[0]);
    })
    .catch(error => console.log(error));
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
