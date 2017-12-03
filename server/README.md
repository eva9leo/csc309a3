#  BackAPI Doc
* URL: http://74.15.30.211:3000/

## Message Endpoints
### GET `/api/messages`
### POST `/api/messages`
#### Required Body Fields 
* title
* contents
### DELETE `/api/messages/:_id`
##### Required Params
* _id

## User Endpoints
### GET `/api/users/user?username=<username>`
##### This is for checking a user's exitence
#### Required Queries
* username
### GET `/api/users/<username>?password=<password>`
##### This is for authentation
#### Required Params
* username
#### Required Queries
* password
### POST `/api/users`
#### Required Body Fields 
* username
* password

## Records Endpoints
### GET `/api/records?username=<username>?password=<password>?year=<year>?month=<month>?day=<day>`
#### Required Queries
* username
* password
* year
* month
* day
### POST `/api/records?username=<username>?password=<password>`
#### Required Queries
* username
* password
#### Required Body Fields
* year
* month
* day
* ndbno
* serving_number
### PUT `/api/records?username=<username>?password=<password>?_id=<_id>?serving_number=<serving_number>`
#### Required Queries
* username
* password
* _id
* serving_number
### DELETE `/api/records?username=<username>?password=<password>?_id=<_id>`
#### Required Queries
* username
* password
* _id
