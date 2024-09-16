const express = require('express');
const app = express();
const axios = require('axios');
const configJSON = require('./public/config/config-json.js')
require('dotenv/config')

// Set engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.redirect('/index.html')
})

app.get('/index.html', (req, res) => {
    res.render('./index.ejs')
})

// customActivity
app.get('/customActivity.js', (req, res) => {
    res.redirect('js/customActivity.js');
});

// Return JSON
app.get('/config.json', (req, res) => {
    res.status(200).json(configJSON(req));
});


// Publish
app.post('/publish', (req, res) => {
    console.log(res.status(200).json())
})

const port = process.env.PORT || 3333;

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening at port ${port}`);
})