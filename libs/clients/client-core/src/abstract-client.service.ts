import { Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmpty } from 'lodash';

import { Client } from './client';
import { ClientConfig } from './client.config';

export class AbstractClientService<Config extends ClientConfig, C = any>
  implements Client<Config, C>, OnModuleInit, OnModuleDestroy
{
  private configs: { [conId: string]: Config } = {};
  private clients: { [conId: string]: C } = {};

  @Inject()
  protected configService: ConfigService;

  protected constructor(protected service: string, protected configClass: new (props: Config) => Config) {}

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }

  onModuleInit() {
    const config = this.configService.get(this.service);
    console.log(config);
    if (isEmpty(config)) console.warn('%s service not found config!', this.service);
  }

  getConfig(conId: string): Config {
    return this.configs[conId];
  }

  getClient(conId: string): C {
    return this.clients[conId];
  }
}
