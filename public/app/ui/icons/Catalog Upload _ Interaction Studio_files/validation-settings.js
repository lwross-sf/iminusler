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
        }
      }
    },
    "article": {
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
        }
      }
    },
    "blog": {
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
        }
      }
    }
  }
}