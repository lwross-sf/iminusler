// Declare Variables
var array = {};

// Onload functions
var apiWorker = new Worker('worker.js');
loadUserList();

// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));
$('#ucp-api-key').val(localStorage.getItem('apiKey'));
$('#ucp-api-secret').val(localStorage.getItem('apiSecret'));

///////////////////////////////////////////////////////
/////////////     STEP 1 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function triggered on submit button
function start() {
  if(array["items"] != null){
    showHide('options', 'welcome');
    displayMessage('success', 'share_file', '<strong>' + array.dataset + ' Catalog automatically uploaded</strong>. To pick a different dataset and catalog press the <strong>back</strong> button.');
  } else {
    showHide('upload', 'welcome');
  }
}

///////////////////////////////////////////////////////
/////////////     STEP 2 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////

// Function triggered with file upload
$('#items').click(function(){
  $('#items').val(null);
});
$('#items').change(function(){
  loadCatalogObj('items');
});

// Function triggered on submit button
function submitFile() {
  resetForm(); // reset any form errors

  // Check Account Value
  if($('#ucp-account').val().indexOf('.')== -1){
    $('#ucp-account').parents('.slds-form-element').addClass('slds-has-error');
    $('#ucp-account').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
  // Check Dataset Value
  if($('#ucp-dataset').val()==''){
    $('#ucp-dataset').parents('.slds-form-element').addClass('slds-has-error');
    $('#ucp-dataset').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
  // Check for File
  if($('#items').val()==''){
    $('#items').parents('.slds-form-element').addClass('slds-has-error');
    $('#items').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
  // Check that all components are there before continuing
  if($('.slds-has-error').length==0) {
    array.account = $.trim($('#ucp-account').val().toLowerCase());
    array.dataset = $.trim($('#ucp-dataset').val().toLowerCase());
    array.apiKey = $.trim($('#ucp-api-key').val());
    array.apiSecret = $.trim($('#ucp-api-secret').val());
    array.encodedData = window.btoa(array.apiKey + ':' + array.apiSecret);
    localStorage.setItem('account', $.trim($('#ucp-account').val().toLowerCase()));
    localStorage.setItem('dataset', $.trim($('#ucp-dataset').val().toLowerCase()));
    localStorage.setItem('apiKey', $.trim($('#ucp-api-key').val()));
    localStorage.setItem('apiSecret', $.trim($('#ucp-api-secret').val()));
    console.log(array);
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        showHide('options', 'upload');
        clearInterval(checkFiles);
      }
   }, 100); // check every 100ms
  }
}

