// Global Variables
var configObj = [];
var apiObj = [];

// Load Stored Variables ===================================================
$('#ucp-client-id').val(localStorage.getItem('mc_client_id'));
$('#ucp-client-secret').val(localStorage.getItem('mc_client_secret'));
$('#ucp-mc-subdomain').val(localStorage.getItem('mc_subdomain'));

///////////////////////////////////////////////////////
/////////////     ONLOAD FUNCTIONS     ////////////////
///////////////////////////////////////////////////////

// Retrieve Packages ===================================================
$.get("/app/data-model-tables/packages.json", function(data) {
  var models = "";
  var data = sortAsc(data, "order");
  configObj.packages = data;
  for (i = 0; i < data.length; i++) {
    var htm = $('#data-models-template').html();
    htm = htm.replace('{{id}}', data[i].id)
    .replace('{{icon}}', data[i].icon)
    .replace('{{name}}', data[i].name)
    .replace('{{description}}', data[i].description)
    .replace('{{iconClass}}', data[i].iconClass)
    .replace('{{badge}}', data[i].badge)
    models += htm;
  }
  $('#data-models-template').parent('div').html(models);
});

// Retrieve Sections ===================================================
$.get("/app/data-model-tables/sections.json", function(data) {
  var html = "";
  configObj.sections = data;
  for (i = 0; i < data.length; i++) {
    html += '<div class="slds-summary-detail slds-size_1-of-1 slds-p-bottom_large" aria-label="' + data[i].id + '">';
    html += '  <button class="slds-button slds-button_icon slds-m-right_x-small" aria-controls="expando-' + data[i].id + '" aria-expanded="true">';
    html += '    <svg class="slds-button__icon slds-summary-detail__action-icon" aria-hidden="true">';
    html += '      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>';
    html += '    </svg>';
    html += '  </button>';
    html += '  <div class="slds-size_1-of-1">';
    html += '    <div class="slds-summary-detail__title">';
    html += '      <h3 class="slds-text-heading_small slds-truncate">' + data[i].name + '</h3>';
    html += '    </div>';
    html += '    <div aria-hidden="false" class="slds-summary-detail__content" id="expando-' + data[i].id + '">';
    html += deOptions(data[i].tables);
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
  }
  $('#data-table-display').html(html);
});



///////////////////////////////////////////////////////
/////////////     PANEL 1 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////

// Check API Credentials ===================================================
function authorise(){
  formValidation('#auth');
  if($('#auth').attr('aria-invalid')=="0"){
    apiObj.config = {
      "credentials": {
        "grant_type": "client_credentials",
        "client_id": $.trim($('#ucp-client-id').val()),
        "client_secret": $.trim($('#ucp-client-secret').val()),
        "account_id": $.trim($('#ucp-mid').val())  
      },
      "subdomain": $.trim($('#ucp-mc-subdomain').val())
    }
    mcAuth(apiObj.config);
  }
}

// Check that all form fields are correct ==================================
function formValidation(id) {
  $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/no_access_2.svg');
  $('#validation-results').find('h2').html('');
  $('#validation-results').find('div').html('');
  $(id).attr('aria-invalid','0');
  $(id).find('input').each(function(index) {
    $(this).parents('.slds-form-element').removeClass('slds-has-error');
    $(this).parents('.slds-form-element').find('.slds-form-element__help').addClass('slds-hide');
    if($(this).val()=="" || $(this).val()==null) {
      $(this).parents('.slds-form-element').addClass('slds-has-error');
      $(this).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
      $(id).attr('aria-invalid','1');
    }
  });
}

