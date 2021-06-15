// Global Variables
var configObj = [];
var apiObj = [];

// Load Data
function loadPage() {
  // Retrieve Packages
  $.get("/app/tables/packages.json", function(data) {
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

  // Retrieve Sections
  $.get("/app/tables/sections.json", function(data) {
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
      html += listOptions(data[i].tables, "key");
      html += '    </div>';
      html += '  </div>';
      html += '</div>';
    }
    $('#data-tables').html(html);
  });

  // Load Stored Variables
  $('#ucp-client-id').val(localStorage.getItem('mc_client_id'));
  $('#ucp-client-secret').val(localStorage.getItem('mc_client_secret'));
  $('#ucp-mc-subdomain').val(localStorage.getItem('mc_subdomain'));
}


// Panel 1 Script ===================================================
function updateAccount(){
  formValidation('#account-settings');
  if($('#account-settings').attr('aria-invalid')=="0"){
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
    if(apiObj.config.access_token){
      $('body').prepend(toast('success', 'package_org', 'Marketing Cloud Authorised. You have ' + apiObj.config.expires_in + ' seconds before the token expires.'));
      showHide('data-models', 'account-settings');
    }
  }
}


function formValidation(id) {
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

// Function to Authorise SFMC
function mcAuth(credentials) {
  $.ajax({
    url: '/mc/api/token/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(credentials),
    cache: false,
    success: function(data) {
      if(data.status=='OK'){
        apiObj.config["access_token"] = data.response.access_token;
        apiObj.config["expires_in"] = data.response.expires_in;
        localStorage.setItem('mc_client_id', apiObj.config.credentials.client_id);
        localStorage.setItem('mc_client_secret', apiObj.config.credentials.client_secret);
        localStorage.setItem('mc_subdomain', apiObj.config.subdomain);
      } else {
        console.log("Error: " + data.response);
        $('body').prepend(toast('error', 'recurring_exception', 'Account Settings <u>invalid</u> - please check again.'));
      }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      console.log("Error: " + errorThrown);
      $('body').prepend(toast('error', 'recurring_exception', 'Account Settings <u>invalid</u> - please check again.'));
    },
    async: false
  });
}

// Panel 2 Script ===================================================
function selectModel(elem){
  var packageId = $(elem).attr('aria-label');
  var package = configObj.packages.filter(data => data.id == packageId);
  preCheck(package[0].tables);
  showHide('data-extensions', 'data-models');
}

// Pre-check tables
function preCheck(data) {
  // Pre-tick Checkboxes
  for (i = 0; i < data.length; i++) {
    $('#data-extensions').find('tr[aria-label="'+data[i].key+'"]').find('.slds-checkbox-button').addClass('slds-checkbox-button_is-checked');
    $('#data-extensions').find('tr[aria-label="'+data[i].key+'"]').find('.slds-checkbox-button').find('use').attr('xlink:href','/assets/icons/utility-sprite/svg/symbols.svg#check')
    $('#data-extensions').find('tr[aria-label="'+data[i].key+'"]').addClass('slds-is-selected');
  }
  // Expand Sections with pre-ticked Checkboxes
  $('.slds-checkbox-button_is-checked').each(function() {
    $(this).parents('.slds-summary-detail').addClass('slds-is-open');
  });
}

// Panel 3 Script ===================================================
function selectFile(){
  apiObj.tables = [];
  $('label.slds-checkbox-button_is-checked').each(function() {
    // Retrieve Table Data
    $.ajax({
      url: '/app/tables/schemas/' + $(this).find('input').val() + '.json',
      success: function(data) {
        apiObj.tables.push(data);
      },
      async: false
    });
  })
  // Progress Form
  if($('#checkbox-product__c').parents('label').hasClass("slds-checkbox-button_is-checked")){
    showHide('file-upload', 'data-extensions');
  } else {
    showHide('results', 'data-extensions');
    createTables();
  }
}


// Panel 4 Script ===================================================



// Panel 5 Script ===================================================
function createTables(){
  console.log(apiObj.tables);
  for (i = 0; i < apiObj.tables.length; i++) {
    var call = createRequest(apiObj.tables[i], 'DataExtension');
    console.log(call);
    $.ajax({
      url: '/mc/api/soap/' + apiObj.config.subdomain,
      type: 'POST',
      contentType: "text/xml; charset=\"utf-8\"",
      data: $.parseXML(call),
      dataType: "xml",
      cache: false,
      success: function(data) {
        if(data.status=='OK'){
          console.log("Success: " + JSON.stringify(data.response));
        } else {
          console.log("Error: " + data.response);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Error: " + errorThrown);
      },
      async: false
    });
  }
}



// Utility Functions ================================================
// Function to progress form
function showHide(showId, hideId) {
  $('#' + showId).removeClass('slds-hide');
  $('#' + hideId).addClass('slds-hide');
}

// Function to Sort Array
function sortAsc(array, key) {
  return array.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// Function to convert JSON schema
function createRequest(obj, type) {
  console.log('start');
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
  return soap;
}


// Function to search through data extensions
$('#search-box').keyup(function() {
  var searchTerm = $('#search-box').val().toLowerCase();
  var results = 0;
  $('article[role="options"] .slds-card__body_inner').find('table tbody tr').each(function() {
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


// Function to submit data
function submit() {
  $('.slds-spinner_container').removeClass('slds-hide');
  var tables = [];
  var authMessage = '';
  var createMessage = '';
  $('article[role="options"] .slds-card__body_inner').find('tr.slds-is-selected').each(function() {
    tables.push($(this).attr('aria-label'));
  });
  if(tables.length>0){
    $.post('/sfmc/authorize', authToken(), function(data) {
      authMessage = data;
    }).done(function() {
      if(authMessage.status=='OK'){
        $('#form').addClass('slds-hide');
        $('#results').removeClass('slds-hide');
        $('.slds-page-header__col-actions').addClass('slds-hide');
        
        for (i = 0; i < tables.length; i++) {
          var filepath = {"filepath": '/local/data/' + tables[i] + '/schema.xml'};
          $.post('/sfmc/soap/post', filepath, function(data) {
            console.log(data)
            if(data.status=='OK'){
              $('#results').find('.slds-card__body_inner ol').append('<li class="slds-setup-assistant__item">' + JSON.stringify(data) + '</li>');
            } else {
              $('#results').find('.slds-card__body_inner ol').append('<<li class="slds-setup-assistant__item">>' + JSON.stringify(data) + '</li>');
            }
          });
        }
        $('.slds-spinner_container').addClass('slds-hide');
      } else {
        $('main').prepend(toast('error', 'block_visitor', 'Authorisation Failure: ' + JSON.stringify(authMessage.response)));
        $('.slds-spinner_container').addClass('slds-hide');
      }
    });
  } else {
    $('main').prepend(toast('error', 'table_settings', 'No Data Extension(s) selected'));
    $('.slds-spinner_container').addClass('slds-hide');
  }
}

function authToken() {
  var accntDetails = {
    "credentials": {
      "grant_type": "client_credentials",
      "client_id": $('#mc_clientId').val(),
      "client_secret": $('#mc_clientSecret').val(),
      "account_id": $('#mc_mid').val()   
    },
    "subdomain": $('#mc_subdomain').val()
  }
  return accntDetails
}