// Module Requirements
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const qs = require('qs');
const CircularJSON = require('circular-json');
const xmlparser = require('express-xml-bodyparser'); ///find the module for this
const { Pool } = require('pg');
var fs = require('fs');
var parser = require('xml2json');
var app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}); 

// Standard Directory route
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));
app.use('/assets', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));
app.use(express.static(__dirname + '/public'))

// Evergage API
app.post('/evergage/api/:domain/:dataset/:auth', function (request, responsefromWeb) {
  console.log('Request Received');
	axios({
	  method:'post',
	  url:'https://' + request.params.domain + '.evergage.com/api2/authevent/' + request.params.dataset,
    data: request.body,
	  headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + request.params.auth
	  }
	})
	.then(function(response) {
    responsefromWeb.send({"status":'OK', "statusCode":response.status, "statusText":response.statusText, "config": response.config.data, "response": response.data});
  })
  .catch(function (error) {
    console.log('Error Received');
    responsefromWeb.send({"status":'Error', "statusCode":error.response.status, "statusText":error.response.statusText, "config":error.config.data, "response": error.data});
  });
})

// Evergage View Time API
app.post('/evergage/viewtime/:domain/:dataset/', function (request, responsefromWeb) {
  var tagUrl = 'https://' + request.params.domain + '.evergage.com/pr?' + qs.stringify(request.body);
	axios({
    method: 'GET',
	  url: tagUrl
	})
	.then(function(response) {
    if(response.data.status=="Error"){
      responsefromWeb.send({"status":'Error', "statusCode":response.status, "statusText":response.statusText, "config": response.config.url, "response": response.data});
    } else {
      responsefromWeb.send({"status":'OK', "statusCode":response.status, "statusText":response.statusText, "config": response.config.url, "response": response.data});
    }
  })
  .catch(function (error) {
    console.log(error)
    responsefromWeb.send({"status":'Error', "statusCode":error.response.status, "statusText":error.response.statusText, "config":error.config.url, "response": error.request.data});
  });
})

// Marketing Cloud API - Auth Token
app.post('/mc/api/token/', function (request, responsefromWeb) {
	axios({
	  method:'post',
	  url:'https://' + request.body.subdomain + '.auth.marketingcloudapis.com/v2/token',
    data: request.body.credentials,
	  headers:{
      'Content-Type': 'application/json',
	  }
	})
	.then(function(response) {
    responsefromWeb.send({"status":'OK', "response": response.data});
  })
  .catch(function (error) {
    console.log(error);
    responsefromWeb.send({"status":'Error', "response": error.message});
  });
})

// Evergage API
app.post('/mc/api/soap/:domain/', function (request, responsefromWeb) {
  console.log(request.body);
	// axios({
	//   method:'post',
	//   url:'https://' + request.params.domain + '.soap.marketingcloudapis.com/Service.asmx',
  //   data: request.body,
	//   headers:{
  //     'Content-Type': 'text/xml',
	//   }
	// })
	// .then(function(response) {
  //   responsefromWeb.send({"status":'OK', "response": response.data});
  // })
  // .catch(function (error) {
  //   console.log(error);
  //   responsefromWeb.send({"status":'Error', "response": error.message});
  // });
})


// Standard Index Route
app.get('/', function(request, response) {
  response.redirect('/index.htm')
})

// 404 Route
app.get('*', function(request, response){
  console.log(request.params)
  response.status(404).redirect('/error');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})