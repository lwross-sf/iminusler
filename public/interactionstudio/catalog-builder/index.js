// Onload functions
var apiWorker = new Worker('worker.js');
// Declare Variables
var array = {};
// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));
$('#ucp-api-key').val(localStorage.getItem('apiKey'));
$('#ucp-api-secret').val(localStorage.getItem('apiSecret'));

///////////////////////////////////////////////////////
/////////////     STEP FUNCTIONS     //////////////////
///////////////////////////////////////////////////////
// Function triggered after screen 1
function start() {
  showHide('upload', 'welcome');
}

// Function triggered after screen 2
function validate() {
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

  if(!$('#catalog-1-checkbox').is(':checked') && !$('#catalog-2-checkbox').is(':checked') && !$('#catalog-3-checkbox').is(':checked')){
    $('#catalog-1-checkbox').parents('.slds-form-element').addClass('slds-has-error');
    $('#catalog-1-checkbox').parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }

  // Load Product Catalog
  if($('#catalog-1-checkbox').is(':checked')){
    loadCatalogObj('catalog-1');
  }
  // Load Article Catalog
  if($('#catalog-2-checkbox').is(':checked')){
    loadCatalogObj('catalog-2');
  }
  // Load Blog Catalog
  if($('#catalog-3-checkbox').is(':checked')){
    loadCatalogObj('catalog-3');
  }
  // Check that all components are there before continuing
  if($('.slds-has-error').length==0) {
    array.account = $.trim($('#ucp-account').val().toLowerCase());
    array.dataset = $.trim($('#ucp-dataset').val().toLowerCase());
    array.vertical = $.trim($('#ucp-vertical').val().toLowerCase());
    array.apiKey = $.trim($('#ucp-api-key').val());
    array.apiSecret = $.trim($('#ucp-api-secret').val());
    array.encodedData = window.btoa(array.apiKey + ':' + array.apiSecret);
    array.ids = [];
    localStorage.setItem('account', $.trim($('#ucp-account').val().toLowerCase()));
    localStorage.setItem('dataset', $.trim($('#ucp-dataset').val().toLowerCase()));
    localStorage.setItem('apiKey', $.trim($('#ucp-api-key').val()));
    localStorage.setItem('apiSecret', $.trim($('#ucp-api-secret').val()));
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        gtag('set', 'user_properties', {
          vertical: 'Education'
        });
        validateCatalogs();
        wakeAPI();
        showHide('validation', 'upload');
        clearInterval(checkFiles);
      }
   }, 100); // check every 100ms
  }
}

