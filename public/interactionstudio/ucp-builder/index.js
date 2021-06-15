// Load Stored Variables
$('#ucp-account').val(localStorage.getItem('account'));
$('#ucp-dataset').val(localStorage.getItem('dataset'));

// Load page
var sysdate = new Date();


///////////////////////////////////////////////////////
//////////////     ORIGINAL CODE     //////////////////
///////////////////////////////////////////////////////
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
    egUrl = baseUrl + "/pr";
  }

  // need to split full _ak on "." assuming user enters their LA account like lross1234567.australia-3
  // the base url for this would be https://lross1234567.australia-3.evergage.com but the _ak param to use needs to be lross1234567
  // CC 2021-01-30: there was a but here where for View Time requests where this is looped over and over, it'd only work the first time... subsequent calls would fail because request._ak had been shortened, and the baseURL above was using request._ak (instead of the full string). This has been fixed by changing baseURL above to use the actual input from the form.
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
  if (!validateDemoEnvironment()) {
    displayMessage('error', 'identity', 'Please enter data into Demo Environment.');
    console.log('Please enter data into Demo Environment');
    isValid = false;
  }
  if ($('#ucp-user-id').val() == '') {
    displayMessage('error', 'adduser', 'Please enter a User ID.');
    console.log('Please enter a User ID');
    $('#ucp-user-id').closest(".slds-form-element").addClass("slds-has-error");
    isValid = false;
  }
  if (inputs.length < 1) {
    displayMessage('error', 'database', 'No data input!');
    console.log('No data input');
    isValid = false;
  }
  for (var i in inputs) {
    if (i == "ucp-action-num") {
      if (actionType != "Purchase") {
        if (!validateNumber(inputs[i])) {
          invalidInputsArr.push(i);
          displayMessage('error', 'number_input', 'Please enter only numbers into the Action Num field.');
          isValid = false;
        }
      } else {
        if (!validatePurchaseNumber(inputs[i])) {
          invalidInputsArr.push(i);
          displayMessage('error', 'currency_input', 'Please check format of Purchase Number.');
          isValid = false;
        }
      }
    } else if (i == "ucp-action-datetime" && inputs[i] != '') {
      if (!validateDate(inputs[i])) {
        invalidInputsArr.push(i);
        displayMessage('error', 'date_input', 'Invalid date format.');
        isValid = false;
      }
    } else if (!inputs[i] && i != "ucp-action-datetime" && i != "ucp-action-attributes") {
      invalidInputsArr.push(i);
      displayMessage('error', 'type', 'Please enter data in all fields.');
      isValid = false;
    }
  }
  if (isValid) {
    clearMessage();
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
  if (!validateDemoEnvironment()) {
    displayMessage('error', 'identity', 'Please enter data into Demo Environment.');
    isValid = false;
  }
  if (inputs.length < 1) {
    displayMessage('error', 'database', 'No data input!');
    isValid = false;
  }
  if ($('#ucp-tag-type').val() == '') {
    $('#ucp-tag-type').closest(".slds-form-element").addClass("slds-has-error");
    displayMessage('error', 'type', 'Please enter data in all fields.');
    isValid = false;
  }
  if ($('#ucp-tag-ids').val() == '') {
    $('#ucp-tag-ids').closest(".slds-form-element").addClass("slds-has-error");
    displayMessage('error', 'type', 'Please enter data in all fields.');
    isValid = false;
  }
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
  return true;
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
  var iterate = $('div[role="ucp-user-row"]').each(function(r, row) {
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
        var countOrders = $('div[aria-label="ucp-user-catalog-actions-row"]').each(function(r, row) {
          var inputs = $(row).find("input, select");
          inputs.each(function(i, input) {
            if ($(input).attr("name") == 'ucp-action' && $(input).val() == 'Purchase') {
              countTotalPurchaseItems++
            }
          });
        });

        var iterate = $('div[aria-label="ucp-user-actions-row"]').each(function(r, row) {
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

        var iterate = $('div[aria-label="ucp-user-catalog-actions-row"]').each(function(r, row) {
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
          displayMessage('success', 'locker_service_api_viewer', 'Data successfully sent.');
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
  document.getElementById("dimensionSpinner").style.display = 'block';
  clearMessage();
  await submitTagForm();
  document.getElementById("dimensionSpinner").style.display = 'none';

}
async function submitUserCatalogActions() {
  document.getElementById("userCatalogActionsSpinner").style.display = 'block';
  clearMessage();
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

function changeTagTypeOptions(v) {
  switch (v.value) {
    case "Custom":
      $('#ucp-custom-tag-div')[0].style.display = "block";
      break;
    default:
      $('#ucp-custom-tag')[0].value = "";
      $('#ucp-custom-tag-div')[0].style.display = "none";
      $("#ucp-tag-type option:eq(10)")[0].text = "Custom";
      $("#ucp-tag-type option:eq(10)")[0].value = "Custom";
      break;
  }
}

function changeCustomTagName(v) {
  $("#ucp-tag-type option:eq(10)")[0].text = v.value;
  $("#ucp-tag-type option:eq(10)")[0].value = v.value;
}

function removeRow(e) {
  var row = $(e).closest('div[role="ucp-user-row"]');
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

  $("#ucp-data-add").click(function (e) {
    var newRow = $('#templates').find('div[aria-label="ucp-user-catalog-actions-row"]');
    var clone = newRow.clone();
    clone.find("input").val("");
    clone.find('input[type="datetime-local"]').val(sysdate.toISOString().substring(0,19));
    if($('#events').find('div[role="ucp-user-row"]').length > 0){
      $('#events').find('div[role="ucp-user-row"]').last().after(clone);
    } else{
      $('#events').append(clone);
    }
    clone.find("#ucp-item-id").focus();
    clone.removeAttr("id");
  });
  //trigger click on load
  $('#ucp-data-add').trigger("click");

  $("#ucp-data-add-custom").click(function (e) {
    var newRow = $('#templates').find('div[aria-label="ucp-user-actions-row"]');
    var clone = newRow.clone();
    clone.find("input").val("");
    clone.find('input[type="datetime-local"]').val(sysdate.toISOString().substring(0,19));
    if($('#events').find('div[role="ucp-user-row"]').length > 0){
      $('#events').find('div[role="ucp-user-row"]').last().after(clone);
    } else{
      $('#events').append(clone);
    }
    clone.find("#ucp-action-id").focus();
    clone.removeAttr("id");
  });
  //trigger click on load
  $('#ucp-data-add-custom').trigger("click");

  $("#ucp-data-duplicate").click(function(e) {
    var selects = $('#events').find('div[role="ucp-user-row"]').last().find("select");
    var clone = $('#events').find('div[role="ucp-user-row"]').last().clone();
    $('#events').append(clone);
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


///////////////////////////////////////////////////////
//////////////     NEW FUNCTIONS     //////////////////
///////////////////////////////////////////////////////
// RM" Temporary Banner Display
displayMessage('error', 'offline', 'This page is currently not live yet. Please go back and use one of the other tools.');

// RM: Function to show system messages
function displayMessage(theme, icon, message) {
  const banner = `
    <div id="messenger" class="slds-notify slds-notify_alert slds-theme_{theme}" role="alert" style="height:0px; line-height:0px; font-size:15px;">
      <span class="slds-assistive-text">{theme}</span>
      <span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed">
        <svg class="slds-icon slds-icon_x-small" aria-hidden="true">
          <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#{icon}"></use>
        </svg>
      </span>
      <h2>{message}</h2>
    </div>
  `
  $('#messenger').remove();
  $('#page-header').append(banner.replace('{theme}', theme).replace('{icon}', icon).replace('{message}', message));
  $('#messenger').animate({height:'54px', 'line-height':'18px'});
  setTimeout(function(){
    $('#messenger').animate({left:'100%'}, 'slow', function(){
      $('#messenger').remove();
    });
  }, 5000);
}
// RM: Function to dismiss system messages
function clearMessage() {
  $('#messenger').remove();
}

// RM: New function to support transfer of catalog between tools
if(sessionStorage.getItem('sessionData')!=null){
  array = {};
  var data = JSON.parse(sessionStorage.getItem('sessionData'));
  array["items"] = data.items;
  array.items.data = array.items.data.filter(row => row.status == 'OK');
  console.log(array);
  loadOptionsList();
}

// RM: New function to support creation auto-complete on Item Id field
function loadOptionsList(){
  var htm = '<div class="slds-dropdown slds-dropdown_length-5 slds-dropdown_large slds-hide" role="listbox" style="left:75%">';
  htm += '<ul class="slds-listbox slds-listbox_vertical" role="presentation">';
  for (i = 0; i < array.items.data.length; i++) {
    htm += '<li role="presentation" class="slds-listbox__item">';
    htm += '  <div data-id="'+ array.items.data[i]._id +'" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">';
    htm += '    <span class="slds-media__body">';
    htm += '      <span class="slds-truncate" title="Name">'+ array.items.data[i].name +'</span>';
    htm += '    </span>';
    htm += '  </div>';
    htm += '</li>';
  }
  htm += '</ul>';
  htm += '</div>';
  $('#ucp-item-id').each(function() {
    $(this).parents('.slds-form-element__control').append(htm)
  })
}

// RM: New function to support ability to upload Item Catalog
function showUploadModal(){
  $('#upload-modal').removeClass('slds-hide');
  $('.slds-backdrop').addClass('slds-backdrop_open');
}

// RM: New function to support upload of Item Catalog
$('#items').click(function(){
  $('#items').val(null);
});
$('#items').change(function(){
  loadCatalogObj('items');
});

// RM: Import CSV data in to an Object
function loadCatalogObj(id){
  array = {};
  var input = document.getElementById(id);
  if(input.files.length>0){
    $('#'+id).attr('aria-busy', 1)
    var reader = new FileReader();
    reader.readAsText(input.files[0], "utf8");
    reader.onloadend = function () {
      var text = reader.result;
      var data = Papa.parse(text, {header: true, encoding: "utf8"});
      if(data.meta.fields.indexOf('status')>-1){
        var dataRows = data.data;
        var dataRows = dataRows.filter(row => row.status == 'OK');
        data.data = dataRows;
      }
      array[id] = data;
      console.log(array);
      validateCatalog();
      $('#'+id).attr('aria-busy', 0)
    };
  } else {
    $('#'+id).parents('.slds-form-element').addClass('slds-has-error');
    $('#'+id).parents('.slds-form-element').find('.slds-form-element__help').removeClass('slds-hide');
  }
}

// RM: Function to validate each catalog type based on default settings
function validateCatalog() {
  var id = "items";
  array[id].validation = [];
  var settings = validationSettings["interaction studio"]["catalog"];
  
  // Check _id field
  if(array[id].meta.fields.indexOf('_id')>-1){
    array[id].validation.push(settings.messages.fieldId[1]);
  } else {
    array[id].validation.push(settings.messages.fieldId[0]);
  }

  // Check name field
  if(array[id].meta.fields.indexOf('name')>-1){
    array[id].validation.push(settings.messages.fieldName[1]);
  } else {
    array[id].validation.push(settings.messages.fieldName[0]);
  }

  // Check itemType field
  if(array[id].meta.fields.indexOf('itemType')>-1){
    var catalogOptions = sort([...new Set(array[id].data.map(x => x.itemType))]);
    $.each(["a","b","p"], function( index, value ) {
      catalogOptions.erase(value);
    });
    var msg = (catalogOptions.length > 0) ? settings.messages.itemType[0] : settings.messages.itemType[1];
    array[id].validation.push(msg);
  } else {
    array[id].validation.push(settings.messages.fieldType[0]);
  }

  // Check category field
  if(array[id].meta.fields.indexOf('category')>-1){
    array[id].validation.push(settings.messages.fieldCategory[1]);
  } else {
    array[id].validation.push(settings.messages.fieldCategory[0]);
  }

  // Check price field
  var priceOptions = sort([...new Set(array[id].data.map(x => x.price))]);
  var priceOptions = priceOptions.filter(function(v){return v!==''});
  if((!isNaN(parseFloat(priceOptions[0])) && !isNaN(parseFloat(priceOptions[priceOptions.length-1])) && array[id].meta.fields.indexOf('price')>-1) || priceOptions.length ==0){
    array[id].validation.push(settings.messages.fieldPrice[1]);
  } else {
    array[id].validation.push(settings.messages.fieldPrice[0])
  }

  // Render results
  var resultsHeader = '<div class="slds-text-heading_medium slds-p-bottom_small">Validation Results</div>';
  $('#validation-results').html(resultsHeader + resultsList(array[id].validation));
  $('#upload-input').addClass('slds-hide');
  $('#validation-results').removeClass('slds-hide');

  // Check if user can proceed
  if($('#validation-results').find('.slds-theme_error').length > 0) {
    $('#upload-modal').find('.slds-button_brand').prop('disabled', true);
    $('#upload-modal').find('.slds-button_text-destructive').prop('disabled', false);
   } else {
    $('#upload-modal').find('.slds-button_brand').prop('disabled', false);
    $('#upload-modal').find('.slds-button_text-destructive').prop('disabled', false);
   }
}

// RM: New function to reset upload form
function resetCatalog(){
  $('#items').val(null);
  $('#upload-input').removeClass('slds-hide');
  $('#validation-results').addClass('slds-hide');
  $('#upload-modal').find('.slds-button_brand').prop('disabled', true);
  $('#upload-modal').find('.slds-button_text-destructive').prop('disabled', true);
}

// RM: New function to apply uploaded Item Catalog to page
function importCatalog(){
  loadOptionsList();
  $('#upload-modal').addClass('slds-hide');
  $('.slds-backdrop').removeClass('slds-backdrop_open');
  $('#upload-input').removeClass('slds-hide');
  $('#validation-results').addClass('slds-hide');
  $('#upload-modal').find('.slds-button_brand').prop('disabled', true);
  $('#upload-modal').find('.slds-button_text-destructive').prop('disabled', true);
  $('#items').val(null);
}

// RM: New function to support auto-complete on Item Id field
$(document).on('keyup','#ucp-item-id',function(){
  var par = $(this).parents('.slds-form-element__control');
  if(par.find('.slds-listbox').length>0){
    if($(this).val().length>0){
      var search = $(this).val().toLowerCase();
      par.find('.slds-listbox').find('.slds-listbox__item').each(function() {
        var text = $(this).find('.slds-truncate').text().toLowerCase();
        var id = $(this).find('.slds-listbox__option').attr('data-id').toLowerCase();
        if(id.indexOf(search)> -1 || text.indexOf(search)>-1){
          $(this).removeClass('slds-hide');
        } else {
          $(this).addClass('slds-hide');
        }
      })
      if(par.find('.slds-listbox__item:not(.slds-hide)').length>0){
        par.find('.slds-dropdown').removeClass('slds-hide');
      } else {
        par.find('.slds-dropdown').addClass('slds-hide');
      }
    } else {
      par.find('.slds-dropdown').addClass('slds-hide')
    }
  }
});

// RM: New function to select auto-complete option on Item Id field
$(document).on('click','.slds-listbox__option',function(){
  var text = $(this).attr('data-id');
  $(this).parents('.slds-form-element__control').find('input').val(text);
  $(this).parents('.slds-dropdown').addClass('slds-hide');
});

// Sort Standard Array
function sort(array) {
  return array.sort((a, b) => {
    let x = a;
    let y = b;
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

// Array Erase Element
Array.prototype.erase = function(el) {
  let p = this.indexOf(el); // indexOf use strict equality (===)
  if(p != -1) {
      this.splice(p, 1);
  }
}