// Global Variables
var array = [];
array.results = {"catalog":[], "events":[], "file":[], "summary":[], "viewTime":[]};
var results = new Array(false, false, false, false);
var ts = new Date().getTime();
var apiWorker = new Worker('worker.js');

// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));

// Panel 2 Scripts =======================================================
function validateCatalog() {
  formValidation('#products');
  if($('#products').attr('aria-invalid')==0){
    arrayCatalog();
  }
}

// Panel 2 Form Processing
function arrayCatalog() {
  array.catalog = {
    "account": $.trim($('#ucp-account').val().toLowerCase()),
    "dataset": $.trim($('#ucp-dataset').val().toLowerCase()),
    "vertical":$('#ucp-dataset-vertical').val(),
    "catalogType":$('#ucp-catalog-type').val(),
    "products":""
  }
  if(array.catalog.account.indexOf('.')>-1 && array.catalog.dataset!=''){
    localStorage.setItem('account', $.trim($('#ucp-account').val().toLowerCase()));
    localStorage.setItem('dataset', $.trim($('#ucp-dataset').val().toLowerCase()));
    showHide('dimensions', 'products');
  }

  if(array.catalog.account.indexOf('.')==-1 && array.catalog.account!=''){
    $('body').prepend(toast('info', 'lock', 'This app only supports IS Learning Accounts. Please use the <a href="https://sf-is-demobuilder.herokuapp.com/" target="_blank">previous version</a> for the shared demo enviroment.'));
  }

  if(document.getElementById('ucp-catalog').files.length>0){
    loadFileAsObj(document.getElementById('ucp-catalog').files[0]);
  }
} 


// Import CSV data in to an Object
function loadFileAsObj(inputFile){
  var reader = new FileReader();
  reader.readAsText(inputFile, "UTF-8");
  reader.onloadend = function () {
    var text = reader.result;
    array.results.file = [];
    if(text.split('\n')[0].split(",").length>22){array.results.file.push('Invalid header field count')};
    if(text.split('\n')[1].split(",").length>22){array.results.file.push('Invalid data field count')}
    var data = $.csv.toObjects(text);
    var data = data.filter(data => data._id != '');
    arrayDimensions(data);
    checkFile(data);
    inputProducts(data);
    arrayProducts(data);
    console.log(array);
  };
}

// Append the Product Sku to Product Hero dropdown list
function inputProducts(data){
  data = sortAsc(data, "name")
  var htm = selectInput(data, "_id", "name")
  $('select[role="product-list"]').each(function() {
    $(this).html(htm);
  });
  var template = $('#heroTemplate').html().replace('<option value="0" disabled="">Select One...</option>', htm);
  $('#heroTemplate').html(template);
}

// Determine Unique Product Tags
function arrayDimensions(data){
  array.catalog.dimensions = {
    "categories": sort([...new Set(data.map(x => x.category))]),
    "classes": sort([...new Set(data.map(x => x.itemClass))]),
    "styles": sort([...new Set(data.map(x => x.style))]),
    "brands": sort([...new Set(data.map(x => x.brand))]),
    "genders": sort([...new Set(data.map(x => x.gender))]),
    "badges": sort([...new Set(data.map(x => x.badge))]),
    "keywords": sort([...new Set(data.map(x => x.keyword))]),
    "authors": sort([...new Set(data.map(x => x.author))]),
    "contents": sort([...new Set(data.map(x => x.contentClass))])
  }
};

// Format Products to Required Evergage format
function arrayProducts(data){
  for (i = 0; i < data.length; i++) {
    var tags = [];
    ['itemClass', 'style', 'brand', 'gender', 'badge',	'keyword',	'author',	'contentClass'].forEach(function(e) {
      if(data[i][e]!='' && data[i][e]!=null){
        var options = data[i][e].split(';');
        options.filter(n => n)
        options.forEach(a => tags.push({ "type":"t", "tagType": properCase(e), "_id": $.trim(a), "name":$.trim(a)}));
      }
      delete data[i][e]
    })
    data[i].tags = tags;
    data[i].categories = [{"type":"c", "_id": data[i]["category"], "name":data[i]["category"]}];
  }
  array.catalog.products = data;
}

