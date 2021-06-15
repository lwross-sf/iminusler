function sendRequests(request, numRequests) {
  if (request && numRequests) {
    request[".item"] = JSON.stringify(request[".item"]);
    if (request.action == "Purchase") {
      request[".order"] = JSON.stringify(request[".order"]);
      sendRequest(request);
    } else {
      numRequests = numRequests > 20 ? 20 : numRequests;
      for (var i = 0; i < numRequests; i++) {
        sendRequest(request);
      }
    }
  }
}

function sendRequest(request) {
  var baseUrl = "https://" + $("#ucp-account").val() + ".evergage.com";
  var egUrl = "";
  if (request.action == "View Item" || request.action == "Purchase" || request.action == "View Tag" || request.action == "View Category") {
    egUrl = baseUrl + "/twreceiver";
  } else if (request.action == "View Time") {
    console.log(request);
    egUrl = baseUrl + "/pr";
  }

  // need to split full _ak on "." assuming user enters their LA account like lross1234567.australia-3
  // the base url for this would be https://lross1234567.australia-3.evergage.com but the _ak param to use needs to be lross1234567
  request._ak = request._ak.split(".")[0];

  if (egUrl && request) {
    $.ajax({
      url: egUrl,
      data: request,
      cache: false,
      success: function() {
        console.log("Sent Request");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("Status: " + textStatus);
        console.log("Error: " + errorThrown);
      },
      async: false
    });
  }
}

function validateInputs(inputs, inputObj) {
  var isValid = true;
  var invalidInputsArr = [];
  var actionType = inputs["ucp-action"];
  for (var i in inputs) {
    if (i == "ucp-action-num") {
      if (actionType != "Purchase") {
        if (!validateNumber(inputs[i])) {
          invalidInputsArr.push(i);
          $('body').prepend(toast('error', 'number_input', 'Please enter only numbers into the Action Num field'));
          isValid = false;
        }
      } else {
        if (!validatePurchaseNumber(inputs[i])) {
          invalidInputsArr.push(i);
          $('body').prepend(toast('error', 'number_input', 'Please check format of Purchase Number'));
          isValid = false;
        }
      }
    } else if (i == "ucp-action-datetime" && inputs[i] != '') {
      if (!validateDate(inputs[i])) {
        invalidInputsArr.push(i);
        $('body').prepend(toast('error', 'date_input', 'Invalid date format'));
        displayFooterMessage("userCatalogActionsFooter", "<span style='color: red;'>Invalid date format</span>");
        isValid = false;
      }
    } else if (!inputs[i] && i != "ucp-action-datetime" && i != "ucp-action-attributes") {
      invalidInputsArr.push(i);
      $('body').prepend(toast('error', 'button_choice', 'Please enter data in all fields'));
      isValid = false;
    }
  }
  if (inputs.length < 1) {
    $('body').prepend(toast('error', 'database', 'No data input'));
    isValid = false;
  }
  if ($('#ucp-user-id').val() == '') {
    $('body').prepend(toast('error', 'block_visitor', 'Please enter a User ID'));
    $('#ucp-user-id').closest(".slds-form-element").addClass("slds-has-error");
    isValid = false;
  }
  if (!validateDemoEnvironment()) {
    $('body').prepend(toast('error', 'user_role', 'Please enter data into Demo Environment'));
    isValid = false;
  }


  if (isValid) {
    clearFooterMessage('userCatalogActionsFooter');
    return true;
  } else {
    inputObj.each(function(r, row) {
      if (invalidInputsArr.includes($(row).attr("id"))) {
        $(row).closest(".slds-form-element").addClass("slds-has-error");
      }
    });
    return false;
  }

}

