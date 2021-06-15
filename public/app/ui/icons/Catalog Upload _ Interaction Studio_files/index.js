// Onload functions
var apiWorker = new Worker('worker.js');
// Declare Variables
var array = [];
// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));


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
    var checkFiles = setInterval(function() {
      if($('input[aria-busy="1"]').length==0) {
        validateCatalogs();
        showHide('validation', 'upload');
        clearInterval(checkFiles);
      }
   }, 100); // check every 100ms
  }
}

// Function triggered after screen 3
function upload() {
  showHide('results', 'validation');
  buildEvents();
  apiWorker.postMessage(array);
}
// Function triggered api upload
apiWorker.onmessage = function(e) {
  array = e.data;
  var results = [];
  console.log(array);
  if($('#catalog-1-checkbox').is(':checked')){
    $('#catalog-1-results').html(dataTable(array["catalog-1"].results));
    results = results.concat(array["catalog-1"].results);
  }
  if($('#catalog-2-checkbox').is(':checked')){
    $('#catalog-2-results').html(dataTable(array["catalog-2"].results));
    results = results.concat(array["catalog-2"].results);
  }
  if($('#catalog-3-checkbox').is(':checked')){
    $('#catalog-3-results').html(dataTable(array["catalog-3"].results));
    results = results.concat(array["catalog-3"].results);
  }
  console.log(results)
  download("is-catalog_" + array.account.split('.')[0]+ "-"+ array.dataset + ".csv",Papa.unparse(results, {quotes: true, encoding: "utf8"}));
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
  if(JSON.stringify(array[id].meta.fields) == JSON.stringify(settings.schema)){
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
  // check min category count
  if(categories.length >= settings.minCategories){
    array[id].validation.push(settings.messages.categoryCount[1]);
  } else {
    array[id].validation.push(settings.messages.categoryCount[0]); 
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
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Web", "local": "enGB" },
        "user": {"id": "bot@ukisolutions.com" },
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
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Web", "local": "enGB" },
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
        "flags": {"noCampaigns": true, "pageView": true },
        "source": {"channel": "Web", "local": "enGB" },
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
  array[catalog].data = data;
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
      var data = Papa.parse(text, {header: true, encoding: "utf8"});
      // console.log(data.meta.fields)
      // var data = data.filter(data => data.data._id != '');
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
  var element = document.getElementById("catalog-download");
  element.setAttribute('href', 'data:text/csv;charset=utf8,' + encodeURI(text));
  element.setAttribute('download', filename);
  // element.style.display = 'none';
  // document.body.appendChild(element);
  element.click();
  // document.body.removeChild(element);
}