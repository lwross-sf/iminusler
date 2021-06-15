loadFakeDOMforJQuery();
importScripts("/app/scripts/jquery-3.2.1.min.js");
onmessage = function(e) {
  console.log('Message received from main script');
  var array = e.data;
  var ts = new Date().getTime();
  var workerResult = {"events":[], "viewTime":[]};
  var apiEvents = [];
  for (i = 0; i < array.users.length; i++) {
    for (j = 0; j < array.users[i].events.length; j++) {
      apiEvents.push(array.users[i].events[j]);
      if(array.users[i].type == 'hero' && array.users[i].events[j].source.time < ts-(60*60*1000)){
        apiEvents.push({
          "action": array.users[i].events[j].action,
          "catalog": array.users[i].events[j].catalog,
          "flags": array.users[i].events[j].flags,
          "itemAction": array.users[i].events[j].itemAction,
          "source": array.users[i].events[j].source,
          "user": {"anonId": array.users[i].events[j].user.anonId }
        })
      }
    }
  }

  // Send Event Data to Evergage API
  for (i = 0; i < apiEvents.length; i++) {
    $.ajax({
      url: '/evergage/api/' + array.catalog.account + '/' + array.catalog.dataset + '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(apiEvents[i]),
      dataType: 'json',
      success: function(response){
        workerResult.events.push(response);
      },
      async: false
    });

    // Send View Time
    var requestTime = {
      "_ak": array.catalog.account.split('.')[0],
      "_ds": array.catalog.dataset,
      "action": "View Time",
      "userId": (apiEvents[i].user.id!=null) ? apiEvents[i].user.id : apiEvents[i].user.anonId ,
      ".item": '{"_id":"' + apiEvents[i].catalog.Product._id + '", "type":"p"}',
      ".top": apiEvents[i].source.top,
      "_time": apiEvents[i].source.time
    }
    $.ajax({
      url: 'https://' + array.catalog.account+ '.evergage.com/pr',
      data: requestTime,
      cache: false,
      success: function(response) {
        workerResult.viewTime.push({"status":'OK', "response": response});
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        workerResult.viewTime.push({"status":'Error', "response": errorThrown});
      },
      async: false
    });
  }

  console.log('Posting message back to main script');
  postMessage(workerResult);
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