// Declare Variables
var array = {};
var heroOptions = '';
// Onload functions
var apiWorker = new Worker('worker.js');
loadHeroList();

// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));
$('#ucp-api-key').val(localStorage.getItem('apiKey'));
$('#ucp-api-secret').val(localStorage.getItem('apiSecret'));

///////////////////////////////////////////////////////
/////////////     STEP 0 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function triggered on submit button
function start() {
  if(array["items"] != null){
    showHide('hero-profiles', 'welcome');
    displayMessage('success', 'share_file', '<strong>' + array.dataset + ' Catalog automatically uploaded</strong>. To pick a different dataset and catalog press the <strong>back</strong> button.');
  } else {
    showHide('upload', 'welcome');
  }
}

///////////////////////////////////////////////////////
/////////////     STEP 1 FUNCTIONS     ////////////////
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
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        showHide('hero-profiles', 'upload');
        loadCatalogList();
        renderSessionsTemplates(array["items"].data);
        renderHeroTemplate(array.personas.hero, array["items"].data);
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

// Function to apply item list to relevant dropdowns
function loadCatalogList() {
  var options = sortByKey(array["items"].data, "name");
  var select = '<option value="0" disabled="" selected>Select One...</option>';
  for (i = 0; i < options.length; i++) {
    select += '<option data-type="' + options[i].itemType + '" data-price="' + options[i].price + '" data-category="' + options[i].category + '" value="' + options[i]._id + '">' + options[i].name + ' (' + options[i].itemType + ')</option>';
  }
  $('select[role="item-selector"]').html(select);
}

///////////////////////////////////////////////////////
/////////////     STEP 2 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////

// Function triggered on button to generate events
function submitHero(Id) {
  var elemAttributes = $(Id).parents('.slds-tabs_default__content').find('div[aria-label="section-user-attributes"]');
  var elemSessions = $(Id).parents('.slds-tabs_default__content');
  validateHero(elemAttributes);
  if($(elemAttributes).find('.slds-form-element.slds-has-error').length==0){
    var products = pickExtraItems(elemSessions);
    buildHeroEvents(elemAttributes, elemSessions, products);
    enableButton();
  }
}

function submitAllHero() {  
  sessionValidation();
  if($('#hero-profiles').find('.slds-form-element.slds-has-error').length==0){
    buildUsers();
    console.log(array);
    displayUpload()
    showHide('preview', 'hero-profiles');
    console.log(array);
  }
}

// Function to validate hero profiles
function validateHero(elem) {
  var arr = [];
  // Validate input fields
  $(elem).find('input').each(function(index) {
    $(this).parents('.slds-form-element').removeClass('slds-has-error');
    $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
    if($(this).val()=="" || $(this).val()==null) {
      $(this).parents('.slds-form-element').addClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
      $('#hero-0' + i + '-tab').addClass('slds-text-color_error');
    }
  });
  // Validate select fields
  $(elem).find('select').each(function(index) {
    $(this).parents('.slds-form-element').removeClass('slds-has-error');
    $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
    if($(this).val()=="" || $(this).val()==null || $(this).val()=="0") {
      if($(this).parents('.slds-form-element').hasClass("slds-hide")==false){
        $(this).parents('.slds-form-element').addClass('slds-has-error');
        $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
        $('#hero-0' + i + '-tab').addClass('slds-text-color_error');
      }
    }
  });
  // Validate if IDs are duplicated

}

