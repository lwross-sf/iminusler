// Onload functions
var apiWorker = new Worker('worker.js');
// Declare Variables
var array = [];
// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));


///////////////////////////////////////////////////////
/////////////     STEP 1 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function triggered on submit button
function start() {
  showHide('upload', 'welcome');
}

///////////////////////////////////////////////////////
/////////////     STEP 2 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
function preview() {
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
  if($('#ucp-events').val()==''){
    $('#ucp-events').parents('.slds-form-element').addClass('slds-has-error');
    $('#ucp-events').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
  // Check that all components are there before continuing
  if($('.slds-has-error').length==0) {
    array.account = $.trim($('#ucp-account').val().toLowerCase());
    array.dataset = $.trim($('#ucp-dataset').val().toLowerCase());
    localStorage.setItem('account', $.trim($('#ucp-account').val().toLowerCase()));
    localStorage.setItem('dataset', $.trim($('#ucp-dataset').val().toLowerCase()));
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        renderPreview();
        showHide('preview', 'upload');
        clearInterval(checkFiles);
        console.log(array);
      }
   }, 100); // check every 100ms
  }
}

// REFERENCE FUNCTIONS     ////////////////////////////
// Function triggered with file upload
$('#ucp-events').click(function(){
  $('#ucp-events').val(null);
});
$('#ucp-events').change(function(){
  loadCatalogObj('ucp-events');
});

// Revalidate the file if the user changes the timestamp format
$('#ucp-format').change(function(){
  if($('#ucp-events').val()!=''){
    validateCatalog();
  }
});

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
      array["file"] = data;
      console.log(array);
      validateCatalog();
      $('#'+id).attr('aria-busy', 0)
      $('#stat-events').html(array["file"].data.length);
    };
  } else {
    $('#'+id).parents('.slds-form-element').addClass('slds-has-error');
    $('#'+id).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
}

// Function to validate the file before load
function validateCatalog() {
  array["file"].validation = [];
  var settings = validationSettings["interaction studio"]["events"];
  var schema = settings.schema;
  // check schema matches
  $.each(array["file"].meta.fields, function(index, value ) {
    schema.erase(value);
  });
  if(schema.length == 0){
    array["file"].validation.push(settings.messages.schema[1]);
  } else {
    array["file"].validation.push(settings.messages.schema[0]); 
  }

  // Check userId field for valid options
  var users = sort([...new Set(array["file"].data.map(x => x.userId))]);
  $('#stat-users').html(users.length);
  var blankUsers = users.filter(function(v){return v==''});
  var msg = (blankUsers.length > 0) ? settings.messages.userId[0] : settings.messages.userId[1];
  array["file"].validation.push(msg);

  // Check userType field for valid options
  var anonOptions = sort([...new Set(array["file"].data.map(x => x.userType))]);
  $.each(["Known","Unknown"], function( index, value ) {
    anonOptions.erase(value);
  });
  var msg = (anonOptions.length > 0) ? settings.messages.userType[0] : settings.messages.userType[1];
  array["file"].validation.push(msg);

  // Check itemAction field for valid options
  var actionTypes = sort([...new Set(array["file"].data.map(x => x.itemAction))]);
  if(actionTypes[0]=='' || actionTypes[actionTypes.length-1]==''){
    array["file"].validation.push(settings.messages.itemAction[0]);
  }
  $('#stat-types').html(actionTypes.length);

  // Check catalogType field for valid options
  var catalogOptions = sort([...new Set(array["file"].data.map(x => x.catalogType))]);
  $.each(["Article","Blog","Product","n/a"], function( index, value ) {
    catalogOptions.erase(value);
  });
  var msg = (catalogOptions.length > 0) ? settings.messages.catalogType[0] : settings.messages.catalogType[1];
  array["file"].validation.push(msg);

  // Check for date format
  var dt = array["file"].data[0].timestamp.substring(0,10);
  if(array["file"].data[0].timestamp.length == $('#ucp-format').val().length + 2){
    try { 
      $.datepicker.parseDate($('#ucp-format').val().substring(0,8), dt); 
      array["file"].validation.push(settings.messages.dateFormat[1]);
      array["file"].meta.dateFormat = $('#ucp-format').val();
    }
    catch(e) { array["file"].validation.push(settings.messages.dateFormat[0]);}
  } else {
    array["file"].validation.push(settings.messages.dateFormat[0]);
  }

  // Check for price format
  var priceOptions = sort([...new Set(array["file"].data.map(x => x.price))]);
  var priceOptions = priceOptions.filter(function(v){return v!==''});
  if((!isNaN(parseFloat(priceOptions[0])) && !isNaN(parseFloat(priceOptions[priceOptions.length-1])) && array["file"].meta.fields.indexOf('price')>-1) || priceOptions.length ==0){
    array["file"].validation.push(settings.messages.price[1]);
  } else {
    array["file"].validation.push(settings.messages.price[0])
  }

  // Check for catalogItems
  var catalogItems = sort([...new Set(array["file"].data.map(x => x.catalogItemId))]);
  var catalogItems = catalogItems.filter(function(v){return v!==''});
  $('#stat-items').html(catalogItems.length);

  // Render results
  var resultsHeader = '<div class="slds-text-heading_medium slds-p-bottom_small">Validation Results</div>';
  $('#validation-results').html(resultsHeader + resultsList(array["file"].validation));
  $('#validation-results').removeClass('slds-hide');

  // Check if user can proceed
  if($('.slds-theme_error').length > 0) {
    $('#upload').find('.slds-button_brand').prop('disabled', true);
  } else {
    $('#upload').find('.slds-button_brand').prop('disabled', false);
  }
}