function validateCatalogDimensionInputs(inputs) {
  var isValid = true;
  $('.slds-form-element').removeClass('slds-has-error');
  if ($('#ucp-tag-type').val() == '') {
    $('#ucp-tag-type').closest(".slds-form-element").addClass("slds-has-error");
    $('body').prepend(toast('error', 'button_choice', 'Please enter data in all fields'));
    isValid = false;
  }
  if ($('#ucp-tag-ids').val() == '') {
    $('#ucp-tag-ids').closest(".slds-form-element").addClass("slds-has-error");
    $('body').prepend(toast('error', 'button_choice', 'Please enter data in all fields'));
    isValid = false;
  }
  if (inputs.length < 1) {
    $('body').prepend(toast('error', 'database', 'No data input'));
    isValid = false;
  }
  if (!validateDemoEnvironment()) {
    $('body').prepend(toast('error', 'user_role', 'Please enter data into Demo Environment'));
    isValid = false;
  }
  clearFooterMessage('catalogDimensionSetupFooter');
  return isValid;
}

function validateDemoEnvironment() {
  var isValid = true;
  if ($('#ucp-account').val() == '') {
    $('#ucp-account').closest(".slds-form-element").addClass("slds-has-error");
    isValid = false;
  }
  if ($('#ucp-dataset').val() == '') {
    $('#ucp-dataset').closest(".slds-form-element").addClass("slds-has-error");
    isValid = false;
  }
  return isValid;
}

function validateDate(input) {
  //technically this would allow a 30 Feb date, but that gets treated as a March date with no errors
  return /^(3[01]|0[1-9]|[12][0-9]) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) [2]\d{3} (2[0-4]|1[0-9]|0[0-9]):([0-5][0-9]):([0-5][0-9])$/.test(input);
}

function validateNumber(input) {
  return /^[0-9]+$/.test(input);
}

function validatePurchaseNumber(input) {
  var purchaseNumberArr = input.split(":");
  if (purchaseNumberArr.length != 2 || !validateNumber(purchaseNumberArr[0]) || !/^([1-9][0-9]+|[1-9])(.[0-9][0-9])?$/.test(purchaseNumberArr[1])) {
    return false;
  } else {
    return true;
  }
}

function validateUserCatalogActionsAllInputs() {
  var isValid = true;
  $('.slds-form-element').removeClass('slds-has-error');
  var iterate = $("#ucp-form .ucp-user-row").each(function(r, row) {
    var inputs = $(row).find("input, select");
    var inputValues = {};
    inputs.each(function(i, input) {
      inputValues[$(input).attr("name")] = $(input).val();
    });
    if (!validateInputs(inputValues, inputs)) {
      isValid = false;
      return isValid;
    }
  });
  if (isValid) {
    $('.slds-form-element').removeClass('slds-has-error');
  }
  return isValid;
}

function writeError(e) {
  $("#ucp-error").html(e);
}

function displayFooterMessage(zone, message) {
  $("#" + zone).html(message);
  $("#" + zone).removeClass("slds-hide");
}

function clearFooterMessage(zone) {
  $("#" + zone).html("");
  $("#" + zone).addClass("slds-hide");
}