// Pick Catalog Items
function pickExtraItems(elem) {
  var id = elem.find('select[aria-label="attribute-item"]').find('option:selected').attr('value');
  var arr = [];
  arr[0] = array["items"].data.filter(data => data._id == id)[0];
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

function buildHeroEvents(elem, displayElem, products) {
  var sessions = [];
  var dateFirstSeen = new Date(elem.find('input[aria-label="attribute-date"]').val());
  var dateJoined = new Date(elem.find('input[aria-label="attribute-joined"]').val());
  var dateLastSeen = new Date(elem.find('input[aria-label="attribute-last-seen"]').val());
  eventTime = dateLastSeen.getTime();
  var sessionCount = 0;
  while(eventTime > dateFirstSeen.getTime()){
    sessionCount += 1;
    eventTime = (sessionCount > 7) ? dateFirstSeen.getTime() + 1000 : eventTime;
    var sessionLen = (sessionCount == 1) ? 3 : Math.floor(Math.random() * 4) +1;
    var randId = (sessionCount == 1) ? 0 : Math.floor(Math.random() * 3);
    var item = products[randId];
    var sessionType = 'View Item'
    var sessionType = (item.itemType=='p' && Math.floor(Math.random() * 5)==4)? 'Update Cart': sessionType;
    var sessionType = (sessionType=='Update Cart' && Math.floor(Math.random() * 5)==4)? 'Purchase': sessionType;
    var sessionType = (sessionCount==1 && item.itemType=='p')? 'Purchase': sessionType;
    var sessionType = (eventTime < dateJoined.getTime())? 'View Item': sessionType;
    var userStatus = (eventTime > dateJoined.getTime())? 'Known': 'Unknown';
    var sessionEvents = [];
    for (j = 0; j < sessionLen; j++) {
      var actionType = (j == 0) ? sessionType : 'View Item';
      var actionItem = (j == 0) ? item : products[Math.floor(Math.random() * 3)];
      var viewTime = ((Math.floor(Math.random() * 55) + 5) * 1000);
      var viewTime = (actionType == 'Purchase') ? ((Math.floor(Math.random() * 270) + 30) * 1000)  : viewTime;
      var viewTime = (actionItem.itemType == 'a' || actionItem.itemType == 'b') ? ((Math.floor(Math.random() * 570) + 30) * 1000)  : viewTime;
      sessionEvents.push({"userAction": actionType, "itemType":actionItem.itemType, "itemId": actionItem._id, "viewTime":viewTime});
      eventTime = eventTime - viewTime;
    }
    sessions.push({"_id": createID(16), "time":eventTime, "length": sessionLen, "item":item, "type":sessionType, "userStatus":userStatus, "events":sessionEvents});
    var sessionGap = Math.floor(Math.random() * 11) + 3;
    eventTime = eventTime - sessionGap*24*60*60*1000;
    eventTime = eventTime - Math.floor(Math.random() * 24 * 60)*60*1000;
  }
  // Render Sessions
  var htm = renderSessions(array["items"].data, sessions);
  displayElem.find('ul[role="session-row"]').html(htm);
  displayElem.find('ul[role="session-row"]').find('select').each(function() {
    var theValue = $(this).attr('value');
    $(this).find('option[value="' + theValue + '"]').attr('selected',true);
    $(this).find('option[data-type="' + theValue + '"]').attr('selected',true);
  });
}

function readHeroEvents(elem) {
  var sessions = [];
  elem.find('.slds-expression__group').each(function() {
    var sessionEvents = [];
    var eventTime = new Date($(this).find('input[type="datetime-local"]').val());
    var sessionLen = $(this).find('.slds-expression__row').length;
    $(this).find('.slds-expression__row').each(function() {
      var actionType = $(this).find('select[role="event-action-type"]').find('option:selected').attr('value');
      var viewTime = parseInt($(this).find('input[role="event-time"]').val()*1000);
      if(actionType=='Custom'){
        var actionType = $(this).find('input[role="event-item-custom"]').val();
        sessionEvents.push({"userAction": actionType, "viewTime":viewTime});
      } else if(actionType=='Page View'){
        var pageName = $(this).find('input[role="event-item-custom"]').val();
        sessionEvents.push({"userAction": "Page View", "page": pageName, "viewTime":viewTime});
      } else {
        var itemType = $(this).find('select[role="event-item-type"]').find('option:selected').attr('data-type');
        var itemId = $(this).find('select[role="event-item-selector"]').find('option:selected').attr('value');
        sessionEvents.push({"userAction": actionType, "itemType":itemType, "itemId": itemId, "viewTime":viewTime});
      }

    });
    // Check for session info
    if(sessionEvents.filter(row => row.userAction == 'Purchase').length > 0){
      var itemId = sessionEvents.filter(row => row.userAction == 'Purchase')[0].itemId;
      var sessionType = 'Purchase';
      var item = array["items"].data.filter(data => data._id == itemId)[0];
    } else if(sessionEvents.filter(row => row.userAction == 'Update Cart').length > 0){
      var itemId = sessionEvents.filter(row => row.userAction == 'Update Cart')[0].itemId;
      var sessionType = 'Update Cart';
      var item = array["items"].data.filter(data => data._id == itemId)[0];
    } else {
      var itemId = sessionEvents[0].itemId;
      var sessionType = 'View Item';
      var item = array["items"].data.filter(data => data._id == itemId)[0];
    }
    sessions.push({"_id": createID(16), "time":eventTime.getTime(), "length": sessionLen, "item":item, "type":sessionType, "events":sessionEvents});
  });
  return sessions
}

// Function to build hero attribute array
function buildUsers() {
  array.users = [];
  var numHeroes = $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length;
  for (i = 1; i < numHeroes; i++) {
    var id = $('#hero-'+i+'-profile').find('input[aria-label="attribute-id"]').val();
    var name = $('#hero-'+i+'-profile').find('input[aria-label="attribute-name"]').val();
    var emailAddress = $('#hero-'+i+'-profile').find('input[aria-label="attribute-email"]').val();
    var contactKey = $('#hero-'+i+'-profile').find('input[aria-label="attribute-key"]').val();
    var seenDate = new Date($('#hero-'+i+'-profile').find('input[aria-label="attribute-date"]').val());
    var joinDate = new Date($('#hero-'+i+'-profile').find('input[aria-label="attribute-joined"]').val());
    var lastDate = new Date($('#hero-'+i+'-profile').find('input[aria-label="attribute-last-seen"]').val());

    var row = {
      "user": {
        "id": id,
        "attributes":{
          "customerId": id,
          "fullName": name,
          "emailAddress": emailAddress,
          "sfmcContactKey": contactKey,
          "dateFirstSeen": seenDate,
          "dateJoined": joinDate,
          "dateLastSeen": lastDate
        }
      },
      "sessions": readHeroEvents($('#hero-'+i+'-profile'))
    }
    // add any additional attributes specified
    $('#hero-'+i+'-profile').find('div[aria-label="hero-custom-attributes"]').children('.slds-col').each(function() {
      var field = $(this).find('.slds-size_1-of-3').find('input').val();
      var value = $(this).find('.slds-size_7-of-12').find('input').val();
      row.user.attributes[field] = value;
    });
    // define anon id if required
    if($('#hero-'+i+'-profile').find('input[aria-label="attribute-anon-flag"]').is(':checked')==true){
      row.user.attributes["pairedId"] = createID(18)
    }
    array.users.push(row);
  }
}

// Function to display summary of upload for review
function displayUpload() {
  var summaryData = [];
  for (i = 0; i < array.users.length; i++) {
    var totalEvents = 0;
    for (j = 0; j < array.users[i].sessions.length; j++) {
      totalEvents += array.users[i].sessions[j].events.length;
    }
    summaryData.push({
      "User ID": (array.users[i].user.id === undefined) ? '' : array.users[i].user.id,
      "Anon ID": (array.users[i].user.attributes.pairedId === undefined) ? '' : array.users[i].user.attributes.pairedId,
      "Featured Catalog Item":array.users[i].sessions[0].item.name,
      "# Sessions":array.users[i].sessions.length,
      "Total Events":totalEvents + array.users[i].sessions.length
    })
  }
  $('#upload-summary').html(dataTable(summaryData));
  array.summary = summaryData;
}

// Functions to live validate form is filled in
$(document).on('change', '#hero-profiles input', function(){
  enableButton();
});
$(document).on('change', '#hero-profiles select', function(){
  enableButton();
});

// Function to check whether the Next but should show
function enableButton(){
  var arr = [];
  var numHeroes = $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length;
  for (i = 1; i < numHeroes; i++) {
    $('#hero-' + i + '-profile').find('input').each(function(index) {
      if($(this).val()=="" || $(this).val()==null) {
        arr.push('error');
      }
    });
    $('#hero-' + i + '-profile').find('select').each(function(index) {
      if($(this).val()=="" || $(this).val()==null || $(this).val()=="0") {
        if($(this).parents('.slds-form-element').hasClass("slds-hide")==false){
          arr.push('error');
        }
      }
    });
  }
  if(arr.length>0){
    $('#hero-profiles').find('button[role="submit-events"]').prop('disabled', true);
  } else {
    $('#hero-profiles').find('button[role="submit-events"]').prop('disabled', false);
  }
}

// Function to validate hero profiles
function sessionValidation() {
  var arr = [];
  var numHeroes = $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length;
  $('#hero-profiles').find('.slds-text-color_error').removeClass('slds-text-color_error');
  $('#hero-profiles').find('.slds-has-error').addClass('slds-has-error');
  $('#hero-profiles').find('.slds-form-element__help').addClass('slds-hide');
  $('#hero-profiles').find('.slds-tabs__right-icon').addClass('slds-hide');
  for (i = 1; i < numHeroes; i++) {
    $('#hero-' + i + '-tab').removeClass('slds-text-color_error');
    $('#hero-' + i + '-profile').find('input').each(function(index) {
      $(this).parents('.slds-form-element').removeClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
      if($(this).val()=="" || $(this).val()==null) {
        $(this).parents('.slds-form-element').addClass('slds-has-error');
        $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
        $('#hero-' + i + '-tab').addClass('slds-text-color_error');
        $('#hero-' + i + '-tab').find('.slds-tabs__right-icon').removeClass('slds-hide');
      }
    });
    $('#hero-' + i + '-profile').find('select').each(function(index) {
      $(this).parents('.slds-form-element').removeClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
      if($(this).val()=="" || $(this).val()==null || $(this).val()=="0") {
        if($(this).parents('.slds-form-element').hasClass("slds-hide")==false){
          $(this).parents('.slds-form-element').addClass('slds-has-error');
          $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
          $('#hero-' + i + '-tab').addClass('slds-text-color_error');
          $('#hero-' + i + '-tab').find('.slds-tabs__right-icon').removeClass('slds-hide');
        }
      }
    });
    if(arr.indexOf($('#hero-' + i + '-profile').find('input[aria-label="attribute-id"]').val()) === -1){
      arr.push($('#hero-' + i + '-profile').find('input[aria-label="attribute-id"]').val());
    } else {
      $('#hero-' + i + '-profile').find('input[aria-label="attribute-id"]').parents('.slds-form-element').addClass('slds-has-error');
      $('#hero-profiles').prepend(toast('error', 'people', 'All Hero profiles must have distinct names.'));
    }
  }
  if($('#hero-profiles').find('.slds-form-element.slds-has-error').length>0){
    $('#hero-profiles').find('.slds-tabs_default__link.slds-text-color_error').eq(0).click();
    $('#hero-profiles').prepend(toast('error', 'resource_absence', 'One of your Hero profiles is incomplete. Please see below for more details.'));
    $([document.documentElement, document.body]).animate({
      scrollTop: "50px"
    }, 600);
  }
  enableButton();
}

// UI Functions ------------------------
// Add New Hero
function addHeroTab() {
  var numHeroes = $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length -1;
  if(numHeroes < 10){
    var newCount = numHeroes + 1;
    var heroTemplateUnique = heroTemplate.replace(/{id}/g, createID(4))
    var elem = $('#hero-profiles').find('.slds-tabs_default__nav').find('li:nth-child('+numHeroes+')');
    $('<li class="slds-tabs_default__item" title="Hero '+newCount+'" role="presentation"><a class="slds-tabs_default__link" href="javascript:void(0);" role="tab" tabindex="0" aria-selected="true" aria-controls="hero-'+newCount+'-profile" id="hero-'+newCount+'-tab">Hero '+newCount+' Profile</a></li>').insertAfter(elem);
    $('#hero-profiles').find('.slds-tabs_default').append('<div id="hero-'+newCount+'-profile" class="slds-tabs_default__content slds-hide slds-grid slds-wrap" role="tabpanel" aria-labelledby="hero-'+newCount+'-tab">'+heroTemplateUnique+'</div>');
    $('#hero-'+newCount+'-tab').click();
    enableButton();
  } else {
    window.alert('Maximum number of heroes reached')
  }
}

function duplicateHeroTab(Id) {
  var numHeroes = $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length -1;
  var newCount = numHeroes + 1;
  var elem = $('#hero-profiles').find('.slds-tabs_default__nav').find('li:nth-child('+numHeroes+')');
  $('<li class="slds-tabs_default__item" title="Hero '+newCount+'" role="presentation"><a class="slds-tabs_default__link" href="javascript:void(0);" role="tab" tabindex="0" aria-selected="true" aria-controls="hero-'+newCount+'-profile" id="hero-'+newCount+'-tab">Hero '+newCount+' Profile</a></li>').insertAfter(elem);
  $('#hero-profiles').find('.slds-tabs_default').append('<div id="hero-'+newCount+'-profile" class="slds-tabs_default__content slds-hide slds-grid slds-wrap" role="tabpanel" aria-labelledby="hero-'+newCount+'-tab">' + $(Id).parents('.slds-tabs_default__content').html() + '</div>');
  $('.slds-dropdown-trigger_click').removeClass('slds-is-open');
  
  var oldElem = $(Id).parents('.slds-tabs_default__content'); 
  var newElem = $('#hero-'+newCount+'-profile');
  // Update form values
  newElem.find('input[aria-label="attribute-id"]').val(oldElem.find('input[aria-label="attribute-id"]').val() + ' Copy');
  newElem.find('input[aria-label="attribute-name"]').val(oldElem.find('input[aria-label="attribute-name"]').val());
  newElem.find('input[aria-label="attribute-email"]').val(oldElem.find('input[aria-label="attribute-email"]').val());
  newElem.find('input[aria-label="attribute-key"]').val(oldElem.find('input[aria-label="attribute-key"]').val());
  newElem.find('input[aria-label="attribute-date"]').val(oldElem.find('input[aria-label="attribute-date"]').val());
  newElem.find('input[aria-label="attribute-joined"]').val(oldElem.find('input[aria-label="attribute-joined"]').val());
  newElem.find('input[aria-label="attribute-last-seen"]').val(oldElem.find('input[aria-label="attribute-last-seen"]').val());
  var itemSelected = oldElem.find('select[aria-label="attribute-item"] option:selected').val();
  newElem.find('select[aria-label="attribute-item"] option[value="'+itemSelected+'"]').prop('selected',true); 
  newElem.find('select[aria-label="attribute-item"]').val(itemSelected); 
  if(oldElem.find('input[aria-label="attribute-anon-flag"]').is(':checked')==false){
    newElem.find('input[aria-label="attribute-anon-flag"]').prop('checked', false)
  }
  if(oldElem.find('input[aria-label="attribute-events-flag"]').is(':checked')==false){
    newElem.find('input[aria-label="attribute-events-flag"]').prop('checked', false)
  }
  // Copy Additional Attributes where present
  oldElem.find('div[aria-label="hero-custom-attributes"] .slds-grid').each(function(index) {
    var nth = $(this).index()-1;
    console.log(nth)
    var attributeName = $(this).find('.slds-size_1-of-3 input').val();
    var attributeValue = $(this).find('.slds-size_7-of-12 input').val();
    if(oldElem.find('div[aria-label="hero-custom-attributes"] .slds-grid').length>1){ 
      newElem.find('div[aria-label="hero-custom-attributes"]').find('.slds-grid:eq('+nth+')').find('.slds-size_1-of-3 input').val(attributeName);
      newElem.find('div[aria-label="hero-custom-attributes"]').find('.slds-grid:eq('+nth+')').find('.slds-size_7-of-12 input').val(attributeValue);
    } else {
      newElem.find('div[aria-label="hero-custom-attributes"]').find('.slds-grid').find('.slds-size_1-of-3 input').val(attributeName);
      newElem.find('div[aria-label="hero-custom-attributes"]').find('.slds-grid').find('.slds-size_7-of-12 input').val(attributeValue);
    }
  });
  // Copy Session Data where present 
  if(oldElem.find('div[aria-label="section-user-sessions"]').hasClass('slds-hide') == false){
    var sessions = readHeroEvents(oldElem);
    var htm = renderSessions(array["items"].data, sessions);
    newElem.find('div[aria-label="section-user-sessions"]').find('ul[role="session-row"]').html(htm);
    newElem.find('div[aria-label="section-user-sessions"]').find('ul[role="session-row"]').find('select').each(function() {
      var theValue = $(this).attr('value');
      $(this).find('option[value="' + theValue + '"]').attr('selected',true);
      $(this).find('option[data-type="' + theValue + '"]').attr('selected',true);
    });
  }
  enableButton();
  // Click to new tab
  $('#hero-'+newCount+'-tab').click();
}

function showDeleteModal(id) {
  if($('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').length > 2){
    $(id).parents('.slds-tabs_default__content').append(deleteModal);
    $('.slds-dropdown-trigger_click').removeClass('slds-is-open');
  } else {
    $(id).parents('.slds-tabs_default__content').append(deleteInvalidModal);
    $('.slds-dropdown-trigger_click').removeClass('slds-is-open');
  }
}

function deleteHeroTab(Id) {
  var id = $(Id).parents('.slds-tabs_default__content').attr('id');
  $('#'+ id).remove();
  $('.slds-tabs_default__link[aria-controls="'+id+'"]').parents('.slds-tabs_default__item').remove();
  $('#hero-profiles').find('.slds-tabs_default__nav').find('.slds-tabs_default__item').each(function(index) {
    if(!$(this).hasClass('slds-tabs_default__overflow-button')){
      var idx = index + 1;
      $(this).find('a').attr('id', 'hero-'+idx+'-tab');
      $(this).find('a').attr('aria-controls', 'hero-'+idx+'-profile');
      $(this).find('a').html('Hero '+idx+' Profile');
    }
  })
  $('#hero-profiles').find('.slds-tabs_default').find('.slds-tabs_default__content').each(function(index) {
    var idx = index + 1;
    $(this).attr('id', 'hero-'+idx+'-profile');
    $(this).attr('aria-labelledby', 'hero-'+idx+'-tab');
  })
  $('#hero-profiles').find('.slds-tabs_default__nav').find('li:nth-child(1) a').click();
  enableButton();
}

// Show hero picker dropdown
function showHeroPicker(id) {
  $(id).parents('.slds-tabs_default__content').append(heroModalTemplate);
}


// Apply hero attributes from pre-configured template
function applyHero(id) {
  var elem = $(id).parents('.slds-tabs_default__content');
  var user = array.personas.hero[parseInt(elem.find('select[role="hero-selector"]').val() - 1)];
  var seenDate = new Date(new Date() - (user.daysFirstSeen*24*60*60*1000));
  var joinDate = new Date(new Date() - (user.daysJoined*24*60*60*1000));
  var sysDate = new Date();

  // Update form values
  elem.find('input[aria-label="attribute-id"]').val(user.name);
  elem.find('input[aria-label="attribute-name"]').val(user.name);
  elem.find('input[aria-label="attribute-email"]').val(user.emailAddress);
  elem.find('input[aria-label="attribute-key"]').val(user.contactKey);
  elem.find('input[aria-label="attribute-date"]').val(seenDate.toISOString().substring(0,16));
  elem.find('input[aria-label="attribute-joined"]').val(joinDate.toISOString().substring(0,16));
  elem.find('input[aria-label="attribute-last-seen"]').val(sysDate.toISOString().substring(0,16));
  // Show form
  $(id).parents('.slds-tabs_default__content').find('div[aria-label="section-user-method"]').addClass('slds-hide');
  $(id).parents('.slds-tabs_default__content').find('div[aria-label="section-user-attributes"]').removeClass('slds-hide');
  $(id).parents('.slds-tabs_default__content').find('div[role="delete-modal"]').remove();
}

// Apply hero from uploaded file
function uploadHero(id){
  var input = document.getElementById(id);
  if(input.files.length>0){
    var reader = new FileReader();
    reader.readAsText(input.files[0], "utf8");
    reader.onloadend = function () {
      var userData = JSON.parse(reader.result);
      // Update form values
      var elem = $('#'+id).parents('.slds-tabs_default__content');
      elem.find('input[aria-label="attribute-id"]').val(userData.user.id);
      elem.find('input[aria-label="attribute-name"]').val(userData.user.attributes.fullName);
      elem.find('input[aria-label="attribute-email"]').val(userData.user.attributes.emailAddress);
      elem.find('input[aria-label="attribute-key"]').val(userData.user.attributes.sfmcContactKey);
      elem.find('input[aria-label="attribute-date"]').val(userData.user.attributes.dateFirstSeen.substring(0,16));
      elem.find('input[aria-label="attribute-joined"]').val(userData.user.attributes.dateJoined.substring(0,16));
      elem.find('input[aria-label="attribute-last-seen"]').val(userData.user.attributes.dateLastSeen.substring(0,16));
      // Update Custom Attributes variable
      var standardAttrs = ["emailAddress","sfmcContactKey","dateFirstSeen","dateJoined","dateLastSeen","fullName","pairedId"];
      let attributes = {}
      for(x in userData.user.attributes){
        if(standardAttrs.indexOf(x) == -1){
          console.log(x)
          addAttribute(('#'+id))
          elem.find('div[aria-label="hero-custom-attributes"]').children('.slds-col:last').find('.slds-size_1-of-3 input').val(x);
          elem.find('div[aria-label="hero-custom-attributes"]').children('.slds-col:last').find('.slds-size_7-of-12 input').val(userData.user.attributes[x]);
        }
      }
      // Update Session variable
      var htm = renderSessions(array["items"].data, userData.sessions);
      elem.find('div[aria-label="section-user-sessions"]').find('ul[role="session-row"]').html(htm);
      elem.find('div[aria-label="section-user-sessions"]').find('ul[role="session-row"]').find('select').each(function() {
        var theValue = $(this).attr('value');
        $(this).find('option[value="' + theValue + '"]').attr('selected',true);
        $(this).find('option[data-type="' + theValue + '"]').attr('selected',true);
      });
      // Show form
      elem.find('div[aria-label="section-user-attributes"]').find('.slds-button_brand').addClass('slds-hide');
      elem.find('div[aria-label="section-user-method"]').addClass('slds-hide');
      elem.find('div[aria-label="section-user-attributes"]').removeClass('slds-hide');
      elem.find('div[aria-label="section-user-sessions"]').removeClass('slds-hide');
      $('#hero-profiles').find('button[role="submit-events"]').removeClass('slds-hide');
      console.log(userData);
    }
  }
};

// Function to add additional hero attributes
function addAttribute(id) {
  var cnt = $('#addAttribute').html();
  var newId = '#' + $(id).parents('.slds-tabs_default__content').find('div[aria-label="hero-custom-attributes"]').append(cnt);
}

// Function to delete
function deleteAttribute(id) {
  $(id).closest('.slds-size_1-of-1').remove();
}

// Function to show/hide product selector
$(document).on('change','input[aria-label="attribute-events-flag"]',function(){
  console.log('change')
  $(this).parents('.slds-tabs_default__content').find('div[aria-label="section-user-product"]').toggleClass('slds-hide');
});


// Session Action Functions ------------------------
// Apply badge to highlight anonymous and know user sessions
function checkAnon(id) {
  var sessionDate = new Date($(id).val());
  var joinDate = new Date($(id).parents('.slds-tabs_default__content').find('input[aria-label="attribute-joined"]').val());
  if(sessionDate > joinDate){
    $(id).parents('.slds-expression__group').find('.slds-badge[title="Known User Session"]').removeClass('slds-hide');
  } else {
    $(id).parents('.slds-expression__group').find('.slds-badge[title="Known User Session"]').addClass('slds-hide');
  }
}

// Functions to bind product selectors together
function selectAction(id){
  var action = $(id).find('option:selected').val();
  var type = $(id).closest('fieldset').find('select[role="event-item-type"]').find('option:selected').attr('data-type');
  var sel = $(id).closest('fieldset').find('select[role="event-item-type"]');
  if(action == 'Update Cart' || action == 'Purchase'){ 
    $(id).closest('fieldset').find('select[role="event-item-type"]').find('option[data-type="p"]').prop('selected',true); 
    $(id).closest('fieldset').find('select[role="event-item-type"]').find('option[data-type="a"]').attr('disabled', true);
    $(id).closest('fieldset').find('select[role="event-item-type"]').find('option[data-type="b"]').attr('disabled', true); 
    if(type!= 'p'){
      selectType(sel)
    }
  }
  if(action == 'View Item'){$(id).parents('fieldset').find('select[role="event-item-type"]').find('option').attr('disabled', false); }
};

function selectType(id){
  var type = $(id).find('option:selected').attr('data-type');
  var sel = $(id).parents('div[role="event-row"]').find('select[role="event-item-selector"]');
  $(sel).find('option').each(function() {
    ($(this).attr('data-type')==type || $(this).val()==0) ? $(this).attr('disabled', false): $(this).attr('disabled', true);
  });
  $(sel).find('option:first-child').prop("selected", true);
};

function selectCustomAction(id){
  var type = $(id).find('option:selected').attr('value');
  var input = $(id).parents('div[role="event-row"]').find('input');
  var msg = (type == 'Page View') ? 'Page Name' : 'Custom Event Name'
  input.attr('placeholder', msg)
};

// Function to add additional hero session
function addSession(id) {
  $(id).parents('.slds-expression').find('ul[role="session-row"]').append(sessionTemplate);
  var prnt = $(id).parents('.slds-expression');
  prnt.find('.slds-expression__group').find('.slds-text-heading_medium').each(function(index) {
    $(this).html('Session ' + (index+1))
  });
}

// Function to delete additional session 
function deleteSession(id) {
  var prnt = $(id).parents('.slds-expression');
  $(id).parents('.slds-expression__group').remove();
  prnt.find('.slds-expression__group').find('.slds-text-heading_medium').each(function(index) {
    $(this).html('Session ' + (index+1))
  });
}

// Function to add additional session row
function addSessionRow(id) {
  $(id).parents('.slds-expression__group').find('ul').append(sessionEventTemplate);
}

function addCustomRow(id) {
  $(id).parents('.slds-expression__group').find('ul').append(sessionEventsCustom);
}

// Function to delete additional session row
function deleteSessionRow(id) {
  $(id).parents('.slds-expression__row').remove();
}


///////////////////////////////////////////////////////
/////////////     STEP 3 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function triggered on submit button
function upload() {
  gtag('event', 'Hero Builder Submit');
  buildAnonUsers()
  formatEvents();
  console.log(array);
  showHide('results', 'preview');
  apiWorker.postMessage(array);
}


// Function to create Anonymous 
function buildAnonUsers() {
  for (i = 0; i < array.users.length; i++) {
    if(array.users[i].user.attributes.hasOwnProperty('pairedId')){
      var sessions = [];
      var user = {
        "anonId": array.users[i].user.attributes.pairedId,
        "attributes":{ 
          "dateFirstSeen": array.users[i].user.attributes.dateFirstSeen, 
          "dateLastSeen": array.users[i].user.attributes.dateJoined
        }
      };
      for (j = 0; j < array.users[i].sessions.length; j++) {
        if(array.users[i].sessions[j].time < array.users[i].user.attributes.dateJoined){
          sessions.push(array.users[i].sessions[j]);
        }
      }
      array.users.push({"user": user, "sessions": sessions});
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
            "orderId": createID(16),
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
          if(event.action == 'Purchase' || event.action == 'Update Cart' || event.action == 'View Item'){
            event.action = 'View Item';
            event.itemAction = 'View Item';
            event.catalog = {};
            event.catalog[catalogType] = {"_id": itemId}
          }
          events.push(event);
        }
      }
    }
  }
  array.events = events;
}

