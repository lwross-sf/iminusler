
var sessionTemplate = "";
var sessionEventTemplate = "";
function renderSessions(products, data){
  var htm = '';
  for (j = 0; j < data.length; j++) {
    var sessionTime = new Date(data[j].time)
    var sessionOpen = (j==0) ? sessionTop : sessionTopDelete;
    var hideClass = (data[j].userStatus == 'Known')? '' : 'slds-hide';
    htm += sessionOpen.replace('{index}', j+1).replace('{hide}', hideClass).replace('{time}', sessionTime.toISOString().substring(0,16));
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

  sessionTemplate = sessionTopDelete.replace('{time}', "").replace('{hide}', "slds-hide") + sessionEvents.replace('{action}', "")
  .replace('{type}', "")
  .replace('{item}', "")
  .replace('{time}', "10")
  .replace('{typeList}', selectType)
  .replace('{itemList}', selectItem) + sessionBottom;
  sessionOneTemplate = sessionTop.replace('{time}', "").replace('{hide}', "slds-hide") + sessionEvents.replace('{action}', "")
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

function renderHeroTemplate(users, products){
  var selectHero = '<option value="0" disabled="">Select One...</option>';
  for (l = 0; l < users.length; l++) {
    selectHero += '<option value="' + users[l].index + '">' + users[l].name + '</option>';
  }

  var selectItem = '<option value="0" disabled="" selected>Select One...</option>';
  for (l = 0; l < products.length; l++) {
    selectItem += '<option data-type="' + products[l].itemType + '" data-price="' + products[l].price + '" data-category="' + products[l].category + '" value="' + products[l]._id + '">' + products[l].name + '</option>';
  }

  heroTemplate = heroScreen.replace('{heroList}', selectHero).replace('{itemList}', selectItem);
}

const sessionTop = `
<li class="slds-expression__group slds-p-horizontal_large slds-p-vertical_medium">
  <div class="slds-grid slds-size_1-of-1">
    <div class="slds-form-element slds-size_5-of-6 slds-text-heading_medium slds-p-vertical_small">Session {index}</div>
    <div class="slds-form-element slds-size_1-of-6 slds-text-align_right">
      <span class="slds-badge slds-badge_inverse {hide}" title="Known User Session">
        <span class="slds-badge__icon slds-badge__icon_left slds-badge__icon_inverse">
          <span class="slds-icon_container slds-icon-utility-identity slds-current-color" title="Description of icon when needed">
            <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#identity"></use>
            </svg>
          </span>
        </span>Known Session
      </span>
    </div>
  </div>
  <fieldset>
    <div class="slds-expression__options slds-size_1-of-1 slds-grid slds-wrap">
      <div class="slds-form-element slds-size_1-of-3">
        <label class="slds-form-element__label" for="text-input-id-1">
          <abbr class="slds-required" title="required">* </abbr>Session Timestamp
        </label>
        <div class="slds-form-element__control">
          <input onchange="checkAnon(this)" type="datetime-local" required="" class="slds-input" value="{time}"/>
        </div>
      </div>
    </div>
    <ul class="slds-p-top_medium">
`;
const sessionTopDelete = `
<li class="slds-expression__group slds-p-horizontal_large slds-p-vertical_medium">
  <div class="slds-grid slds-size_1-of-1">
    <div class="slds-form-element slds-size_5-of-6 slds-text-heading_medium slds-p-vertical_small">Session {index}</div>
    <div class="slds-form-element slds-size_1-of-6 slds-text-align_right">
      <div class="slds-form-element__control">
        <span class="slds-badge slds-badge_inverse slds-m-right_small {hide}" title="Known User Session">
          <span class="slds-badge__icon slds-badge__icon_left slds-badge__icon_inverse">
            <span class="slds-icon_container slds-icon-utility-identity slds-current-color" title="Description of icon when needed">
              <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#identity"></use>
              </svg>
            </span>
          </span>Known Session
        </span>
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
          <input onchange="checkAnon(this)" type="datetime-local" required="" class="slds-input" value="{time}"/>
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
            <select class="slds-select" role="event-action-type" value="{action}" onchange="selectAction(this)">
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
            <select class="slds-select" role="event-item-type" onchange="selectType(this)" value="{type}">
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


const heroScreen = `
<!-- Method Picker -->
<div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-box slds-theme_shade" aria-label="section-user-method">
  <div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-p-top_x-small">
    <fieldset class="slds-form-element slds-size_1-of-1 slds-p-horizontal_small">
      <legend class="slds-form-element__legend slds-form-element__label">Select a build method</legend>
      <div class="slds-form-element__control slds-size_1-of-1">
        <a onclick="showHeroPicker(this)" class="slds-visual-picker slds-visual-picker_medium" style="text-decoration:none;">
          <input type="radio" id="visual-picker-{id}-112" value="visual-picker-{id}-112" name="options" />
          <label for="visual-picker-{id}-112">
            <span class="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
              <span>
                <span class="slds-text-heading_medium">Pick a hero template</span>
              </span>
            </span>
            <span class="slds-icon_container slds-visual-picker__text-check">
              <svg class="slds-icon slds-icon-text-check slds-icon_x-small" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
              </svg>
            </span>
          </label>
        </a>
        <a onclick="showHeroUploader(this)" class="slds-visual-picker slds-visual-picker_medium" style="text-decoration:none;">
          <input type="radio" id="visual-picker-{id}-113" value="visual-picker-{id}-113" name="options" />
          <label for="visual-picker-{id}-113">
            <span class="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
              <span>
                <span class="slds-text-heading_medium">Upload a existing hero</span>
              </span>
            </span>
            <span class="slds-icon_container slds-visual-picker__text-check">
              <svg class="slds-icon slds-icon-text-check slds-icon_x-small" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
              </svg>
            </span>
          </label>
        </a>
        <a onclick="showHeroBlank(this)" class="slds-visual-picker slds-visual-picker_medium" style="text-decoration:none;">
          <input type="radio" id="visual-picker-{id}-114" value="visual-picker-{id}-114" name="options" />
          <label for="visual-picker-{id}-114">
            <span class="slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center">
              <span>
                <span class="slds-text-heading_medium">Start with a blank form</span>
              </span>
            </span>
            <span class="slds-icon_container slds-visual-picker__text-check">
              <svg class="slds-icon slds-icon-text-check slds-icon_x-small" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#check"></use>
              </svg>
            </span>
          </label>
        </a>
      </div>
    </fieldset>
  </div>
  <div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-p-horizontal_small slds-p-top_medium">
    <div class="slds-col slds-size_1-of-3 slds-grid slds-wrap slds-hide" aria-label="hero-picker-options">
      <div class="slds-col slds-size_4-of-5 slds-p-right_large">
        <div class="slds-form-element">
          <label class="slds-form-element__label" for="items">
            Pick from one of our pre-configured template
          </label>
          <div class="slds-form-element__control slds-p-top_xx-small">
            <div class="slds-select_container">
              <select class="slds-select" role="hero-selector">
                {heroList}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="slds-col slds-size_1-of-5">
        <div class="slds-form-element">
          <label class="slds-form-element__label" for="items">
            &nbsp;
          </label>
          <div class="slds-form-element__control slds-p-top_xx-small">
            <button onclick="applyHero(this)" class="slds-button slds-button_brand">Prefill</button>
          </div>
        </div>
      </div>
    </div>
    <div class="slds-col slds-size_1-of-3 slds-hide" aria-label="hero-uploader-options">
      <div class="slds-form-element slds-m-bottom--small ">
        <label class="slds-form-element__label" for="items">
          Upload your own template
        </label>
        <div class="slds-form-element__control">
          <input onchange="uploadHero(this.id)" type="file" id="hero-upload-{id}" class="slds-input" value="" style="line-height: normal; padding: 0.75rem 1rem;" accept=".txt" aria-required="true">
        </div>
      </div>
    </div>
  </div>
</div>
<!--// Method Picker -->
<!-- User Attributes -->
<div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-p-top_medium slds-hide" aria-label="section-user-attributes">
  <div class="slds-col slds-size_3-of-4">
    <h2 class="slds-text-heading_medium" style="font-size:24px;">Hero <strong>Attributes</strong>:</h2>
  </div>
  <div class="slds-col slds-size_1-of-4 slds-text-align_right">
    <div class="slds-dropdown-trigger slds-dropdown-trigger_click">
      <button class="slds-button slds-button_icon slds-button_icon-border-filled" aria-haspopup="true" title="Show More">
        <svg class="slds-button__icon" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down"></use>
        </svg>
        <span class="slds-assistive-text">Show More</span>
      </button>
      <div class="slds-dropdown slds-dropdown_right">
        <ul class="slds-dropdown__list" role="menu" aria-label="Show More">
          <li class="slds-dropdown__item" role="presentation">
            <a onclick="duplicateHeroTab(this)" role="menuitem" tabindex="0">
              <span class="slds-truncate" title="Menu Item One">
                <svg class="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" aria-hidden="true">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#copy"></use>
                </svg>
                Duplicate Hero
              </span>
            </a>
          </li>
          <li class="slds-dropdown__item" role="presentation">
            <a onclick="deleteHeroTab(this)" role="menuitem" tabindex="-1">
              <span class="slds-truncate" title="Menu Item Two">
                <svg class="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" aria-hidden="true">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
                </svg>
                Delete Hero
              </span>
            </a>
          </li>
          <li class="slds-dropdown__item" role="presentation">
            <a onclick="restartHero(this)" role="menuitem" tabindex="-1">
              <span class="slds-truncate" title="Menu Item Two">
                <svg class="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" aria-hidden="true">
                  <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#undo"></use>
                </svg>
                Restart Hero
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="slds-col slds-size_1-of-2 slds-grid slds-wrap slds-p-top_medium slds-p-right_large">
    <div class="slds-col slds-size_1-of-1">
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Displayed ID
        </label>
        <div class="slds-form-element__control">
          <input type="text" placeholder="Rachel Morris" class="slds-input" aria-label="attribute-id"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Full Name
        </label>
        <div class="slds-form-element__control">
          <input type="text" placeholder="Rachel Morris" class="slds-input" aria-label="attribute-name"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Email Address
        </label>
        <div class="slds-form-element__control">
          <input type="email" placeholder="test@test.com" class="slds-input" aria-label="attribute-email"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr> Contact Key
        </label>
        <div class="slds-form-element__control">
          <input type="text" placeholder="0050M00000EI82KQAT" class="slds-input" aria-label="attribute-key"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Feature Catalog Item
        </label>
        <div class="slds-form-element__control">
          <div class="slds-select_container">
            <select class="slds-select" role="item-selector" aria-label="attribute-item"/>
              {itemList}
            </select>
          </div>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-p-top_medium slds-p-bottom_small slds-p-left_small">
        <label class="slds-checkbox_toggle slds-grid">
          <input type="checkbox" aria-describedby="checkbox-toggle-anon" checked aria-label="attribute-anon-flag"/>
          <span id="checkbox-toggle-anon" class="slds-checkbox_faux_container" aria-live="assertive">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-checkbox_on">Enabled</span>
            <span class="slds-checkbox_off">Disabled</span>
          </span>
          <span class="slds-form-element__label slds-m-bottom_none">&emsp;Create Matching Anonymous Profile</span>
          <div class="slds-form-element__icon">
            <button class="slds-button slds-button_icon" aria-describedby="help" data-message-id="help-hero-anon-flag">
              <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
              </svg>
              <span class="slds-assistive-text">Help</span>
            </button>
          </div>
        </label>
      </div>
      <div class="slds-form-element slds-p-bottom_small slds-p-left_small">
        <label class="slds-checkbox_toggle slds-grid">
          <input type="checkbox" aria-describedby="checkbox-toggle-events" checked aria-label="attribute-events-flag"/>
          <span id="checkbox-toggle-events" class="slds-checkbox_faux_container" aria-live="assertive">
            <span class="slds-checkbox_faux"></span>
            <span class="slds-checkbox_on">Enabled</span>
            <span class="slds-checkbox_off">Disabled</span>
          </span>
          <span class="slds-form-element__label slds-m-bottom_none">&emsp;Auto-generate event stream</span>
          <div class="slds-form-element__icon">
            <button class="slds-button slds-button_icon" aria-describedby="help" data-message-id="help-hero-auto-generate">
              <svg class="slds-button__icon" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
              </svg>
              <span class="slds-assistive-text">Help</span>
            </button>
          </div>
        </label>
      </div>
    </div>
  </div>
  <div class="slds-col slds-size_1-of-2 slds-p-top_medium slds-p-left_large slds-border_left">
    <div class="slds-form slds-p-bottom_large">
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr> Date First Seen
        </label>
        <div class="slds-form-element__icon">
          <button class="slds-button slds-button_icon" data-message-id="help-hero-date">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
            </svg>
            <span class="slds-assistive-text">Help</span>
          </button>
        </div>
        <div class="slds-form-element__control">
          <input type="datetime-local" class="slds-input" aria-label="attribute-date"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Date Registered
        </label>
        <div class="slds-form-element__icon">
          <button class="slds-button slds-button_icon" data-message-id="help-hero-joined">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
            </svg>
            <span class="slds-assistive-text">Help</span>
          </button>
        </div>
        <div class="slds-form-element__control">
          <input type="datetime-local" class="slds-input" aria-label="attribute-joined"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal">
        <label class="slds-form-element__label">
          <abbr class="slds-required" title="required">* </abbr>Last Activity Date
        </label>
        <div class="slds-form-element__icon">
          <button class="slds-button slds-button_icon" data-message-id="help-hero-last-seen">
            <svg class="slds-button__icon" aria-hidden="true">
              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#info"></use>
            </svg>
            <span class="slds-assistive-text">Help</span>
          </button>
        </div>
        <div class="slds-form-element__control">
          <input type="datetime-local" class="slds-input" aria-label="attribute-last-seen"/>
        </div>
        <div class="slds-form-element__help slds-hide">Enter a value.</div>
      </div>
      <div class="slds-grid slds-wrap" aria-label="hero-custom-attributes">
        <template id="addAttribute">
          <div class="slds-col slds-size_1-of-1 slds-grid slds-form-element slds-p-top_medium">
            <div class="slds-col slds-size_1-of-3 slds-form-element slds-p-right_medium">
              <div class="slds-form-element__control">
                <input type="text" placeholder="Attribute Name" class="slds-input"/>
              </div>
              <div class="slds-form-element__help slds-hide">Please provide the Attribute Name.</div>
            </div>
            <div class="slds-col slds-size_7-of-12 slds-form-element">
              <div class="slds-form-element__control">
                <input type="text" placeholder="Attribute Value" class="slds-input" />
              </div>
              <div class="slds-form-element__help slds-hide">Please provide an Attribute Value.</div>
            </div>
            <div class="slds-col  slds-form-element slds-size_1-of-12 slds-text-align_right slds-p-right_xx-small">
              <div class="slds-form-element__control">
                <button class="slds-button slds-button_icon slds-button_icon-border-filled" title="Delete Custom Attribute" onclick="deleteAttribute(this)">
                  <svg class="slds-button__icon" aria-hidden="true">
                    <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#delete"></use>
                  </svg>
                  <span class="slds-assistive-text">Delete Custom Attribute</span>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="slds-form-element slds-p-top_large">
        <button class="slds-button slds-button_neutral" onclick="addAttribute(this);">
          <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
            <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
          </svg>Add Attribute</button>
          <div class="slds-text-body_small slds-text-color_inverse-weak slds-p-top_small">
            <i>You will first need to first create the attribute in your dataset and you will need the Attribute Name value</i>
          </div>
      </div>
      <div class="slds-form-element slds-form-element_horizontal slds-m-top_xx-large slds-text-align_right">
        <button onclick="submitHero(this)" class="slds-button slds-button_brand">Next</button>
      </div>
    </div>
  </div>
</div>
<!--// User Attributes -->
<!-- User Sessions -->
<div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-hide" aria-label="section-user-sessions">
  <div class="slds-col slds-size_1-of-1 slds-p-top_xx-large">
    <h2 class="slds-text-heading_medium" style="font-size:24px;">Hero <strong>Sessions</strong>:</h2>
  </div>
  <div class="slds-expression slds-size_1-of-1">
    <ul role="session-row"></ul>
    <div class="slds-expression__buttons">
      <button class="slds-button slds-button_neutral" onclick="addSession(this)">
        <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>
        </svg>Add Session</button>
    </div>
  </div>
</div>
<!--// User Sessions -->
`

const deleteModal = `
<div class="slds-col slds-size_1-of-1" role="delete-modal">
<section role="dialog" tabindex="-1" aria-label="Delete confirmation" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">
  <div class="slds-modal__container" style="width:400px; min-width:400px;">
    <header class="slds-modal__header">
      <button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close">
        <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>
        </svg>
        <span class="slds-assistive-text">Close</span>
      </button>
      <h2 id="modal-heading-01" class="slds-modal__title slds-hyphenate">Confirm delete</h2>
    </header>
    <div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">
      Are you sure you wish to delete this hero profile?
    </div>
    <footer class="slds-modal__footer">
      <button onclick="deleteHeroTab(this)" class="slds-button slds-button_destructive">Delete</button>
    </footer>
  </div>
</section>
<div class="slds-backdrop slds-backdrop_open"></div>
</div>
`;

const deleteInvalidModal = `
<div class="slds-col slds-size_1-of-1" role="delete-modal">
<section role="alertdialog" tabindex="0" aria-labelledby="prompt-heading-id" aria-describedby="prompt-message-wrapper" class="slds-modal slds-fade-in-open slds-modal_prompt" aria-modal="true">
    <div class="slds-modal__container" style="max-width: 25rem; min-width: 25rem; width: 25rem;">
      <header class="slds-modal__header slds-theme_error slds-theme_alert-texture">
        <h2 class="slds-text-heading_medium" style="color:white;">Action unavailable</h2>
      </header>
      <div class="slds-modal__content slds-p-around_medium" id="prompt-message-wrapper">
        <p>You must have at least one hero profile.</p>
      </div>
      <footer class="slds-modal__footer slds-theme_default">
        <button onclick="closeModal(this)" class="slds-button slds-button_neutral">Got It</button>
      </footer>
    </div>
  </section>
  <div class="slds-backdrop slds-backdrop_open"></div>
</div>
`;