function submitForm() {
  return new Promise(
    function(resolve, reject) {
      window.setTimeout(function() {
        var isValid = true;
        var totalGroupPurchaseValue = 0.0;
        var itemStr = '',
          orderStr = '';

        var countTotalPurchaseItems = 0,
          purchaseRowCounter = 0;
        var purchaseDateTime = '';
        var prevPurchaseDateTime = '';
        setLocalStorage('account', $('#ucp-account').val());
        setLocalStorage('dataset', $('#ucp-dataset').val());
        setLocalStorage('user-id', $('#ucp-user-id').val());
        setLocalStorage('user-anon', $(".slds-checkbox_on").css("display") == 'none');

        if ($('#ucp-form .ucp-user-row').length == 0) {
          isValid = false;
        }
        //count how many Catalog Purchase rows there are - useful in building up the 2D array further down
        var countOrders = $('#ucp-form .ucp-user-catalog-actions-row').each(function(r, row) {
          var inputs = $(row).find("input, select");
          inputs.each(function(i, input) {
            if ($(input).attr("name") == 'ucp-action' && $(input).val() == 'Purchase') {
              countTotalPurchaseItems++
            }
          });
        });

        var iterate = $("#ucp-form .ucp-user-actions-row").each(function(r, row) {
          var inputs = $(row).find("input, select");
          var inputValues = {};
          inputs.each(function(i, input) {
            inputValues[$(input).attr("name")] = $(input).val();
          });

          // Here is the API documentation: https://developer.evergage.com/api/event

          // start to build up the main object for the API payload
          var payload = {
            "action": inputValues["ucp-action-id"]
          };

          // Set anonymous vs. known
          var anon = $(".slds-checkbox_on").css("display") == 'none';
          payload.user = (anon ? {
            "anonId": $("#ucp-user-id").val()
          } : {
            "id": $("#ucp-user-id").val()
          });

          if (inputValues["ucp-action-attributes"]) {
            // start to build up the attributes object for the API payload
            var attributes = {};

            var attributePairs = inputValues["ucp-action-attributes"].split(";");

            attributePairs.forEach(function(element) {
              //console.log(element);
              if (element) {
                var attribute = element.split(":")
                var key = attribute[0];
                var value = attribute[1];
                attributes[key] = value;

              }
            });

            payload.user.attributes = attributes;
          }
          // Set some hard coded elements
          payload.flags = {
            "pageview": true
          };
          payload.source = {
            "channel": "Web",
            "local": "enUS"
          };

          // Check if date exists

          if (inputValues["ucp-action-datetime"] != '') {
            var dateMilliseconds = new Date(inputValues["ucp-action-datetime"]).getTime();
            if (dateMilliseconds) {
              payload.source.time = dateMilliseconds;
            }
          }

          requestUrl = "https://" + $("#ucp-account").val() + ".evergage.com/api2/event/" + $("#ucp-dataset").val();

          var requestSettings = {
            "url": requestUrl,
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify(payload),
          };

          $.ajax(requestSettings).done(function(response) {
            console.log(JSON.stringify(payload));
            console.log(response);
          });
        });

        var iterate = $("#ucp-form .ucp-user-catalog-actions-row").each(function(r, row) {
          var inputs = $(row).find("input, select");
          var inputValues = {};
          inputs.each(function(i, input) {
            inputValues[$(input).attr("name")] = $(input).val();
          });
          if (validateInputs(inputValues)) {
            if (inputValues["ucp-action"] != "Purchase" && inputValues["ucp-action"] != "View Category") {
              // Common request parameters
              var ucpParams = {
                _ak: $("#ucp-account").val(),
                _ds: $("#ucp-dataset").val(),
                ".item": {
                  "_id": inputValues["ucp-item-id"],
                  "type": inputValues["ucp-item-type"]
                },
                action: inputValues["ucp-action"]
              }

              // View Time parameters
              if (ucpParams["action"] == "View Time") {
                ucpParams[".top"] = "59999";
              }

              // Check if date exists
              if (inputValues["ucp-action-datetime"] != '') {
                var dateMilliseconds = new Date(inputValues["ucp-action-datetime"]).getTime();
                if (dateMilliseconds) {
                  ucpParams["_time"] = dateMilliseconds;
                }
              }

              // Set anonymous vs. known
              var anon = $(".slds-checkbox_on").css("display") == 'none';
              if (anon) {
                ucpParams[".anonId"] = $("#ucp-user-id").val();
                ucpParams["_anon"] = "true";
              } else {
                ucpParams["userId"] = $("#ucp-user-id").val();
              }
              console.log(ucpParams);
              sendRequests(ucpParams, parseInt(inputValues["ucp-action-num"]));
            } else if (inputValues["ucp-action"] == "View Category") {
              var inputs = $(row).find("input, select");
              var inputValues = {};
              inputs.each(function(i, input) {
                inputValues[$(input).attr("name")] = $(input).val();
              });

              // start to build up the main object for the API payload
              //NOTE: although it's a View Category action, the "action" here MUST be "View Item" in order to have the Category view appear in the UCP history on the Overview tab, in the bottom right. If you make this View Category instead, then it won't appear... but it will show as a View Category on the Event Stream, rather than View Item
              var payload = {
                "action": "View Item"
              };
              payload[".item"] = {
                "_id": inputValues["ucp-item-id"],
                "type": "c"
              };
              payload.catalog = {
                "Category": {
                  "_id": inputValues["ucp-item-id"]
                }
              };
              payload[".category"] = {
                "_id": inputValues["ucp-item-id"],
                "type": "c"
              };

              // Set anonymous vs. known
              var anon = $(".slds-checkbox_on").css("display") == 'none';
              payload.user = (anon ? {
                "anonId": $("#ucp-user-id").val()
              } : {
                "id": $("#ucp-user-id").val()
              });

              // Set some hard coded elements
              payload.flags = {
                "pageview": true
              };
              payload.source = {
                "channel": "Web",
                "local": "enUS"
              };

              // Check if date exists
              if (inputValues["ucp-action-datetime"] != '') {
                var dateMilliseconds = new Date(inputValues["ucp-action-datetime"]).getTime();
                if (dateMilliseconds) {
                  payload.source.time = dateMilliseconds;
                }
              }

              requestUrl = "https://" + $("#ucp-account").val() + ".evergage.com/api2/event/" + $("#ucp-dataset").val();

              var requestSettings = {
                "url": requestUrl,
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json"
                },
                "data": JSON.stringify(payload),
              };

              $.ajax(requestSettings).done(function(response) {
                console.log(JSON.stringify(payload));
                console.log(response);
              });
            } else if (inputValues["ucp-action"] == "Purchase") {
              //Purchase request that supports multiple items - don't send request, just loop to store inputs, checking Datetime - when it's different, then sendRequest... or do that later?

              // Keep track of current purchase row, so we can compare it to the Totals calculated above
              purchaseRowCounter++;

              var ucpParams = {
                _ak: $("#ucp-account").val(),
                _ds: $("#ucp-dataset").val(),
                action: inputValues["ucp-action"]
              }
              // Set anonymous vs. known
              var anon = $(".slds-checkbox_on").css("display") == 'none';
              if (anon) {
                ucpParams[".anonId"] = $("#ucp-user-id").val();
                ucpParams["_anon"] = "true";
              } else {
                ucpParams["userId"] = $("#ucp-user-id").val();
              }
              var quantity = 1;
              var price = 0;
              var itemId = inputValues["ucp-item-id"];
              var numberArr = inputValues["ucp-action-num"].split(":");
              quantity = numberArr[0];
              price = numberArr[1];



              // Purchase parameters
              // DEBUG: working example of structure:
              //ucpParams[".item"] = [{ "_id": inputValues["ucp-item-id"], "type": inputValues["ucp-item-type"]},{ "_id": "Go-To Face Hero", "type": inputValues["ucp-item-type"]}]
              //ucpParams[".order"] = {"totalValue": 226.00, "lineItems": [{"quantity": 2, "item": {"type": "p", "_id": "Kiehl's Avocado Nourishing Hydration Mask", "price":68.00}},{"quantity": 2, "item": {"type": "p", "_id": "Go-To Face Hero", "price":45.00}}]};


              // Check if date exists
              var dateMilliseconds;
              if (inputValues["ucp-action-datetime"] != '') {
                dateMilliseconds = new Date(inputValues["ucp-action-datetime"]).getTime();
                if (dateMilliseconds) {
                  //ucpParams["_time"] = dateMilliseconds;
                  purchaseDateTime = dateMilliseconds;
                }
              } else {
                //initially, I had this just as 'not set', but logic caught out below and too hard to clear ucpParams["_time"]
                dateMilliseconds = new Date().getTime();
                purchaseDateTime = dateMilliseconds;
              }

              //First things first, is there only one row?
              if (countTotalPurchaseItems == 1) {
                itemStr = '{"_id": "' + itemId + '", "type": "p"},';
                orderStr = '{"quantity": ' + quantity + ', "item": {"_id": "' + itemId + '", "type": "p", "price": ' + parseFloat(price) + '}},';
                totalGroupPurchaseValue = parseFloat(quantity * price);
                ucpParams["_time"] = purchaseDateTime;

                itemStr = '[' + itemStr.substring(0, itemStr.length - 1) + ']'
                orderStr = '[' + orderStr.substring(0, orderStr.length - 1) + ']'
                ucpParams[".item"] = JSON.parse(itemStr);
                ucpParams[".order"] = JSON.parse('{"totalValue": ' + totalGroupPurchaseValue + ', "lineItems": ' + orderStr + '}');
                console.log('ONLY 1 ROW: SENDING OFF ORDER');
                console.log(ucpParams);
                sendRequests(ucpParams, 1);
              } else if (purchaseRowCounter == countTotalPurchaseItems) { //next, it the last row?
                //last row - check if datetime is the same. If not, then send off previous request AND current
                if (prevPurchaseDateTime == purchaseDateTime) {
                  //we're in the last row, but the datetime is the same as previous, so add current row's data then send
                  itemStr += '{"_id": "' + itemId + '", "type": "p"},';
                  orderStr += '{"quantity": ' + quantity + ', "item": {"_id": "' + itemId + '", "type": "p", "price": ' + parseFloat(price) + '}},';
                  totalGroupPurchaseValue += parseFloat(quantity * price);
                  ucpParams["_time"] = purchaseDateTime;

                  itemStr = '[' + itemStr.substring(0, itemStr.length - 1) + ']'
                  orderStr = '[' + orderStr.substring(0, orderStr.length - 1) + ']'
                  ucpParams[".item"] = JSON.parse(itemStr);
                  ucpParams[".order"] = JSON.parse('{"totalValue": ' + totalGroupPurchaseValue + ', "lineItems": ' + orderStr + '}');
                  console.log('LAST ROW, SENDING OFF CURRENT & PREV ORDER coz datetimes are the same');
                  console.log(ucpParams);
                  sendRequests(ucpParams, 1);
                } else {
                  //we're in the last row, but the datetime is NOT the same as the previous, so send off previous, then send current
                  itemStr = '[' + itemStr.substring(0, itemStr.length - 1) + ']'
                  orderStr = '[' + orderStr.substring(0, orderStr.length - 1) + ']'
                  ucpParams[".item"] = JSON.parse(itemStr);
                  ucpParams[".order"] = JSON.parse('{"totalValue": ' + totalGroupPurchaseValue + ', "lineItems": ' + orderStr + '}');
                  ucpParams["_time"] = prevPurchaseDateTime;

                  console.log('LAST ROW, SENDING OFF PREV ORDER ONLY because current datetime is different');
                  console.log(ucpParams);
                  sendRequests(ucpParams, 1);

                  //now send current
                  itemStr = '{"_id": "' + itemId + '", "type": "p"},';
                  orderStr = '{"quantity": ' + quantity + ', "item": {"_id": "' + itemId + '", "type": "p", "price": ' + parseFloat(price) + '}},';
                  totalGroupPurchaseValue = parseFloat(quantity * price);
                  ucpParams["_time"] = purchaseDateTime;

                  itemStr = '[' + itemStr.substring(0, itemStr.length - 1) + ']'
                  orderStr = '[' + orderStr.substring(0, orderStr.length - 1) + ']'
                  ucpParams[".item"] = JSON.parse(itemStr);
                  ucpParams[".order"] = JSON.parse('{"totalValue": ' + totalGroupPurchaseValue + ', "lineItems": ' + orderStr + '}');
                  console.log('LAST ROW, SENDING OFF CURRENT ORDER ONLY because datetime of current was different to previous');
                  console.log(ucpParams);
                  sendRequests(ucpParams, 1);
                }
              } else if (prevPurchaseDateTime != '' && prevPurchaseDateTime != purchaseDateTime) {
                //it's not the first row, it's not the first and only row, it's not the last row, but the datetime is different, so send off the previous, then append the new
                itemStr = '[' + itemStr.substring(0, itemStr.length - 1) + ']'
                orderStr = '[' + orderStr.substring(0, orderStr.length - 1) + ']'
                ucpParams[".item"] = JSON.parse(itemStr);
                ucpParams[".order"] = JSON.parse('{"totalValue": ' + totalGroupPurchaseValue + ', "lineItems": ' + orderStr + '}');
                ucpParams["_time"] = prevPurchaseDateTime;

                console.log('MIDDLE ROW, SENDING OFF PREV ORDER ONLY because current datetime is different');
                console.log(ucpParams);
                sendRequests(ucpParams, 1);

                //now create new
                itemStr = '{"_id": "' + itemId + '", "type": "p"},';
                orderStr = '{"quantity": ' + quantity + ', "item": {"_id": "' + itemId + '", "type": "p", "price": ' + parseFloat(price) + '}},';
                totalGroupPurchaseValue = parseFloat(quantity * price);
                ucpParams["_time"] = purchaseDateTime;

                console.log('MIDDLE ROW BUT PREV DATE IS DIFFERENT, AND its not the last row - start again');
              } else {
                //it's not the first row, it's not the first and only row, it's not the last row, it's an order whose date is the same as previous - APPEND ONLY
                itemStr += '{"_id": "' + itemId + '", "type": "p"},';
                orderStr += '{"quantity": ' + quantity + ', "item": {"_id": "' + itemId + '", "type": "p", "price": ' + parseFloat(price) + '}},';
                totalGroupPurchaseValue += parseFloat(quantity * price);


                console.log(itemStr);
                console.log(orderStr);
                console.log('MIDDLE ROW, ONLY APPENDING CURRENT ORDER - FINAL ELSE');
              }
              prevPurchaseDateTime = purchaseDateTime;
            }
          } else {
            isValid = false;
            document.getElementById("userCatalogActionsSpinner").style.display = 'none';
            return;
          }
        });

        resolve();
        if (isValid) {
          displayFooterMessage("userCatalogActionsFooter", "<span style='color: green;'>Data successfully sent</span>");
        }
        return isValid;
      }, 100);
    }
  );
}

