
# Articles with slack posting App

This project has Articles and User crud, and the authentication with jwt. And a Slack integration to post messages to Slack in channel #general each time an article is created.

Every endpoint (except login endpoint) should include a access-token header with the token generated with login endpoint.

As an example login endpoin create a token only if you pass an username and password that matches with this env variable:
`AUTH_USERNAME`

`AUTH_PASSWORD`


#### Config
There is ./config.js file where you can configurate the app.
Or you can set these env variables:

`PORT` default: `3000`
`MONGO_DB_URL` default: `mongodb://localhost:27017/articles`
`AUTH_TOKEN_KEY_PATH` default: `./localEnvAuthTokenKey.key`
`SLACK_TOKEN` 
`AUTH_USERNAME` default: `anExampleValidUsername`
`AUTH_PASSWORD` default: `anExampleValidPassword`

### Start up the app:

`npm i`

`export SLACK_TOKEN=YOUR_SLACK_TOKEN`,

`npm start`


### Endpoints:
There is a postman collection with the endoints at: `./postman/collection.json`



### Node Version:
`v14.3.0`

### Mongodb Version:
`3.6.18`
