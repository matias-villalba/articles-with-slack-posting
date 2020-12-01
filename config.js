module.exports = {
    port: process.env.PORT || 3000,
    mongodbUrl: process.env.MONGO_DB_URL || 'mongodb://localhost:27017/articles',
    authTokenKeyPath: process.env.AUTH_TOKEN_KEY_PATH || './localEnvAuthTokenKey.key',
    slackToken: process.env.SLACK_TOKEN,

    slackChannel: '#general',
    tokenExpirationInSeconds: 60 * 3,

    // user and pass should be stored in database (password as a hash). 
    // For simplicity, we get a user/pass from config/ env variables
    username: process.env.AUTH_USERNAME || 'anExampleValidUsername',
    password: process.env.AUTH_PASSWORD || 'anExampleValidPassword'

}