function submitTagForm() {
  return new Promise(
    function(resolve, reject) {
      window.setTimeout(function() {
        var isValid = true;
        setLocalStorage('account', $('#ucp-account').val());
        setLocalStorage('dataset', $('#ucp-dataset').val());

        var iterate = $("#ucp-tag-form .ucp-catalog-dimension-setup-row").each(function(r, row) {
          var inputs = $(row).find("input, select");
          var inputValues = {};
          inputs.each(function(i, input) {
            inputValues[$(input).attr("name")] = $(input).val();
          });
          if (validateCatalogDimensionInputs(inputValues)) {
            //Check if single or multiple values
            if (inputValues["ucp-tag-ids"].indexOf(';') < 0) {
              // Common request parameters
              var ucpParams = {
                _ak: $("#ucp-account").val(),
                _ds: $("#ucp-dataset").val(),
                ".item": {
                  "_id": inputValues["ucp-tag-ids"],
                  "type": "t",
                  "tagType": $("#ucp-tag-type").val()
                },
                action: "View Tag"
              }
              if ($("#ucp-tag-type option:selected").val() == "Category") {
                ucpParams[".item"]["type"] = "c";
                ucpParams.action = "View Category";
              }
              ucpParams[".anonId"] = "ucptestuser";
              ucpParams["_anon"] = "true";
              console.log(ucpParams);

              sendRequests(ucpParams, 1);
            } else {
              //Multiple values
              var tagValuesArr = inputValues["ucp-tag-ids"].split(";");
              $.each(tagValuesArr, function(i) {
                // Common request parameters
                var ucpParams = {
                  _ak: $("#ucp-account").val(),
                  _ds: $("#ucp-dataset").val(),
                  ".item": {
                    "_id": tagValuesArr[i].trim(),
                    "type": "t",
                    "tagType": $("#ucp-tag-type").val()
                  },
                  action: "View Tag"
                }
                if ($("#ucp-tag-type option:selected").val() == "Category") {
                  ucpParams[".item"]["type"] = "c";
                  ucpParams.action = "View Category";
                }
                ucpParams[".anonId"] = "ucptestuser";
                ucpParams["_anon"] = "true";
                console.log(ucpParams);
                sendRequests(ucpParams, 1);
              });
            }
          } else {
            isValid = false;
            return;
          }
        });

        resolve();
        if (isValid) {
          displayFooterMessage("catalogDimensionSetupFooter", "<span style='color: green;'>Data successfully sent</span>");
        }
        return isValid;
      }, 100);
    }
  );
}

