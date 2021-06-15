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
// Retrieve Data Models ===================================================
$.get("/app/data/models.json", function(data) {
  var htm = "";
  for (i = 0; i < data.length; i++) {
    htm += '<div class="slds-summary-detail slds-size_1-of-1 slds-p-bottom_large slds-is-open" aria-label="' + data[i].id + '">';
    htm += '  <button class="slds-button slds-button_icon slds-m-right_x-small" aria-controls="expando-' + data[i].id + '" aria-expanded="true">';
    htm += '    <svg class="slds-button__icon slds-summary-detail__action-icon" aria-hidden="true">';
    htm += '      <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#switch"></use>';
    htm += '    </svg>';
    htm += '  </button>';
    htm += '  <div class="slds-size_1-of-1">';
    htm += '    <div class="slds-summary-detail__title">';
    htm += '      <h3 class="slds-text-heading_medium slds-truncate">' + data[i].industry + '</h3>';
    htm += '    </div>';
    htm += '    <div aria-hidden="false" class="slds-summary-detail__content slds-grid slds-wrap" id="expando-' + data[i].id + '">';
    for (j = 0; j < data[i].models.length; j++) {
      var template = $('#data-models-template').html();
      htm += template.replace('{{id}}', data[i].models[j].id)
      .replace('{{icon}}', data[i].models[j].icon)
      .replace(/{{name}}/g, data[i].models[j].name)
      .replace('{{image}}', data[i].models[j].image)
      .replace('{{description}}', data[i].models[j].description)
      .replace('{{iconClass}}', data[i].models[j].iconClass)
      .replace('{{badge}}', data[i].models[j].badge)
    }
    htm += '    </div>';
    htm += '  </div>';
    htm += '</div>';
  }
  $('#data-models-template').parent('div').html(htm);
  configObj.models = data;
  console.log(configObj);
});



///////////////////////////////////////////////////////
/////////////     PANEL 1 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
// Function to search through data models =========
$('#search-box').keyup(function() {
  var searchTerm = $('#search-box').val().toLowerCase();
  var results = 0;
  $('.slds-summary-detail').addClass('slds-is-open');
  $('#data-models').find('.slds-col[aria-label="data-model"]').each(function() {
    var name = $(this).find('.slds-media__body h2').text().toLowerCase();
    var description = $(this).find('.slds-media__body p').text().toLowerCase();
    if(name.indexOf(searchTerm) == -1 && description.indexOf(searchTerm) == -1){
      $(this).addClass('slds-hide');
    } else {
      results += 1;
      $(this).removeClass('slds-hide');
    }
  });
  $('#data-models').find('.slds-summary-detail').each(function() {
    if($(this).find('.slds-col[aria-label="data-model"]').length == $(this).find('.slds-col.slds-hide[aria-label="data-model"]').length){
      $(this).addClass('slds-hide');
    } else {
      results += 1;
      $(this).removeClass('slds-hide');
    }
  });
})

// Function to clear data model search =========
function clearSearch(){
  $('#data-models').find('.slds-col[aria-label="data-model"]').removeClass('slds-hide');
  $('#data-models').find('.slds-summary-detail').removeClass('slds-hide');
  $('#search-box').val('');
}

// Function to select data model =========
function selectModel(elem){
  var modelId = $(elem).attr('data-model-id');
  var industryId = modelId.split('.')[0];
  var package = configObj.models.filter(data => data.id == industryId);
  var model = package[0].models.filter(data => data.id == modelId);
  configObj.model = model;
  console.log(configObj);
  configureUploads();
  showHide('file-uploads', 'data-model-picker');
}

