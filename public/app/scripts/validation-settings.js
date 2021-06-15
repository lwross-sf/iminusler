var validationSettings = {
  "interaction studio": {
    "product": {
      "schema": ["_id", "name", "url", "imageUrl", "description", "inventoryCount", "price", "listPrice", "priceDescription", "currency", "margin", "rating", "numRatings", "category", "itemClass", "style", "brand", "gender", "badge", "keyword", "author", "contentClass"],
      "minRows": 15,
      "minCategories":3,
      "messages": {
        "schema": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error", 
            "message":"Your catalog file does not have all the field headers from the template. Please correct this issue before continuing."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"File contains correct schema for product catalog file."
          }
        },
        "fieldCount": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error", 
            "message":"Your catalog file has additional fields which are not part of the template. Please correct this issue before continuing."
          }
        },
        "rowCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of products to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Your catalog has a sufficient number of products to generate diverse users."
          }
        },
        "categoryCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of categories to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Sufficient categories identified in your Product Catalog."
          }
        },
        "price": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your field <strong>price</strong> does not match expected number format."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>price</strong> appears to matches specified number format."
          }
        },
        "listPrice": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your field <strong>listPrice</strong> does not match expected number format."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>listPrice</strong> appears to matches specified number format."
          }
        },
        "duplicates": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your file contains <strong><u>duplicate _id values</u></strong>. Make sure that all catalog items have unique IDs."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"No duplicate IDs found in you file."
          }
        }

      }
    },
    "article": {
      "schema": ["_id", "name", "url", "imageUrl", "description", "rating", "numRatings", "category", "itemClass", "style", "brand", "gender", "badge", "keyword", "author", "contentClass"],
      "minRows": 5,
      "minCategories":3,
      "messages": {
        "schema": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error", 
            "message":"Your catalog file does not have all the field headers from the template. Please correct this issue before continuing."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"File contains correct schema for article catalog file."
          }
        },
        "fieldCount": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error", 
            "message":"Your catalog file has additional fields which are not part of the template. Please correct this issue before continuing."
          }
        },
        "rowCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of articles to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Your catalog has a sufficient number of articles to generate diverse users."
          }
        },
        "categoryCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of categories to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Sufficient categories identified in your articles catalog."
          }
        },
        "duplicates": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your file contains <strong><u>duplicate _id values</u></strong>. Make sure that all catalog items have unique IDs."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"No duplicate IDs found in you file."
          }
        }
      }
    },
    "blog": {
      "schema": ["_id", "name", "url", "imageUrl", "description", "rating", "numRatings", "category", "itemClass", "style", "brand", "gender", "badge", "keyword", "author", "contentClass"],
      "minRows": 5,
      "minCategories":3,
      "messages": {
        "schema": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file does not have all the field headers from the template. Please correct this issue before continuing."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"File contains correct schema for blog catalog file."
          }
        },
        "fieldCount": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error", 
            "message":"Your catalog file has additional fields which are not part of the template. Please correct this issue before continuing."
          }
        },
        "rowCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of blogs to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Your catalog has a sufficient number of blogs to generate diverse users."
          }
        },
        "categoryCount": {
          0: {
            "badge":"INFO", "theme":"slds-theme_warning", 
            "message":"Your catalog has an insufficient number of categories to provide realistic recommendations to users."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"Sufficient categories identified in your blogs catalog."
          }
        },
        "duplicates": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your file contains <strong><u>duplicate _id values</u></strong>. Make sure that all catalog items have unique IDs."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"No duplicate IDs found in you file."
          }
        }
      }
    },
    "events": {
      "schema": ["userId","userType","emailAddress","sfmcContactKey","attributes","itemAction","catalogType","catalogItemId","price","page","timestamp","viewTime"],
      "minRows": 1,
      "minCategories":0,
      "messages": {
        "schema": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file does not have all the field headers from the template."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"File contains correct schema for event items file."
          }
        },
        "userId": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file contains blank values for the <strong>userId</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>userId</strong> field contains valid options."
          }
        },
        "userType": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file contains invalid values for the <strong>userType</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>userType</strong> field contains valid options."
          }
        },
        "itemAction": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file contains invalid blank values for the <strong>itemAction</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>itemAction</strong> field contains valid options."
          }
        },
        "catalogType": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file contains invalid values for the <strong>catalogType</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>catalogType</strong> field contains valid options."
          }
        },
        "dateFormat": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your field <strong>timestamp</strong> does not match the specified date format."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>timestamp</strong> matches specified date format."
          }
        },
        "price": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your field <strong>price</strong> does not match expected number format."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>price</strong> appears to matches specified number format."
          }
        },
        "duplicates": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your file contains <strong>duplicate _id values</strong>. Make sure that all catalog items have unique IDs."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"No duplicate IDs found in you file."
          }
        }
      }
    },
    "catalog": {
      "schema": ["_id", "name", "itemType", "category"],
      "minRows": 1,
      "minCategories":0,
      "messages": {
        "schema": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file does not have all the field headers from the template. Please correct this issue before continuing."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"File contains correct schema for event catalog file."
          }
        },
        "fieldId": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file is missing the <strong>_id</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>_id</strong> field is present in the file"
          }
        },
        "fieldName": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file is missing the <strong>Name</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>name</strong> field is present in the file"
          }
        },
        "fieldType": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file is missing the <strong>itemType</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>itemType</strong> field is present in the file"
          }
        },
        "fieldCategory": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your catalog file is missing the <strong>Category</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>category</strong> field is present in the file"
          }
        },
        "itemType": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your events file contains invalid values for the <strong>itemType</strong> field."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>itemType</strong> field is present and contains valid options."
          }
        },
        "fieldPrice": {
          0: {
            "badge":"FAIL", "theme":"slds-theme_error",  
            "message":"Your field <strong>price</strong> does not match expected number format."
          },
          1: {
            "badge":"OK", "theme":"slds-theme_success", 
            "message":"<strong>price</strong> appears to matches specified number format."
          }
        }
      }
    }
  }
}