function setLocalStorage(cname, cvalue) {
  localStorage.setItem(cname, cvalue);
}

function getLocalStorage(cname) {
  return localStorage.getItem(cname);
}

async function submitCatalogDimensionSetup() {
  $('.slds-notify_container').remove();
  document.getElementById("dimensionSpinner").style.display = 'block';
  clearFooterMessage("catalogDimensionSetupFooter");
  await submitTagForm();
  document.getElementById("dimensionSpinner").style.display = 'none';

}
async function submitUserCatalogActions() {
  $('.slds-notify_container').remove();
  document.getElementById("userCatalogActionsSpinner").style.display = 'block';
  clearFooterMessage("userCatalogActionsFooter");
  if (validateUserCatalogActionsAllInputs()) {
    await submitForm();
  }
  document.getElementById("userCatalogActionsSpinner").style.display = 'none';

}

function changeActionNumPlaceholder(v) {
  var a = $(v);
  switch (v.value) {
    case "View Time":
      a.closest(".slds-form-element").next().find("input").attr("placeholder", "Between 1-20");
      if (!a.closest(".slds-form-element").next().find("button").hasClass("slds-hidden")) {
        a.closest(".slds-form-element").next().find("button").toggleClass("slds-hidden");
      }
      break;
    case "Purchase":
      a.closest(".slds-form-element").next().find("input").attr("placeholder", "quantity:price");
      a.closest(".slds-form-element").next().find("button").toggleClass("slds-hidden");
      break;
    default:
      a.closest(".slds-form-element").next().find("input").attr("placeholder", "# times");
      if (!a.closest(".slds-form-element").next().find("button").hasClass("slds-hidden")) {
        a.closest(".slds-form-element").next().find("button").toggleClass("slds-hidden");
      }
      break;
  }
}