// Function triggered after screen 3
function upload() {
  gtag('event', 'Catalog Builder Submit');
  if($('#catalog-2-checkbox').is(':checked')){
    $('#results').find('#catalog-2-tab').trigger('click');
  } else if($('#catalog-3-checkbox').is(':checked')){
    $('#results').find('#catalog-3-tab').trigger('click');
  } else {
    $('#results').find('#catalog-1-tab').trigger('click');
  }
  showHide('results', 'validation');
  buildEvents();
  apiWorker.postMessage(array);
}
// Function triggered api upload
apiWorker.onmessage = function(e) {
  array = e.data.response;
  var expectedCount = 0;
  var results = [];
  if($('#catalog-1-checkbox').is(':checked')){
    expectedCount += array["catalog-1"].data.length;
    if(array["catalog-1"].results.length > 0){
      // Update data table
      $('#catalog-1-results').find('div[role="datatable"]').html(dataTable(array["catalog-1"].results));
      // Update progress bar
      var completePerc = parseInt((array["catalog-1"].results.length*100) / array["catalog-1"].data.length);
      $('#catalog-1-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete');
      $('#catalog-1-results').find('div[role="progressbar"]').find('.slds-assistive-text').text(completePerc + '% Complete');
      $('#catalog-1-results').find('div[role="progressbar"]').find('.slds-progress-bar').attr('aria-valuenow', completePerc);
      $('#catalog-1-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').css('width', completePerc+'%');
      // Update on complete
      if(array["catalog-1"].results.length == array["catalog-1"].data.length){
        var uploadCount = array["catalog-1"].results.filter(function(v){return v.status=='OK'}).length;
        $('#catalog-1-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete (' + uploadCount + ' of ' + array["catalog-1"].data.length + ' rows uploaded)');
        $('#catalog-1-results').find('div[role="spinner"]').addClass('slds-hide');
        $('#catalog-1-results').find('div[role="progressbar"]').addClass('slds-text-color_success');
        $('#catalog-1-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').addClass('slds-progress-bar__value_success');
        results = results.concat(array["catalog-1"].results);
      }
    }
  }
  if($('#catalog-2-checkbox').is(':checked')){
    expectedCount += array["catalog-2"].data.length;
    if(array["catalog-2"].results.length > 0){
      // Update data table
      $('#catalog-2-results').find('div[role="datatable"]').html(dataTable(array["catalog-2"].results));
      // Update progress bar
      var completePerc = parseInt((array["catalog-2"].results.length*100) / array["catalog-2"].data.length);
      $('#catalog-2-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete');
      $('#catalog-2-results').find('div[role="progressbar"]').find('.slds-assistive-text').text(completePerc + '% Complete');
      $('#catalog-2-results').find('div[role="progressbar"]').find('.slds-progress-bar').attr('aria-valuenow', completePerc);
      $('#catalog-2-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').css('width', completePerc+'%');
      // Update on complete
      if(array["catalog-2"].results.length == array["catalog-2"].data.length){
        var uploadCount = array["catalog-2"].results.filter(function(v){return v.status=='OK'}).length;
        $('#catalog-2-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete (' + uploadCount + ' of ' + array["catalog-2"].data.length + ' rows uploaded)');
        $('#catalog-2-results').find('div[role="spinner"]').addClass('slds-hide');
        $('#catalog-2-results').find('div[role="progressbar"]').addClass('slds-text-color_success');
        $('#catalog-2-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').addClass('slds-progress-bar__value_success');
        results = results.concat(array["catalog-2"].results);
      }
    }
  }
  if($('#catalog-3-checkbox').is(':checked')){
    expectedCount += array["catalog-3"].data.length;
    if(array["catalog-3"].results.length > 0){
      // Update data table
      $('#catalog-3-results').find('div[role="datatable"]').html(dataTable(array["catalog-3"].results));
      // Update progress bar
      var completePerc = parseInt((array["catalog-3"].results.length*100) / array["catalog-3"].data.length);
      $('#catalog-3-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete');
      $('#catalog-3-results').find('div[role="progressbar"]').find('.slds-assistive-text').text(completePerc + '% Complete');
      $('#catalog-3-results').find('div[role="progressbar"]').find('.slds-progress-bar').attr('aria-valuenow', completePerc);
      $('#catalog-3-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').css('width', completePerc+'%');
      // Update oncomplete
      if(array["catalog-3"].results.length == array["catalog-3"].data.length){
        var uploadCount = array["catalog-3"].results.filter(function(v){return v.status=='OK'}).length;
        $('#catalog-3-results').find('div[role="progressbar"]').find('strong').text(completePerc + '% Complete (' + uploadCount + ' of ' + array["catalog-3"].data.length + ' rows uploaded)');
        $('#catalog-3-results').find('div[role="spinner"]').addClass('slds-hide');
        $('#catalog-3-results').find('div[role="progressbar"]').addClass('slds-text-color_success');
        $('#catalog-3-results').find('div[role="progressbar"]').find('.slds-progress-bar__value').addClass('slds-progress-bar__value_success');
        results = results.concat(array["catalog-3"].results);
      }
    }
  }
  
  // Generate results
  if(results.length == expectedCount){
    console.log(array);
    array['items'] = {"data": results, "meta": {"delimiter": ",", "fields": Object.keys(results[0])}};
    sessionStorage.setItem('sessionData', JSON.stringify(array));
    download("isdb_" + array.account.split('.')[0]+ "-"+ array.dataset + "_items.csv",Papa.unparse(results, {quotes: true, encoding: "utf8"}));
    $('#next-steps').css({height:'0'})
    $('#next-steps').removeClass('slds-hide');
    $('#next-steps').animate({height:'170'});
  }
}


