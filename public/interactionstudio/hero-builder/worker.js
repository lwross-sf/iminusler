loadFakeDOMforJQuery();
importScripts("/app/scripts/jquery-3.2.1.min.js");
onmessage = function(e) {
  console.log('Worker Started');
  var array = e.data;
  array.results = [];
  array.download = [];
  array.tags = [];
  var events = sortEvents(array.events);
  // Send Event Data to Evergage API
  for (i = 0; i < events.length; i++) {
    $.ajax({
      url: '/evergage/api/' + array.account + '/' + array.dataset + '/' + array.encodedData,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(events[i]),
      dataType: 'json',
      success: function(res){
        var returnData = JSON.parse(res.config);
        var userId = (returnData.user.id === undefined) ? returnData.user.anonId : returnData.user.id;
        var userType = (returnData.user.id === undefined) ? 'Unknown' : 'Known';
        var catalogType = (returnData.action == 'Purchase' || returnData.action == 'Update Cart' || returnData.action == 'View Item') ? Object.keys(returnData.catalog)[0] : 'n/a';
        var itemId = (catalogType != 'n/a') ? returnData.catalog[catalogType]._id : '';
        var price = (itemId != '') ? array["items"].data.filter(data => data._id == itemId)[0].price : '';
        var page = (returnData.action == 'Page View') ? events[i].page : '';
        array.results.push({
          "userId": userId, 
          "itemAction": returnData.action,
          "catalogType": catalogType,  
          "catalogItem": itemId,  
          "Timestamp": new Date(returnData.source.time).toISOString().substring(0,16).replace('T', ' '), 
          "viewTime": returnData.source.top /1000, 
          "Status":res.status, 
          "API Response":(res.status=="Error") ? res.statusText : 'Upload successful'
        });
        array.download.push({
          "userId": userId,
          "userType": userType, 
          "emailAddress": returnData.user.attributes.emailAddress, 
          "sfmcContactKey": returnData.user.attributes.sfmcContactKey, 
          "attributes": JSON.stringify(returnData.user.attributes),  
          "itemAction": returnData.action,
          "catalogType": catalogType,  
          "catalogItemId": itemId,   
          "price": price,  
          "page": page,
          "timestamp": new Date(returnData.source.time).toISOString().substring(0,16), 
          "viewTime": returnData.source.top /1000, 
          "Status":res.status, 
          "API Response":(res.status=="Error") ? res.statusText : 'Upload successful'
        });
        postMessage({type: "event", count: array.results.length, response: array});
      },
      error: function(res){
        var returnData = JSON.parse(res.config);
        var userId = (returnData.user.id === undefined) ? returnData.user.anonId : returnData.user.id;
        var userType = (returnData.user.id === undefined) ? 'Unknown' : 'Known';
        var catalogType = (returnData.action == 'Purchase' || returnData.action == 'Update Cart' || returnData.action == 'View Item') ? Object.keys(returnData.catalog)[0] : 'n/a';
        var itemId = (catalogType != 'n/a') ? returnData.catalog[catalogType]._id : '';
        var price = (itemId != '') ? array["items"].data.filter(data => data._id == itemId)[0].price : '';
        var page = (returnData.action == 'Page View') ? events[i].page : '';
        array.results.push({
          "userId": userId, 
          "itemAction": returnData.action,
          "catalogType": catalogType,  
          "catalogItem": itemId,  
          "Timestamp": new Date(returnData.source.time).toISOString().substring(0,16).replace('T', ' '), 
          "viewTime": returnData.source.top /1000, 
          "Status":"Error", 
          "API Response":'API Server Failure successful'
        });
        postMessage({type: "event", count: array.results.length, response: array});
      },
      async: false
    });

    // Send View Time
    if(events[i].action == 'View Item'){
      var catalogType = (events[i].action == 'Purchase' || events[i].action == 'Update Cart' || events[i].action == 'View Item') ? Object.keys(events[i].catalog)[0] : 'n/a';
      var catalogId = (catalogType != 'n/a') ? catalogType.substring(0,1).toLowerCase() : 'n/a';
      var requestTime = {
        "_ak": array.account.split('.')[0],
        "_ds": array.dataset,
        "action": "View Time",
        "userId": (events[i].user.id === undefined) ? events[i].user.anonId : events[i].user.id ,
        ".item": '{"_id":"' + events[i].catalog[catalogType]._id + '", "type":"' + catalogId + '"}',
        ".top": events[i].source.top,
        "_time": events[i].source.time
      }
      $.ajax({
        url: '/evergage/viewtime/' + array.account + '/' + array.dataset + '/',
        type: 'POST',
        data: toFormUrlEncoded(requestTime),
        cache: false,
        success: function(res) {
          results = '{"' + decodeURIComponent(res.config.split('?')[1]).replace(/=/g,'":"').replace(/&/g,'","') + '"}';
          results = JSON.parse(results.replace('"{', '{').replace('}"', '}')) ;
          results.tagStatus = res.status;
          results.timestamp = new Date(parseInt(results._time)).toISOString().substring(0,16).replace('T', ' '),
          array.tags.push(results);
          postMessage({type: "tag", count: array.tags.length, response: array});
        },
        error: function(res) {
          results = '{"' + decodeURIComponent(res.config.split('?')[1]).replace(/=/g,'":"').replace(/&/g,'","') + '"}';
          results = JSON.parse(results.replace('"{', '{').replace('}"', '}')) ;
          results.tagStatus = res.status;
          results.timestamp = new Date(parseInt(results._time)).toISOString().substring(0,16).replace('T', ' '),
          array.tags.push(results);
          postMessage({type: "tag", count: array.tags.length, response: array});
        },
        async: true
      });
    } else {
      array.results[i].tagStatus = "n/a";
    }

  }
  console.log('Worker Finished: Awaiting Results');
}

// Load fake DOM to allow for JQuery
function loadFakeDOMforJQuery() {
  var document = self.document = {parentNode: null, nodeType: 9, toString: function() {return "FakeDocument"}};
  var document = self.document = { parentNode: null, nodeType: 9, toString: function () { return "FakeDocument" } };
  var window = self.window = self;
  var fakeElement = Object.create(document);
  fakeElement.nodeType = 1;
  fakeElement.toString = function () { return "FakeElement" };
  fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
  fakeElement.ownerDocument = document;
  
  document.head = document.body = fakeElement;
  document.ownerDocument = document.documentElement = document;
  document.getElementById = document.createElement = function () { return fakeElement; };
  document.createDocumentFragment = function () { return this; };
  document.getElementsByTagName = document.getElementsByClassName = function () { return [fakeElement]; };
  document.getAttribute = document.setAttribute = document.removeChild =
      document.addEventListener = document.removeEventListener =
      function () { return null; };
  document.cloneNode = document.appendChild = function () { return this; };
  document.appendChild = function (child) { return child; };
  document.childNodes = [];
  document.implementation = {
      createHTMLDocument: function () { return document; }
  }
}
function sortEvents(array) {
  return array.sort((a, b) => {
    let x = a.source.time;
    let y = b.source.time;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function toFormUrlEncoded(object) {
  return Object.entries(object)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

// Array Erase Element
Array.prototype.erase = function(el) {
  let p = this.indexOf(el); // indexOf use strict equality (===)
  if(p != -1) {
      this.splice(p, 1);
  }
}