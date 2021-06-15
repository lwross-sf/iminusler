
var sessionTemplate = "";
var sessionEventTemplate = "";
function renderSessions(products, data){
  var htm = '';
  for (j = 0; j < data.length; j++) {
    var sessionTime = new Date(data[j].time)
    var sessionOpen = (j==0) ? sessionTop : sessionTopDelete;
    htm += sessionOpen.replace('{index}', j+1).replace('{time}', sessionTime.toISOString().substring(0,16));
    for (k = 0; k < data[j].events.length; k++) {
      var selectItem = '<option value="0" disabled="" selected>Select One...</option>';
      for (l = 0; l < products.length; l++) {
        if(products[l].itemType == data[j].events[k].itemType){
          selectItem += '<option data-type="' + products[l].itemType + '" data-price="' + products[l].price + '" data-category="' + products[l].category + '" value="' + products[l]._id + '">' + products[l].name + '</option>';
        } else {
          selectItem += '<option data-type="' + products[l].itemType + '" data-price="' + products[l].price + '" data-category="' + products[l].category + '" value="' + products[l]._id + '" disabled>' + products[l].name + '</option>';
        }
      }
      var selectType = buildTypePicker(data[j].events[k].userAction, data[j].events[k].itemType)
      // apply event template
      var sessionHtm = (k==0) ? sessionEvents : sessionEventsDelete;
      htm += sessionHtm.replace('{action}', data[j].events[k].userAction)
      .replace('{type}', data[j].events[k].itemType)
      .replace('{item}', data[j].events[k].itemId)
      .replace('{time}', data[j].events[k].viewTime/1000)
      .replace('{typeList}', selectType)
      .replace('{itemList}', selectItem);
    }
    htm += sessionBottom;
  }
  return htm
}