// Function to Authorise SFMC ==============================================
function mcAuth(credentials) {
  $.ajax({
    url: '/mc/api/token/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials),
    cache: false,
    success: function(data) {
      if(data.status=='OK'){
        var systime = new Date();
        apiObj.config["access_token"] = data.response.access_token;
        apiObj.config["expires_in"] = data.response.expires_in;
        apiObj.config["expires_at"] = new Date(systime.getTime() + ((data.response.expires_in - 5)*1000));
        localStorage.setItem('mc_client_id', apiObj.config.credentials.client_id);
        localStorage.setItem('mc_client_secret', apiObj.config.credentials.client_secret);
        localStorage.setItem('mc_subdomain', apiObj.config.subdomain);
        console.log(apiObj);
        showHide('data-models', 'auth');
      } else {
        var msg = (data.response.indexOf('ENOTFOUND')>-1) ? 'MC Subdomain invalid.' : 'Account Settings <u>invalid</u> - please check again.'
        $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/unauthorised.svg');
        $('#validation-results').find('h2').html('<strong>Authorisation Failed</strong>');
        $('#validation-results').find('div').html(data.response + '<br/>' + msg);
      }
    },
    error: function(data) {
      var msg = (data.response.indexOf('ENOTFOUND')>-1) ? 'MC Subdomain invalid.' : 'Account Settings <u>invalid</u> - please check again.'
      $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/unauthorised.svg');
      $('#validation-results').find('h2').html('<strong>Authorisation Failed</strong>');
      $('#validation-results').find('div').html(data.response + '<br/>' + msg);
    },
    async: true
  });
}

///////////////////////////////////////////////////////
/////////////     PANEL 2 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
function selectModel(elem){
  var packageId = $(elem).attr('aria-label');
  var package = configObj.packages.filter(data => data.id == packageId);
  preCheck(package[0].tables);
  showHide('data-tables', 'data-models');
}

// Pre-check tables
function preCheck(data) {
  // Pre-tick Checkboxes
  for (i = 0; i < data.length; i++) {
    $('#data-tables').find('tr[aria-label="'+data[i].key+'"]').find('.slds-checkbox-button').addClass('slds-checkbox-button_is-checked');
    $('#data-tables').find('tr[aria-label="'+data[i].key+'"]').find('.slds-checkbox-button').find('use').attr('xlink:href','/assets/icons/utility-sprite/svg/symbols.svg#check')
    $('#data-tables').find('tr[aria-label="'+data[i].key+'"]').addClass('slds-is-selected');
  }
  // Expand Sections with pre-ticked Checkboxes
  $('.slds-checkbox-button_is-checked').each(function() {
    $(this).parents('.slds-summary-detail').addClass('slds-is-open');
  });
  // count checks
  countChecks();
}

function countChecks(){
  var count = $('.slds-checkbox-button_is-checked').length;
  $('#data-table-count').html(count + ' Item(s) Selected');
}

$(document).on( "click", '.slds-checkbox-button input', function() {
  countChecks()
});

///////////////////////////////////////////////////////
/////////////     PANEL 3 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
function upload(){
  apiObj.tables = [];
  $('label.slds-checkbox-button_is-checked').each(function() {
    // Retrieve Table Data
    $.ajax({
      url: '/app/data-model-tables/schemas/' + $(this).find('input').val() + '.json',
      success: function(data) {
        apiObj.tables.push(data);
      },
      async: false
    });
  })
  // Progress Form
  showHide('results', 'data-tables');
  createTables();
}

// Function to search through data extensions =========
$('#search-box').keyup(function() {
  var searchTerm = $('#search-box').val().toLowerCase();
  var results = 0;
  $('.slds-summary-detail').addClass('slds-is-open');
  $('#data-table-display').find('table tbody tr').each(function() {
    var name = $(this).find('td[data-label="Name"]').text().toLowerCase();
    var description = $(this).find('td[data-label="Description"]').text().toLowerCase();
    if(name.indexOf(searchTerm) == -1 && description.indexOf(searchTerm) == -1){
      $(this).addClass('slds-hide');
    } else {
      results += 1;
      $(this).removeClass('slds-hide');
    }
  });
})