// Function to build Panel 2 based on file uploads required =========
function configureUploads(){
  // Configure Upload Inputs
  var htm = '';
  var uploads = configObj.model[0].tables.filter(data => data.upload == 1);
  for (i = 0; i < uploads.length; i++) {
    htm += uploadTemplate.replace(/{Name}/g, uploads[i].Name).replace(/{CustomerKey}/g, uploads[i].CustomerKey);
  }
  $('#file-modal').find('.slds-modal__content').html(htm);
  $('#file-modal').find('.slds-modal__footer .slds-col:first').text('0 of ' + uploads.length + ' files uploaded');
  $('#file-modal').removeClass('slds-hide');
  $('.slds-backdrop').addClass('slds-backdrop_open');

  // Configure Tabs Display
  var tabs = '';
  var htm = '';
  for (i = 0; i < uploads.length; i++) {
    var tabClass = (i==0)? 'slds-is-active':'';
    var contentClass = (i==0)? 'slds-show':'slds-hide';
    tabs += tabsTemplate.replace(/{Name}/g, uploads[i].Name).replace(/{CustomerKey}/g, uploads[i].CustomerKey).replace(/{class}/g, tabClass);
    htm += tabsContentTemplate.replace(/{Name}/g, uploads[i].Name).replace(/{CustomerKey}/g, uploads[i].CustomerKey).replace(/{class}/g, contentClass);
  } 
  htm = '<ul class="slds-vertical-tabs__nav" role="tablist" aria-orientation="vertical">' + tabs + '</ul>' + htm;
  $('#file-uploads').find('.slds-vertical-tabs').html(htm);

  // Configure Field Mapping Display
  for (i = 0; i < uploads.length; i++) {
    var schemaUrl = uploads[i].location + uploads[i].CustomerKey + '/schema.json';
    $.get(schemaUrl, function(data) {
      var htm = "";
      var id = "#tabs-" + data.CustomerKey;
      for (j = 0; j < data.Fields.Field.length; j++) {
        htm += '<div class="slds-form-element slds-p-bottom_small">';
        htm += '  <div class="slds-box slds-size_1-of-1 slds-grid slds-wrap" data-schema="' + data.CustomerKey + '" data-field="'+ data.Fields.Field[j].Name + '">';
        htm += '    <div class="slds-size_4-of-5">'+ data.Fields.Field[j].Name + '</div>';
        htm += '    <div class="slds-size_1-of-5 slds-text-align_right slds-text-title_caps slds-text-color_inverse-weak">'+ data.Fields.Field[j].FieldType + '</div>';
        htm += '    <div class="slds-size_1-of-1 slds-hide">Drop field to match</div>';
        htm += '  </div>';
        htm += '</div>';
      }
      $(id).find('div[role="dropzones"]').html(htm);
      $(id).find('div[role="dropzones"]').find('.slds-box').droppable({
        tolerance: "pointer",
        classes: {
          "ui-droppable-active": "ui-state-active",
          "ui-droppable-hover": "slds-theme_shade"
        },
        drop: function( event, ui ) {
          var leftFix = $(this).offset().left - ui.offset.left;
          var topFix = $(this).offset().top - ui.offset.top;
          ui.draggable.animate({left: "+=" + leftFix, top: "+=" + topFix, width:$(this).css('width')},100);
          ui.draggable.addClass('color-background-success-dark');
          ui.draggable.find('.slds-size_7-of-8').text(ui.draggable.find('.slds-size_7-of-8').text() + ' -> ' + $(this).find('.slds-size_4-of-5').text());
          $(this).attr('data-column', ui.draggable.attr('data-column'));
        },
        over: function( event, ui ) {
          ui.draggable.addClass('color-background-success-dark');
        },
        out: function( event, ui ) {
          ui.draggable.removeClass('color-background-success-dark');
          $(this).attr('data-column', '');
        }
      });

    });
  } 
}


