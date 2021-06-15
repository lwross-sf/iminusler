const uploadTemplate = `
<div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-p-top_small slds-p-bottom_medium slds-border_bottom" role="file-upload">
  <div class="slds-col slds-size_2-of-3 slds-p-left_medium slds-form-element">
    <span class="slds-form-element__label" id="file-selector-primary-label">{Name} File</span>
    <div class="slds-form-element__control">
      <div class="slds-file-selector slds-file-selector_files">
        <div>
          <input type="file" class="slds-file-selector__input slds-assistive-text" accept=".csv" id="file-{CustomerKey}" aria-labelledby="file-selector-primary-label file-selector-secondary-label" />
          <label class="slds-file-selector__body" for="file-{CustomerKey}" id="file-selector-secondary-label">
            <span class="slds-file-selector__button slds-button slds-button_neutral">
              <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
                <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#upload"></use>
              </svg>Upload File</span>
            <span class="slds-file-selector__text slds-medium-show">Choose file</span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="slds-col slds-size_1-of-3 slds-p-top_medium slds-p-right_medium slds-align_absolute-center">
    <div class="slds-progress-bar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" role="progressbar">
      <span class="slds-progress-bar__value" style="width:0%">
        <span class="slds-assistive-text">Progress: 0%</span>
      </span>
    </div>
  </div>
</div>
`;

const tabsTemplate = `
<li class="slds-vertical-tabs__nav-item {class}" title="{Name}" role="presentation">
  <a class="slds-vertical-tabs__link" href="javascript:void(0)" role="tab" tabindex="0" aria-selected="true" aria-controls="tabs-{CustomerKey}" id="tabs-{CustomerKey}__nav">
    <span class="slds-vertical-tabs__left-icon">
      <span class="slds-icon_container slds-icon-standard-opportunity" title="{Name}">
        <svg class="slds-icon slds-icon_small" aria-hidden="true">
          <use xlink:href="/assets/icons/standard-sprite/svg/symbols.svg#data_mapping"></use>
        </svg>
      </span>
    </span>
    <span class="slds-truncate" title="{Name}">{Name}</span>
    <span class="slds-vertical-tabs__right-icon slds-hide">
      <span class="slds-icon_container slds-icon-utility-error" title="This tab has an error">
        <svg class="slds-icon slds-icon_x-small slds-icon-text-error" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>
        </svg>
        <span class="slds-assistive-text">This tab has an error</span>
      </span>
    </span>
  </a>
</li>`;

const tabsContentTemplate = `
<div class="slds-vertical-tabs__content {class}" id="tabs-{CustomerKey}" role="tabpanel" aria-labelledby="tabs-{CustomerKey}__nav">
  <div class="slds-size_1-of-1 slds-grid slds-p-vertical_small">
    <div class="slds-col slds-size_1-of-1 slds-grid slds-wrap slds-grid_vertical-align-start slds-text-align_left" aria-labelledby="Field Mappings">
      <div class="slds-col slds-size_1-of-1 slds-p-bottom_small">
        <h3 class="slds-text-heading_medium">Field Mappings</h3>
      </div>
      <div class="slds-col slds-size_1-of-1" role="mapping">
      </div>
    </div>
  </div>
</div>`;


const fieldMapTemplate = `
<article class="slds-card slds-card_boundary">
  <div class="slds-card__header slds-grid slds-p-around_none slds-m-vertical_none">
    <header class="slds-media slds-media_center slds-has-flexi-truncate">
      <div class="slds-path slds-size_1-of-1" style="background-color:#fff;">
        <div class="slds-grid slds-path__track">
          <div class="slds-grid slds-path__scroller-container">
            <div class="slds-path__scroller">
              <div class="slds-path__scroller_inner">
                <ul class="slds-path__nav" role="listbox" aria-orientation="horizontal">
                  <li class="slds-path__item slds-is-active slds-size_1-of-8" style="border-radius:0px; background-color:#0176d3;" role="presentation">
                    <div class="slds-path__link slds-text-align_left slds-top_x-small" style="height: 3rem; justify-content: left;" role="option" >
                      <span class="slds-path__title slds-text-title_caps slds-text-color_inverse" style="font-size:0.825rem;">{FieldType}</span>
                    </div>
                  </li>
                  <li class="slds-path__item slds-is-current slds-is-active slds-size_3-of-8" style="border-radius:0px;" role="presentation">
                    <div class="slds-path__link slds-text-align_left slds-top_x-small" style="height: 3rem; justify-content: left;" role="option" >
                      <span class="slds-path__title slds-text-title_caps slds-text-color_inverse" style="font-size:0.825rem;">{FieldName}</span>
                    </div>
                  </li>
                  <li class="slds-size_4-of-8" role="presentation" style="background-color:#fff; padding-right: 20px;">
                    <div class="slds-form-element slds-p-horizontal_small slds-p-vertical_x-small">
                      <div class="slds-form-element__control">
                        <div class="slds-select_container">
                          <select class="slds-select slds-text-title_caps slds-p-vertical_x-small" data-schema="{CustomerKey}" data-field="{FieldName}" data-type="{FieldType}" data-max-length="{MaxLength}" data-precision="{Precision}" data-max-scale="{Scale}" data-required="{IsRequired}" style="border:none; font-size:0.825rem;">
                            <option value="">Select…</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
  <div class="slds-card__body slds-m-vertical_none slds-hide">
    <table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered slds-table_fixed-layout" style="border-bottom:none;" role="grid" aria-label="Example table in a Card">
      <tbody>
        <tr class="slds-hint-parent">
          <td class="slds-size_1-of-12 slds-theme_shade slds-text-align_center" style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" style="color:#00396b; font-weight:bold;" title="Row">1</div>
          </td>
          <td style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" title="Row One"></div>
          </td>
        </tr>
        <tr class="slds-hint-parent">
          <td class="slds-size_1-of-12 slds-theme_shade slds-text-align_center" style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" style="color:#00396b; font-weight:bold;" title="Row">2</div>
          </td>
          <td style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" title="Row Two"></div>
          </td>
        </tr>
        <tr class="slds-hint-parent">
          <td class="slds-size_1-of-12 slds-theme_shade slds-text-align_center" style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" style="color:#00396b; font-weight:bold;" title="Row">3</div>
          </td>
          <td style="padding:0.5rem !important;" role="gridcell">
            <div class="slds-truncate" title="Row Three"></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="slds-border_top slds-text-color_destructive slds-p-around_x-small slds-hide" style="font-weight:bold;">Enter a value.</div>
  </div>
</article>`;