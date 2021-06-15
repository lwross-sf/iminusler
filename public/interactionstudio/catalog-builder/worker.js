loadFakeDOMforJQuery();
importScripts("/app/scripts/jquery-3.2.1.min.js");
onmessage = function(e) {
  console.log('Worker Started');
  var array = e.data;
  var catalogs = {
    "Product Catalog Update":{"id":"catalog-1", "name":"Product", "type":"p"}, 
    "Article Catalog Update":{"id":"catalog-2", "name":"Article", "type":"a"}, 
    "Blog Catalog Update":{"id":"catalog-3", "name":"Blog", "type":"b"}
  }
  // Send Event Data to Evergage API
  for (i = 0; i < array.events.length; i++) {
    var catalog = catalogs[array.events[i].action].id;
    var catalogType = catalogs[array.events[i].action].name;
    var id = array.events[i].catalog[catalogType]._id;
    var name = array.events[i].catalog[catalogType].name;
    var category = array.events[i].catalog[catalogType].category;
    var price = (array.events[i].catalog[catalogType].price === undefined) ? '' : array.events[i].catalog[catalogType].price;
    $.ajax({
      url: '/evergage/api/' + array.account + '/' + array.dataset + '/' + array.encodedData,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(array.events[i]),
      dataType: 'json',
      success: function(res){
        var returnCatalog = catalogs[JSON.parse(res.config).action].id;
        var returnName = catalogs[JSON.parse(res.config).action].name;
        var returnType = catalogs[JSON.parse(res.config).action].type;
        var returnData = JSON.parse(res.config).catalog[returnName];
        array[returnCatalog].results.push({
          "_id": returnData._id, 
          "name": returnData.name, 
          "itemType":returnType,
          "category":returnData.category,
          "price":returnData.price, 
          "status":res.status, 
          "API Response":(res.status=="Error") ? res.statusText : 'Upload successful'
        });
        postMessage({count: i+1, response: array});
      },
      async: true
    });
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