function renderSessionsTemplates(products){
  var selectItem = '<option value="0" disabled="" selected>Select One...</option>';
  var itemType = products[0].itemType;
  for (l = 0; l < products.length; l++) {
    if(products[l].itemType == itemType){
      selectItem += '<option data-type="' + products[l].itemType + '" data-price="' + products[l].price + '" data-category="' + products[l].category + '" value="' + products[l]._id + '">' + products[l].name + '</option>';
    } else {
      selectItem += '<option data-type="' + products[l].itemType + '" data-price="' + products[l].price + '" data-category="' + products[l].category + '" value="' + products[l]._id + '" disabled>' + products[l].name + '</option>';
    }
  }
  var selectType = buildTypePicker('View Item', itemType)
  sessionEventTemplate = sessionEventsDelete.replace('{action}', "")
  .replace('{type}', "")
  .replace('{item}', "")
  .replace('{time}', "10")
  .replace('{typeList}', selectType)
  .replace('{itemList}', selectItem);

  sessionTemplate = sessionTopDelete.replace('{time}', "") + sessionEvents.replace('{action}', "")
  .replace('{type}', "")
  .replace('{item}', "")
  .replace('{time}', "10")
  .replace('{typeList}', selectType)
  .replace('{itemList}', selectItem) + sessionBottom;
  sessionOneTemplate = sessionTop.replace('{time}', "") + sessionEvents.replace('{action}', "")
  .replace('{type}', "")
  .replace('{item}', "")
  .replace('{time}', "10")
  .replace('{typeList}', selectType)
  .replace('{itemList}', selectItem) + sessionBottom;
  $('#hero-01-events').find('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
  $('#hero-02-events').find('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
  $('#hero-03-events').find('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
  $('#hero-04-events').find('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
  $('#hero-05-events').find('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
  $('ul[role="session-row"]').html(sessionOneTemplate.replace('{index}', '1'));
}

const sessionTop = `
<li class="slds-expression__group slds-p-horizontal_large slds-p-vertical_medium">
  <div class="slds-grid slds-size_1-of-1">
    <div class="slds-form-element slds-size_11-of-12 slds-text-heading_medium slds-p-vertical_small">Session {index}
    <span class="slds-icon_container slds-icon-utility-announcement slds-current-color" title="Known User Session">
      <svg class="slds-icon slds-icon-text-default" aria-hidden="true">
        <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#contact"></use>
      </svg>
      <span class="slds-assistive-text">Known User Session</span>
    </span>
    </div>
    <div class="slds-form-element slds-size_1-of-12 slds-text-align_right">
      <button class="slds-button slds-button_icon slds-button_icon-brand" title="Known User Session">
        <svg class="slds-button__icon" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#identity"></use>
        </svg>
        <span class="slds-assistive-text">Known User Session</span>
      </button>
    </div>
  </div>
  <fieldset>
    <div class="slds-expression__options slds-size_1-of-1 slds-grid slds-wrap">
      <div class="slds-form-element slds-size_1-of-3">
        <label class="slds-form-element__label" for="text-input-id-1">
          <abbr class="slds-required" title="required">* </abbr>Session Timestamp
        </label>
        <div class="slds-form-element__control">
          <input type="datetime-local" required="" class="slds-input" value="{time}"/>
        </div>
      </div>
    </div>
    <ul class="slds-p-top_medium">
`;
const sessionTopDelete = `
<li class="slds-expression__group slds-p-horizontal_large slds-p-vertical_medium">
  <div class="slds-grid slds-size_1-of-1">
    <div class="slds-form-element slds-size_11-of-12 slds-text-heading_medium slds-p-vertical_small">Session {index}</div>
    <div class="slds-form-element slds-size_1-of-12 slds-text-align_right">
      <div class="slds-form-element__control">
        <button class="slds-button slds-button_icon slds-button_icon-brand" title="Known User Session">
          <svg class="slds-button__icon" aria-hidden="true">
            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#identity"></use>
          </svg>
          <span class="slds-assistive-text">Known User Session</span>
        </button>
        <button class="slds-button slds-button_icon slds-button_icon-border-filled" title="Delete Condition" onclick="deleteSession(this)">
          <svg class="slds-button__icon" aria-hidden="true">
            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
          </svg>
          <span class="slds-assistive-text">Delete Condition 1</span>
        </button>
      </div>
    </div>
  </div>
  <fieldset>
    <div class="slds-expression__options slds-size_1-of-1 slds-grid slds-wrap">
      <div class="slds-form-element slds-size_1-of-3">
        <label class="slds-form-element__label" for="text-input-id-1">
          <abbr class="slds-required" title="required">* </abbr>Session Timestamp
        </label>
        <div class="slds-form-element__control">
          <input type="datetime-local" required="" class="slds-input" value="{time}"/>
        </div>
      </div>
    </div>
    <ul class="slds-p-top_medium">
`;
const sessionEvents = `
<li class="slds-expression__row slds-size_1-of-1">
  <fieldset>
    <div class="slds-size_1-of-1 slds-grid slds-wrap" role="event-row">
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <label class="slds-form-element__label">
          User Action
        </label>
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-action-type" value="{action}" onchange="updateAllOptions(this)">
              <option value="View Item">View Item</option>
              <option value="Update Cart">Abandoned Cart</option>
              <option value="Purchase">Purchase</option>
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <label class="slds-form-element__label" for="select-01">
          Item Type
        </label>
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-item-type" onchange="updateProductOptions(this)" value="{type}">
            {typeList}
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_5-of-12 slds-p-right_small">
        <label class="slds-form-element__label">
          Item
        </label>
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-item-selector" value="{item}">
            {itemList}
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <label class="slds-form-element__label" for="text-input-id-1">
          <abbr class="slds-required" title="required">* </abbr>View Time (s)</label>
          <div class="slds-form-element__icon">
          <button class="slds-button slds-button_icon" aria-describedby="help" data-message-id="help-event-view-time">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
            </svg>
            <span class="slds-assistive-text">Help</span>
          </button>
        </div>
        <div class="slds-form-element__control">
          <input type="number" role="event-time" placeholder="Time in seconds" required="" class="slds-input" value="{time}" min="1" max="600"/>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-12">
        <span class="slds-form-element__label">&nbsp;</span>
        <div class="slds-form-element__control">
        </div>
      </div>
    </div>
  </fieldset>
</li>
`;
const sessionEventsDelete = `
<li class="slds-expression__row slds-size_1-of-1">
  <fieldset>
    <div class="slds-size_1-of-1 slds-grid slds-wrap" role="event-row">
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-action-type" value="{action}" onchange="selectAction(this)">
              <option value="View Item">View Item</option>
              <option value="Update Cart">Abandoned Cart</option>
              <option value="Purchase">Purchase</option>
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-item-type" onchange="selectType(this)" value="{type}">
            {typeList}
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_5-of-12 slds-p-right_small">
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-item-selector" value="{item}">
            {itemList}
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <div class="slds-form-element__control">
          <input type="number" role="event-time" placeholder="Time in seconds" required="" class="slds-input" value="{time}" min="1" max="600"/>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-12">
        <div class="slds-form-element__control">
          <button class="slds-button slds-button_icon slds-button_icon-border-filled" title="Delete Condition" onclick="deleteSessionRow(this)">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
            </svg>
            <span class="slds-assistive-text">Delete Condition</span>
          </button>
        </div>
      </div>
    </div>
  </fieldset>
</li>
`;
const sessionBottom = `
    </ul>
    <div class="slds-expression__buttons">
      <button class="slds-button slds-button_neutral" onclick="addSessionRow(this)">
        <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
        </svg>Add Action
      </button>
      <button class="slds-button slds-button_neutral" onclick="addCustomRow(this)">
      <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
        <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
      </svg>Add Custom Action
    </button>
    </div>
  </fieldset>
</li>
`;

function buildTypePicker(action, itemType){
  if(action!='View Item'){
    var optionsHtml = `
      <option data-type="p" value="Product" selected="selected">Product</option>
      <option data-type="a" value="Article" disabled>Article</option>
      <option data-type="b" value="Blog" disabled>Blog</option>
    `;
  } else if(itemType=='a') {
    var optionsHtml = `
      <option data-type="p" value="Product">Product</option>
      <option data-type="a" value="Article" selected="selected">Article</option>
      <option data-type="b" value="Blog">Blog</option>
    `;
  } else if(itemType=='b') {
    var optionsHtml = `
      <option data-type="p" value="Product">Product</option>
      <option data-type="a" value="Article">Article</option>
      <option data-type="b" value="Blog" selected="selected">Blog</option>
    `;
  } else {
    var optionsHtml = `
      <option data-type="p" value="Product" selected="selected">Product</option>
      <option data-type="a" value="Article">Article</option>
      <option data-type="b" value="Blog">Blog</option>
    `;
  }
  return optionsHtml;
}

const actionView = `
  <option value="View Item">View Item</option>
  <option value="Update Cart">Abandoned Cart</option>
  <option value="Purchase" selected="selected">Purchase</option>
`;

const sessionEventsCustom = `
<li class="slds-expression__row slds-size_1-of-1">
  <fieldset>
    <div class="slds-size_1-of-1 slds-grid slds-wrap" role="event-row">
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="event-action-type" onchange="selectCustomAction(this)">
              <option value="Page View">Page View</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_7-of-12 slds-p-right_small">
        <div class="slds-form-element">
          <div class="slds-form-element__control">
            <input type="text" placeholder="Page Name" required="" role="event-item-custom" value="" class="slds-input" />
          </div>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-6 slds-p-right_small">
        <div class="slds-form-element__control">
          <input type="number" role="event-time" placeholder="Time in seconds" required="" class="slds-input" value="1" min="0" max="600"/>
        </div>
      </div>
      <div class="slds-form-element slds-size_1-of-12">
        <div class="slds-form-element__control">
          <button class="slds-button slds-button_icon slds-button_icon-border-filled" title="Delete Condition" onclick="deleteSessionRow(this)">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
            </svg>
            <span class="slds-assistive-text">Delete Condition</span>
          </button>
        </div>
      </div>
    </div>
  </fieldset>
</li>
`;