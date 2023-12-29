import { Options } from 'amqplib';

import { ClientConfig } from '@giangnt3246/client-core';
import { toInt } from '@giangnt3246/common';
export class RabbitMQConfig extends ClientConfig implements Options.Connect {
  hostname?: string;
  protocol?: string;
  port?: number;
  username?: string;
  password?: string;
  locale?: string;
  frameMax?: number;
  heartbeat?: number;
  vhost?: string;
  onConnectionEvent?: { exitOnClose?: boolean; exitOnError: boolean };
  onChannelEvent?: { exitOnClose?: boolean; exitOnError: boolean };

  constructor(props: RabbitMQConfig) {
    super(props);
    this.hostname = props.hostname ?? 'localhost';
    this.protocol = props.protocol ?? 'amqp';
    this.port = toInt(props.port, 5672);
    this.username = props.username ?? 'guest';
    this.password = props.password ?? 'guest';
    this.locale = props.locale;
    this.frameMax = toInt(props.frameMax);
    this.heartbeat = toInt(props.heartbeat);
    this.vhost = props.vhost;
    this.onConnectionEvent = props.onConnectionEvent ?? { exitOnClose: true, exitOnError: true };
    this.onChannelEvent = props.onChannelEvent ?? { exitOnClose: true, exitOnError: true };
  }
}
