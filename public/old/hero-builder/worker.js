loadFakeDOMforJQuery();
importScripts("/app/scripts/jquery-3.2.1.min.js");
onmessage = function(e) {
  console.log('Worker Started');
  var array = e.data;
  array.results = [];
  array.download = [];
  var eventCheckpoints = [];
  var events = sortEvents(array.events);
  var checkpoints = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];
  checkpoints.forEach(element => eventCheckpoints.push(parseInt(events.length * element * 0.01)));
  // Send Event Data to Evergage API
  for (i = 0; i < events.length; i++) {
    var catalogType = (events[i].action == 'Purchase' || events[i].action == 'Update Cart' || events[i].action == 'View Item') ? Object.keys(events[i].catalog)[0] : 'n/a';
    var catalogId = (catalogType != 'n/a') ? catalogType.substring(0,1).toLowerCase() : 'n/a';
    var itemId = (catalogType != 'n/a') ? events[i].catalog[catalogType]._id : '';
    var page = (events[i].action == 'Page View') ? events[i].page : '';
    var price = (itemId != '') ? array["items"].data.filter(data => data._id == itemId)[0].price : '';
    var userId = (events[i].user.id === undefined) ? events[i].user.anonId : events[i].user.id;
    var userType = (events[i].user.id === undefined) ? 'Unknown' : 'Known';

    $.ajax({
      url: '/evergage/api/' + array.account + '/' + array.dataset + '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(events[i]),
      dataType: 'json',
      success: function(res){
        array.results.push({
          "userId": userId, 
          "itemAction": events[i].action,
          "catalogType": catalogType,  
          "catalogItem": itemId,  
          "Timestamp": new Date(events[i].source.time).toISOString().substring(0,16).replace('T', ' '), 
          "Status":res.status, 
          "API Response":(res.status=="Error") ? res.response : 'Upload successful'
        });
        array.download.push({
          "userId": userId,
          "userType": userType, 
          "emailAddress": events[i].user.attributes.emailAddress, 
          "sfmcContactKey": events[i].user.attributes.sfmcContactKey, 
          "attributes": JSON.stringify(events[i].user.attributes),  
          "itemAction": events[i].action,
          "catalogType": catalogType,  
          "catalogItemId": itemId,   
          "price": price,  
          "page": page,
          "timestamp": new Date(events[i].source.time).toISOString().substring(0,16), 
          "viewTime": events[i].source.top, 
          "Status":res.status, 
          "API Response":(res.status=="Error") ? res.response : 'Upload successful'
        });
      },
      async: false
    });

    // Send View Time
    if(events[i].action == 'View Item'){
      var requestTime = {
        "_ak": array.account.split('.')[0],
        "_ds": array.dataset,
        "action": "View Time",
        "userId": userId ,
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
          array.results[i].vtStatus = res.status;
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          array.results[i].vtStatus = "Error";
        },
        async: false
      });
    } else {
      array.results[i].vtStatus = "n/a";
    }


    if(eventCheckpoints.indexOf(i) >= 0){
      var idx = eventCheckpoints.indexOf(i)
      postMessage({type: "progress", response: checkpoints[idx], count:(i+1)});
    } 
  }
  console.log('Worker Complete');
  postMessage({type: "data", data: array});
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