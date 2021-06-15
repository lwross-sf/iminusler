var journey = "welcome"
var path = []
function choice(id){
  var elem = $(id).attr('aria-controls');
  renderGuide(config[elem].guide);
  if(config[elem].content.type == 'inbox'){
    renderInbox(config[elem].content);
  } else {

  }
  // Log choices
  path.push(elem);
  console.log(path);
}

// Function to update the guide content 
function renderGuide(data){
  var buttons = '';
  for (i = 0; i < data.buttons.length; i++) {
    var button = data.buttons[i];
    buttons += '<button class="slds-button slds-button_' + button.type + ' ' + button.customClasses + '" onclick="choice(this)" aria-controls="' + button.controls + '">' + button.text + '</button>';
  };

  var htm = '<article class="slds-card slds-p-bottom_medium">';
  htm += '  <div class="slds-card__body slds-card__body_inner" role="guide-text">';
  htm += '    <h3 class="slds-text-title_caps slds-p-top_medium" style="color:#1AA0DB; font-size:0.825rem; font-weight:600;">' + data.subtitle + '</h3>';
  htm += '    <h2 class="slds-size_1-of-1 slds-text-heading_large slds-p-bottom_small" style="font-weight:400; font-size:24px;">';
  htm += '      ' + data.title + '';
  htm += '    </h2>';
  htm += '    <p>' + data.description + '</p>';
  htm += '    <div class="slds-size_1-of-1 slds-p-top_large" role="buttons">';
  htm += '      ' + buttons;
  htm += '    </div>';
  htm += '  </div>';
  htm += '</article>';
  $('#guide').html(htm);
}

function renderInbox(data){
  $.get("/app/ui/content/inbox.html", function(template) {
    var emails = '';
    var count = 0;
    for (i = 0; i < data.emails.length; i++) {
      var email = data.emails[i];
      var date = new Date() - (email.hours_offset * 60 * 60 * 1000);
      var date_text = new Date(date);
      var status = (email.read==false) ? 'email-open' : '';
      var count = (email.read==false) ? count + 1 : count;
      emails += '<li id="email' + i + '" class="list-group-item slds-p-left_small slds-p-vertical_none">';
      emails += '  <div class="slds-align_absolute-center ' + status + '">';
      emails += '    <a class="email-sender" href="#">';
      emails += '      <i class="material-icons slds-p-right_x-small">check_box_outline_blank</i>';
      emails += '      <i class="material-icons slds-p-right_x-small">star_outline</i>' + email.name;
      emails += '    </a>';
      emails += '    <a class="email-subject" href="#">';
      emails += '      <span class="slds-p-left_small">' + email.subject + '</span>';
      emails += '    </a>';
      emails += '    <a class="email-date" href="#">';
      emails += '      <span class="slds-p-left_small">' + $.datepicker.formatDate('dd-M', date_text) + '</span>';
      emails += '    </a>';
      emails += '  </div>';
      emails += '</li>';
    };
    template = template.replace('{{count}}', count);
    template = template.replace('{{emails}}', emails);
    $('#userView').html(template);
  });
}

function renderJourney(){

}