///////////////////////////////////////////////////////
/////////////     DATA FUNCTIONS     //////////////////
///////////////////////////////////////////////////////
function validateCatalogs() {
  // Validate Product Catalog
  if($('#catalog-1-checkbox').is(':checked')){
    validateCatalog('catalog-1', 'product');
    $('#catalog-1-validation').find('.slds-summary-detail__content').html(resultsList(array["catalog-1"].validation));
  }
  // Validate Article Catalog
  if($('#catalog-2-checkbox').is(':checked')){
    validateCatalog('catalog-2', 'article');
    $('#catalog-2-validation').find('.slds-summary-detail__content').html(resultsList(array["catalog-2"].validation));
  }
  // Validate Blog Catalog
  if($('#catalog-3-checkbox').is(':checked')){
    validateCatalog('catalog-3', 'blog');
    $('#catalog-3-validation').find('.slds-summary-detail__content').html(resultsList(array["catalog-3"].validation));
  }
  // Validate all files for duplicates
  var idOptions = sort([...new Set(array.ids.map(x => x))]);
  if(array.ids.length == idOptions.length){
    $('#file-validation').addClass('slds-hide');
  } else {
    $('#file-validation').removeClass('slds-hide');
  }
  // Validate if user is able to proceed
  if($('.slds-theme_error').length > 0) {
   $('#validation').find('.slds-button_brand').prop('disabled', true);
  } else {
    $('#validation').find('.slds-button_brand').prop('disabled', false);
  }

}

// Function to validate each catalog type based on default settings
function validateCatalog(id, type) {
  array[id].validation = [];
  var categories = [...new Set(array[id].data.map(x => x.category))];
  var settings = validationSettings["interaction studio"][type];
  // check schema matches
  if(JSON.stringify(sort(array[id].meta.fields)) == JSON.stringify(sort(settings.schema))){
    array[id].validation.push(settings.messages.schema[1]);
  } else {
    array[id].validation.push(settings.messages.schema[0]); 
  }
  // check fields count
  if(array[id].meta.fields.length > settings.schema.length){
    array[id].validation.push(settings.messages.fieldCount[0]);
  }
  // check min row count
  if(array[id].data.length >= settings.minRows){
    array[id].validation.push(settings.messages.rowCount[1]);
  } else {
    array[id].validation.push(settings.messages.rowCount[0]); 
  }
  // check for duplicates
  var idOptions = sort([...new Set(array[id].data.map(x => x._id))]);
  array.ids = array.ids.concat(idOptions);
  if(array[id].data.length == idOptions.length){
    array[id].validation.push(settings.messages.duplicates[1]);
  } else {
    array[id].validation.push(settings.messages.duplicates[0]); 
  }
  // check min category count
  if(categories.length >= settings.minCategories){
    array[id].validation.push(settings.messages.categoryCount[1]);
  } else {
    array[id].validation.push(settings.messages.categoryCount[0]); 
  }
  // check price format
  if(type == 'product'){
    var priceOptions = sort([...new Set(array[id].data.map(x => x.price))]);
    var priceOptions = priceOptions.filter(function(v){return v!==''});
    if((!isNaN(parseFloat(priceOptions[0])) && !isNaN(parseFloat(priceOptions[priceOptions.length-1])) && array[id].meta.fields.indexOf('price')>-1) || priceOptions.length ==0){
      array[id].validation.push(settings.messages.price[1]);
    } else {
      array[id].validation.push(settings.messages.price[0])
    }
    // Check listPrice
    var priceOptions = sort([...new Set(array[id].data.map(x => x.listPrice))]);
    var priceOptions = priceOptions.filter(function(v){return v!==''});
    if((!isNaN(parseFloat(priceOptions[0])) && !isNaN(parseFloat(priceOptions[priceOptions.length-1])) && array[id].meta.fields.indexOf('price')>-1) || priceOptions.length ==0){
      array[id].validation.push(settings.messages.listPrice[1]);
    } else {
      array[id].validation.push(settings.messages.listPrice[0])
    }
  }
}

