/* eslint-disable */
const {connect}= require('amqplib');

module.exports =  class RabbitmqServer {
  constructor(uri) {
    this.uri = uri;
  }

  async start() {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInExchange(exchange, routingKey, message ) {
    console.log('publish')
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}
