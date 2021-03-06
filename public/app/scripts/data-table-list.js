function deOptions(data) {
  var key = 'CustomerKey';
  var fields = ["Name", "CustomerKey", "Description"];
  var html = '<table class="slds-table slds-table_cell-buffer slds-table_bordered">';
  html += '  <thead>';
  html += '    <tr class="slds-line-height_reset">';
  html += '      <th class="slds-size_1-of-12" scope="col">';
  html += '        <div class="slds-truncate" title=""></div>';
  html += '      </th>';
  for (k = 0; k < fields.length; k++) {
    html += '      <th class="" scope="col">';
    html += '        <div class="slds-truncate" title="'+ fields[k] + '">'+ fields[k] + '</div>';
    html += '      </th>';
  }
  html += '    </tr>';
  html += '  </thead>';
  html += '  <tbody>';
  for (j = 0; j < data.length; j++) {
    html += '    <tr class="slds-hint-parent" data-custom="' + data[j]["Customisable"] + '" aria-label="' + data[j][key] + '">';
    html += '      <td class="slds-text-align_center" role="gridcell" tabindex="0" style="padding-left:0px !important;">';
    html += '        <label class="slds-checkbox-button">';
    html += '          <input type="checkbox" class="slds-assistive-text" id="checkbox-' + data[j][key] + '" value="' + data[j][key] + '" tabindex="-1"/>';
    html += '          <span class="slds-icon_container slds-icon-utility-add slds-current-color" title="Description of icon when needed">';
    html += '            <svg class="slds-icon slds-icon_x-small" aria-hidden="true">';
    html += '              <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add"></use>';
    html += '            </svg>';
    html += '            <span class="slds-assistive-text">Add product</span>';
    html += '          </span>';
    html += '        </label>';
    html += '      </td>';
    for (k = 0; k < fields.length; k++) {
      html += '      <td data-label="'+ fields[k] + '" role="gridcell">';
      html += '        <div class="slds-truncate" title="'+ fields[k] + '">'+ data[j][fields[k]] + '</div>';
      html += '      </td>';
    }
    html += '    </tr>';
  }
  html += '  </tbody>';
  html += '</table>';
return html;
}