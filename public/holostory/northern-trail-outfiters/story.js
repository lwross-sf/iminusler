var journey = "welcome";
var config = {
  "0": {
    "content": {
      "type":"inbox",
      "emails":[
        {"name":"eMarketer Today", "subject":"Subject Line goes hefojorre", "hours_offset":48, "read":false}
      ]
    },
    "guide":{
      "title":"Welcome to Marketing Cloud",
      "subtitle":"INTRODUCTION",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "imageUrl":"",
      "buttons":[
        {"type":"brand", "text":"Begin Journey", "controls":"1", "customClasses":""}
      ]
    }
  },
  "1": {
    "content": {
      "type":"inbox",
      "emails":[
        {"name":"eMarketer Today", "subject":"Subject Line goes hefojorre", "hours_offset":48, "read":false},
        {"name":"eMarketer Today", "subject":"Subject Line goes hefojorre", "hours_offset":48, "read":false},
        {"name":"eMarketer Today", "subject":"Subject Line goes hefojorre", "hours_offset":72, "read":false}
      ]
    },
    "guide":{
      "title":"Customer receives Welcome Email",
      "subtitle":"CHOICE 1",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "imageUrl":"",
      "buttons":[
        {"type":"brand", "text":"Open Email", "controls":"3", "customClasses":""},
        {"type":"destructive", "text":"Ignore the Email", "controls":"2", "customClasses":""}
      ]
    }
  },
  "2": {
    "content": {
      "type":"inbox",
      "emails":[
        {"name":"eMarketer Today", "subject":"Resend Subject Line goes here", "hours_offset":0, "read":false},
        {"name":"eMarketer Today", "subject":"Subject Line goes here", "hours_offset":48, "read":false}
      ]
    },
    "guide":{
      "title":"Customer receives RESEND of the Welcome Email",
      "subtitle":"CHOICE 1",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "imageUrl":"",
      "buttons":[
        {"type":"brand", "text":"Continue", "controls":"3", "customClasses":""}
      ]
    }
  },
  "3": {
    "content":"/welcome/content/email_1.html",
    "guide":{
      "title":"Customer receives Welcome Email",
      "subtitle":"CHOICE 2",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "imageUrl":"",
      "buttons":[
        {"type":"brand", "text":"Open Email", "controls":"3"},
        {"type":"destructive", "text":"Ignore the Email", "controls":"2", "customClasses":""}
      ]
    }
  }
}