// Function to validate each catalog type based on default settings
function buildEvents() {
  array.events = [];
  if($('#catalog-1-checkbox').is(':checked')){
    formatCatalog("catalog-1");
    array["catalog-1"].results = []
    for (i = 0; i < array["catalog-1"].data.length; i++) {
      array.events.push({
        "action": "Product Catalog Update", 
        "itemAction": "View Item",
        "debug": {"explanations": true },
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Demo Builder", "local": "enGB" },
        "user": {"id": "bot@ukisolutions.com"},
        "catalog": {
          "Product": array["catalog-1"].data[i]
        }
      });
    }
  }
  if($('#catalog-2-checkbox').is(':checked')){
    formatCatalog("catalog-2");
    array["catalog-2"].results = []
    for (i = 0; i < array["catalog-2"].data.length; i++) {
      array.events.push({
        "action": "Article Catalog Update", 
        "itemAction": "View Item",
        "debug": {"explanations": true },
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Demo Builder", "local": "enGB" },
        "user": {"id": "bot@ukisolutions.com" },
        "catalog": {
          "Article": array["catalog-2"].data[i]
        }
      });
    }
  }
  if($('#catalog-3-checkbox').is(':checked')){
    formatCatalog("catalog-3");
    array["catalog-3"].results = []
    for (i = 0; i < array["catalog-3"].data.length; i++) {
      array.events.push({
        "action": "Blog Catalog Update", 
        "itemAction": "View Item",
        "debug": {"explanations": true },
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Demo Builder", "local": "enGB" },
        "user": {"id": "bot@ukisolutions.com" },
        "catalog": {
          "Blog": array["catalog-3"].data[i]
        }
      });
    }
  }
  console.log(array);
}

// Format Products to Required Evergage format
function formatCatalog(catalog){
  var data = array[catalog].data
  for (i = 0; i < data.length; i++) {
    data[i].tags = new Array();
    ['itemClass', 'style', 'brand', 'gender', 'badge',	'keyword',	'author',	'contentClass'].forEach(function(e) {
      if(data[i][e]!='' && data[i][e]!=null){
        var options = data[i][e].split('|');
        options = options.filter(n => n!='');
        options.forEach(a => data[i].tags.push({ "type":"t", "tagType": properCase(e), "_id": $.trim(a), "name":$.trim(a)}));
      }
      delete data[i][e]
    })
    data[i].categories = [{"type":"c", "_id": data[i]["category"], "name":data[i]["category"]}];
  }
  array[catalog].data = data;
}

// Send Wakeup event to Evergage
function wakeAPI(){
  var wakeEvent = {
    "action": "User Welcome", 
    "debug": {"explanations": true },
    "flags": {"noCampaigns": true, "pageView": false },
    "source": {"channel": "Demo Builder", "local": "enGB" },
    "user": {"id": "bot@ukisolutions.com"},
  }
  $.ajax({
    url: '/evergage/api/' + array.account + '/' + array.dataset + '/' + array.encodedData,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(wakeEvent),
    dataType: 'json',
    success: function(res){
      console.log({"status":res.status, "statusCode":res.statusCode, "message": res.response})
    },
    async: true
  });
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

// Show/Hide File Inputs
$('.slds-checkbox-button input[aria-controls]').click(function() {
  var field = '#' + $(this).attr('id').replace('checkbox', 'field');
  var input = '#' + $(this).attr('id').replace('-checkbox', '');
  var state = $(input).attr('aria-required')=='false' ? 'true' : 'false';
  var check = '#' + $(this).attr('id').replace('checkbox', 'validation');
  var tab = '#' + $(this).attr('id').replace('checkbox', 'tab');
  var results = '#' + $(this).attr('id').replace('checkbox', 'results');

  $(field).toggleClass('slds-hide');
  $(input).attr('aria-required', state);
  $(check).toggleClass('slds-hide');
  $(tab).parent().toggleClass('slds-hide');
});

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


// Import CSV data in to an Object
function loadCatalogObj(id){
  var input = document.getElementById(id);
  if(input.files.length>0){
    $('#'+id).attr('aria-busy', 1)
    var reader = new FileReader();
    reader.readAsText(input.files[0], "utf8");
    reader.onloadend = function () {
      var text = reader.result;
      var data = Papa.parse(text, {header: true, encoding: "utf8", skipEmptyLines: true});
      data.data = data.data.filter(data => data._id != '');
      array[id] = data;
      console.log(array);
      $('#'+id).attr('aria-busy', 0)
    };
  } else {
    $('#'+id).parents('.slds-form-element').addClass('slds-has-error');
    $('#'+id).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
}

function download(filename, text) {
  // var element = document.createElement('a');
  var element = document.getElementById("download");
  element.setAttribute('href', 'data:text/csv;charset=utf8,' + encodeURI(text));
  element.setAttribute('download', filename);
  // element.style.display = 'none';
  // document.body.appendChild(element);
  element.click();
  // document.body.removeChild(element);
}

// Sort Standard Array
function sort(array) {
  return array.sort((a, b) => {
    let x = a;
    let y = b;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}