///////////////////////////////////////////////////////
/////////////     PANEL 2 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
function processUploads(){
  configObj["uploads"] = {};
  $('#file-modal').find('input').each(function(index) {
    var id = $(this).attr('id').substring(5,100);
    var reader = new FileReader();
    reader.readAsText($(this)[0].files[0], "utf8");
    reader.onloadend = function () {
      // Load Data into ConfigObj
      var text = reader.result;
      var data = Papa.parse(text, {header: true, encoding: "utf8"});
      configObj.uploads[id] = data;
      // Render Field Select Options
      var htm = `
      <div class="slds-path">
      <div class="slds-grid slds-path__track">
        <div class="slds-grid slds-path__scroller-container">
          <div class="slds-path__scroller">
            <div class="slds-path__scroller_inner">
              <ul class="slds-path__nav" role="listbox" aria-orientation="horizontal">
                <li class="slds-path__item slds-is-current slds-is-active" role="presentation">
                  <a aria-selected="true" class="slds-path__link" href="#" id="path-1" role="option" tabindex="0">
                    <span class="slds-path__stage">
                      <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                      </svg>
                      <span class="slds-assistive-text">Current Stage:</span>
                    </span>
                    <span class="slds-path__title">Contacted</span>
                  </a>
                </li>
                <li class="slds-path__item slds-is-incomplete" role="presentation">
                  <a aria-selected="false" class="slds-path__link" href="#" id="path-5" role="option" tabindex="-1">
                    <span class="slds-path__stage">
                      <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
                        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
                      </svg>
                    </span>
                    <span class="slds-path__title">Closed</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
      for (j = 0; j < data.meta.fields.length; j++) {
        htm += '<div class="slds-form-element slds-p-bottom_small">';
        htm += '  <div class="slds-box slds-size_1-of-1 slds-grid slds-wrap" data-column="'+ data.meta.fields[j] + '">';
        htm += '    <div class="slds-size_1-of-12 slds-align_absolute-center slds-text-align_right slds-text-title_caps slds-text-color_inverse-weak">';
        htm += '      <span class="slds-icon_container slds-current-color" title="Drag field to match data">';
        htm += '        <svg class="slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">';
        htm += '          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#drag_and_drop"></use>';
        htm += '        </svg>';
        htm += '        <span class="slds-assistive-text">Drag field to match data</span>';
        htm += '      </span>';
        htm += '    </div>';
        htm += '    <div class="slds-size_11-of-12">'+ data.meta.fields[j] + '</div>';
        htm += '  </div>';
        htm += '</div>';
      }
      console.log("#"+id)
      $("#tabs-"+id).find('div[role="dragables"]').html(htm);
      $("#tabs-"+id).find('div[role="dragables"]').find('.slds-box').draggable({ 
        revert: "invalid", 
        snap: 'div[role="dropzones"] .slds-box',
        start: function( event, ui ) {
          if($(this).hasClass('color-background-success-dark')){
            $(this).attr('aria-selected', "1");
            $(this).removeClass("color-background-success-dark");
          } else {
            $(this).attr('aria-selected', "1")
          }
          $(this).addClass("color-background-selection");
        },
        stop: function() {
          $(this).removeClass("color-background-selection");
          if($(this).attr('aria-selected')==1){
            $(this).addClass("color-background-success-dark");
          }
        }
      });
    };
  });

  // Hide Modal
  $('#file-modal').addClass('slds-hide');
  $('.slds-backdrop').removeClass('slds-backdrop_open');
  console.log(configObj);
}

$(document).on("change", '#file-uploads select', function() {
  var schema = $(this).attr('data-schema');
  var field = $(this).val();
  var idx = $(this).parents('.slds-form-element').index();
  var example = '<span class="slds-text-font_monospace">' + configObj.uploads[schema].data[0][field] + '</span>';
  $(this).parents('.slds-vertical-tabs__content').find('div[role="preview"]').find('td').eq(idx).find('.slds-truncate').html(example);
});

function showPreview(id){
  $('#tabs-' + id).find('div[aria-labelledby="Field Preview"]').removeClass('slds-hide');
  $('#tabs-' + id).find('div[aria-labelledby="Field Preview"]').animate({'margin-left':'-100%'},1000);
}

function hidePreview(id){
  $('#tabs-' + id).find('div[aria-labelledby="Field Preview"]').animate({'margin-left':'0%'},1000, function() {
    $('#tabs-' + id).find('div[aria-labelledby="Field Preview"]').addClass('slds-hide');
  });
}

function processData(){
  // Render Data Previews

  // Render Field Select Options

  // Change Panel
  showHide('settings', 'file-uploads');
}


///////////////////////////////////////////////////////
/////////////     PANEL 3 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
function processSettings(){

  // Change Panel
  showHide('auth', 'settings');
}


///////////////////////////////////////////////////////
/////////////     PANEL 4 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////
// Reset API Credentials Validation Results ===================================================
$(document).on( "click", '#auth input', function() {
  $('#auth').find('.slds-button_brand').prop('disabled', true);
  $('#auth').find('.slds-button_success').removeClass('slds-hide');
  $('#auth').find('.slds-button_brand').addClass('slds-hide');
  $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/no_access_2.svg');
  $('.slds-scoped-notification').remove();
  $('#auth-results').html('');
});

// Check API Credentials ===================================================
function authorise(){
  toggleSpinner('#validation-results', 1);
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
  } else {
    toggleSpinner('#validation-results', 0);
  }
}

// Check that all form fields are correct ==================================
function formValidation(id) {
  $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/no_access_2.svg');
  $('#validation-results').find('h2').html('');
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
        $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/authorised.svg');
        confirmMessage('#validation-results', 'API Credentials Valid')
        $('#auth').find('.slds-button_brand').prop('disabled', false);
        $('#auth').find('.slds-button_success').addClass('slds-hide');
        $('#auth').find('.slds-button_brand').removeClass('slds-hide');
        console.log(apiObj);
      } else {
        var msg = (data.response.indexOf('ENOTFOUND')>-1) ? 'MC Subdomain invalid.' : 'Account Settings <u>invalid</u> - please check again.'
        $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/unauthorised.svg');
        errorMessage('#validation-results', '<strong>Authorisation Failed</strong>');
        $('#auth-results').html(data.response + '<br/>' + msg);
      }
      toggleSpinner('#validation-results', 0)
    },
    error: function(data) {
      var msg = (data.response.indexOf('ENOTFOUND')>-1) ? 'MC Subdomain invalid.' : 'Account Settings <u>invalid</u> - please check again.'
      $('#validation-results').find('img').attr('src', '/app/ui/images/illustrations/unauthorised.svg');
      errorMessage('#validation-results', '<strong>Authorisation Failed</strong>');
      $('#auth-results').html(data.response + '<br/>' + msg);
      toggleSpinner('#validation-results', 0)
    },
    async: true
  });
}


// Function to Submit API requests ==============================================
function buildDataModel(){
  showHide('results', 'auth');
}





///////////////////////////////////////////////////////
/////////////     PANEL 2 FUNCTIONS     ///////////////
///////////////////////////////////////////////////////

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

// Manage File Upload Visualisations =============================
$(document).on('click', 'input[type="file"]', function() {
  $(this).val(null);
});

$(document).on('change', 'input[type="file"]', function() {
  var elem = $(this).parents('div[role="file-upload"]').find('.slds-progress-bar');
  elem.attr('aria-valuenow', '0');
  elem.find('.slds-progress-bar__value').removeClass('slds-progress-bar__value_success');
  elem.find('.slds-progress-bar__value').css('width', '0%');
  elem.find('.slds-assistive-text').text('Progress: 0%');
  var filepath = $(this).val().split('\\');
  var fname = filepath[filepath.length-1];
  $(this).parents('.slds-file-selector').find('.slds-file-selector__text').text(fname);
  // animate bar
  $(this).parents('div[role="file-upload"]').find('.slds-progress-bar__value').animate({width:'100%'}, 'slow', function(){
    elem.attr('aria-valuenow', '100');
    elem.find('.slds-progress-bar__value').addClass('slds-progress-bar__value_success');
    elem.find('.slds-assistive-text').text('Progress: 100%');
    $('#file-modal').find('.slds-modal__footer .slds-col:first').text($('#file-modal').find('.slds-progress-bar__value_success').length + ' of ' + $('#file-modal').find('.slds-progress-bar__value').length + ' files uploaded');
    if($('#file-modal').find('.slds-progress-bar__value_success').length == $('#file-modal').find('.slds-progress-bar__value').length){
      $('#file-modal').find('.slds-button_brand').prop('disabled', false);
    } else {
      $('#file-modal').find('.slds-button_brand').prop('disabled', true);
    }
  });
});


// Spinner Controls =============================
function toggleSpinner(elem, state) {
  if(state == 1) {
    var spinner = `
    <div class="slds-col slds-size_1-of-1" style="height:4rem;position:relative; z-index:99;">
      <div class="slds-spinner_container" style="top:-250px">
        <div role="status" class="slds-spinner slds-spinner_medium slds-spinner_brand">
          <span class="slds-assistive-text">Loading</span>
          <div class="slds-spinner__dot-a"></div>
          <div class="slds-spinner__dot-b"></div>
        </div>
      </div>
    </div>`
    $(elem).append(spinner);
  } else {
    $(elem).find('.slds-spinner_container').parent().remove();
  }
}

// Scoped Notification =============================
function errorMessage(elem, msg) {
  var htm = '<div class="slds-scoped-notification slds-media slds-media_center slds-theme_error slds-size_2-of-3" role="status">'
  + '  <div class="slds-media__figure">'
  + '    <span class="slds-icon_container slds-icon-utility-error" title="error">'
  + '      <svg class="slds-icon slds-icon_small" aria-hidden="true">'
  + '        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>'
  + '      </svg>'
  + '      <span class="slds-assistive-text">error</span>'
  + '    </span>'
  + '  </div>'
  + '  <div class="slds-media__body">'
  + '    <p>' + msg + '</p>'
  + '  </div>'
  + '</div>'
  $(elem).prepend(htm);
  setTimeout(function(){
    $('.slds-scoped-notification').slideUp( "slow", function() {
      $('.slds-scoped-notification').remove();
    });
  }, 5000);
}
function confirmMessage(elem, msg) {
  var htm = '<div class="slds-scoped-notification slds-media slds-media_center slds-theme_success slds-size_2-of-3" role="status">'
  + '  <div class="slds-media__figure">'
  + '    <span class="slds-icon_container slds-icon-utility-success" title="success">'
  + '      <svg class="slds-icon slds-icon_small" aria-hidden="true" style="max-height: 1.5rem; height: 90%;">'
  + '        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#success"></use>'
  + '      </svg>'
  + '      <span class="slds-assistive-text">success</span>'
  + '    </span>'
  + '  </div>'
  + '  <div class="slds-media__body">'
  + '    <p>' + msg + '</p>'
  + '  </div>'
  + '</div>';
  $(elem).prepend(htm);
  setTimeout(function(){
    $('.slds-scoped-notification').slideUp( "slow", function() {
      $('.slds-scoped-notification').remove();
    });
  }, 5000);
}