// Function to clear data extension search =========
function clearSearch(){
  $('#data-table-display').find('table tbody tr').removeClass('slds-hide');
  $('#search-box').val('');
  $('.slds-summary-detail').removeClass('slds-is-open');
  // Expand Sections with pre-ticked Checkboxes
  $('.slds-checkbox-button_is-checked').each(function() {
    $(this).parents('.slds-summary-detail').addClass('slds-is-open');
  });
}

///////////////////////////////////////////////////////
/////////////     PANEL 4 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////



///////////////////////////////////////////////////////
/////////////     PANEL 5 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
function createTables(){
  console.log(apiObj.tables);
  var results = [];
  if(new Date() > apiObj.config.expires_at) mcAuth(apiObj.config);
  console.log(apiObj.tables.length);
  for (i = 0; i < apiObj.tables.length; i++) {
    var call = createRequest(apiObj.tables[i], 'DataExtension');
    // $.ajax({
    //   url: '/mc/api/soap/' + apiObj.config.subdomain,
    //   type: 'POST',
    //   contentType: "text/xml; charset=\"utf-8\"",
    //   data: $.parseXML(call),
    //   dataType: "xml",
    //   cache: false,
    //   success: function(res) {
    //     results.push({
    //       "Name": apiObj.tables[i].Name, 
    //       "CustomerKey": apiObj.tables[i].CustomerKey, 
    //       "# Fields": apiObj.tables[i].Fields.Field.length, 
    //       "API Status":res.status, 
    //       "API Response":(res.status=="Error") ? res.response : 'Upload successful'
    //     });
    //     $('#upload-summary').html(dataTable(summaryData));
    //   },
    //   error: function(res) {
    //     results.push({
    //       "Name": apiObj.tables[i].Name, 
    //       "CustomerKey": apiObj.tables[i].CustomerKey, 
    //       "# Fields": apiObj.tables[i].Fields.Field.length, 
    //       "API Status":'Error', 
    //       "API Response":res.response
    //     });
    //   },
    //   async: true
    // });
  }
  $('#next-steps').css({height:'0'})
  $('#next-steps').removeClass('slds-hide');
  $('#next-steps').animate({height:'170'});
}

// Function to convert JSON schema
function createRequest(obj, type) {
  var soap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  soap += '<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">\n';
  soap += '  <s:Header>\n';
  soap += '    <a:Action s:mustUnderstand="1">Create</a:Action>\n';
  soap += '    <a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID>\n';
  soap += '    <a:ReplyTo>\n';
  soap += '      <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address>\n';
  soap += '    </a:ReplyTo>\n';
  soap += '    <a:To s:mustUnderstand="1">https://' + apiObj.config.subdomain + '.soap.marketingcloudapis.com/Service.asmx</a:To>\n';
  soap += '    <fueloauth xmlns="http://exacttarget.com">' + apiObj.config.access_token + '</fueloauth>\n';
  soap += '  </s:Header>\n';
  soap += '  <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">\n';
  soap += '    <CreateRequest xmlns="http://exacttarget.com/wsdl/partnerAPI">\n';
  soap += '      <Objects xsi:type="' + type + '">\n';
  soap += '        <Client><ID>' + apiObj.config.credentials.account_id + '</ID></Client>\n';
  soap += '        ' + json2xml(obj, ' ') + '\n';
  soap += '      </Objects>\n';
  soap += '    </CreateRequest>\n';
  soap += '  </s:Body>\n';
  soap += '</s:Envelope>';
  return new XmlBeautify().beautify(soap, {indent: "  ", useSelfClosingElement: true});
}

///////////////////////////////////////////////////////
/////////////     Utility FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
// Function to progress form ==========================
function showHide(showId, hideId) {
  $('#' + showId).removeClass('slds-hide');
  $('#' + hideId).addClass('slds-hide');
}

// Function to Sort Array =============================
function sortAsc(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}