// Run key checks on the uploaded data
function checkFile(data){
  // reset messages in case of back navigation
  $('div[aria-controls="dimensions"] .slds-setup-assistant__item').addClass('slds-hide');
  $('li[aria-label="fields-valid"]').removeClass('slds-hide');
  
  // check for extra fields
  if(array.results.file.length>0) {
    $('li[aria-label="product-fields-invalid-count"]').removeClass('slds-hide');
  }
  // check all the fields are there
  var keys = Object.keys(data[0]);
  ['_id', 'name', 'url', 'imageUrl', 'price',	'listPrice', 'rating', 'numRatings'].forEach(function(e) {
    if(keys.indexOf(e)<0){
      $('li[aria-label="product-fields-invalid"]').removeClass('slds-hide');
      $('#dimensions').attr('aria-invalid', '1')
      $('li[aria-label="fields-valid"]').addClass('slds-hide');
    }
  });
  ['category', 'itemClass', 'style', 'brand'].forEach(function(e) {
    if(keys.indexOf(e)<0){
      $('li[aria-label="dimension-fields-invalid"]').removeClass('slds-hide');
      $('#dimensions').attr('aria-invalid', '1')
      $('li[aria-label="fields-valid"]').addClass('slds-hide');
    }
  });
  // check there are enough products
  if(data.length>14){var label = 'valid'} else {var label = 'invalid'; $('#dimensions').attr('aria-invalid', '1')};
  $('li[aria-label="product-count-' + label + '"]').find('h3').html(data.length + ' product row(s) processed');
  $('li[aria-label="product-count-' + label + '"]').removeClass('slds-hide');
  // check there are enough categories
  if(array.catalog.dimensions.categories.length>2){var label = 'valid'} else {var label = 'invalid'};
  $('li[aria-label="category-count-' + label + '"]').find('h3').html(array.catalog.dimensions.categories.length + ' category option(s) identified');
  $('li[aria-label="category-count-' + label + '"]').removeClass('slds-hide');
}

// Panel 3 Scripts =======================================================
function validateCategories(){
  if($('#dimensions').attr('aria-invalid')==0){
    showHide('heroes', 'dimensions');
  }
}



// Panel 4 Scripts =======================================================
function validateHeroes() {
  formValidation('#heroes');
  if($('#heroes').attr('aria-invalid')==0){
    var users = new Array();
    $('#heroes ul li').each(function(index) {
      users.push({"id": $(this).find('input').val(), "anonId":"", "productId": $(this).find('select').val()});
    });
    array.heroes = users;
    showHide('events', 'heroes');
    console.log(array)
  }
} 

// Add new hero user row to form
function addHero(){
  var template = $('#heroTemplate').html();
  $('.slds-expression ul').append(template);
}
// Remove hero user row from form
function deleteHero(id){
  $(id).parents('li').remove();
}



// Panel 5 Scripts =======================================================
function formSubmit() {
  uploadCatalog();
  arraySettings();
  showHide('results', 'events')
} 

// Store Form Settings
function arraySettings() {
  array.settings = {
    "numberOfHeroes":array.heroes.length,
    "numberOfUsers":parseInt($('#numberOfUsers').val()),
    "totalUsers":parseInt($('#numberOfUsers').val()) + array.heroes.length,
    "cartRate":parseInt($('#cartRate').val()),
    "cartCount": Math.ceil(parseInt($('#numberOfUsers').val()) * (parseInt($('#cartRate').val())/100)) + array.heroes.length,
    "purchaseRate":parseInt($('#purchaseRate').val()),
    "purchaseCount": Math.ceil(parseInt($('#numberOfUsers').val()) * (parseInt($('#purchaseRate').val())/100)) + array.heroes.length,
    "knownUserRate":parseInt($('#knownUserRate').val()),
    "knownCount": Math.ceil(parseInt($('#numberOfUsers').val()) * (parseInt($('#knownUserRate').val())/100)) + array.heroes.length
  }
} 


