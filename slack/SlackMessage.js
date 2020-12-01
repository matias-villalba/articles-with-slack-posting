'use strict'

class SlackMessage {
    constructor(slackClient, author, title, channel) {
        this.author = author
        this.title = title
        this.channel = channel
        this.slackClient = slackClient
    }


    async post() {
        try {
            await this.slackClient.chat.postMessage({
                channel: this.channel,
                text: `A new article was posted: '${this.title}' by ${this.author}`,
            });
        } catch (error) {
            console.log(error)
            throw error
        }

    }


}

module.exports = SlackMessage