// Function to display a preview of the file
function renderPreview() {
  var dataSubset = array["file"].data.slice(0,25);
  var dataPreview = [];
  var fileRows = array["file"].data.length;
  var msg = (fileRows > 25) ? 'Previewing 10 of <strong>' + fileRows + ' rows</strong>.' : 'All rows are displayed.';
  $('#file-summary').html(msg);
  for (i = 0; i < dataSubset.length; i++) {
    dataPreview.push({
      "userId":dataSubset[i].userId,
      "userType":dataSubset[i].userType,
      "itemAction":dataSubset[i].itemAction,
      "catalogType":dataSubset[i].catalogType,
      "catalogItemId":dataSubset[i].catalogItemId,
      "timestamp":dataSubset[i].timestamp,
      "viewTime":dataSubset[i].viewTime
    })
  }
  $('#file-preview').html(dataTable(dataPreview));
  $('#preview').find('.slds-button_brand').prop('disabled', false);
}

///////////////////////////////////////////////////////
/////////////     STEP 3 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
function upload() {
  gtag('event', 'Event Uploader Submit');
  formatEvents();
  showHide('results', 'preview');
  apiWorker.postMessage(array);
}

// Function to format events in to the correct evergage format
function formatEvents() {
  var events = [];
  for (i = 0; i < array["file"].data.length; i++) {
    var event = {};
    var timestamp = formatDate(array["file"].data[i].timestamp)
    event.action = array["file"].data[i].itemAction;
    event.flags = {"noCampaigns": true, "pageView": true}
    event.source = { "channel": "Web", "local": "enGB", "time": timestamp.getTime(), "top":array["file"].data[i].viewTime}

    // user identifiers
    if(array["file"].data[i].userType == 'Known'){
      event.user = {"id": array["file"].data[i].userId} 
      event.user.attributes = {"emailAddress": array["file"].data[i].emailAddress,"sfmcContactKey": array["file"].data[i].sfmcContactKey}
    } else {
      event.user = {"anonId": array["file"].data[i].userId}
    }

    // user identifiers
    if(array["file"].data[i].attributes != ''){
      var attributes = $.parseJSON(array["file"].data[i].attributes);
      $.each(Object.keys(attributes), function(index, value ) {
        event.user.attributes[value] = attributes[value];
      });
    }

    // include itemAction value where applicable
    if(event.action == 'Purchase' || event.action == 'Update Cart' || event.action == 'View Item'){
      event.itemAction = event.action;
      event.catalog = {};
      event.catalog[array["file"].data[i].catalogType] = {"_id": array["file"].data[i].catalogItemId}
    }

    // Add in Page options
    if(event.action == 'Page View' && array["file"].data[i].page !=''){
      event.page = array["file"].data[i].page;
    }

    // Add in Order node if required
    if(event.action == 'Purchase'){
      event.order = {}
      event.order[array["file"].data[i].catalogType] = {
        "orderId": createID(),
        "totalValue": array["file"].data[i].price,
        "currency": "GBP",
        "lineItems": [{"quantity": 1, "_id": array["file"].data[i].catalogItemId, "price":array["file"].data[i].price}]
      }
    }
    // Add in Cart node if required
    if(event.action == 'Update Cart'){
      event.cart = {"singleLine": {}};
      event.cart.singleLine[array["file"].data[i].catalogType] = {
        "quantity": 1, 
        "_id": array["file"].data[i].catalogItemId,
        "price":array["file"].data[i].price
      }
    }

    // push event to global array
    events.push(event);
  }
  array.events = events;
  console.log(array);
}

// Function triggered api upload
apiWorker.onmessage = function(e) {
  if(e.data.type == 'progress'){
    console.log('Upload is ' + e.data.response + '% complete.');
    $('#upload-results').find('#progress-bar-label').find('strong').html(e.data.count + ' of ' + array.events.length + ' events uploaded. <i>(' + e.data.response + '%)');
    $('#upload-results').find('.slds-progress-bar').attr('aria-valuenow', e.data.response);
    $('#upload-results').find('.slds-progress-bar__value').css('width', e.data.response + '%');
    $('#upload-results').find('.slds-progress-bar__value').find('.slds-assistive-text').html('Progress: ' + e.data.response + '%');
  } else {
    array = e.data.data;
    var fileRows = array.results.length;
    var msg = (fileRows > 10) ? 'Previewing 25 of <strong>' + fileRows + ' rows</strong>.' : 'All rows are displayed.';
    $('#upload-results').html(dataTable(array.results.slice(0,25)));
    $('#upload-results-text').html(msg);
    $('#upload-results-text').removeClass('slds-hide');
  
    download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_eventresults.csv", Papa.unparse(array.results, {quotes: true, encoding: "utf8"}),'download');
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

// Array Erase Element
Array.prototype.erase = function(el) {
  let p = this.indexOf(el); // indexOf use strict equality (===)
  if(p != -1) {
      this.splice(p, 1);
  }
}

// File to trigger download
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

// Function to format the date options
function formatDate(inputDate) {
  var format = array["file"].meta.dateFormat;
  if(format=="mm/dd/yy HH:mm"){
    var outputDate = inputDate.substring(6,10)+'-'+inputDate.substring(0,2)+'-'+inputDate.substring(3,5)+'T'+ inputDate.substring(11,16);
  } else if(format=="dd/mm/yy HH:mm" || format=="dd.mm.yy HH:mm"){
    var outputDate = inputDate.substring(6,10)+'-'+inputDate.substring(3,5)+'-'+inputDate.substring(0,2)+'T'+ inputDate.substring(11,16);
  } else {
    var outputDate = inputDate.substring(0,10) + 'T' + inputDate.substring(11,16);
  }
  return new Date(outputDate)
}