function changeActionTypeOptions(v) {
  var a = $(v);
  var input = $('<input />', {
    'type': 'text',
    'class': 'slds-input',
    'name': 'ucp-action',
    'id': 'ucp-action',
    'value': 'View Category',
    'disabled': true
  });
  var selectArr = [{
      val: "View Item",
      text: "View Item"
    },
    {
      val: "View Time",
      text: "View Time"
    },
    {
      val: "Purchase",
      text: "Purchase"
    }
  ];
  var selectObj = $('<select>', {
    'class': 'slds-select',
    'id': 'ucp-action',
    'name': 'ucp-action',
    'onchange': 'changeActionNumPlaceholder(this)'
  });
  $(selectArr).each(function() {
    selectObj.append($("<option>").attr('value', this.val).text(this.text));
  });
  switch (v.value) {
    case "c":
      a.closest(".slds-form-element").next().next().find("select").replaceWith(input);
      a.closest(".slds-form-element").next().next().next().find("input").attr("placeholder", "# times");
      break;
    default:
      a.closest(".slds-form-element").next().next().find("input").replaceWith(selectObj);
      break;
  }
}

function removeRow(e) {
  var row = $(e).closest(".ucp-user-catalog-actions-row");
  row.remove();
}

function removeRowCustom(e) {
  var row = $(e).closest(".ucp-user-actions-row");
  row.remove();
}