///////////////////////////////////////////////////////
/////////////     STEP 4 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function worker process
apiWorker.onmessage = function(e) {
  console.log(e.data);
  array = e.data.response;
  if(e.data.type == 'event'){
    // Update data table
    var arrayRender = array.results.slice(array.results.length - 50,array.results.length);
    $('#upload-results').find('div[role="datatable"]').html(dataTable(sortResults(arrayRender)));
    // Update progress bar
    var completePerc = parseInt((array.results.length*100) / array.events.length);
    $('#upload-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete');
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
      download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_events.json", JSON.stringify(array.users[0]), 'download');
      download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_ucpresults.csv", Papa.unparse(array.results, {quotes: true, encoding: "utf8"}),'');
      var heroUsers = array.users.filter(row => row.user.hasOwnProperty('id') == true);
      for (i = 0; i < heroUsers.length; i++) {
        var htm = $('#template-download').html();
        var filename = heroUsers[i].user.id.replace(/ /g, '_') + "_data.json";
        $('#hero-downloads').append(htm.replace('{hero}', heroUsers[i].user.id).replace('{file}', filename).replace('{data}','data:text/csv;charset=utf8,' + encodeURI(JSON.stringify(heroUsers[i]))))
      }
      $('#hero-downloads').animate({
        right: 0
      });
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
// Load hero list and apply dropdown selection options
function loadHeroList() {
  $.get('/app/feeds/personas.csv', function(data) {
    var data = Papa.parse(data, {header: true, encoding: "utf8"}).data;
    array.personas = {};
    array.personas.hero = data;
    var select = '<option value="0" disabled="">Select One...</option>';
    for (i = 0; i < data.length; i++) {
      select += '<option value="' + data[i].index + '">' + data[i].name + '</option>';
    }
    var heroOptions = heroModal.replace('{options}', select);
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
    loadCatalogList();
    renderSessionsTemplates(array["items"].data);
    renderHeroTemplate(array.personas.hero, array["items"].data);
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

function sortByKey(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
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

//Close Modals
$(document).on('click','.slds-modal__close',function(){
  $(this).parents('div[role="delete-modal"]').remove();
});

function closeModal(id){
  $(id).parents('div[role="delete-modal"]').remove();
}

// Close Notifications
$(document).on('click','.slds-notification__close',function(){
  $(this).parents('.slds-notification').remove();
});

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
function createID(len) {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 18 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(18);
  }).substring(0,len);
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