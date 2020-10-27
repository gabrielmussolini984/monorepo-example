/* eslint-disable */
import { connect } from 'amqplib';

export class RabbitmqServer {
  constructor(uri) {
    this.uri = uri;
  }

  async start() {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInExchange({ exchange, routingKey, message }) {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }
}
