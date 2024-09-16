const express = require('express');
const app = express();
const axios = require('axios');
var JWT         = require('./lib/jwtDecoder');
var routes      = require('./routes');

var pkgjson = require( './package.json' );
const configJSON = require('./public/config/config-json.js')
require('dotenv/config')
var APIKeys = {
    appId           : '__insert_your_app_id__',
    clientId        : '__insert_your_app_client_id__',
    clientSecret    : '__insert_your_app_client_secret__',
    appSignature    : '__insert_your_app_signature__',
    authUrl         : 'https://auth.exacttargetapis.com/v1/requestToken?legacy=1'
};

function tokenFromJWT( req, res, next ) {

    var jwt = new JWT({appSignature: APIKeys.appSignature});
    

    var jwtData = jwt.decode( req );

    req.session.token = jwtData.token;
    next();
}

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

app.post('/login', tokenFromJWT, routes.login );
app.post('/logout', routes.logout );
app.get('/clearList', function( req, res ) {
	// The client makes this request to get the data
	activityUtils.logExecuteData = [];
	res.send( 200 );
});
app.get('/getActivityData', function( req, res ) {

	if( !activityUtils.logExecuteData.length ) {
		res.send( 200, {data: null} );
	} else {
		res.send( 200, {data: activityUtils.logExecuteData} );
	}
});
app.get( '/version', function( req, res ) {
	res.setHeader( 'content-type', 'application/json' );
	res.send(200, JSON.stringify( {
		version: pkgjson.version
	} ) );
} );
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

// Return JSON
app.get('/config.js', (req, res) => {
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