// Catalog API Builder Controls =============================================
function uploadCatalog() {
  var catalogResults = array.results.catalog;
  for (i = 0; i < array.catalog.products.length; i++) {
    // format request JSON
    var event = {
      "action": "System Catalog Update", 
      "itemAction": "View Item",
      "flags": {
        "noCampaigns": true,
        "pageView": true
      },
      "source": {
        "channel": "Web",
        "local": "enGB"
      },
      "user": {
        "anonId": "97bd6181cae4161bb99796a2057e80ca",
        "id": "bot@ukisolutions.com"
      },
      "catalog": {
        "Product": array.catalog.products[i]
      }
    }

    // Send product to Interaction Studio API
    $.ajax({
      url: '/evergage/api/' + array.catalog.account + '/' + array.catalog.dataset + '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(event),
      dataType: 'json',
      success: function(response){
        catalogResults.push(response);
        if(catalogResults.length == array.catalog.products.length){
          array.results.summary.catalogUploads = $(array.results.catalog).filter(function( idx ) {
            return array.results.catalog[idx].status === "OK";
          }).length; 
          array.results.summary.catalogErrors = array.catalog.products.length - array.results.summary.catalogUploads;
          console.log(array);
          results[0] = true;
          if(array.results.summary.catalogUploads!=0){
            arrayUsers();
            array.results.summary.eventsAPI = true;
          };
          displayResults();
        }
      }
    });
  }
}

// Events API Builder Controls =============================================
// Retrieve user data and assign random product
function arrayUsers() {
  $.getJSON('/app/feeds/users.json', function(data) {
    var users = data.slice(0, array.settings.totalUsers);
    for (i = 0; i < users.length; i++) {
      if(i > array.settings.knownCount){delete users[i].id};
      if(i < array.heroes.length){
        users[i].id = array.heroes[i].id; 
        users[i].type = 'hero'; 
        array.heroes[i].anonId = users[i].anonId; 
        users[i].products = assignProducts(array.catalog.products, array.heroes[i].productId)
      } else {
        users[i].products = assignProducts(array.catalog.products);
        if(i < array.settings.cartCount){users[i].type = 'abandoner'};
        if(i < array.settings.purchaseCount && i < array.settings.knownCount){users[i].type = 'purchaser'};
      };
      users[i].sessions = arraySessions(users[i]);
      users[i].events = arrayEvents(users[i]);
    }
    array.users = users;
  }).done(function () {
    results[1] = true;
    results[2] = true;
    console.log(array);
    displayResults();
    uploadEvents();
  });
}

