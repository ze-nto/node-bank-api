export const swaggerDoc = {

  "swagger": "2.0",
  "info": {
    "description": "My Bank API description",
    "version": "1.0.0",
    "title": "My Bank API"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "account",
      "description": "Account management"
    }
  ],
  "paths": {
    "/accounts": {
      "get": {
        "tags": [
          "account"
        ],
        "summary": "Get Existing accounts",
        "description": "Get existing accounting descrip",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Account"
              }
            }
          },
          "400": {
            "description": "Error occurred"
          }
        }
      },
      "post": {
        "tags": [
          "account"
        ],
        "summary": "Create a new account",
        "description": "Create a new account with the received parameters",
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "body",
            "name": "body",
            "description": "Account object",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Account"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Account created"
          },
          "400": {
            "description": "Error occured"
          }
        }
      }
    }
  },
  "definitions": {
    "Account": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "José Pereira"
        },
        "balance": {
          "type": "integer",
          "example": 5000
        }
      }
    },
    "ApiResponse": {
      "type": "object",
      "properties": {
        "code": {
          "type": "integer",
          "format": "int32"
        },
        "type": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      }
    }
  }
}