function toggleHelp(e) {
  $(e).closest("div").find(".slds-popover_tooltip").toggleClass("slds-hidden");
}
$(document).ready(function() {
  let cookieAccount = getLocalStorage('account');
  let cookieDataset = getLocalStorage('dataset');
  let cookieUserId = getLocalStorage('user-id');
  let cookieUserAnon = getLocalStorage('user-anon');
  $('#ucp-account').val(cookieAccount != '' ? cookieAccount : 'interactionstudio');
  $('#ucp-dataset').val(cookieDataset != '' ? cookieDataset : '');
  $('#ucp-user-id').val(cookieUserId != '' ? cookieUserId : '');

  if (cookieUserAnon == 'true') {
    $(".slds-checkbox_on").css("display", "none");
    $(".slds-checkbox_off").css("display", "block");
    $('input[name="checkbox-toggle-anon"]').prop("checked", false);
  } else {
    $(".slds-checkbox_on").css("display", "block");
    $(".slds-checkbox_off").css("display", "none");
    $('input[name="checkbox-toggle-anon"]').prop("checked", true);
  }

  $("#ucp-data-add").click(function(e) {
    var newRow = $("#hidden-section-row-storage-catalog").html();
    if ($(e.target).closest("article").find(".ucp-user-row").length > 0) {
      $(e.target).closest("article").find(".ucp-user-row").last().after(newRow);
    } else {
      $(e.target).closest("article").find(".slds-card__body").last().before(newRow);
    }
  });

  $("#ucp-data-add-custom").click(function(e) {
    var newRow = $("#hidden-section-row-storage-custom").html();
    if ($(e.target).closest("article").find(".ucp-user-row").length > 0) {
      $(e.target).closest("article").find(".ucp-user-row").last().after(newRow);
    } else {
      $(e.target).closest("article").find(".slds-card__body").last().before(newRow);
    }
  });

  $("#ucp-data-duplicate").click(function(e) {
    var article = $(e.target).closest("article");
    var selects = article.find(".ucp-user-row").last().find("select");
    var clone = article.find(".ucp-user-row").last().clone();
    article.find(".ucp-user-row").last().after(clone);
    $(selects).each(function(i) {
      var select = this;
      $(clone).find("select").eq(i).val($(select).val());
    });
    if (clone.find("#ucp-item-id")) {
      clone.find("#ucp-item-id").focus();
    }
    if (clone.find("#ucp-action-id")) {
      clone.find("#ucp-action-id").focus();
    }
    if (clone.find("#remove-row")) {
      clone.find("#remove-row").css("display", "block");
    }
    if (clone.find("#remove-row-custom")) {
      clone.find("#remove-row-custom").css("display", "block");
    }
  });

  $('.slds-tabs_default__item').on('click', function() {
    $(this).addClass('slds-active');
    $(this).find('a').attr('aria-selected', true);
    var $contentToShow = $('#' + $(this).find('a').attr('aria-controls'));
    $contentToShow.removeClass('slds-hide');
    $contentToShow.addClass('slds-show');

    $(this).siblings().removeClass('slds-active');
    $(this).siblings().find('a').attr('aria-selected', false);
    $contentToShow.siblings('.slds-tabs_default__content').removeClass('slds-show');
    $contentToShow.siblings('.slds-tabs_default__content').addClass('slds-hide');
  });

  $('.slds-button_icon').hover(function(e) {
    $(e.target).closest("div").find(".slds-popover_tooltip").toggleClass("slds-hidden");
  });

  $('#checkbox-toggle-anon').click(function(e) {
    if ($('.slds-checkbox_on').css("display") == "block") {
      $('.slds-checkbox_on').css("display", "none")
      $('.slds-checkbox_off').css("display", "block")
    } else {
      $('.slds-checkbox_on').css("display", "block")
      $('.slds-checkbox_off').css("display", "none")
    }
  });

  $('.slds-button_icon').mouseover(function() {
    toggleHelp($(this));
  });
  $('.slds-button_icon').mouseout(function() {
    toggleHelp($(this));
  });
});