// Function to find products from the catalog for each user
function assignProducts(data, id) {
  var arr = [];
  if(id){
    var arr = [id];
    var category = data.filter(data => data._id == id)[0].category;
    var data = data.filter(products => products.category == category);
  }
  var data = sort([...new Set(data.map(x => x._id))])
  while(arr.length < 3){
    var r = data[Math.floor(Math.random() * data.length)];
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

// Function to calculate user sessions
function arraySessions(user) {
  // Create sessions
  var sessions = [];
  var timestamp = ts;
  var data = array.catalog.products;
  var price1 = parseFloat(data.filter(data => data._id == user.products[0])[0].price);
  var price2 = parseFloat(data.filter(data => data._id == user.products[1])[0].price);
  var price3 = parseFloat(data.filter(data => data._id == user.products[2])[0].price);
  var numSessions = (user.type=='hero') ? 5 : Math.floor(Math.random() * 3) + 2;
  for (j = 0; j < numSessions; j++) {
    sessions.push({
      "action": (user.type=='hero' && j==0) ? "Purchase" : "View Item",
      "id": createID(), 
      "channel": "web",
      "count": Math.floor(Math.random() * 4) + 2,
      "product_id": user.products[0],
      "timestamp": timestamp,
      "value": (user.type=='hero' && j==0) ? price1 : 0.00,
      "view_time": (Math.floor(Math.random() * 550) + 10)
    });
    timestamp = timestamp - (Math.floor((Math.random() * j) + 1) * (24*60*60*1000)) - (Math.floor((Math.random() * 10)) * (60*60*1000)) - (Math.floor((Math.random() * 20)) * (60*1000));
  }
  for (j = 0; j < 3; j++) {
    sessions.push({
      "action": (user.type=='purchaser' && j==0) ? "Purchase" : "View Item",
      "id": createID(), 
      "channel": "web",
      "count": Math.floor(Math.random() * 2) + 2,
      "product_id": user.products[1],
      "timestamp": timestamp,
      "value": (user.type=='purchaser' && j==0) ? price2 : 0.00,
      "view_time": (Math.floor(Math.random() * 550) + 10)
    });
    timestamp = timestamp - (Math.floor((Math.random() * j) + 1) * (24*60*60*1000)) - (Math.floor((Math.random() * 10)) * (60*60*1000)) - (Math.floor((Math.random() * 20)) * (60*1000));
  }
  for (j = 0; j < 2; j++) {
    sessions.push({
      "action": (user.type=='abandoner' && j==0) ? "Update Cart" : "View Item",
      "id": createID(), 
      "channel": "web",
      "count": Math.floor(Math.random() * 2) + 2,
      "product_id": user.products[2],
      "timestamp": timestamp,
      "value": (user.type=='abandoner' && j==0) ? price3 : 0.00,
      "view_time": (Math.floor(Math.random() * 550) + 10)
    });
    timestamp = timestamp - (Math.floor((Math.random() * j) + 1) * (24*60*60*1000)) - (Math.floor((Math.random() * 10)) * (60*60*1000)) - (Math.floor((Math.random() * 20)) * (60*1000));
  }
  return sessions
}

// Function to calculate user session events
function arrayEvents(user) {
  // Create sessions
  var events = [];
  for (j = 0; j < user.sessions.length; j++) {
    for (k = 0; k < user.sessions[j]["count"]; k++) {
      var tstamp = user.sessions[j].timestamp;
      var top = (k==0) ? 0 : ((Math.floor(Math.random() * 285) + 15) * 1000);
      events.push({
        "action": (k==0) ? user.sessions[j].action : "View Item",
        "itemAction": (k==0) ? user.sessions[j].action : "View Item",
        "flags": {
          "noCampaigns": true,
          "pageView": true
        },
        "source": {
          "channel": user.sessions[j].channel,
          "local": "enGB",
          "time": tstamp - top
        },
        "user": {
          "anonId": user.anonId,
          "id": (user.id!=null) ? user.id : ""
        },
        "catalog": {
          "Product": {
            "_id": user.sessions[j].product_id
          }
        }
      });
      if(k==0 && user.sessions[j].action=='Purchase'){
        events[events.length-1].order = {
          "Product": {
            "orderId": createID(),
            "totalValue": user.sessions[j].value,
            "currency": "GBP",
            "lineItems": [{"quantity": 1, "_id": user.sessions[j].product_id, "price":user.sessions[j].value}]
          }
        }
      }
      if(k==0 && user.sessions[j].action=='Update Cart'){
        events[events.length-1].cart = {
          "singleLine": {
            "Product": {
              "quantity": 1, 
              "_id": user.sessions[j].product_id,
              "price":user.sessions[j].value
            }
          }
        }
      }
    }
  }
  return events
}


// Function to calculate user session events
function uploadEvents() {
  apiWorker.postMessage(array);
}

apiWorker.onmessage = function(e) {
  console.log('Receiving essage from worker');
  array.results.events = e.data.events;
  array.results.viewTime = e.data.viewTime;
  array.results.summary.eventUploads = $(array.results.events).filter(function( idx ) {
    return array.results.events[idx].status === "OK";
  }).length; 
  array.results.summary.eventErrors = array.results.events.length - array.results.summary.eventUploads;
  console.log('Message received from worker');
  results[3] = true;
  console.log(array);
  displayResults();
}

// Final Screen Settings  =============================================
function displayResults() {
  if(results[0] == true && array.results.summary.catalogUploads!=0) {
    var settings = {
      "type": 'complete',
      "title":'Product Catalog added to <span style="color:#1589ee;">' + array.catalog.dataset + '</span> dataset',
      "body": '<strong>' + array.results.summary.catalogUploads + '</strong> of ' + array.results.catalog.length + ' products were added from your catalog upload using the system user.'
    }
    $('li[aria-label="results-catalog"]').html(setupStep(settings));
  }
  if(array.results.summary.catalogErrors > array.results.summary.catalogUploads && array.results.summary.catalogUploads!=0) {
    var settings = {
      "type": 'info',
      "title":'Incomplete Product Catalog added to <span style="color:#1589ee;">' + array.catalog.dataset + '</span> dataset',
      "body": 'Only <strong>' + array.results.summary.catalogUploads + '</strong> of ' + array.results.catalog.length + ' products were added from your catalog upload using the system user.'
    }
    $('li[aria-label="results-catalog"]').html(setupStep(settings));
  }

  if(array.results.summary.catalogUploads==0) {
    var settings = {
      "type": 'error',
      "title":'<strong>0</strong> products were added to <span style="color:#1589ee;">' + array.catalog.dataset + '</span> dataset',
      "body": 'Uploading the products returned the following error(s): "<i>' + array.results.catalog[0].response + '</i>".'
    }
    $('li[aria-label="results-catalog"]').html(setupStep(settings));
    $('li[aria-label="results-heroes"]').remove();
    $('li[aria-label="results-users"]').remove();
    var settings = {
      "type": 'error',
      "title":'No events added to the dataset',
      "body": 'Due to the <strong>Product Catalog error </strong> no events were generated. Please fix your catalog file and start again.'
    }
    $('li[aria-label="results-events"]').html(setupStep(settings));
  }
  if(results[1] == true) {
    var template = $('#taskComplete').html();
    template = template.replace('{{title}}', 'Create <span style="color:#1589ee;">' + array.heroes.length + ' hero</span> profile for account');
    template = template.replace('{{message}}', dataTable(array.heroes) + '<br/><i>To find the anonymous profile version of your hero search for the <strong>"anonId"</strong> value shown above but with the added prefix <strong>\'an\'</strong>.</i>');
    $('li[aria-label="results-heroes"]').html(template);
  }
  if(results[2] == true) {
    var template = $('#taskComplete').html();
    template = template.replace('{{title}}', 'Assigned <span style="color:#1589ee;">' + array.settings.numberOfUsers + ' additional user(s)</span> to account');
    template = template.replace('{{message}}', 'All selected users were successfully assigned seed products to build profiles and affinities.<br/>');
    $('li[aria-label="results-users"]').html(template);
  }
  if(results[3] == true && array.results.summary.eventUploads!=0) {
    var template = $('#taskComplete').html();
    template = template.replace('{{title}}', 'User Events added to <span style="color:#1589ee;">' + array.catalog.dataset + '</span> dataset');
    template = template.replace('{{message}}', '<strong>' + array.results.summary.eventUploads + '</strong> user events were generated and added to your demo account. There were ' + array.results.summary.eventErrors + ' error(s).');
    $('li[aria-label="results-events"]').html(template);
  }
  $('div[aria-controls="results"]').find('h2').removeClass('slds-hide');
}


// Form Validation Functions =============================================
function formValidation(id) {
  $(id).attr('aria-invalid','0');
  $(id).find('*[aria-required="true"]').each(function(index) {
    $(this).parents('.slds-form-element').removeClass('slds-has-error');
    $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
    if($(this).val()=="" || $(this).val()==null) {
      $(this).parents('.slds-form-element').addClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
      $(id).attr('aria-invalid','1');
    }
  });
}


// General Functions ================================================
// Panel navigation
function showHide(showId, hideId) {
  $('#' + hideId).addClass('slds-hide');
  $('#' + showId).removeClass('slds-hide');
}

// Convert text to ProperCase
function properCase(txt) {
  var text = $.trim(txt);
  var text = txt.charAt(0).toUpperCase() + txt.slice(1);
  return text
}

// Sort Standard Array
function sort(array) {
  return array.sort((a, b) => {
    let x = a;
    let y = b;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// Sort Multi-dimensional Array
function sortAsc(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// Create Unique 16 Character GUID
function createID() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}