// REFERENCE FUNCTIONS     ////////////////////////////
// Import CSV data in to an Object
function loadCatalogObj(id){
  resetForm(); // reset any form errors
  var input = document.getElementById(id);
  if(input.files.length>0){
    $('#'+id).attr('aria-busy', 1)
    var reader = new FileReader();
    reader.readAsText(input.files[0], "utf8");
    reader.onloadend = function () {
      var text = reader.result;
      var data = Papa.parse(text, {header: true, encoding: "utf8"});
      if(data.meta.fields.indexOf('status')>-1){
        var dataRows = data.data;
        var dataRows = dataRows.filter(row => row.status == 'OK');
        data.data = dataRows;
      }
      array[id] = data;
      console.log(array);
      validateCatalog();
      $('#'+id).attr('aria-busy', 0)
    };
  } else {
    $('#'+id).parents('.slds-form-element').addClass('slds-has-error');
    $('#'+id).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
}

// Function to validate each catalog type based on default settings
function validateCatalog() {
  var id = "items";
  array[id].validation = [];
  var settings = validationSettings["interaction studio"]["catalog"];
  
  // Check _id field
  if(array[id].meta.fields.indexOf('_id')>-1){
    array[id].validation.push(settings.messages.fieldId[1]);
  } else {
    array[id].validation.push(settings.messages.fieldId[0]);
  }

  // Check name field
  if(array[id].meta.fields.indexOf('name')>-1){
    array[id].validation.push(settings.messages.fieldName[1]);
  } else {
    array[id].validation.push(settings.messages.fieldName[0]);
  }

  // Check itemType field
  if(array[id].meta.fields.indexOf('itemType')>-1){
    var catalogOptions = sort([...new Set(array[id].data.map(x => x.itemType))]);
    $.each(["a","b","p"], function( index, value ) {
      catalogOptions.erase(value);
    });
    var msg = (catalogOptions.length > 0) ? settings.messages.itemType[0] : settings.messages.itemType[1];
    array[id].validation.push(msg);
  } else {
    array[id].validation.push(settings.messages.fieldType[0]);
  }

  // Check category field
  if(array[id].meta.fields.indexOf('category')>-1){
    array[id].validation.push(settings.messages.fieldCategory[1]);
  } else {
    array[id].validation.push(settings.messages.fieldCategory[0]);
  }

  // Check price field
  var priceOptions = sort([...new Set(array[id].data.map(x => x.price))]);
  var priceOptions = priceOptions.filter(function(v){return v!==''});
  if((!isNaN(parseFloat(priceOptions[0])) && !isNaN(parseFloat(priceOptions[priceOptions.length-1])) && array[id].meta.fields.indexOf('price')>-1) || priceOptions.length ==0){
    array[id].validation.push(settings.messages.fieldPrice[1]);
  } else {
    array[id].validation.push(settings.messages.fieldPrice[0])
  }

  // Render results
  var resultsHeader = '<div class="slds-text-heading_medium slds-p-bottom_small">Validation Results</div>';
  $('#validation-results').html(resultsHeader + resultsList(array[id].validation));
  $('#validation-results').removeClass('slds-hide');

  // Check if user can proceed
  if($('.slds-theme_error').length > 0) {
    $('#upload').find('.slds-button_brand').prop('disabled', true);
   } else {
     $('#upload').find('.slds-button_brand').prop('disabled', false);
   }
}


///////////////////////////////////////////////////////
/////////////     STEP 3 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////

// Function triggered on submit button
function submitSettings() {
  array.settings = {
    "numberHeroUsers": $('#numberHeros').val(),
    "numberUsers": $('#numberUsers').val(),
    "numberKnown": $('#numberKnown').val(),
    "numberUnknown": $('#numberUnknown').val(),
    "sessionDensity": $('#sessionDensity').val(),
    "avgSessionGap": Math.floor(90/$('#sessionDensity').val()),
    "sessionLength": $('#sessionLength').val(),
    "cartRate": $('#cartRate').val()/100,
    "purchaseRate": ($('#purchaseRate').val()*$('#cartRate').val())/10000
  }
  buildUsers();
  buildEvents();
  formatEvents();
  displayUpload();
  showHide('preview', 'options')
}

// Function to build hero attribute array
function buildUsers() {
  var arr = [];
  array.users = [];
  while(arr.length < array.settings.numberUsers){
    var r = array.personas.user[Math.floor(Math.random() * array.personas.user.length)];
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  for (i = 0; i < arr.length; i++) {
    var seenDate = new Date(new Date() - (arr[i].daysFirstSeen*24*60*60*1000));
    var joinDate = new Date(new Date() - (arr[i].daysJoined*24*60*60*1000));
    var lastDate = new Date(new Date() - (Math.random()*6*60*60*1000));
    if(i < array.settings.numberKnown) {
      var row = {
        "user": {
          "id": arr[i].name,
          "attributes":{"customerId":arr[i].name, "emailAddress": arr[i].emailAddress,"sfmcContactKey": arr[i].contactKey,"dateFirstSeen": seenDate,"dateJoined": joinDate,"dateLastSeen": lastDate,"autoGenerate": true}
        }
      }
    } else {
      var row = {
        "user": {
          "anonId": createID(),
          "attributes":{ "dateFirstSeen": seenDate, "dateLastSeen": lastDate, "autoGenerate": true}
        }
      }
    }
    // pick a random Product
    var pickedItems = pickItems();
    row.user.attributes.items = pickedItems;
    row.user.attributes.category = pickedItems[0].category;
    array.users.push(row);
  }
}

// Pick Catalog Items
function pickItems(id) {
  var arr = [];
  arr[0] = (id != null &&  id != "") ? array["items"].data.filter(data => data._id == id)[0] : array["items"].data[Math.floor(Math.random() * array["items"].data.length)];
  var categoryData = array["items"].data.filter(data => data.category == arr[0].category);
  var categoryData = categoryData.filter(data => data._id != arr[0]._id);
  while(arr.length < 3){
    if(arr.length > categoryData.length){
      var categoryData = array["items"].data;
    }
    var r = categoryData[Math.floor(Math.random() * categoryData.length)];
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

// Function to build events array
function buildEvents() {
  for (i = 0; i < array.users.length; i++) {
    if(array.users[i].user.attributes.autoGenerate == true){
      array.users[i].sessions = [];
      var eventTime = array.users[i].user.attributes.dateLastSeen.getTime();
      var sessionCount = 0;
      while(eventTime > array.users[i].user.attributes.dateFirstSeen.getTime()){
        sessionCount += 1;
        eventTime = (sessionCount > 10) ? array.users[i].user.attributes.dateFirstSeen.getTime() + 1000 : eventTime;
        var sessionLen = (sessionCount == 1) ? 3 : Math.floor(Math.random() * array.settings.sessionLength * 2) +1;
        var randId = (sessionCount == 1) ? 0 : Math.floor(Math.random() * 3);
        var item = array.users[i].user.attributes.items[randId];
        var sessionType = 'View Item'
        var sessionType = (item.itemType=='p' && Math.random() < array.settings.cartRate && i >= array.settings.numberHeroUsers)? 'Update Cart': sessionType;
        var sessionType = (item.itemType=='p' && Math.random() < array.settings.purchaseRate && i >= array.settings.numberHeroUsers)? 'Purchase': sessionType;
        var sessionType = (i < array.settings.numberHeroUsers && sessionCount==1 && item.itemType=='p')? 'Purchase': sessionType;
        var sessionType = (eventTime < array.users[i].user.attributes.dateJoined)? 'View Item': sessionType;
        var sessionEvents = [];
        for (j = 0; j < sessionLen; j++) {
          var actionType = (j == 0) ? sessionType : 'View Item';
          var actionItem = (j == 0) ? item : array.users[i].user.attributes.items[Math.floor(Math.random() * 3)];
          var viewTime = ((Math.floor(Math.random() * 175) + 5) * 1000);
          var viewTime = (actionType == 'Purchase') ? ((Math.floor(Math.random() * 270) + 30) * 1000)  : viewTime;
          var viewTime = (actionItem.itemType == 'a' || actionItem.itemType == 'b') ? ((Math.floor(Math.random() * 570) + 30) * 1000)  : viewTime;
          sessionEvents.push({"userAction": actionType, "itemType":actionItem.itemType, "itemId": actionItem._id, "viewTime":viewTime});
          eventTime = eventTime - viewTime;
        }
        array.users[i].sessions.push({"_id": createID(), "time":eventTime, "length": sessionLen, "item":item, "type":sessionType, "events":sessionEvents});
        var sessionGap = (i < array.settings.numberHeroUsers) ? array.settings.avgSessionGap : array.settings.avgSessionGap * 2;
        eventTime = eventTime - Math.floor(Math.random() * sessionGap)*24*60*60*1000;
        eventTime = eventTime - Math.floor(Math.random() * 24 * 60)*60*1000;
      }
    }
  }
}

// Function to format events in to the correct evergage format
function formatEvents() {
  var events = [];
  var catalogTypes = {"a":"Article", "b":"Blog", "p":"Product"}
  for (i = 0; i < array.users.length; i++) {
    for (j = 0; j < array.users[i].sessions.length; j++) {
      var timeStamp = array.users[i].sessions[j].time;
      for (k = array.users[i].sessions[j].events.length -1; k >= 0; k--) {
        var itemId = array.users[i].sessions[j].events[k].itemId
        var item = array["items"].data.filter(data => data._id == itemId)[0];
        var catalogType = catalogTypes[array.users[i].sessions[j].events[k].itemType];
        var page = (array.users[i].sessions[j].events[k].page === undefined) ? '' : array.users[i].sessions[j].events[k].page;
        var event = {
          "action": array.users[i].sessions[j].events[k].userAction,
          "flags": {
            "noCampaigns": true,
            "pageView": true
          },
          "source": {
            "channel": "Demo Builder",
            "local": "enGB",
            "time": timeStamp,
            "top":array.users[i].sessions[j].events[k].viewTime
          },
          "user": array.users[i].user
        }
        // Add in custom options
        if(event.action == 'Purchase' || event.action == 'Update Cart' || event.action == 'View Item'){
          event.itemAction = array.users[i].sessions[j].events[k].userAction;
          event.catalog = {};
          event.catalog[catalogType] = {"_id": itemId}
        }
        // Add in Page options
        if(page != ''){
          event.page = page;
        }
        // Add in Order node if required
        if(array.users[i].sessions[j].events[k].userAction=='Purchase'){
          event.order = {}
          event.order[catalogType] = {
            "orderId": createID(),
            "totalValue": item.price,
            "currency": "GBP",
            "lineItems": [{"quantity": 1, "_id": itemId, "price":item.price}]
          }
        }
        // Add in Cart node if required
        if(array.users[i].sessions[j].events[k].userAction=='Update Cart'){
          event.cart = {"singleLine": {}};
          event.cart.singleLine[catalogType] = {
            "quantity": 1, 
            "_id": itemId,
            "price":item.price
          }
        }
        events.push(event);
        timeStamp = timeStamp + array.users[i].sessions[j].events[k].viewTime;
        if(k == 0){
          var event = {
            "action": array.users[i].sessions[j].events[k].userAction,
            "flags": {
              "noCampaigns": true,
              "pageView": true
            },
            "source": {
              "channel": "Demo Builder",
              "local": "enGB",
              "time": timeStamp,
              "top":0
            },
            "user": array.users[i].user
          }
          event.itemAction = 'View Item';
          event.catalog = {};
          event.catalog[catalogType] = {"_id": itemId}
          events.push(event);
        }
      }
    }
  }
  array.events = events;
}

// Function to display summary of upload for review
function displayUpload() {
  var summaryData = [];
  var userData = array.users.filter(row => row.user.attributes.autoGenerate != "anonHero");
  for (i = 0; i < userData.length; i++) {
    var totalEvents = 0;
    for (j = 0; j < array.users[i].sessions.length; j++) {
      totalEvents += array.users[i].sessions[j].events.length;
    }
    var flag = (i < array.settings.numberHeroUsers) ? ' (Hero)' : '';
    var altId = (i < array.settings.numberHeroUsers && array.users[i].user.attributes.hasAnon == true) ? array.users[i].user.attributes.altId : '';
    summaryData.push({
      "User ID": (array.users[i].user.id === undefined) ? '' : array.users[i].user.id + flag,
      "Anon ID": (array.users[i].user.anonId === undefined) ? altId : array.users[i].user.anonId,
      "Featured Catalog Item":array.users[i].user.attributes.items[0].name,
      "# Sessions":array.users[i].sessions.length,
      "Total Events":totalEvents + array.users[i].sessions.length
    })
  }
  $('#upload-summary').html(dataTable(summaryData));
  array.summary = summaryData;
}


// Function to adjust selected user count
$('#numberUsers').change(function(){
  $('#numberKnown').attr('max', $('#numberUsers').val());
  $('#numberUnknown').attr('max', $('#numberUsers').val());

  // Adjust sliders keeping ratio
  var ratio = parseInt($('#numberUnknown').val())/ (parseInt($('#numberKnown').val()) + parseInt($('#numberUnknown').val()));
  var ratio = (ratio > 0) ? ratio : 0.4;
  var count = Math.floor(ratio * $('#numberUsers').val());
  if($('#numberUsers').val() > 0){
    $('#numberUnknown').attr('value', count);
    $('#numberUnknown').val(count);
    $('#numberUnknown').parent(".slds-slider").children(".slds-slider__value").html(count);
    $('#numberKnown').attr('value',  $('#numberUsers').val() -count);
    $('#numberKnown').val($('#numberUsers').val() - count);
    $('#numberKnown').parent(".slds-slider").children(".slds-slider__value").html($('#numberUsers').val() - count);
  } else {
    $('#numberUnknown').attr('value', 0);
    $('#numberUnknown').val(0);
    $('#numberUnknown').parent(".slds-slider").children(".slds-slider__value").html(0);
    $('#numberKnown').attr('value',  $('#numberUsers').val() -0);
    $('#numberKnown').val($('#numberUsers').val() - 0);
    $('#numberKnown').parent(".slds-slider").children(".slds-slider__value").html($('#numberUsers').val() - 0);
  }
});

// Function to adjust unknown user count
$('#numberKnown').change(function(){
  var count = parseInt($('#numberUsers').val()) - parseInt($('#numberKnown').val());
  var count = (count > 0) ? count : 0;
  $('#numberUnknown').attr('value', count);
  $('#numberUnknown').val(count);
  $('#numberUnknown').parent(".slds-slider").children(".slds-slider__value").html(count);
});

// Function to adjust known user count
$('#numberUnknown').change(function(){
  var count = parseInt($('#numberUsers').val()) - parseInt($('#numberUnknown').val());
  var count = (count > 0) ? count : 0;
  $('#numberKnown').attr('value', count);
  $('#numberKnown').val(count);
  $('#numberKnown').parent(".slds-slider").children(".slds-slider__value").html(count);
});


///////////////////////////////////////////////////////
/////////////     STEP 4 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////

// Function triggered on submit button
function upload() {
  gtag('event', 'User Cannon Submit');
  showHide('results', 'preview');
  apiWorker.postMessage(array);
}

// Function triggered api upload
apiWorker.onmessage = function(e) {
  console.log(e.data);
  array = e.data.response;
  if(e.data.type == 'event'){
    // Update data table
    var arrayRender = array.results.slice(array.results.length - 50,array.results.length);
    $('#upload-results').find('div[role="datatable"]').html(dataTable(sortResults(arrayRender)));
    // Update progress bar
    var completePerc = parseInt((array.results.length*100) / array.events.length);
    $('#upload-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete (' + array.results.length + ' of ' + array.events.length + ' rows uploaded)');
    $('#upload-results').find('div[role="progressbar"]').find('.slds-assistive-text').text(completePerc + '% Complete');
    $('#upload-results').find('div[role="progressbar"]').find('.slds-progress-bar').attr('aria-valuenow', completePerc);
    $('#upload-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').css('width', completePerc+'%');
    if(array.results.length > 50){$('#upload-results-text').text('50 of ' + array.results.length + ' rows displayed');}
    // Update on complete
    if(array.results.length == array.events.length){
      var uploadCount = array.results.filter(function(v){return v.Status=='OK'}).length;
      $('#upload-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete (' + uploadCount + ' of ' + array.events.length + ' rows uploaded)');
      $('#upload-results').find('div[role="spinner"]').addClass('slds-hide');
      $('#upload-results').find('div[role="progressbar"]').addClass('slds-text-color_success');
      $('#upload-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').addClass('slds-progress-bar__value_success');
    }  
  }
  if(array.results.length == array.events.length){
    if(array.tags.length == array.events.filter(function(v){return v.action=='View Item'}).length){
      // Resolve data sets
      for (i = 0; i < array.tags.length; i++) {
        for (j = 0; j < array.results.length; j++) {
          if(array.results[j].itemAction =='View Item' && array.tags[i].userId == array.results[j].userId && array.tags[i][".item"]._id == array.results[j].catalogItem && array.tags[i].timestamp == array.results[j].Timestamp){
            array.results[j].tagStatus = array.tags[i].tagStatus;
          }
        }
      }

      // Update data table
      var arrayRender = array.results.slice(array.results.length - 50,array.results.length);
      $('#upload-results').find('div[role="datatable"]').html(dataTable(sortResults(arrayRender)));

      // Log results
      sessionStorage.setItem('sessionData', JSON.stringify(array));
      download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_dc_results.csv", Papa.unparse(array.results, {quotes: true, encoding: "utf8"}),'download');
      $('#next-steps').css({height:'0'})
      $('#next-steps').removeClass('slds-hide');
      $('#next-steps').animate({height:'170'});
    }
  }
  console.log(array)
}


///////////////////////////////////////////////////////
/////////////     ONLOAD FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
array.personas = [];
function loadUserList() {
  $.get('/app/feeds/users.csv', function(data) {
    array.personas.user = Papa.parse(data, {header: true, encoding: "utf8"}).data;
    console.log(array);
    loadCatalog();
    $('#start-button').attr('disabled', false)
  })
}

function loadCatalog() {
  // Load Stored Data from session
  if(sessionStorage.getItem('sessionData')!=null){
    var data = JSON.parse(sessionStorage.getItem('sessionData'));
    array["account"] = data.account;
    array["dataset"] = data.dataset;
    array["vertical"] = data.vertical;
    array["apiKey"] = data.apiKey;
    array["apiSecret"] = data.apiSecret;
    array["encodedData"] = data.encodedData;
    array["items"] = data.items;
    array.items.data = array.items.data.filter(row => row.status == 'OK');
    console.log(array);
    $('#welcome').find('li:nth-child(4)').addClass('slds-hide');
    //sessionStorage.removeItem('sessionData');
  }
}

///////////////////////////////////////////////////////
//////////////     UI FUNCTIONS     ///////////////////
///////////////////////////////////////////////////////

// Function to progress form
function showHide(showId, hideId) {
  $('#' + showId).removeClass('slds-hide');
  $('#' + hideId).addClass('slds-hide');
}

// Card Expander
function toggleCard(lbl){
  $('.slds-card__body[aria-label="'+lbl+'"]').toggleClass('slds-hide');
}

// Form Errors
function checkNull(id){
  if($(id).val()==''){
    $(id).parents('.slds-form-element').addClass('slds-has-error');
    $(id).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
}

// Convert text to ProperCase
function properCase(txt) {
  var text = $.trim(txt);
  var text = txt.charAt(0).toUpperCase() + txt.slice(1);
  return text
}

// Reset any form errors on re submit
function resetForm(){
  $('.slds-has-error').removeClass('slds-has-error');
  $('.slds-form-element__help').addClass('slds-hide');
}


// Sort Standard Array
function sort(array) {
  return array.sort((a, b) => {
    let x = a;
    let y = b;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}
function sortResults(array) {
  return array.sort((a, b) => {
    let x = new Date(b.Timestamp.replace(" ","T"));
    let y = new Date(a.Timestamp.replace(" ","T"));
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// Array Erase Element
Array.prototype.erase = function(el) {
  let p = this.indexOf(el); // indexOf use strict equality (===)
  if(p != -1) {
      this.splice(p, 1);
  }
}

// Function to add additional hero attributes
function addAttribute(id) {
  var cnt = $('#addAttribute').html();
  var newId = '#' + $(id).parents('.slds-tabs_default__content').attr('id').replace('-profile', '-attributes');
  $(newId).append(cnt);
}


function download(filename, text, id) {
  if(id!='' && id!==null){
    var element = document.getElementById(id);
    element.setAttribute('href', 'data:text/csv;charset=utf8,' + encodeURI(text));
    element.setAttribute('download', filename);
  } else {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf8,' + encodeURI(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

// Create Unique 16 Character GUID
function createID() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

// RM: Function to show system messages
function displayMessage(theme, icon, message) {
  const banner = `
    <div id="messenger" class="slds-notify slds-notify_alert slds-theme_{theme}" role="alert" style="height:0px; line-height:0px; font-size:15px;">
      <span class="slds-assistive-text">{theme}</span>
      <span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed">
        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#{icon}"></use>
        </svg>
      </span>
      <h2>{message}</h2>
    </div>
  `
  $('#messenger').remove();
  $('#page-header').append(banner.replace('{theme}', theme).replace('{icon}', icon).replace('{message}', message));
  $('#messenger').animate({height:'54px', 'line-height':'18px'});
  setTimeout(function(){
    $('#messenger').animate({left:'100%'}, 'slow', function(){
      $('#messenger').remove();
    });
  }, 5000);
}