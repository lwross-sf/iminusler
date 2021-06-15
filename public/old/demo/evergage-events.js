// Starter Variables
// var anonId = '9fefe7bdbb997';
// var Id = 'TESTING-USER';
// var emailAddress = 'rmead+teest@ukisolutions.com';

var anonId = '144780126';
var Id = '0013m00002Ib21mAAB';
var emailAddress = 'maia.odom@gmail.com';

// Viewed the Parking Page
var anonParkingView = {
  "action": "Viewed Parking", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "anonId": anonId
  },
  "catalog": {
    "Product": {"_id": "Parking", "categories":[{"type": "c", "_id": "Parking", "name": "Parking"}]}
  }
};

// Axciom Enrichment
var eventIdentity = {
  "action": "Identity Event",
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"emailAddress":emailAddress, "rewardStatus":"Standard", "rewardPoints":650}
  },
  "catalog": {
    "Product": {"_id": "Identity Match", "name":"Axciom Identity Match"}
  }
};

var eventParkingView = {
  "action": "Viewed Parking", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "id": Id
  },
  "catalog": {
    "Product": {"_id": "Parking", "categories":[{"type": "c", "_id": "Parking", "name": "Parking"}]}
  }
};

// Searched for Parking
var eventParkingSearch = {
  "action": "Parking Search Results", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"searchTerm":"Parking", "searchStart":"2020-07-03 10:00", "searchEnd":"2020-07-16 20:00", "terminal":"T5"}
  },
  "catalog": {
    "Product": {"_id": "Parking Search", "categories":[{"type": "c", "_id": "Parking", "name": "Parking"}], "tags": [
      {"type": "t", "tagType": "ItemClass", "_id": "Meet & Greet", "name": "Meet & Greet Parking"},
      {"type": "t", "tagType": "Style", "_id": "Luxury", "name": "Luxury"}
    ]}
  }
};

// Arrived at Airport
var eventLocAirport = {
  "action": "Arrived at Heathrow", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"activeBeacon":"Airport Parking", "atAirport":"True"}
  },
  "catalog": {
    "Product": {"_id": "Arrival Beacon", "name":"Arrived at Airport"}
  }
}

// Arrived at Security
var eventLocSecurity = {
  "action": "Beacon: Security", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"activeBeacon":"Airport Security"}
  },
  "catalog": {
    "Product": {"_id": "Security Beacon", "name":"Entered Security"}
  }
}

// Arrived at Shopping
var eventLocShopping = {
  "action": "Beacon: Shopping Zone", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"activeBeacon":"Shopping Zone"}
  },
  "catalog": {
    "Product": {"_id": "Shopping Beacon", "name":"Entered Shopping"}
  }
}

// Clicked at Reiss Advert
var productReiss = {
  "action": "Product View", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id
  },
  "catalog": {
    "Product": {"_id": "reiss-113819", 
    "name":"Leah Overcoat Camel",
    "categories":[{"type": "c", "_id": "Shoppping", "name": "Shoppping"}], 
    "tags": [
      {"type": "t", "tagType": "ItemClass", "_id": "Clothing", "name": "Clothing"},
      {"type": "t", "tagType": "Brand", "_id": "Reiss", "name": "Reiss"},
      {"type": "t", "tagType": "Style", "_id": "Luxury", "name": "Luxury"}
    ]}
  }
}

// Arrived at Reiss
var eventLocShop = {
  "action": "Beacon: Store Reiss", 
  "itemAction": "View Item",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"activeBeacon":"Store - Reiss"}
  },
  "catalog": {
    "Product": {"_id": "Reiss Store", "name":"Entered Reiss"}
  }
}

//Scanned Card
var eventRewards = {
  "action": "Purchase with Rewards", 
  "itemAction": "Purchase",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "App",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"rewardPoints":1245, "rewardStatus":"Premium"}
  },
  "order": {
    "Product": {
      "orderId": createID(),
      "totalValue": 325.00,
      "currency": "GBP",
      "lineItems": [{"quantity": 1, "_id": 'reiss-113819', "price":325.00}]
    }
  }
}

var eventBookParking = {
  "action": "Parking Booking with Rewards", 
  "itemAction": "Purchase",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"rewardPoints":814, "rewardStatus":"Premium"}
  },
  "catalog": {
    "Product": {"_id": "parkingMG", 
    "name":"Meet & Greet Parking",
    "categories":[{"type": "c", "_id": "Parking", "name": "Parking"}], 
    "tags": [
      {"type": "t", "tagType": "ItemClass", "_id": "Meet & Greet", "name": "Meet & Greet Parking"},
      {"type": "t", "tagType": "Style", "_id": "Luxury", "name": "Luxury"}
    ]}
  },
  "order": {
    "Product": {
      "orderId": createID(),
      "totalValue": 126.00,
      "currency": "GBP",
      "lineItems": [{"quantity": 1, "_id": 'parkingMG', "price":126.00}]
    }
  }
}

var eventBookLounge = {
  "action": "Lounge Booking with Rewards", 
  "itemAction": "Purchase",
  "flags": {
    "noCampaigns": true,
    "pageView": true
  },
  "source": {
    "channel": "Web",
    "local": "enGB"
  },
  "user": {
    "id": Id,
    "attributes":{"rewardPoints":878, "rewardStatus":"Premium"}
  },
  "catalog": {
    "Product": {"_id": "aspire", 
    "name":"Aspire Lounge",
    "categories":[{"type": "c", "_id": "Lounge", "name": "Lounge"}], 
    "tags": [
      {"type": "t", "tagType": "ItemClass", "_id": "Aspire Lounge", "name": "Aspire Lounge"},
      {"type": "t", "tagType": "Brand", "_id": "Aspire", "name": "Aspire"},
      {"type": "t", "tagType": "Style", "_id": "Luxury", "name": "Luxury"}
    ]}
  },
  "order": {
    "Product": {
      "orderId": createID(),
      "totalValue": 64.00,
      "currency": "GBP",
      "lineItems": [{"quantity": 4, "_id": 'aspire', "price":16.00}]
    }
  }
}


// Create Unique 16 Character GUID
function createID() {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

// API Call Function
function sendApi(data) {
  $.ajax({
    url: '/evergage/api/erichards1468121.germany-2/engage/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(data),
    dataType: 'json',
    success: function(response) {
      console.log(response)
    },
    async: false
  });
}

// Move Cards Along
function move(id, pos) {
  $('img[role="pannel"]').each(function() {
    $(this).css('opacity','0.1');
    $(this).css('background-color','#033F88');
  });
  $(id).find('img').css('opacity','1');
  $('#options').scrollLeft(pos);
}

// Show Message
function message(id) {
  var messages = [
    '<span class="field">Location:</span><span class="value"> Parking Zone 4<br/></span><span class="field">Trigger Action:</span><span class="value"> Welcome Push</span>',
    '<span class="field">Location:</span><span class="value"> Security T5 North<br/></span><span class="field">Trigger Action:</span><span class="value"> Show Boarding Pass</span>',
    '<span class="field">Location:</span><span class="value"> Departures Shopping <br/></span><span class="field">Trigger Action:</span><span class="value"> Shopping Ad - Reiss</span>',
    '<span class="field">Location:</span><span class="value"> Reiss Store <br/></span><span class="field">Trigger Action:</span><span class="value"> None</span>',
    '<span class="field">Location:</span><span class="value"> Reiss Store <br/></span><span class="field">Trigger Action:</span><span class="value"> Click and Collect Request</span>'
  ];
  $('#message').html(messages[id]);
}