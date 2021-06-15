// Declare Variables
var array = [];

// Onload functions
var apiWorker = new Worker('worker.js');
loadHeroList();
loadUserList();

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

// Function triggered with file upload
$('#catalog-1').click(function(){
  $('#ucp-events').val(null);
});
$('#catalog-1').change(function(){
  loadCatalogObj('catalog-1');
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
  if($('#catalog-1').val()==''){
    $('#catalog-1').parents('.slds-form-element').addClass('slds-has-error');
    $('#catalog-1').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
  // Check that all components are there before continuing
  if($('.slds-has-error').length==0) {
    array.account = $.trim($('#ucp-account').val().toLowerCase());
    array.dataset = $.trim($('#ucp-dataset').val().toLowerCase());
    localStorage.setItem('account', $.trim($('#ucp-account').val().toLowerCase()));
    localStorage.setItem('dataset', $.trim($('#ucp-dataset').val().toLowerCase()));
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        showHide('options', 'upload');
        loadCatalogList();
        renderSessionsTemplates(array["catalog-1"].data);
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
  var id = "catalog-1";
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
  var options = array["catalog-1"].data;
  var select = '<option value="0" disabled="" selected>Select One...</option>';
  for (i = 0; i < options.length; i++) {
    select += '<option data-type="' + options[i].itemType + '" data-price="' + options[i].price + '" data-category="' + options[i].category + '" value="' + options[i]._id + '">' + options[i].name + '</option>';
  }
  $('select[role="item-selector"]').html(select);
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

  // Change UI based on Hero Count
  for (i = 1; i < 6; i++) {
    if(i > parseInt(array.settings.numberHeroUsers)){
      $('#hero-0' + i + '-tab').parent('li').addClass('slds-hide');
      $('#hero-0' + i + '-tab-e').parent('li').addClass('slds-hide');
    } else {
      $('#hero-0' + i + '-tab').parent('li').removeClass('slds-hide');
      $('#hero-0' + i + '-tab-e').parent('li').removeClass('slds-hide');
    }
  }
  showHide('hero-profiles', 'options')
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
function submitHero() {
  heroValidation();
  if($('#hero-profiles').find('.slds-form-element.slds-has-error').length==0){
    array.users = [];
    buildAttributes();
    buildUsers();
    buildEvents();
    displayEvents();
    console.log(array);
    showHide('hero-events', 'hero-profiles');
  } else {
    if($('#hero-profiles').find('.slds-notify_container').length==0){
      $('#hero-profiles').prepend(toast('error', 'resource_absence', 'One of your Hero profiles is incomplete. Please see below for more details.'));
    }
  }

}

// Function to validate hero profiles
function heroValidation() {
  var arr = [];
  $('#hero-profiles').find('.slds-notify_container').remove();
  for (i = 1; i < parseInt(array.settings.numberHeroUsers) + 1; i++) {
    $('#hero-0' + i + '-tab').removeClass('slds-text-color_error');
    $('#hero-0' + i + '-profile').find('input').each(function(index) {
      $(this).parents('.slds-form-element').removeClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
      if($(this).val()=="" || $(this).val()==null) {
        $(this).parents('.slds-form-element').addClass('slds-has-error');
        $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
        $('#hero-0' + i + '-tab').addClass('slds-text-color_error');
      }
    });
    $('#hero-0' + i + '-profile').find('select').each(function(index) {
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
    if(arr.indexOf($('#hero-0' + i + '-name').val()) === -1){
      arr.push($('#hero-0' + i + '-name').val());
    } else {
      $('#hero-0' + i + '-name').parents('.slds-form-element').addClass('slds-has-error');
      $('#hero-profiles').prepend(toast('error', 'people', 'All Hero profiles must have distinct names.'));
    }
  }
}

// Function to build hero attribute array
function buildAttributes() {
  for (i = 1; i < parseInt(array.settings.numberHeroUsers) + 1; i++) {
    var heroId = '#hero-0' + i;
    var row = {
      "user": {
        "id": $(heroId + '-name').val(),
        "attributes":{
          "emailAddress": $(heroId + '-email').val(),
          "sfmcContactKey": $(heroId + '-id').val(),
          "dateFirstSeen": new Date($(heroId + '-date').val()),
          "dateJoined": new Date($(heroId + '-joined').val()),
          "dateLastSeen": new Date($(heroId + '-last-seen').val()),
          "autoGenerate": false
        }
      }
    }
    // add any product attributes specified
    if($(heroId + '-auto-generate').is(':checked')){
      row.user.attributes.autoGenerate = true;
      var pickedItems = pickItems($(heroId + '-product').val());
      row.user.attributes.items = pickedItems;
      row.user.attributes.category = pickedItems[0].category;
    }

    // add any additional attributes specified
    $(heroId + '-attributes').children('.slds-col').each(function() {
      var field = $(this).find('.slds-size_1-of-3').find('input').val();
      var value = $(this).find('.slds-size_7-of-12').find('input').val();
      row.user.attributes[field] = value;
    });
    // add flag for anonymous profile creation
    row.user.attributes["hasAnon"] = $(heroId + '-anon-flag').is(':checked') ? true : false;
    array.users.push(row);
  }
}

// Function to build hero attribute array
function buildUsers() {
  var arr = [];
  while(arr.length < array.settings.numberUsers){
    var r = array.personas.user[Math.floor(Math.random() * array.personas.user.length)];
    if(arr.indexOf(r) === -1) arr.push(r);
  }
  for (i = 0; i < arr.length; i++) {
    var seenDate = new Date(new Date() - (arr[i].daysFirstSeen*24*60*60*1000));
    var joinDate = new Date(new Date() - (arr[i].daysJoined*24*60*60*1000));
    var lastDate = new Date(new Date() - (Math.random()*24*60*60*1000));
    if(i < array.settings.numberKnown) {
      var row = {
        "user": {
          "id": arr[i].name,
          "attributes":{"emailAddress": arr[i].emailAddress,"sfmcContactKey": arr[i].contactKey,"dateFirstSeen": seenDate,"dateJoined": joinDate,"dateLastSeen": lastDate,"autoGenerate": true}
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
  arr[0] = (id != null &&  id != "") ? array["catalog-1"].data.filter(data => data._id == id)[0] : array["catalog-1"].data[Math.floor(Math.random() * array["catalog-1"].data.length)];
  var categoryData = array["catalog-1"].data.filter(data => data.category == arr[0].category);
  var categoryData = categoryData.filter(data => data._id != arr[0]._id);
  while(arr.length < 3){
    if(arr.length > categoryData.length){
      var categoryData = array["catalog-1"].data;
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
        eventTime = (sessionCount > 7) ? array.users[i].user.attributes.dateFirstSeen.getTime() + 1000 : eventTime;
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
          var viewTime = ((Math.floor(Math.random() * 55) + 5) * 1000);
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

// Function to build events array
function displayEvents() {
  for (i = 0; i < array.settings.numberHeroUsers; i++) {
    var name = '#hero-0' + (i+1);
    var id = '#hero-0' + (i+1) + '-events';
    if(array.users[i].user.attributes.autoGenerate == true){
      var htm = renderSessions(array["catalog-1"].data, array.users[i].sessions);
      $(id).find('ul').html(htm);
      $(id).find('select').each(function() {
        var theValue = $(this).attr('value');
        $(this).find('option[value="' + theValue + '"]').attr('selected',true);
        $(this).find('option[data-type="' + theValue + '"]').attr('selected',true);
      });
    }
  }
}

// Function to auto-fill profile data from persona library
function applyHero(id) {
  var user = array.personas.hero[parseInt($('#' + id + '-picker').val() - 1)];
  $('#' + id + '-name').val(user.name);
  $('#' + id + '-email').val(user.emailAddress);
  $('#' + id + '-id').val(user.contactKey);
  var seenDate = new Date(new Date() - (user.daysFirstSeen*24*60*60*1000));
  var joinDate = new Date(new Date() - (user.daysJoined*24*60*60*1000));
  var sysDate = new Date();
  $('#' + id + '-date').val(seenDate.toISOString().substring(0,16));
  $('#' + id + '-joined').val(joinDate.toISOString().substring(0,16));
  $('#' + id + '-last-seen').val(sysDate.toISOString().substring(0,16));
  $('#' + id + '-profile').find('.slds-box').animate({'backgroundColor': '#d8edff', 'borderColor':'#1589ee'},500);
  $('#' + id + '-profile').find('.slds-box').animate({'backgroundColor': '#f3f2f2', 'borderColor':'#dddbda'},1000);
}

// Function to show/hide product selector
$("[id$=-auto-generate]").change(function(){
  var id = '#' + $(this).attr('id').replace('-auto-generate','-product');
  $(id).parents('.slds-form-element').toggleClass('slds-hide');
});

function deleteAttribute(id) {
  $(id).closest('.slds-size_1-of-1').remove();
}

///////////////////////////////////////////////////////
/////////////     STEP 5 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
function preview() {
  heroEventValidation();
  if($('#hero-events').find('.slds-form-element.slds-has-error').length==0){
    updateHeroEvents();
    buildAnonUsers();
    displayUpload();
    formatEvents();
    console.log(array);
    showHide('preview', 'hero-events');
  } else {
    $('#hero-events').prepend(toast('error', 'people', 'Some of your sessions and events are missing details.'));
  }

}

// Function to validate hero events
function heroEventValidation() {
  $('#hero-events').find('.slds-notify_container').remove();
  for (i = 1; i < parseInt(array.settings.numberHeroUsers) + 1; i++) {
    $('#hero-0' + i + '-tab').removeClass('slds-text-color_error');
    $('#hero-0' + i + '-events').find('input').each(function(index) {
      $(this).parents('.slds-form-element').removeClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
      if($(this).val()=="" || $(this).val()==null) {
        $(this).parents('.slds-form-element').addClass('slds-has-error');
        $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
        $('#hero-0' + i + '-tab-e').addClass('slds-text-color_error');
      }
    });
    $('#hero-0' + i + '-events').find('select').each(function(index) {
      $(this).parents('.slds-form-element').removeClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
      if($(this).val()=="" || $(this).val()==null || $(this).val()=="0") {
        if($(this).parents('.slds-form-element').hasClass("slds-hide")==false){
          $(this).parents('.slds-form-element').addClass('slds-has-error');
          $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
          $('#hero-0' + i + '-tab-e').addClass('slds-text-color_error');
        }
      }
    });
  }
}

// Function to update Hero Events to match submitted form
function updateHeroEvents() {
  for (i = 0; i < array.settings.numberHeroUsers; i++) {
    var Id = '#hero-0' + (i+1) + '-events';
    var sessions = [];
    $(Id).find('.slds-expression__group').each(function() {
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
        var item = array["catalog-1"].data.filter(data => data._id == itemId)[0];
      } else if(sessionEvents.filter(row => row.userAction == 'Update Cart').length > 0){
        var itemId = sessionEvents.filter(row => row.userAction == 'Update Cart')[0].itemId;
        var sessionType = 'Update Cart';
        var item = array["catalog-1"].data.filter(data => data._id == itemId)[0];
      } else {
        var itemId = sessionEvents[0].itemId;
        var sessionType = 'View Item';
        var item = array["catalog-1"].data.filter(data => data._id == itemId)[0];
      }
      sessions.push({"_id": createID(), "time":eventTime.getTime(), "length": sessionLen, "item":item, "type":sessionType, "events":sessionEvents});
    });
    array.users[i].sessions = sessions;
    if(array.users[i].user.attributes.autoGenerate == false) {
      array.users[i].user.attributes.items = [];
      array.users[i].user.attributes.items.push(sessions[0].item);
    }
  }
}

// Function to create Anonymous 
function buildAnonUsers() {
  for (i = 0; i < array.settings.numberHeroUsers; i++) {
    if(array.users[i].user.attributes.hasAnon == true){
      var sessions = [];
      var anonId = createID();
      var user = {
        "anonId": anonId,
        "attributes":{ 
          "category": array.users[i].user.attributes.category,
          "items": array.users[i].user.attributes.items,
          "dateFirstSeen": array.users[i].user.attributes.dateFirstSeen, 
          "dateLastSeen": array.users[i].user.attributes.dateJoined, 
          "autoGenerate": 'anonHero'
        }
      };
      for (j = 0; j < array.users[i].sessions.length; j++) {
        if(array.users[i].sessions[j].time < array.users[i].user.attributes.dateJoined){
          sessions.push(array.users[i].sessions[j]);
        }
      }
      array.users.push({"user": user, "sessions": sessions});
      array.users[i].user.attributes.altId = anonId;
    }
  }
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
      "Total Events":totalEvents
    })
  }
  $('#upload-summary').html(dataTable(summaryData));
  array.summary = summaryData;
}

// Function to format events in to the correct evergage format
function formatEvents() {
  var events = [];
  var catalogTypes = {"a":"Article", "b":"Blog", "p":"Product"}
  for (i = 0; i < array.users.length; i++) {
    for (j = 0; j < array.users[i].sessions.length; j++) {
      var timeStamp = array.users[i].sessions[j].time;
      for (k = 0; k < array.users[i].sessions[j].events.length; k++) {
        var itemId = array.users[i].sessions[j].events[k].itemId
        var item = array["catalog-1"].data.filter(data => data._id == itemId)[0];
        var catalogType = catalogTypes[array.users[i].sessions[j].events[k].itemType];
        var page = (array.users[i].sessions[j].events[k].page === undefined) ? '' : array.users[i].sessions[j].events[k].page;
        var event = {
          "action": array.users[i].sessions[j].events[k].userAction,
          "flags": {
            "noCampaigns": true,
            "pageView": true
          },
          "source": {
            "channel": "Web",
            "local": "enGB",
            "time": timeStamp - array.users[i].sessions[j].events[k].viewTime,
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
      }
    }
  }
  array.events = events;
}

///////////////////////////////////////////////////////
/////////////     STEP 6 FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
// Function triggered on submit button
function upload() {
  gtag('event', 'Profile Builder Submit');
  showHide('results', 'preview');
  apiWorker.postMessage(array);
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
  
    download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_events.csv", Papa.unparse(array.download, {quotes: true, encoding: "utf8"}), 'download');
    download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_ucpresults.csv", Papa.unparse(array.results, {quotes: true, encoding: "utf8"}),'');
    $('#next-steps').css({height:'0'})
    $('#next-steps').removeClass('slds-hide');
    $('#next-steps').animate({height:'170'});
  }
}


///////////////////////////////////////////////////////
////////////     SESSION ACTIONS     //////////////////
///////////////////////////////////////////////////////

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
/////////////     ONLOAD FUNCTIONS     ////////////////
///////////////////////////////////////////////////////
array.personas = [];
// Load hero list and apply dropdown selection options
function loadHeroList() {
  $.get('/app/feeds/personas.csv', function(data) {
    var data = Papa.parse(data, {header: true, encoding: "utf8"}).data;
    array.personas.hero = data;
    var select = '<option value="0" disabled="">Select One...</option>';
    for (i = 0; i < data.length; i++) {
      select += '<option value="' + data[i].index + '">' + data[i].name + '</option>';
    }
    $('select[role="hero-selector"]').html(select);
  })
}
function loadUserList() {
  $.get('/app/feeds/users.csv', function(data) {
    array.personas.user = Papa.parse(data, {header: true, encoding: "utf8"}).data;
    console.log(array);
    $('#start-button').attr('disabled', false)
  })
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