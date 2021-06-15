function resultsList(data) {
  // {"badge":"OK", "theme":"slds-theme_error", "message":"Lorem ipsum..."}
  var html = '<ul>\n';
  for (i = 0; i < data.length; i++) {
    html += '<li><span class="slds-badge ' + data[i].theme + '">' + data[i].badge + '</span>&emsp;';
    if(data[i].theme=="slds-theme_error"){
      html += '<span class="slds-text-color_destructive">' + data[i].message + '</span></li>\n';
    } else {
      html += data[i].message + '</li>\n';
    }

  }
  html += '</ul>';
  return html;
}